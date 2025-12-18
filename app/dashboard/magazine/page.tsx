"use client";

import { useMemo, useState } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useMagazine, useCreateMagazine, useUpdateMagazine, useDeleteMagazine, MagazineItem } from "@/hooks/useMagazine";
import { Edit, Trash2, Eye, ArrowUpDown, Image as ImageIcon } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const categoryMap: Record<string, string> = {
    "STUDENT_OF_THE_MONTH": "طالب الشهر",
    "TEACHER_OF_THE_MONTH": "معلم الشهر",
};

export default function MagazinePage() {
    const { data: items = [], isLoading } = useMagazine();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MagazineItem | null>(null);
    const [viewingItem, setViewingItem] = useState<MagazineItem | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const createMutation = useCreateMagazine();
    const updateMutation = useUpdateMagazine(editingItem?.id ?? 0);
    const deleteMutation = useDeleteMagazine();

    const sortedItems = useMemo(() => {
        let itemsList = [...items];
        if (sortConfig !== null) {
            itemsList.sort((a: any, b: any) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return itemsList;
    }, [items, sortConfig]);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAdd = () => {
        setEditingItem(null);
        setDialogOpen(true);
    };

    const handleEdit = (item: MagazineItem) => {
        setEditingItem(item);
        setDialogOpen(true);
    };

    const handleView = (item: MagazineItem) => {
        setViewingItem(item);
        setDetailsOpen(true);
    };

    const handleDelete = async (item: MagazineItem) => {
        if (window.confirm(`هل أنت متأكد من حذف هذا العنصر؟`)) {
            try {
                await deleteMutation.mutateAsync(item.id); 
            } catch (e) { console.error(e); }
        }
    };

    const handleSubmit = async (formData: any) => {
        try {
            if (editingItem) {
                await updateMutation.mutateAsync(formData);
            } else {
                await createMutation.mutateAsync(formData);
            }
            setDialogOpen(false);
        } catch (e) { console.error(e); }
    };

    const magazineFields: FormFieldConfig[] = [
        { 
            name: "category", 
            label: "التصنيف", 
            type: "select", 
            required: true,
            options: [
                { label: "طالب الشهر", value: "STUDENT_OF_THE_MONTH" },
                { label: "معلم الشهر", value: "TEACHER_OF_THE_MONTH" }
            ]
        },
        { name: "month", label: "الشهر والسنة", type: "text", required: true, placeholder: "مثل: ديسمبر 2025" },
        { name: "name", label: "الاسم", type: "text", required: true, placeholder: "اسم الفائز" },
        { name: "image", label: "رابط الصورة", type: "url", placeholder: "https://..." },
        { name: "achievement", label: "الإنجاز", type: "textarea", placeholder: "ماذا حقق هذا الشهر؟" },
        { name: "moreInfo", label: "معلومات إضافية", type: "textarea" },
        { name: "published", label: "منشور", type: "switch", defaultValue: true },
    ];

    const columns: ColumnDef<MagazineItem>[] = [
        { 
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                    <span>الاسم</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'name' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.image || ""} />
                        <AvatarFallback><ImageIcon className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <span>{row.name}</span>
                </div>
            )
        },
        { 
            header: "التصنيف", 
            cell: (row) => (
                <Badge variant={row.category === "TEACHER_OF_THE_MONTH" ? "default" : "secondary"}>
                    {categoryMap[row.category]}
                </Badge>
            )
        },
        { header: "الشهر", accessorKey: "month" },
        { 
            header: "الحالة", 
            cell: (row) => (
                <Badge variant={row.published ? "outline" : "destructive"}>
                    {row.published ? "منشور" : "مسودة"}
                </Badge>
            )
        },
    ];

    const actions: RowAction<MagazineItem>[] = [
        { icon: Eye, onClick: handleView },
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <DashboardSectionCard
            title="إدارة المجلة"
            description="إدارة المتميزين (طالب الشهر ومعلم الشهر)"
            actionLabel="إضافة متميز جديد"
            onActionClick={handleAdd}
        >
            <GenericDataTable
                data={sortedItems}
                columns={columns}
                actions={actions}
                searchKeys={["name", "month"]}
                searchPlaceholder="البحث بالاسم أو الشهر..."
                isLoading={isLoading}
                getRowKey={(row) => row.id}
            />

            <DynamicFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingItem ? "تعديل المتميز" : "إضافة متميز جديد"}
                fields={magazineFields}
                initialData={editingItem || undefined}
                onSubmit={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
                mode={editingItem ? "edit" : "add"}
            />

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>تفاصيل التميز: {viewingItem?.name}</DialogTitle>
                    </DialogHeader>
                    {viewingItem && (
                        <div className="space-y-4 py-4 rtl">
                            <div className="flex justify-center pb-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={viewingItem.image || ""} />
                                    <AvatarFallback><ImageIcon className="h-12 w-12" /></AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">التصنيف:</span>
                                <span>{categoryMap[viewingItem.category]}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">الشهر:</span>
                                <span>{viewingItem.month}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">الحالة:</span>
                                <span>{viewingItem.published ? "منشور" : "مسودة"}</span>
                            </div>
                            <div className="space-y-1 border-b pb-2">
                                <p className="font-bold">الإنجاز:</p>
                                <p className="text-sm">{viewingItem.achievement || "لا يوجد"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold">معلومات إضافية:</p>
                                <p className="text-sm">{viewingItem.moreInfo || "لا توجد"}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </DashboardSectionCard>
    );
}
