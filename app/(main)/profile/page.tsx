"use client";

import { useMe, useLogout, Role } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Shield, GraduationCap, Presentation, LayoutDashboard, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user, isLoggedIn, isAdmin, isTeacher, isStudent, isLoading } = useMe();
    const logoutMutation = useLogout();
    const router = useRouter();
    const [invitationCode, setInvitationCode] = useState("");

    if (isLoading) {
        return (
            <div className="container py-20 flex justify-center">
                <div className="animate-pulse text-primary">جاري التحميل...</div>
            </div>
        );
    }

    if (!isLoggedIn || !user) {
        router.push("/auth");
        return null;
    }

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        router.push("/");
    };

    const handleApplyCode = () => {
        if (!invitationCode) return;
        toast.success("سيتم التحقق من الكود وتفعيل حسابك قريباً");
    };

    const getRoleBadge = () => {
        switch (user.role) {
            case Role.SUPER_ADMIN: return { label: "مدير النظام", icon: Shield, color: "text-red-600 bg-red-50" };
            case Role.ADMIN: return { label: "مشرف", icon: Shield, color: "text-blue-600 bg-blue-50" };
            case Role.TEACHER: return { label: "معلم", icon: Presentation, color: "text-green-600 bg-green-50" };
            case Role.STUDENT: return { label: "طالب", icon: GraduationCap, color: "text-amber-600 bg-amber-50" };
            default: return { label: "مستخدم", icon: User, color: "text-gray-600 bg-gray-50" };
        }
    };

    const badge = getRoleBadge();

    return (
        <div className="container py-10 md:py-20 max-w-4xl">
            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                {/* Sidebar / Stats */}
                <div className="space-y-6">
                    <Card className="overflow-hidden border-none shadow-elegant">
                        <div className="h-24 bg-gradient-primary" />
                        <div className="px-6 pb-6 text-center">
                            <div className="relative -mt-12 mb-4 inline-block">
                                <div className="h-24 w-24 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md">
                                    <User className="h-12 w-12 text-muted-foreground" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold">{user.name || "بدون اسم"}</h2>
                            <p className="text-sm text-muted-foreground">@{user.username || "---"}</p>

                            <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                                <badge.icon className="h-3 w-3" />
                                {badge.label}
                            </div>
                        </div>
                    </Card>

                    <Button
                        variant="destructive"
                        className="w-full gap-2 shadow-sm"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        تسجيل الخروج
                    </Button>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <Card className="border-none shadow-elegant">
                        <CardHeader>
                            <CardTitle>معلومات الحساب</CardTitle>
                            <CardDescription>إدارة بياناتك الشخصية وصلاحياتك</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">الاسم الكامل</span>
                                    <p className="font-medium">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">اسم المستخدم</span>
                                    <p className="font-medium">{user.username}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">البريد الإلكتروني</span>
                                    <p className="font-medium">{user.email || "---"}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">نوع الحساب</span>
                                    <p className="font-medium">{badge.label}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Cards for Specific Roles */}
                    {(isAdmin || isTeacher) && (
                        <Card className="border-none shadow-elegant bg-primary/5 border-r-4 border-r-primary">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <LayoutDashboard className="h-5 w-5 text-primary" />
                                    لوحة التحكم
                                </CardTitle>
                                <CardDescription>لديك صلاحيات للوصول إلى لوحة الإدارة</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    className="gap-2"
                                    onClick={() => router.push(isTeacher && !isAdmin ? "/dashboard/teachers" : "/dashboard")}
                                >
                                    الذهاب للوحة التحكم
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Temporary/No record users can enter code here */}
                    {(!isStudent && !isTeacher && !isAdmin) && (
                        <Card className="border-none shadow-elegant bg-amber-50 border-r-4 border-r-amber-500">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2 text-amber-700">
                                    <Key className="h-5 w-5" />
                                    إكمال التسجيل
                                </CardTitle>
                                <CardDescription className="text-amber-600/80">
                                    أدخل كود الدعوة الممنوح لك من إدارة الدار لربط حسابك كطالب أو معلم.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="أدخل كود الدعوة هنا..."
                                        className="border-amber-200 focus-visible:ring-amber-500"
                                        value={invitationCode}
                                        onChange={(e) => setInvitationCode(e.target.value)}
                                    />
                                    <Button
                                        className="bg-amber-600 hover:bg-amber-700 shadow-sm"
                                        onClick={handleApplyCode}
                                    >
                                        تفعيل الحساب
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
