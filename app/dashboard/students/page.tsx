"use client";

import { useMemo, useState } from "react";
import { GenericDataTable, ColumnDef, RowAction } from "@/components/dashboard/GenericDataTable";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent, useCreateManyStudents } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";
import { useGroups } from "@/hooks/useGroups";
import { Edit, Trash2, Eye, ArrowUpDown, User, MessageCircle, Copy } from "lucide-react";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Student } from "@/types/student";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { groupDaysMap, groupTimeMap, genderMap } from "@/lib/constants";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function StudentsPage() {
    const { data: students = [], isLoading } = useStudents();
    const { data: teachers = [] } = useTeachers();
    const { data: groups = [] } = useGroups();
    const { toast } = useToast();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [multiDialogOpen, setMultiDialogOpen] = useState(false);
    const [multiJson, setMultiJson] = useState('[{"name":"هادي أحمد","gender":"MALE","age":10}]');
    const [multiTeacherId, setMultiTeacherId] = useState<number | null>(null);
    const [multiDay, setMultiDay] = useState<string | null>(null);
    const [multiGroupId, setMultiGroupId] = useState<number | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Student | null>(null);
    const [editingItem, setEditingItem] = useState<Student | null>(null);
    const [viewingItem, setViewingItem] = useState<Student | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const createMutation = useCreateStudent();
    const updateMutation = useUpdateStudent(editingItem?.id ?? 0);
    const deleteMutation = useDeleteStudent();
    const createManyMutation = useCreateManyStudents();

    // فلترة الأيام بناءً على المعلم المختار
    const availableDays = useMemo(() => {
        if (!selectedTeacherId) return Object.entries(groupDaysMap).map(([value, label]) => ({ label, value }));
        const teacherGroups = groups.filter(g => g.teacherId === selectedTeacherId);
        const days = Array.from(new Set(teacherGroups.map(g => g.name)));
        return days.map(d => ({ label: groupDaysMap[d] || d, value: d }));
    }, [groups, selectedTeacherId]);

    // فلترة الأوقات بناءً على المعلم واليوم المختار
    const availableTimes = useMemo(() => {
        let filteredGroups = groups;
        if (selectedTeacherId) filteredGroups = filteredGroups.filter(g => g.teacherId === selectedTeacherId);
        if (selectedDay) filteredGroups = filteredGroups.filter(g => g.name === selectedDay);

        return filteredGroups.map(g => ({
            label: g.time ? (groupTimeMap[g.time] || g.time) : "بدون وقت محدد",
            value: g.id // نستخدم الـ ID لإسناد المجموعة للطالب مباشرة
        }));
    }, [groups, selectedTeacherId, selectedDay]);

    // فلترة الأيام للإضافة المتعددة
    const multiAvailableDays = useMemo(() => {
        if (!multiTeacherId) return Object.entries(groupDaysMap).map(([value, label]) => ({ label, value }));
        const teacherGroups = groups.filter(g => g.teacherId === multiTeacherId);
        const days = Array.from(new Set(teacherGroups.map(g => g.name)));
        return days.map(d => ({ label: groupDaysMap[d] || d, value: d }));
    }, [groups, multiTeacherId]);

    // فلترة الأوقات للإضافة المتعددة
    const multiAvailableTimes = useMemo(() => {
        let filteredGroups = groups;
        if (multiTeacherId) filteredGroups = filteredGroups.filter(g => g.teacherId === multiTeacherId);
        if (multiDay) filteredGroups = filteredGroups.filter(g => g.name === multiDay);

        return filteredGroups.map(g => ({
            label: g.time ? (groupTimeMap[g.time] || g.time) : "بدون وقت محدد",
            value: g.id
        }));
    }, [groups, multiTeacherId, multiDay]);

    const sortedStudents = useMemo(() => {
        let items = [...students];
        if (sortConfig !== null) {
            items.sort((a: any, b: any) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'teacher') {
                    aValue = a.teacher?.name || '';
                    bValue = b.teacher?.name || '';
                } else if (sortConfig.key === 'group') {
                    aValue = a.group?.name || '';
                    bValue = b.group?.name || '';
                } else if (sortConfig.key === 'time') {
                    aValue = a.group?.time || '';
                    bValue = b.group?.time || '';
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [students, sortConfig]);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAdd = () => {
        setEditingItem(null);
        setSelectedTeacherId(null);
        setSelectedDay(null);
        setDialogOpen(true);
    };

    const handleEdit = (student: Student) => {
        setEditingItem(student);
        setSelectedTeacherId(student.teacherId);
        setSelectedDay(student.group?.name || null);
        setDialogOpen(true);
    };

    const handleView = (student: Student) => {
        setViewingItem(student);
        setDetailsOpen(true);
    };

    const handleDelete = (student: Student) => {
        setItemToDelete(student);
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync(itemToDelete.id);
            toast({
                title: "تم حذف الطالب",
                description: `تم حذف الطالب ${itemToDelete.name} بنجاح.`,
                variant: "destructive",
            });
            setConfirmDeleteOpen(false);
        } catch (e) {
            console.error(e);
            toast({
                title: "فشل حذف الطالب",
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

    const handleOpenMulti = () => {
        setMultiTeacherId(null);
        setMultiDay(null);
        setMultiGroupId(null);
        setMultiDialogOpen(true);
    };

    const handleSubmitMulti = async () => {
        try {
            let parsed: any;
            try {
                parsed = JSON.parse(multiJson);
            } catch {
                toast({
                    title: "خطأ في JSON",
                    description: "صيغة JSON غير صحيحة، تأكد من الأقواس والفواصل.",
                    variant: "destructive",
                });
                return;
            }
            if (!Array.isArray(parsed) || parsed.length === 0) {
                toast({
                    title: "لا توجد بيانات",
                    description: "يجب إدخال مصفوفة JSON تحتوي على طالب واحد على الأقل.",
                    variant: "destructive",
                });
                return;
            }
            // تأكيد وجود الاسم في كل عنصر
            for (const s of parsed) {
                if (!s.name || typeof s.name !== "string" || s.name.trim() === "") {
                    toast({
                        title: "حقل الاسم مفقود",
                        description: "كل طالب يجب أن يحتوي على الاسم بشكل صحيح (name).",
                        variant: "destructive",
                    });
                    return;
                }
            }
            const studentsToSend = parsed.map((s: any) => ({
                ...s,
                teacherId: multiTeacherId ?? s.teacherId,
                groupId: multiGroupId ?? s.groupId,
            }));

            const res = await createManyMutation.mutateAsync(studentsToSend);
            setMultiDialogOpen(false);
            toast({
                title: "تم إضافة الطلاب",
                description: `تمت إضافة ${res?.count ?? studentsToSend.length} طالب/طالبة بنجاح.`,
            });
        } catch (e) {
            console.error(e);
            toast({
                title: "خطأ أثناء الإضافة",
                description: "حدث خطأ أثناء إضافة الطلاب، تأكد من البيانات وحاول مرة أخرى.",
                variant: "destructive",
            });
        }
    };

    const studentFields: FormFieldConfig[] = [
        { name: "name", label: "الاسم", type: "text", required: true, placeholder: "اسم الطالب الكامل" },
        { name: "image", label: "رابط الصورة", type: "url", placeholder: "https://..." },
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
        { name: "age", label: "السن", type: "number", placeholder: "سن الطالب" },
        {
            name: "teacherId",
            label: "المعلم",
            type: "select",
            placeholder: "اختر المعلم أولاً",
            options: teachers.map(t => ({ label: t.name, value: t.id })),
            onChange: (val) => setSelectedTeacherId(val)
        },
        {
            name: "day",
            label: "الأيام المتاحة",
            type: "select",
            placeholder: selectedTeacherId ? "اختر من أيام المعلم" : "اختر اليوم المناسب",
            options: availableDays,
            onChange: (val) => setSelectedDay(val)
        },
        {
            name: "groupId",
            label: "الوقت المتاح",
            type: "select",
            placeholder: selectedDay ? "اختر الوقت" : "اختر اليوم أولاً",
            options: availableTimes
        },
        { name: "achievement", label: "الإنجازات", type: "textarea", placeholder: "ماذا حقق الطالب؟" },
        { name: "moreInfo", label: "ملاحظات إضافية", type: "textarea" },
    ];

    const columns: ColumnDef<Student>[] = [
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                    <span>الطالب</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'name' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => (
                <Link href={`/dashboard/students/${row.id}`} className="flex items-center gap-2 group">
                    <Avatar className="h-8 w-8 transition-transform group-hover:scale-110">
                        <AvatarImage src={row.image || ""} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <span className="group-hover:text-primary transition-colors">{row.name}</span>
                </Link>
            )
        },
        { header: "الموبايل", cell: (row) => row.phone || "-" },
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('teacher')}>
                    <span>المعلم</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'teacher' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => row.teacherId ? (
                <Link href={`/dashboard/teachers/${row.teacherId}`} className="hover:text-primary transition-colors underline decoration-dotted">
                    {row.teacher?.name}
                </Link>
            ) : "غير محدد"
        },
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('group')}>
                    <span>المجموعة</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'group' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => groupDaysMap[row.group?.name || ""] || row.group?.name || "-"
        },
        {
            header: (
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('time')}>
                    <span>الوقت</span>
                    <ArrowUpDown className={`h-4 w-4 ${sortConfig?.key === 'time' ? 'opacity-100 text-primary' : 'opacity-30'}`} />
                </div>
            ),
            cell: (row) => groupTimeMap[row.group?.time || ""] || row.group?.time || "-"
        },
    ];

    const actions: RowAction<Student>[] = [
        { icon: Eye, onClick: handleView },
        { icon: Edit, onClick: handleEdit },
        { icon: Trash2, variant: "destructive", onClick: handleDelete },
    ];

    return (
        <DashboardSectionCard
            title="إدارة الطلاب"
            description="عرض وإدارة معلومات الطلاب والبحث عنهم"
            actionLabel="إضافة طالب جديد"
            onActionClick={handleAdd}
        >
            <div className="mb-4 w-full flex justify-center items-center">
                <Button size="lg" variant="outline" onClick={handleOpenMulti}>
                    إضافة عدة طلاب دفعة واحدة
                </Button>
            </div>
            <GenericDataTable
                data={sortedStudents}
                columns={columns}
                actions={actions}
                searchKeys={["name", "phone"]}
                searchPlaceholder="البحث بالاسم أو الموبايل..."
                isLoading={isLoading}
                getRowKey={(row) => row.id}
            />

            <DynamicFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingItem ? "تعديل بيانات الطالب" : "إضافة طالب جديد"}
                fields={studentFields}
                initialData={editingItem || undefined}
                onSubmit={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
                mode={editingItem ? "edit" : "add"}
            />

            {/* حوار إضافة عدة طلاب دفعة واحدة */}
            <Dialog open={multiDialogOpen} onOpenChange={setMultiDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>إضافة عدة طلاب دفعة واحدة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2 overflow-y-auto">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            ضع بيانات الطلاب في شكل{" "}
                            <span className="font-bold">JSON Array</span> بدون مسافات زائدة أو تغيير في أسماء الحقول.
                            الاسم <span className="font-bold text-primary">name</span> هو الحقل الوحيد <span className="font-bold">الإلزامي</span> لكل طالب.
                        </p>
                        <div className="bg-muted rounded-lg p-3 text-xs space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-bold">مثال صحيح:</span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={async () => {
                                            const example = '[{"name":"هادي أحمد","gender":"MALE","age":10},{"name":"فاطمة علي","gender":"FEMALE","age":9}]';
                                            setMultiJson(example);
                                            try {
                                                await navigator.clipboard.writeText(example);
                                                toast({
                                                    title: "تم نسخ المثال",
                                                    description: "يمكنك لصقه في الحقل والتعديل عليه.",
                                                });
                                            } catch {
                                                toast({
                                                    title: "تعذر نسخ المثال",
                                                    description: "حاول النسخ مرة أخرى.",
                                                    variant: "destructive",
                                                });
                                            }
                                        }}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <code className="block overflow-x-auto">
                                {`[{"name":"هادي أحمد","gender":"MALE","age":10},
{"name":"فاطمة علي","gender":"FEMALE","age":9}]`}
                            </code>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">المعلم (سيُسند للجميع)</label>
                                <select
                                    className="border rounded-md px-2 py-1 text-sm bg-background h-9"
                                    value={multiTeacherId ?? ""}
                                    onChange={(e) => {
                                        setMultiTeacherId(e.target.value ? Number(e.target.value) : null);
                                        setMultiDay(null);
                                        setMultiGroupId(null);
                                    }}
                                >
                                    <option value="">بدون معلم</option>
                                    {teachers.map((t) => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">اليوم (اختياري)</label>
                                <select
                                    className="border rounded-md px-2 py-1 text-sm bg-background h-9"
                                    value={multiDay ?? ""}
                                    onChange={(e) => {
                                        setMultiDay(e.target.value || null);
                                        setMultiGroupId(null);
                                    }}
                                >
                                    <option value="">كل الأيام</option>
                                    {multiAvailableDays.map((d) => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">الموعد (اختياري)</label>
                                <select
                                    className="border rounded-md px-2 py-1 text-sm bg-background h-9"
                                    value={multiGroupId ?? ""}
                                    onChange={(e) => setMultiGroupId(e.target.value ? Number(e.target.value) : null)}
                                >
                                    <option value="">لا يوجد وقت محدد</option>
                                    {multiAvailableTimes.map((t) => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">بيانات الطلاب (JSON)</label>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 text-xs"
                                    onClick={() => {
                                        try {
                                            const obj = JSON.parse(multiJson);
                                            const pretty = JSON.stringify(obj, null, 2);
                                            setMultiJson(pretty);
                                            toast({
                                                title: "تم تنسيق JSON",
                                                description: "تم تنسيق البيانات بشكل منظم.",
                                            });
                                        } catch {
                                            toast({
                                                title: "خطأ في JSON",
                                                description: "لا يمكن تنسيق JSON غير صحيح.",
                                                variant: "destructive",
                                            });
                                        }
                                    }}
                                >
                                    تنسيق JSON
                                </Button>
                            </div>
                            <Textarea
                                value={multiJson}
                                onChange={(e) => setMultiJson(e.target.value)}
                                className="font-mono text-xs min-h-[140px]"
                                dir="ltr"
                            />
                        </div>

                        <div className="text-xs text-muted-foreground space-y-2">
                            <p>
                                يمكنك نسخ بيانات الطلاب من ملف Excel ثم استخدام أي أداة ذكاء اصطناعي لتحويلها لصيغة JSON المناسبة.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">برومبت للذكاء الاصطناعي:</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={async () => {
                                        const prompt =
                                            `حوّل هذه البيانات إلى قائمة JSON من الكائنات بهذا الشكل بالضبط:
[{"name":"الاسم الكامل","gender":"MALE أو FEMALE","age":السن إن وجد}]
- استخدم key name للاسم الكامل.
- استخدم key gender بقيمتين فقط MALE أو FEMALE إن توفرت.
- استخدم key age للسن كرقم إن وُجد.
- لا تضف حقولاً أخرى.
- لا تضف نصوصاً خارج JSON.
- أرجع الناتج في سطر واحد بدون مسافات زائدة.`;
                                        try {
                                            await navigator.clipboard.writeText(prompt);
                                            toast({
                                                title: "تم نسخ البرومبت",
                                                description: "الصقه في أداة الذكاء الاصطناعي مع بيانات الإكسل.",
                                            });
                                        } catch {
                                            toast({
                                                title: "تعذر نسخ البرومبت",
                                                variant: "destructive",
                                            });
                                        }
                                    }}
                                >
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>
                            <pre className="font-mono bg-muted p-2 rounded whitespace-pre-wrap text-[13px]">
                                {`حوّل هذه البيانات إلى قائمة JSON من الكائنات بهذا الشكل بالضبط:
[{"name":"الاسم الكامل","gender":"MALE أو FEMALE","age":السن إن وجد}]
- استخدم key name للاسم الكامل.
- استخدم key gender بقيمتين فقط MALE أو FEMALE إن توفرت.
- استخدم key age للسن كرقم إن وُجد.
- لا تضف حقولاً أخرى.
- لا تضف نصوصاً خارج JSON.
- أرجع الناتج في سطر واحد بدون مسافات زائدة.`}
                            </pre>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setMultiDialogOpen(false)}>إلغاء</Button>
                            <Button onClick={handleSubmitMulti} disabled={createManyMutation.isPending}>
                                {createManyMutation.isPending ? "جاري الإضافة..." : "إضافة الطلاب"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rtl">
                    <DialogHeader>
                        <DialogTitle>تفاصيل الطالب: {viewingItem?.name}</DialogTitle>
                    </DialogHeader>
                    {viewingItem && (
                        <div className="space-y-4 py-4 ">
                            <div className="flex justify-center pb-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={viewingItem.image || ""} />
                                    <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                                </Avatar>
                            </div>
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
                                <span className="font-bold">السن:</span>
                                <span>{viewingItem.age || "-"} سنة</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">المعلم:</span>
                                <span>{viewingItem.teacher?.name || "-"}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">المجموعة:</span>
                                <span>{groupDaysMap[viewingItem.group?.name || ""] || viewingItem.group?.name || "-"}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                <span className="font-bold">وقت المجموعة:</span>
                                <span>{groupTimeMap[viewingItem.group?.time || ""] || viewingItem.group?.time || "-"}</span>
                            </div>
                            <div className="space-y-1 border-b pb-2">
                                <p className="font-bold">الإنجازات:</p>
                                <p className="text-sm">{viewingItem.achievement || "لا توجد إنجازات مسجلة حالياً"}</p>
                            </div>
                            <div className="space-y-1 border-b pb-4">
                                <p className="font-bold">ملاحظات:</p>
                                <p className="text-sm">{viewingItem.moreInfo || "لا توجد"}</p>
                            </div>
                            <div className="pt-2 flex flex-col gap-2">
                                <button
                                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    onClick={() => {
                                        if (!viewingItem) return;
                                        setDetailsOpen(false);
                                        setEditingItem(viewingItem);
                                        setSelectedTeacherId(viewingItem.teacherId ?? null);
                                        setDialogOpen(true);
                                    }}
                                >
                                    تعديل هذا الطالب
                                </button>
                                <Link href={`/dashboard/students/${viewingItem.id}`} className="w-full">
                                    <button className="w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm">
                                        فتح صفحة الطالب الكاملة
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
                title="حذف الطالب"
                description={`هل أنت متأكد من حذف الطالب ${itemToDelete?.name}؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                variant="destructive"
                isLoading={deleteMutation.isPending}
            />
        </DashboardSectionCard>
    );
}
