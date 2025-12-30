"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Lock, Mail, Phone, Hash, ChevronRight } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const AuthPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const [isLogin, setIsLogin] = useState(true);

    // Login State
    const [loginData, setLoginData] = useState({ username: "", password: "" });

    // Register State
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        code: "",
    });

    const loginMutation = useLogin();
    const registerMutation = useRegister();

    const isLoading = loginMutation.isPending || registerMutation.isPending;

    // Handle Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(loginData, {
            onSuccess: () => {
                toast({ title: "تم تسجيل الدخول", description: "مرحباً بك مجدداً!" });
                router.push(callbackUrl);
                router.refresh();
            },
            onError: (error: any) => {
                toast({
                    title: "خطأ في الدخول",
                    description: error.message || "تأكد من البيانات وحاول مرة أخرى",
                    variant: "destructive",
                });
            },
        });
    };

    // Handle Register
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate(registerData, {
            onSuccess: () => {
                toast({
                    title: "تم إنشاء الحساب",
                    description: "يمكنك الآن تسجيل الدخول بحسابك الجديد",
                });
                setIsLogin(true);
            },
            onError: (error: any) => {
                toast({
                    title: "خطأ في التسجيل",
                    description: error.message || "تأكد من الكود والبيانات",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-secondary/10 p-4 overflow-hidden relative">
            {/* Decorative Blur Spheres */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse" />

            <Card className="w-full max-w-md backdrop-blur-sm bg-background/80 border-primary/10 shadow-2xl relative z-10 transition-all duration-500">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 rotate-3 hover:rotate-0 transition-transform duration-300">
                        <span className="text-3xl font-bold text-primary">D</span>
                    </div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight">
                        {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
                    </CardTitle>
                    <CardDescription className="text-base">
                        {isLogin ? "أهلاً بك في دار الإحسان" : "انضم إلى أسرة دار الإحسان"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        {isLogin ? (
                            // Login Form
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-username">اسم المستخدم أو البريد</Label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-username"
                                            placeholder="username / email"
                                            className="pr-10 h-12"
                                            value={loginData.username}
                                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="login-password">كلمة المرور</Label>
                                        <Button variant="link" className="p-0 h-auto text-xs" type="button">نسيت كلمة المرور؟</Button>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pr-10 h-12"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "دخول"}
                                </Button>
                            </form>
                        ) : (
                            // Register Form
                            <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <Label htmlFor="reg-name">الاسم الكامل</Label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="reg-name"
                                            placeholder="الاسم الحقيقي"
                                            className="pr-10 h-11"
                                            value={registerData.name}
                                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-username">اسم المستخدم</Label>
                                    <Input
                                        id="reg-username"
                                        placeholder="username"
                                        className="h-11"
                                        value={registerData.username}
                                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-code">كود الدعوة</Label>
                                    <div className="relative">
                                        <Hash className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="reg-code"
                                            placeholder="STU123"
                                            className="pr-10 h-11 uppercase"
                                            value={registerData.code}
                                            onChange={(e) => setRegisterData({ ...registerData, code: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <Label htmlFor="reg-password">كلمة المرور</Label>
                                    <Input
                                        id="reg-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-11"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-email">البريد (اختياري)</Label>
                                    <Input
                                        id="reg-email"
                                        type="email"
                                        placeholder="mail@example.com"
                                        className="h-11"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-phone">رقم الهاتف (اختياري)</Label>
                                    <Input
                                        id="reg-phone"
                                        placeholder="01xxxxxxxxx"
                                        className="h-11"
                                        value={registerData.phone}
                                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" className="col-span-2 h-12 text-base font-semibold mt-2" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "إنشاء الحساب"}
                                </Button>
                            </form>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 border-t pt-6">
                    <div className="text-sm text-center text-muted-foreground">
                        {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                        <Button
                            variant="link"
                            className="px-2 font-bold text-primary"
                            onClick={() => setIsLogin(!isLogin)}
                            disabled={isLoading}
                        >
                            {isLogin ? "سجل الآن" : "سجل دخولك"}
                        </Button>
                    </div>

                    <div className="text-[10px] text-center text-muted-foreground opacity-50 uppercase tracking-widest">
                        Dar Al-Ihsan Authentication System v2.0
                    </div>
                </CardFooter>
            </Card>

            {/* Side Brand Text (Desktop) */}
            <div className="hidden lg:flex absolute right-16 bottom-16 flex-col items-end text-primary opacity-20 pointer-events-none">
                <h2 className="text-8xl font-black">دار الإحسان</h2>
                <p className="text-xl font-bold tracking-widest">DAR AL-IHSAN QURAN ACADEMY</p>
            </div>
        </div>
    );
};

const AuthPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-secondary/10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <AuthPageContent />
        </Suspense>
    );
};

export default AuthPage;

