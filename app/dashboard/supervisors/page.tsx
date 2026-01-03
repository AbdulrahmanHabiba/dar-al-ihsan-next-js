"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Loader2, ShieldCheck, User as UserIcon, Mail,
    Phone, Calendar, Trash2, Info,
    ArrowRight, Edit
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Role } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SupervisorInfo {
    id: number;
    username: string;
    name: string;
    email: string | null;
    phone: string | null;
    role: Role;
    createdAt: string;
    supervisor?: {
        adminLevel: string;
        workDays: string[];
    } | null;
}

const SupervisorsPage = () => {
    const queryClient = useQueryClient();
    const [editingSup, setEditingSup] = useState<SupervisorInfo | null>(null);

    const { data: supervisors, isLoading, error } = useQuery<SupervisorInfo[]>({
        queryKey: ["adminSupervisors"],
        queryFn: () => apiClient<SupervisorInfo[]>("/api/admin/supervisors"),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) =>
            apiClient(`/api/admin/users/${id}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminSupervisors"] });
            toast.success("تم حذف المستخدم بنجاح");
        },
        onError: () => toast.error("فشل في حذف المستخدم"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: any }) =>
            apiClient(`/api/admin/users/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminSupervisors"] });
            toast.success("تم التحديث بنجاح");
            setEditingSup(null);
        },
        onError: () => toast.error("فشل التحديث"),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="mr-3 text-lg font-medium">جاري تحميل قائمة المشرفين...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center text-destructive">
                <p className="font-bold">حدث خطأ أثناء تحميل البيانات</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Guide Card */}
            <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-full text-primary">
                            <Info className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-primary mb-1">كيفية إضافة مشرف جديد؟</h3>
                            <p className="text-sm text-balance">
                                لإضافة مشرف جديد، يجب أولاً إنشاء حساب له في قسم
                                <strong> "إدارة المستخدمين" </strong>
                                ثم ترقيته باختيار دور "مشرف" أو "مدير نظام".
                            </p>
                            <Button asChild variant="link" className="px-0 h-auto mt-2 text-primary font-bold">
                                <Link href="/dashboard/users" className="flex items-center gap-1">
                                    انتقل لإدارة المستخدمين لإضافة عضو جديد
                                    <ArrowRight className="h-4 w-4 rotate-180" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center bg-background/50 p-6 rounded-2xl border backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">إدارة المشرفين</h1>
                        <p className="text-muted-foreground">عرض بيانات المشرفين ومديري النظام والتحكم فيها</p>
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-elegant overflow-hidden">
                <CardHeader className="bg-muted/30 border-b text-right">
                    <CardTitle className="text-lg flex items-center justify-end gap-2">
                        قائمة الهيئة الإدارية ({supervisors?.length || 0})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="text-right">المشرف</TableHead>
                                <TableHead className="text-right">التواصل</TableHead>
                                <TableHead className="text-right">المستوى</TableHead>
                                <TableHead className="text-right">تاريخ الانضمام</TableHead>
                                <TableHead className="text-center">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supervisors?.map((sup) => (
                                <TableRow key={sup.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xs">
                                                {(sup.name || sup.username).charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm leading-none mb-1 text-right">{sup.name || "بدون اسم"}</p>
                                                <p className="text-xs text-muted-foreground text-right" dir="ltr">@{sup.username}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {sup.email && (
                                                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                    <Mail className="h-3 w-3" />
                                                    {sup.email}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={sup.role === Role.SUPER_ADMIN ? "destructive" : "default"}
                                            className="px-2 py-0 h-5"
                                        >
                                            {sup.role === Role.SUPER_ADMIN ? "مدير نظام" : "مشرف"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-[11px] text-muted-foreground whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {format(new Date(sup.createdAt), "PPP", { locale: ar })}
                                            <Calendar className="h-3 w-3" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600"
                                                onClick={() => setEditingSup(sup)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => {
                                                    if (confirm("هل أنت متأكد من حذف هذا المشرف؟")) {
                                                        deleteMutation.mutate(sup.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!editingSup} onOpenChange={(open) => !open && setEditingSup(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>تعديل بيانات المشرف</DialogTitle>
                        <DialogDescription>تحديث بيانات المشرف @{editingSup?.username}</DialogDescription>
                    </DialogHeader>
                    {editingSup && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">الاسم الكامل</label>
                                <Input
                                    value={editingSup.name || ""}
                                    onChange={(e) => setEditingSup({ ...editingSup, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">البريد الإلكتروني</label>
                                <Input
                                    value={editingSup.email || ""}
                                    onChange={(e) => setEditingSup({ ...editingSup, email: e.target.value })}
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">الرتبة / الدور</label>
                                <select
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    value={editingSup.role}
                                    onChange={(e) => setEditingSup({ ...editingSup, role: e.target.value as Role })}
                                >
                                    <option value={Role.ADMIN}>مشرف</option>
                                    <option value={Role.SUPER_ADMIN}>مدير نظام</option>
                                    <option value={Role.TEACHER}>معلم</option>
                                    <option value={Role.STUDENT}>طالب (عضو)</option>
                                </select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingSup(null)}>إلغاء</Button>
                        <Button
                            onClick={() => {
                                if (editingSup) {
                                    updateMutation.mutate({
                                        id: editingSup.id,
                                        data: {
                                            name: editingSup.name,
                                            email: editingSup.email,
                                            role: editingSup.role
                                        }
                                    });
                                }
                            }}
                            disabled={updateMutation.isPending}
                        >
                            حفظ التغييرات
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SupervisorsPage;
