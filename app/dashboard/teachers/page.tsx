"use client";

import { useMemo, useState } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useTeachers, useCreateTeacher, useUpdateTeacher, useDeleteTeacher, Teacher } from "@/hooks/useTeachers";
import { Edit, Trash2, Eye, ArrowUpDown, User, MessageCircle, Copy } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

import { genderMap } from "@/lib/constants";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function TeachersPage() {
    const { data: teachers = [], isLoading } = useTeachers();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Teacher | null>(null);
    const [editingItem, setEditingItem] = useState<Teacher | null>(null);
    const [viewingItem, setViewingItem] = useState<Teacher | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const createMutation = useCreateTeacher();
    const updateMutation = useUpdateTeacher(editingItem?.id ?? 0);
    const deleteMutation = useDeleteTeacher();
    const { toast } = useToast();

    const sortedTeachers = useMemo(() => {
        let items = [...teachers];
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
    }, [teachers, sortConfig]);

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

    const handleEdit = (teacher: Teacher) => {
        setEditingItem(teacher);
        setDialogOpen(true);
    };

    const handleView = (teacher: Teacher) => {
        setViewingItem(teacher);
        setDetailsOpen(true);
    };

    const handleDelete = (teacher: Teacher) => {
        setItemToDelete(teacher);
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync(itemToDelete.id);
            toast({
                title: "تم حذف المعلم",
                description: `تم حذف المعلم ${itemToDelete.name} بنجاح.`,
                variant: "destructive",
            });
            setConfirmDeleteOpen(false);
        } catch (e) {
            console.error(e);
            toast({
                title: "فشل حذف المعلم",
                description: "حدث خطأ أثناء الحذف، حاول مرة أخرى.",
                variant: "destructive",
            });
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

    const teacherFields: FormFieldConfig[] = [
        { name: "name", label: "الاسم", type: "text", required: true, placeholder: "اسم المعلم الكامل" },
        {
            name: "gender",
            label: "النوع",
            type: "select",
            options: [
                { label: "ذكر", value: "MALE" },
                { label: "أنثى", value: "FEMALE" }
            ]
        },
        { name: "phone", label: "رقم الموبايل", type: "text", placeholder: "01xxxxxxxxx" },
        { name: "email", label: "البريد الإلكتروني", type: "text", placeholder: "example@test.com" },
        { name: "specialty", label: "التخصص", type: "text", placeholder: "مثل: تجويد، حفظ، إلخ" },
    ];

    const columns: ColumnDef<Teacher>[] = [
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                    <span>المعلم</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'name' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => (
                <Link href={`/dashboard/teachers/${row.id}`} className="flex items-center gap-2 group">
                    <Avatar className="h-8 w-8 transition-transform group-hover:scale-110">
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <span className="group-hover:text-primary transition-colors">{row.name}</span>
                </Link>
            )
        },
        { header: "الموبايل", accessorKey: "phone" },
        { header: "التخصص", accessorKey: "specialty" },
        {
            header: "الطلاب",
            cell: (row) => row._count?.students || 0
        },
        {
            header: "المجموعات",
            cell: (row) => row._count?.groups || 0
        },
    ];

    const actions: RowAction<Teacher>[] = [
        { icon: Eye, onClick: handleView },
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <DashboardSectionCard
            title="إدارة المعلمين"
            description="عرض وإدارة معلومات المعلمين"
            actionLabel="إضافة معلم جديد"
            onActionClick={handleAdd}
        >
            <GenericDataTable
                data={sortedTeachers}
                columns={columns}
                actions={actions}
                searchKeys={["name", "phone", "specialty"]}
                searchPlaceholder="البحث بالاسم أو الموبايل..."
                isLoading={isLoading}
                getRowKey={(row) => row.id}
            />

            <DynamicFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingItem ? "تعديل بيانات المعلم" : "إضافة معلم جديد"}
                fields={teacherFields}
                initialData={editingItem || undefined}
                onSubmit={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
                mode={editingItem ? "edit" : "add"}
            />

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>تفاصيل المعلم: {viewingItem?.name}</DialogTitle>
                    </DialogHeader>
                    {viewingItem && (
                        <div className="space-y-4 py-4 rtl">
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">النوع:</span>
                                <span>{genderMap[viewingItem.gender || ""] || "-"}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2 items-center">
                                <span className="font-bold">رقم الموبايل:</span>
                                <div className="flex items-center gap-2">
                                    <span dir="ltr" className="text-sm">{viewingItem.phone || "-"}</span>
                                    {viewingItem.phone && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const digits = (viewingItem.phone || "").replace(/[^0-9]/g, "");
                                                    if (!digits) return;
                                                    window.open(`https://wa.me/${digits}`, "_blank");
                                                }}
                                                className="inline-flex items-center justify-center h-7 w-7 rounded-full border bg-primary/5 hover:bg-primary/10"
                                                title="فتح واتساب"
                                            >
                                                <MessageCircle className="h-3 w-3 text-green-600" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        await navigator.clipboard.writeText(viewingItem.phone || "");
                                                        alert("تم نسخ الرقم إلى الحافظة");
                                                    } catch {
                                                        console.error("copy failed");
                                                    }
                                                }}
                                                className="inline-flex items-center justify-center h-7 w-7 rounded-full border bg-muted hover:bg-muted/80"
                                                title="نسخ الرقم"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">البريد الإلكتروني:</span>
                                <span className="text-sm">{viewingItem.email || "-"}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">التخصص:</span>
                                <span>{viewingItem.specialty || "-"}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">عدد الطلاب:</span>
                                <span>{viewingItem._count?.students || 0}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="font-bold">عدد المجموعات:</span>
                                <span>{viewingItem._count?.groups || 0}</span>
                            </div>
                            <div className="pt-4 flex flex-col gap-2">
                                <button
                                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    onClick={() => {
                                        if (!viewingItem) return;
                                        setDetailsOpen(false);
                                        setEditingItem(viewingItem);
                                        setDialogOpen(true);
                                    }}
                                >
                                    تعديل هذا المعلم
                                </button>
                                <Link href={`/dashboard/teachers/${viewingItem.id}`} className="w-full">
                                    <button className="w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm">
                                        فتح صفحة المعلم الكاملة
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <ConfirmDialog
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
                onConfirm={confirmDelete}
                title="حذف المعلم"
                description={`هل أنت متأكد من حذف المعلم ${itemToDelete?.name}؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                variant="destructive"
                isLoading={deleteMutation.isPending}
            />
        </DashboardSectionCard>
    );
}
