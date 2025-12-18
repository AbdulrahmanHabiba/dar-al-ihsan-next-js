"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsDetailCard } from "@/components/magazine/NewsDetailCard";
import { FeaturedPersonCard } from "@/components/FeaturedPersonCard";
import { useNews } from "@/hooks/useNews";
import { useMagazine } from "@/hooks/useMagazine";

export default function MagazinePage() {
  // جلب الأخبار
  const { data: allNews, isLoading: isLoadingNews } = useNews();
  const publishedNews = allNews?.filter((news) => news.published === true);

  // جلب بيانات المجلة (طالب الشهر، معلم الشهر، إلخ)
  const { data: magazineItems = [], isLoading: isLoadingMag } = useMagazine();
  const publishedMag = magazineItems.filter(item => item.published);

  // تصفية البيانات حسب التصنيفات
  const studentOfMonth = publishedMag.filter(item => item.category === "STUDENT_OF_THE_MONTH");
  const teacherOfMonth = publishedMag.filter(item => item.category === "TEACHER_OF_THE_MONTH");

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-slideUp">
        <h1 className="text-4xl font-bold mb-4">مجلة دار الإحسان</h1>
        <p className="text-muted-foreground text-lg">
          تابع آخر الأخبار والفعاليات وتعرف على نجوم دار الإحسان
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 px-1 mx-1 text-sm bg-muted/50">
          <TabsTrigger value="news">آخر الأخبار</TabsTrigger>
          <TabsTrigger value="student">طالب الشهر</TabsTrigger>
          <TabsTrigger value="teacher">معلم الشهر</TabsTrigger>
        </TabsList>

        {/* News Tab */}
        <TabsContent value="news">
          {isLoadingNews ? (
            <NewsGridSkeleton />
          ) : publishedNews && publishedNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {publishedNews.map((item) => (
                <NewsDetailCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">لا توجد أخبار حالياً</p>
            </div>
          )}
        </TabsContent>

        {/* Student of Month Tab */}
        <TabsContent value="student">
          {isLoadingMag ? (
            <div className="py-12 text-center">جاري التحميل...</div>
          ) : studentOfMonth.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentOfMonth.map((item) => (
                <FeaturedPersonCard
                  key={item.id}
                  name={item.name}
                  info={item.month}
                  achievement={item.achievement}
                  imageUrl={item.image || undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">لا يوجد طلاب شهر مسجلون حالياً</p>
            </div>
          )}
        </TabsContent>

        {/* Teacher of Month Tab */}
        <TabsContent value="teacher">
          {isLoadingMag ? (
            <div className="py-12 text-center">جاري التحميل...</div>
          ) : teacherOfMonth.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherOfMonth.map((item) => (
                <FeaturedPersonCard
                  key={item.id}
                  name={item.name}
                  info={item.month}
                  achievement={item.achievement}
                  imageUrl={item.image || undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">لا يوجد معلمو شهر مسجلون حالياً</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Skeleton للـ Loading
function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border rounded-lg overflow-hidden shadow-elegant">
          <div className="aspect-video bg-muted animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            <div className="h-8 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
