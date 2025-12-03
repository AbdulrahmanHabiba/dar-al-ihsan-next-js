"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsDetailCard } from "@/components/magazine/NewsDetailCard";
import { FeaturedPersonCard } from "@/components/FeaturedPersonCard";
import { useNews } from "@/hooks/useNews";

export default function MagazinePage() {
  // Get all news
  const { data: allNews, isLoading: isLoadingAll } = useNews();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">مجلة دار الإحسان</h1>
        <p className="text-muted-foreground text-lg">
          تابع آخر الأخبار والفعاليات وتعرف على نجوم دار الإحسان
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="news">آخر الأخبار</TabsTrigger>
          <TabsTrigger value="student">طالب الشهر</TabsTrigger>
          <TabsTrigger value="students">الطلاب المميزون</TabsTrigger>
          <TabsTrigger value="teacher">معلم الشهر</TabsTrigger>
        </TabsList>

        {/* News Tab */}
        <TabsContent value="news">
          {isLoadingAll ? (
            <NewsGridSkeleton />
          ) : allNews && allNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {allNews.map((item) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedPersonCard
              name="محمد أحمد"
              info="معلمه: الشيخ عبدالله"
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
            />
          </div>
        </TabsContent>

        {/* Distinguished Students Tab */}
        <TabsContent value="students">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedPersonCard name="أحمد محمود" info="حافظ 10 أجزاء" />
            <FeaturedPersonCard name="خالد سعيد" info="حافظ 15 جزء" />
            <FeaturedPersonCard name="عمر يوسف" info="حافظ 20 جزء" />
          </div>
        </TabsContent>

        {/* Teacher of Month Tab */}
        <TabsContent value="teacher">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedPersonCard
              name="الشيخ عبدالله محمد"
              info="متخصص في التجويد"
              imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
            />
          </div>
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