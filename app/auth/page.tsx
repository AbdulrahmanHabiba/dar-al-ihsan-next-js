"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { login, isAuthenticated } from "@/lib/auth";

const Auth = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Check if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // ✅ Use login function
            const success = login(email, password);
            
            if (success) {
                toast({
                    title: "تم تسجيل الدخول بنجاح",
                    description: "جاري التوجيه إلى لوحة التحكم...",
                });
                router.push("/dashboard");
            } else {
                toast({
                    title: "خطأ في تسجيل الدخول",
                    description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
                    variant: "destructive",
                });
            }
        } catch (error: unknown) {
            toast({
                title: "خطأ",
                description: error instanceof Error ? error.message : "حدث خطأ ما",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement Google OAuth logic here
            toast({
                title: "قريباً",
                description: "سيتم إضافة تسجيل الدخول بجوجل قريباً",
            });
        } catch (error: unknown) {
            toast({
                title: "خطأ",
                description: error instanceof Error ? error.message : "حدث خطأ ما",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            toast({
                title: "خطأ",
                description: "الرجاء إدخال البريد الإلكتروني أولاً",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Implement password reset logic here
            toast({
                title: "تم الإرسال",
                description: "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني",
            });
        } catch (error: any) {
            toast({
                title: "خطأ",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">تسجيل الدخول</CardTitle>
                    <CardDescription>ادخل إلى لوحة التحكم</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            تسجيل الدخول
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">أو</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                    >
                        <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        تسجيل الدخول بجوجل
                    </Button>

                    {/* {!isSignUp && (
                        <Button
                            type="button"
                            variant="link"
                            className="w-full"
                            onClick={handleForgotPassword}
                            disabled={isLoading}
                        >
                            هل نسيت كلمة المرور؟
                        </Button>
                    )} */}

                    {/* <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setIsSignUp(!isSignUp)}
                        disabled={isLoading}
                    >
                        {isSignUp ? "لديك حساب؟ سجل دخول" : "ليس لديك حساب؟ سجل الآن"}
                    </Button> */}
                </CardContent>
            </Card>
        </div>
    );
};

export default Auth;
