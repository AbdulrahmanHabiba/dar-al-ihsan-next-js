"use client";

import { useMemo, useState } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useGroups, useCreateGroup, useUpdateGroup, useDeleteGroup, Group } from "@/hooks/useGroups";
import { useTeachers } from "@/hooks/useTeachers";
import { Edit, Trash2, ArrowUpDown, Users, CheckCircle } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { groupDaysMap, groupTimeMap } from "@/lib/constants";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function GroupsPage() {
    const { data: groups = [], isLoading } = useGroups();
    const { data: teachers = [] } = useTeachers();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Group | null>(null);
    const [editingItem, setEditingItem] = useState<Group | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const createMutation = useCreateGroup();
    const updateMutation = useUpdateGroup(editingItem?.id ?? 0);
    const deleteMutation = useDeleteGroup();

    // حساب الإحصائيات (تصنيف الأيام وأسماء المعلمين فيها)
    const stats = useMemo(() => {
        const result: Record<string, Set<string>> = {
            "MON_THU": new Set(),
            "SAT_TUE": new Set(),
            "SUN_WED": new Set()
        };

        groups.forEach(g => {
            if (g.teacher?.name) {
                result[g.name].add(g.teacher.name);
            }
        });

        return result;
    }, [groups]);

    const sortedGroups = useMemo(() => {
        let items = [...groups];
        if (sortConfig !== null) {
            items.sort((a: any, b: any) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'teacher') {
                    aValue = a.teacher?.name || '';
                    bValue = b.teacher?.name || '';
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [groups, sortConfig]);

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

    const handleEdit = (group: Group) => {
        setEditingItem(group);
        setDialogOpen(true);
    };

    const handleDelete = (group: Group) => {
        setItemToDelete(group);
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync(itemToDelete.id);
            setConfirmDeleteOpen(false);
        } catch (e) {
            console.error(e);
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

    const groupFields: FormFieldConfig[] = [
        {
            name: "name",
            label: "أيام المجموعة",
            type: "select",
            required: true,
            options: [
                { label: "الإثنين والخميس", value: "MON_THU" },
                { label: "السبت والثلاثاء", value: "SAT_TUE" },
                { label: "الأحد والأربعاء", value: "SUN_WED" }
            ]
        },
        {
            name: "time",
            label: "وقت المجموعة",
            type: "select",
            options: Object.entries(groupTimeMap).map(([value, label]) => ({ label, value }))
        },
        {
            name: "teacherId",
            label: "المعلم المشرف",
            type: "select",
            options: teachers.map(t => ({ label: t.name, value: t.id }))
        },
        { name: "moreInfo", label: "ملاحظات", type: "textarea" },
    ];

    const columns: ColumnDef<Group>[] = [
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                    <span>المجموعة</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'name' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => groupDaysMap[row.name] || row.name
        },
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('time')}>
                    <span>الوقت</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'time' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => groupTimeMap[row.time || ""] || row.time || "-"
        },
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('teacher')}>
                    <span>المعلم</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'teacher' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => row.teacher?.name || "غير محدد"
        },
        { header: "عدد الطلاب", cell: (row) => row._count?.students || 0 },
    ];

    const actions: RowAction<Group>[] = [
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <div className="space-y-8">
            <DashboardSectionCard
                title="إدارة المجموعات"
                description="عرض وإدارة المجموعات الدراسية"
                actionLabel="إضافة مجموعة جديدة"
                onActionClick={handleAdd}
            >
                <GenericDataTable
                    data={sortedGroups}
                    columns={columns}
                    actions={actions}
                    searchPlaceholder="البحث في المجموعات..."
                    isLoading={isLoading}
                    getRowKey={(row) => row.id}
                />

                <DynamicFormDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    title={editingItem ? "تعديل المجموعة" : "إضافة مجموعة جديدة"}
                    fields={groupFields}
                    initialData={editingItem || undefined}
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending || updateMutation.isPending}
                    mode={editingItem ? "edit" : "add"}
                />
                <ConfirmDialog
                    open={confirmDeleteOpen}
                    onOpenChange={setConfirmDeleteOpen}
                    onConfirm={confirmDelete}
                    title="حذف المجموعة"
                    description={`هل أنت متأكد من حذف هذه المجموعة؟ سيتم فك ارتباط الطلاب بها.`}
                    confirmText="حذف"
                    variant="destructive"
                    isLoading={deleteMutation.isPending}
                />
            </DashboardSectionCard>

            {/* جدول الإحصائيات أسفل الصفحة */}
            <Card className="mt-8 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Users className="h-5 w-5 text-primary" />
                        إحصائيات المجموعات والمعلمين
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(groupDaysMap).map(([key, label]) => (
                            <div key={key} className="p-4 rounded-xl border bg-card hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 border-b pb-2 mb-3">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <h3 className="font-bold text-lg">{label}</h3>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground mb-2">المعلمون المتواجدون:</p>
                                    {stats[key].size > 0 ? (
                                        Array.from(stats[key]).map(teacherName => (
                                            <Badge key={teacherName} variant="secondary" className="mr-1 mb-1">
                                                {teacherName}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-xs text-muted-foreground italic">لا يوجد معلمون مسجلون لهذا اليوم</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
