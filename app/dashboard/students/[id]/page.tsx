"use client";

import { useStudents, useDeleteStudent } from "@/hooks/useStudents";
import { useParams, useRouter } from "next/navigation";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Book, Users, Clock, Calendar, GraduationCap, MessageCircle, Copy, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { groupDaysMap, groupTimeMap } from "@/lib/constants";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useState, useMemo } from "react";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useUpdateStudent } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";
import { useGroups } from "@/hooks/useGroups";
import { useToast } from "@/hooks/use-toast";


export default function StudentDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: students = [] } = useStudents();
    const { data: teachers = [] } = useTeachers();
    const { data: groups = [] } = useGroups();
    const deleteMutation = useDeleteStudent();
    const { toast } = useToast();

    const student = students.find(s => s.id === Number(id));

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(student?.teacherId || null);
    const [selectedDay, setSelectedDay] = useState<string | null>(student?.group?.name || null);

    const updateMutation = useUpdateStudent(Number(id));

    const availableDays = useMemo(() => {
        if (!selectedTeacherId) return Object.entries(groupDaysMap).map(([value, label]) => ({ label, value }));
        const teacherGroups = groups.filter(g => g.teacherId === selectedTeacherId);
        const days = Array.from(new Set(teacherGroups.map(g => g.name)));
        return days.map(d => ({ label: groupDaysMap[d] || d, value: d }));
    }, [groups, selectedTeacherId]);

    const availableTimes = useMemo(() => {
        let filteredGroups = groups;
        if (selectedTeacherId) filteredGroups = filteredGroups.filter(g => g.teacherId === selectedTeacherId);
        if (selectedDay) filteredGroups = filteredGroups.filter(g => g.name === selectedDay);
        return filteredGroups.map(g => ({ label: groupTimeMap[g.time || ""] || g.time, value: g.id }));
    }, [groups, selectedTeacherId, selectedDay]);

    if (!student) return <div className="p-8 text-center">جاري التحميل أو الطالب غير موجود...</div>;

    const phone = student.phone || "";

    const copyPhone = async () => {
        if (!phone) return;
        try {
            await navigator.clipboard.writeText(phone);
            toast({
                title: "تم النسخ",
                description: "تم نسخ رقم الطالب إلى الحافظة.",
            });
        } catch (e) {
            console.error("Failed to copy phone", e);
            toast({
                title: "تعذر نسخ الرقم",
                description: "حاول مرة أخرى.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = () => setConfirmDeleteOpen(true);

    const confirmDelete = async () => {
        if (!student) return;
        try {
            await deleteMutation.mutateAsync(student.id);
            router.push("/dashboard/students");
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdate = async (formData: any) => {
        try {
            await updateMutation.mutateAsync(formData);
            setEditDialogOpen(false);
            toast({ title: "تم التحديث", description: "تم تحديث بيانات الطالب بنجاح." });
        } catch (e) { console.error(e); }
    };

    const studentFields: FormFieldConfig[] = [
        { name: "name", label: "الاسم", type: "text", required: true },
        { name: "gender", label: "النوع", type: "select", options: [{ label: "ذكر", value: "MALE" }, { label: "أنثى", value: "FEMALE" }] },
        { name: "age", label: "السن", type: "number" },
        { name: "phone", label: "رقم الموبايل", type: "text" },
        {
            name: "teacherId",
            label: "المعلم",
            type: "select",
            options: teachers.map(t => ({ label: t.name, value: t.id })),
            onChange: (val) => { setSelectedTeacherId(val); setSelectedDay(null); }
        },
        {
            name: "day",
            label: "الأيام المتاحة",
            type: "select",
            options: availableDays,
            onChange: (val) => setSelectedDay(val)
        },
        { name: "groupId", label: "الوقت المتاح", type: "select", options: availableTimes },
        { name: "achievement", label: "الإنجازات", type: "textarea" },
        { name: "moreInfo", label: "ملاحظات إضافية", type: "textarea" },
    ];

    const openWhatsApp = () => {
        if (!phone) return;
        const digits = phone.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${digits}`;
        window.open(url, "_blank");
    };

    return (
        <div className="space-y-6">
            <DashboardSectionCard title="تفاصيل الطالب" description="عرض كافة المعلومات الدراسية والارتباطات">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4 bg-card p-6 rounded-xl border w-full md:w-auto">
                        <Avatar className="h-32 w-32 border-4 border-primary/10">
                            <AvatarImage src={student.image || ""} />
                            <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">{student.name}</h2>
                            <Badge variant="secondary" className="mt-2">{student.age || "?"} سنة</Badge>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setEditDialogOpen(true)}>
                                <Edit className="h-4 w-4" />
                                تعديل البيانات
                            </Button>
                            <Button variant="destructive" size="sm" className="flex items-center gap-1" onClick={handleDelete}>
                                <Trash2 className="h-4 w-4" />
                                حذف الطالب
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
                        <PhoneCard
                            icon={Phone}
                            label="رقم الموبايل"
                            value={phone || "-"}
                            onWhatsApp={openWhatsApp}
                            onCopy={copyPhone}
                        />
                        <InfoCard icon={Users} label="المعلم" value={student.teacher?.name || "غير محدد"} />
                        <InfoCard icon={Book} label="المجموعة" value={groupDaysMap[student.group?.name || ""] || "غير محدد"} />
                        <InfoCard icon={Clock} label="الموعد" value={groupTimeMap[student.group?.time || ""] || "-"} />
                        {/* <InfoCard icon={Calendar} label="تاريخ التسجيل" value={new Date(student.createdAt).toLocaleDateString("ar-EG")} /> */}
                    </div>
                </div>
            </DashboardSectionCard>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            الإنجازات والملاحظات
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                            <h4 className="font-bold text-lg text-primary">الإنجازات:</h4>
                            <div className="p-4 rounded-lg bg-accent/20 border min-h-[100px]">
                                {student.achievement || "لا توجد إنجازات مسجلة حالياً"}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-lg text-primary">ملاحظات إضافية:</h4>
                            <div className="p-4 rounded-lg bg-accent/20 border min-h-[100px]">
                                {student.moreInfo || "لا توجد ملاحظات"}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DynamicFormDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                title="تعديل بيانات الطالب"
                fields={studentFields}
                initialData={student}
                onSubmit={handleUpdate}
                isLoading={updateMutation.isPending}
                mode="edit"
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
                onConfirm={confirmDelete}
                title="حذف الطالب"
                description={`هل أنت متأكد من حذف الطالب ${student.name}؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                variant="destructive"
                isLoading={deleteMutation.isPending}
            />
        </div >
    );
}

function InfoCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}

function PhoneCard({
    icon: Icon,
    label,
    value,
    onWhatsApp,
    onCopy,
}: {
    icon: any;
    label: string;
    value: string;
    onWhatsApp: () => void;
    onCopy: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3 p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium" dir="ltr">{value}</p>
                </div>
            </div>
            {value !== "-" && (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={onWhatsApp} title="فتح في واتساب">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={onCopy} title="نسخ الرقم">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}

