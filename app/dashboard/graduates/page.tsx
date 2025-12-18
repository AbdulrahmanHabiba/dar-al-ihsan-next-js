"use client";

import { useMemo, useState } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useGraduates, useCreateGraduate, useUpdateGraduate, useDeleteGraduate, Graduate } from "@/hooks/useGraduates";
import { Edit, Trash2, ArrowUpDown, GraduationCap } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GraduatesDashboardPage() {
    const { data: graduates = [], isLoading } = useGraduates();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Graduate | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const createMutation = useCreateGraduate();
    const updateMutation = useUpdateGraduate(editingItem?.id ?? 0);
    const deleteMutation = useDeleteGraduate();

    const sortedGraduates = useMemo(() => {
        let items = [...graduates];
        if (sortConfig !== null) {
            items.sort((a: any, b: any) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [graduates, sortConfig]);

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

    const handleEdit = (graduate: Graduate) => {
        setEditingItem(graduate);
        setDialogOpen(true);
    };

    const handleDelete = async (graduate: Graduate) => {
        if (window.confirm(`هل أنت متأكد من حذف الخريج: ${graduate.name}؟`)) {
            try {
                await deleteMutation.mutateAsync(graduate.id); 
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

    const graduateFields: FormFieldConfig[] = [
        { name: "name", label: "الاسم", type: "text", required: true, placeholder: "اسم الخريج الكامل" },
        { name: "image", label: "رابط الصورة", type: "url", placeholder: "https://..." },
        { name: "graduationYear", label: "سنة التخرج", type: "text", required: true, placeholder: "مثل: 2024" },
        { name: "achievement", label: "الإنجاز", type: "textarea", placeholder: "مثل: ختم القرآن كاملاً برواية حفص" },
        { name: "moreInfo", label: "معلومات إضافية", type: "textarea" },
    ];

    const columns: ColumnDef<Graduate>[] = [
        { 
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                    <span>الخريج</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'name' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.image || ""} />
                        <AvatarFallback><GraduationCap className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <span>{row.name}</span>
                </div>
            )
        },
        { header: "سنة التخرج", accessorKey: "graduationYear" },
        { header: "الإنجاز", accessorKey: "achievement" },
    ];

    const actions: RowAction<Graduate>[] = [
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <DashboardSectionCard
            title="إدارة الخريجين"
            description="عرض وإدارة قائمة الخريجين والمكرمين"
            actionLabel="إضافة خريج جديد"
            onActionClick={handleAdd}
        >
            <GenericDataTable
                data={sortedGraduates}
                columns={columns}
                actions={actions}
                searchKeys={["name", "graduationYear", "achievement"]}
                searchPlaceholder="البحث في الخريجين..."
                isLoading={isLoading}
                getRowKey={(row) => row.id}
            />

            <DynamicFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingItem ? "تعديل بيانات الخريج" : "إضافة خريج جديد"}
                fields={graduateFields}
                initialData={editingItem || undefined}
                onSubmit={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
                mode={editingItem ? "edit" : "add"}
            />
        </DashboardSectionCard>
    );
}
