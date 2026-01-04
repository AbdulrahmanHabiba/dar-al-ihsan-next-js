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
    Loader2, Users, Shield, User as UserIcon,
    Calendar, Power, MoreVertical, Edit,
    Trash2, ArrowUpCircle, CheckCircle2,
    Plus, Eye, Key
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Role } from "@/hooks/useAuth";

interface UserInfo {
    id: number;
    username: string;
    name: string;
    email: string | null;
    role: Role;
    isActive: boolean;
    createdAt: string;
    studentId?: number | null;
    teacherId?: number | null;
    supervisorId?: number | null;
    student?: { name: string } | null;
    teacher?: { name: string } | null;
    supervisor?: { name: string; username?: string } | null;
}

const UserManagementPage = () => {
    const queryClient = useQueryClient();
    const { isSuperAdmin } = useMe();
    const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
    const [viewingUser, setViewingUser] = useState<UserInfo | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role>(Role.STUDENT);

    const { data: users, isLoading, error } = useQuery<UserInfo[]>({
        queryKey: ["adminUsers"],
        queryFn: () => apiClient<UserInfo[]>("/api/admin/users"),
    });

    const { data: students = [] } = useQuery<any[]>({
        queryKey: ["allStudents"],
        queryFn: () => apiClient<any[]>("/api/students"),
    });

    const { data: teachers = [] } = useQuery<any[]>({
        queryKey: ["allTeachers"],
        queryFn: () => apiClient<any[]>("/api/teachers"),
    });

    const { data: supervisors = [] } = useQuery<any[]>({
        queryKey: ["adminSupervisors"],
        queryFn: () => apiClient<any[]>("/api/admin/supervisors"),
    });

    const resetPasswordMutation = useMutation({
        mutationFn: ({ id, password }: { id: number; password: string }) =>
            apiClient(`/api/admin/users/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ password })
            }),
        onSuccess: () => {
            toast.success("تم إعادة تعيين كلمة المرور بنجاح");
        },
        onError: () => toast.error("فشل إعادة تعيين كلمة المرور")
    });
    const createMutation = useMutation({
        mutationFn: (data: any) =>
            apiClient("/api/admin/users", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
            toast.success("تم إنشاء المستخدم بنجاح");
            setIsAddDialogOpen(false);
        },
        onError: (err: any) => toast.error(err.message || "فشل في إنشاء المستخدم"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<UserInfo> }) =>
            apiClient(`/api/admin/users/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
            toast.success("تم تحديث بيانات المستخدم بنجاح");
            setIsEditDialogOpen(false);
        },
        onError: () => toast.error("فشل في تحديث البيانات"),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) =>
            apiClient(`/api/admin/users/${id}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
            toast.success("تم حذف المستخدم بنجاح");
        },
        onError: () => toast.error("فشل في حذف المستخدم"),
    });

    const handlePromote = (user: UserInfo) => {
        let nextRole = user.role;
        if (user.role === Role.STUDENT) nextRole = Role.TEACHER;
        else if (user.role === Role.TEACHER) nextRole = Role.ADMIN;
        else if (user.role === Role.ADMIN) nextRole = Role.SUPER_ADMIN;
        else {
            toast.info("المستخدم لديه أعلى صلاحيات بالفعل");
            return;
        }

        updateMutation.mutate({ id: user.id, data: { role: nextRole } });
    };

    const handleToggleStatus = (user: UserInfo) => {
        updateMutation.mutate({ id: user.id, data: { isActive: !user.isActive } });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="mr-3 text-lg font-medium">جاري تحميل قائمة المستخدمين...</span>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50 p-6 rounded-2xl border backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">إدارة المستخدمين</h1>
                        <p className="text-muted-foreground">عرض والتحكم في جميع حسابات المستخدمين والترقيات</p>
                    </div>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            <span>إضافة مستخدم جديد</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>إنشاء حساب مستخدم جديد</DialogTitle>
                            <DialogDescription>أدخل بيانات الحساب الأساسية. سيتم إنشاء الحساب بكلمة مرور مشفرة.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            createMutation.mutate(Object.fromEntries(formData));
                        }} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <label className="text-sm font-medium text-right block">الاسم الكامل</label>
                                    <Input name="name" required placeholder="مثال: أحمد محمد" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <label className="text-sm font-medium text-right block">اسم المستخدم</label>
                                    <Input name="username" required placeholder="username" dir="ltr" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <label className="text-sm font-medium text-right block">كلمة المرور</label>
                                    <Input name="password" type="password" required placeholder="••••••••" dir="ltr" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <label className="text-sm font-medium text-right block">الوظيفة / الدور</label>
                                    <select
                                        name="role"
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                        defaultValue={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                                    >
                                        <option value={Role.STUDENT}>طالب (عضو)</option>
                                        <option value={Role.TEACHER}>معلم</option>
                                        <option value={Role.ADMIN}>مشرف</option>
                                        <option value={Role.SUPER_ADMIN}>مدير نظام</option>
                                    </select>
                                </div>
                            </div>

                            {/* Entity Linking */}
                            {selectedRole === Role.STUDENT && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-right block">ربط بطالب موجود (اختياري)</label>
                                    <select name="studentId" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                        <option value="">-- اختر الطالب --</option>
                                        {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                            )}

                            {selectedRole === Role.TEACHER && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-right block">ربط بمعلم موجود (اختياري)</label>
                                    <select name="teacherId" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                        <option value="">-- اختر المعلم --</option>
                                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                            )}

                            {(selectedRole === Role.ADMIN || selectedRole === Role.SUPER_ADMIN) && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-right block">ربط بمشرف موجود (اختياري)</label>
                                    <select name="supervisorId" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                        <option value="">-- اختر المشرف --</option>
                                        {supervisors.map(s => <option key={s.id} value={s.id}>{s.name || s.username}</option>)}
                                    </select>
                                </div>
                            )}
                            <DialogFooter className="pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
                                <Button type="submit" disabled={createMutation.isPending}>
                                    {createMutation.isPending ? "جاري الحفظ..." : "حفظ الحساب"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-none shadow-elegant overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                        قائمة الأعضاء ({users?.length || 0})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="text-right">المستخدم</TableHead>
                                <TableHead className="text-right">الرتبة</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right">التاريخ</TableHead>
                                <TableHead className="text-center">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm leading-none mb-1">{user.name}</p>
                                                <p className="text-xs text-muted-foreground" dir="ltr">@{user.username}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.role === Role.SUPER_ADMIN ? "destructive" : user.role === Role.ADMIN ? "default" : "secondary"}
                                            className="px-2 py-0 h-6 text-[10px] gap-1"
                                        >
                                            <Shield className="h-3 w-3" />
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`h-7 gap-1 px-2 ${user.isActive ? "text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-500" : "text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-500"}`}
                                            onClick={() => handleToggleStatus(user)}
                                        >
                                            <Power className="h-3 w-3" />
                                            <span className="text-[11px]">{user.isActive ? "نشط" : "معطل"}</span>
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-[11px] text-muted-foreground whitespace-nowrap">
                                        {format(new Date(user.createdAt), "PPP", { locale: ar })}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-emerald-600"
                                                onClick={() => setViewingUser(user)}
                                                title="عرض التفاصيل"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            {/* زر الترقية متاح فقط للسوبر أدمن */}
                                            {isSuperAdmin && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-amber-600"
                                                    onClick={() => handlePromote(user)}
                                                    title="ترقية الرتبة"
                                                >
                                                    <ArrowUpCircle className="h-4 w-4" />
                                                </Button>
                                            )}

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600"
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setIsEditDialogOpen(true);
                                                }}
                                                title="تعديل"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => {
                                                    if (confirm("هل أنت متأكد من حذف هذا المستخدم نهائياً؟")) {
                                                        deleteMutation.mutate(user.id);
                                                    }
                                                }}
                                                title="حذف"
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

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
                        <DialogDescription>
                            تحديث الاسم والبيانات الأساسية للمستخدم @{editingUser?.username}
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">الاسم الكامل</label>
                                <Input
                                    value={editingUser.name || ""}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                            </div>

                            {/* خيارات متقدمة للسوبر أدمن فقط */}
                            {isSuperAdmin && (
                                <>
                                    <div className="space-y-2 pt-2 border-t">
                                        <label className="text-sm font-bold text-destructive">تعديل الرتبة (مدير نظام فقط)</label>
                                        <select
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                            value={editingUser.role}
                                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as Role })}
                                        >
                                            <option value={Role.STUDENT}>طالب (عضو)</option>
                                            <option value={Role.TEACHER}>معلم</option>
                                            <option value={Role.ADMIN}>مشرف</option>
                                            <option value={Role.SUPER_ADMIN}>مدير نظام</option>
                                        </select>
                                    </div>

                                    {/* Entity Linking in Edit Mode */}
                                    {editingUser.role === Role.STUDENT && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">ربط بطالب موجود</label>
                                            <select 
                                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                                value={editingUser.studentId || ""}
                                                onChange={(e) => setEditingUser({ ...editingUser, studentId: e.target.value ? Number(e.target.value) : null })}
                                            >
                                                <option value="">-- بلا ربط --</option>
                                                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </select>
                                        </div>
                                    )}

                                    {editingUser.role === Role.TEACHER && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">ربط بمعلم موجود</label>
                                            <select 
                                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                                value={editingUser.teacherId || ""}
                                                onChange={(e) => setEditingUser({ ...editingUser, teacherId: e.target.value ? Number(e.target.value) : null })}
                                            >
                                                <option value="">-- بلا ربط --</option>
                                                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                            </select>
                                        </div>
                                    )}

                                    {(editingUser.role === Role.ADMIN || editingUser.role === Role.SUPER_ADMIN) && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">ربط بمشرف موجود</label>
                                            <select 
                                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                                value={editingUser.supervisorId || ""}
                                                onChange={(e) => setEditingUser({ ...editingUser, supervisorId: e.target.value ? Number(e.target.value) : null })}
                                            >
                                                <option value="">-- بلا ربط --</option>
                                                {supervisors.map(s => <option key={s.id} value={s.id}>{s.name || s.username}</option>)}
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
                        <Button
                            onClick={() => {
                                if (editingUser) {
                                    const updateData: any = { name: editingUser.name };
                                    if (isSuperAdmin) {
                                        updateData.role = editingUser.role;
                                        updateData.studentId = editingUser.studentId;
                                        updateData.teacherId = editingUser.teacherId;
                                        updateData.supervisorId = editingUser.supervisorId;
                                    }
                                    updateMutation.mutate({ id: editingUser.id, data: updateData });
                                }
                            }}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View User Details Dialog */}
            <Dialog open={!!viewingUser} onOpenChange={(open) => !open && setViewingUser(null)}>
                <DialogContent className="max-w-md h-full overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-primary" />
                            تفاصيل المستخدم
                        </DialogTitle>
                    </DialogHeader>
                    {viewingUser && (
                        <div className="space-y-6 py-4">
                            <div className="flex flex-col items-center gap-3 pb-6 border-b">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <UserIcon className="h-10 w-10 text-primary" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold">{viewingUser.name}</h3>
                                    <p className="text-sm text-muted-foreground" dir="ltr">@{viewingUser.username}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-3 rounded-lg bg-muted/30">
                                    <p className="text-muted-foreground mb-1">الرتبة</p>
                                    <p className="font-bold">{viewingUser.role}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/30">
                                    <p className="text-muted-foreground mb-1">الحالة</p>
                                    <p className={`font-bold ${viewingUser.isActive ? "text-green-600" : "text-red-500"}`}>
                                        {viewingUser.isActive ? "نشط" : "معطل"}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/30 col-span-2">
                                    <p className="text-muted-foreground mb-1">البريد الإلكتروني</p>
                                    <p className="font-bold">{viewingUser.email || "---"}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/30 col-span-2">
                                    <p className="text-muted-foreground mb-1">تاريخ الإنشاء</p>
                                    <p className="font-bold">{format(new Date(viewingUser.createdAt), "PPP p", { locale: ar })}</p>
                                </div>

                                {viewingUser.student && (
                                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 col-span-2">
                                        <p className="text-blue-600 mb-1">مرتبط بالطالب:</p>
                                        <p className="font-bold text-blue-900">{viewingUser.student.name}</p>
                                    </div>
                                )}
                                {viewingUser.teacher && (
                                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-100 col-span-2">
                                        <p className="text-purple-600 mb-1">مرتبط بالمعلم:</p>
                                        <p className="font-bold text-purple-900">{viewingUser.teacher.name}</p>
                                    </div>
                                )}
                                {viewingUser.supervisor && (
                                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 col-span-2">
                                        <p className="text-amber-600 mb-1">مرتبط بالمشرف:</p>
                                        <p className="font-bold text-amber-900">{viewingUser.supervisor.name || ""}</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t space-y-3">
                                <p className="text-sm font-bold flex items-center gap-2">
                                    <Key className="h-4 w-4" />
                                    إجراءات الأمان
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                    onClick={() => {
                                        const newPass = prompt("أدخل كلمة المرور الجديدة:");
                                        if (newPass && viewingUser) {
                                            resetPasswordMutation.mutate({ id: viewingUser.id, password: newPass });
                                        }
                                    }}
                                >
                                    إعادة تعيين كلمة المرور
                                </Button>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setViewingUser(null)}>إغلاق</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserManagementPage;
