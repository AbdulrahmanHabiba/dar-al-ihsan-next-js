"use client";

import { useTeachers, Teacher, useDeleteTeacher } from "@/hooks/useTeachers";
import { useParams, useRouter } from "next/navigation";
import { DashboardSectionCard } from "@/components/dashboard/DashboardSectionCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Mail, Book, Users, Clock, Calendar, MessageCircle, Copy, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudents } from "@/hooks/useStudents";
import { useGroups } from "@/hooks/useGroups";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { groupDaysMap, groupTimeMap } from "@/lib/constants";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useState } from "react";
import { DynamicFormDialog, FormFieldConfig } from "@/components/dashboard/DynamicFormDialog";
import { useUpdateTeacher } from "@/hooks/useTeachers";
import { useToast } from "@/hooks/use-toast";


export default function TeacherDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: teachers = [] } = useTeachers();
    const deleteMutation = useDeleteTeacher();
    const { data: allStudents = [] } = useStudents();
    const { data: allGroups = [] } = useGroups();
    const { toast } = useToast();

    const teacher = teachers.find(t => t.id === Number(id));
    const teacherStudents = allStudents.filter(s => s.teacherId === Number(id));
    const teacherGroups = allGroups.filter(g => g.teacherId === Number(id));

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const updateMutation = useUpdateTeacher(teacher?.id ?? 0);

    if (!teacher) return <div className="p-8 text-center">جاري التحميل أو المعلم غير موجود...</div>;

    const phone = teacher.phone || "";

    const openWhatsApp = () => {
        if (!phone) return;
        const digits = phone.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${digits}`;
        window.open(url, "_blank");
    };

    const copyPhone = async () => {
        if (!phone) return;
        try {
            await navigator.clipboard.writeText(phone);
            toast({
                title: "تم النسخ",
                description: "تم نسخ رقم المعلم إلى الحافظة.",
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

    const handleDelete = () => {
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!teacher) return;
        try {
            await deleteMutation.mutateAsync(teacher.id);
            router.push("/dashboard/teachers");
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdate = async (formData: any) => {
        try {
            await updateMutation.mutateAsync(formData);
            setEditDialogOpen(false);
            toast({ title: "تم التحديث", description: "تم تحديث بيانات المعلم بنجاح." });
        } catch (e) { console.error(e); }
    };

    const teacherFields: FormFieldConfig[] = [
        { name: "name", label: "الاسم", type: "text", required: true },
        { name: "gender", label: "النوع", type: "select", options: [{ label: "ذكر", value: "MALE" }, { label: "أنثى", value: "FEMALE" }] },
        { name: "phone", label: "رقم الموبايل", type: "text" },
        { name: "email", label: "البريد الإلكتروني", type: "text" },
        { name: "specialty", label: "التخصص", type: "text" },
    ];

    return (
        <div className="space-y-6">
            <DashboardSectionCard title="تفاصيل المعلم" description="عرض كافة المعلومات والطلاب المرتبطين">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4 bg-card p-6 rounded-xl border w-full md:w-auto">
                        <Avatar className="h-32 w-32 border-4 border-primary/10">
                            <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">{teacher.name}</h2>
                            <Badge variant="secondary" className="mt-2">{teacher.specialty || "تخصص غير محدد"}</Badge>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setEditDialogOpen(true)}>
                                <Edit className="h-4 w-4" />
                                تعديل البيانات
                            </Button>
                            <Button variant="destructive" size="sm" className="flex items-center gap-1" onClick={handleDelete}>
                                <Trash2 className="h-4 w-4" />
                                حذف المعلم
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
                        <InfoCard icon={Mail} label="البريد الإلكتروني" value={teacher.email || "-"} />
                        <InfoCard icon={Book} label="التخصص" value={teacher.specialty || "-"} />
                        {/* <InfoCard icon={Calendar} label="تاريخ الانضمام" value={new Date(teacher.createdAt as any).toLocaleDateString("ar-EG")} /> */}
                    </div>
                </div>
            </DashboardSectionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* مجموعات المعلم */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            مجموعات المعلم ({teacherGroups.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {teacherGroups.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">لا توجد مجموعات مسندة لهذا المعلم</p>
                            ) : (
                                teacherGroups.map(group => (
                                    <div key={group.id} className="flex items-center justify-between p-4 rounded-lg border bg-accent/30">
                                        <div>
                                            <p className="font-bold">{groupDaysMap[group.name] || group.name}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {groupTimeMap[group.time || ""] || group.time}
                                            </p>
                                        </div>
                                        <Badge variant="outline">{group._count?.students || 0} طالب</Badge>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* طلاب المعلم */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            طلاب المعلم ({teacherStudents.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {teacherStudents.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">لا يوجد طلاب مسجلين مع هذا المعلم</p>
                            ) : (
                                teacherStudents.map(student => (
                                    <div key={student.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={student.image || ""} />
                                            <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {groupDaysMap[student.group?.name || ""] || "بدون مجموعة"}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="text-[10px]">
                                            {groupTimeMap[student.group?.time || ""] || "-"}
                                        </Badge>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DynamicFormDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                title="تعديل بيانات المعلم"
                fields={teacherFields}
                initialData={teacher}
                onSubmit={handleUpdate}
                isLoading={updateMutation.isPending}
                mode="edit"
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
                onConfirm={confirmDelete}
                title="حذف المعلم"
                description={`هل أنت متأكد من حذف المعلم ${teacher.name}؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                variant="destructive"
                isLoading={deleteMutation.isPending}
            />
        </div>
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

