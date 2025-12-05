import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Users, GraduationCap, MessageSquare, BookOpen, TrendingUp } from "lucide-react";

  const stats = [
  { title: "الأخبار المنشورة", value: "24", icon: Newspaper, description: "آخر تحديث اليوم", color: "text-blue-500" },
  { title: "المعلمين", value: "12", icon: Users, description: "معلم نشط", color: "text-green-500" },
  { title: "الخريجين", value: "156", icon: GraduationCap, description: "خريج هذا العام", color: "text-purple-500" },
  { title: "الشكاوي والاقتراحات", value: "8", icon: MessageSquare, description: "في انتظار المراجعة", color: "text-orange-500" },
  { title: "مقالات المجلة", value: "32", icon: BookOpen, description: "مقال منشور", color: "text-pink-500" },
  { title: "قصص النجاح", value: "18", icon: TrendingUp, description: "قصة ملهمة", color: "text-cyan-500" },
  ];

export default function DashboardStats() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">نظرة عامة</h2>
        <p className="text-muted-foreground">إحصائيات وبيانات الدار</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>آخر الأنشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="bg-primary/10 p-2 rounded-full"><Newspaper className="h-4 w-4 text-primary" /></div>
                <div className="flex-1"><p className="text-sm font-medium">تم نشر خبر جديد</p><p className="text-xs text-muted-foreground">منذ ساعتين</p></div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b ">
                <div className="bg-green-100 p-2 rounded-full"><GraduationCap className="h-4 w-4 text-green-600" /></div>
                <div className="flex-1"><p className="text-sm font-medium">تم إضافة 3 خريجين جدد</p><p className="text-xs text-muted-foreground">منذ 5 ساعات</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-full"><MessageSquare className="h-4 w-4 text-orange-600" /></div>
                <div className="flex-1"><p className="text-sm font-medium">شكوى جديدة تحتاج للمراجعة</p><p className="text-xs text-muted-foreground">منذ يوم واحد</p></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>إحصائيات الشهر</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between"><span className="text-sm">معدل النشر اليومي</span><span className="text-sm font-bold">2.4 خبر</span></div>
              <div className="flex items-center justify-between"><span className="text-sm">إجمالي الزوار</span><span className="text-sm font-bold">1,234</span></div>
              <div className="flex items-center justify-between"><span className="text-sm">معدل التفاعل</span><span className="text-sm font-bold">78%</span></div>
              <div className="flex items-center justify-between"><span className="text-sm">الشكاوي المحلولة</span><span className="text-sm font-bold">15 من 23</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
