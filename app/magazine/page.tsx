"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import { supabase } from "@/integrations/supabase/client";
import { NewsCarousel } from "@/components/NewsCarousel";
import { FeaturedPersonCard } from "@/components/FeaturedPersonCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    images: string[] | null;
    video_url: string | null;
    date: string;
    content: string | null;
}

const Magazine = () => {
    const searchParams = useSearchParams();
    const newsId = searchParams.get("news");
    const [news, setNews] = useState<NewsItem[]>([]);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        if (newsId && news.length > 0) {
            const found = news.find(n => n.id === newsId);
            if (found) {
                setSelectedNews(found);
                // Scroll to news section
                setTimeout(() => {
                    document.getElementById("news-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [newsId, news]);

    const fetchNews = async () => {
        // const { data, error } = await supabase
        //   .from("news")
        //   .select("*")
        //   .eq("published", true)
        //   .order("date", { ascending: false });

        // if (error) {
        //   console.error("Error fetching news:", error);
        //   return;
        // }

        // setNews(data || []);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">مجلة دار الإحسان</h1>
                <p className="text-muted-foreground text-lg">
                    تابع آخر الأخبار والفعاليات وتعرف على نجوم دار الإحسان
                </p>
            </div>

            <Tabs defaultValue="news" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="news">آخر الأخبار</TabsTrigger>
                    <TabsTrigger value="student">طالب الشهر</TabsTrigger>
                    <TabsTrigger value="students">الطلاب المميزون</TabsTrigger>
                    <TabsTrigger value="teacher">معلم الشهر</TabsTrigger>
                </TabsList>

                <TabsContent value="news" id="news-section">
                    <div className="space-y-8">
                        {selectedNews ? (
                            <div className="mb-8">
                                <NewsCarousel news={selectedNews} />
                                <button
                                    onClick={() => setSelectedNews(null)}
                                    className="mt-4 text-primary hover:underline"
                                >
                                    ← العودة لجميع الأخبار
                                </button>
                            </div>
                        ) : (
                            news.map((item) => (
                                <div key={item.id} className="cursor-pointer" onClick={() => setSelectedNews(item)}>
                                    <NewsCarousel news={item} />
                                </div>
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="student">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeaturedPersonCard
                            name="محمد أحمد"
                            info="معلمه: الشيخ عبدالله"
                            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="students">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeaturedPersonCard
                            name="أحمد محمود"
                            info="حافظ 10 أجزاء"
                        />
                        <FeaturedPersonCard
                            name="خالد سعيد"
                            info="حافظ 15 جزء"
                        />
                        <FeaturedPersonCard
                            name="عمر يوسف"
                            info="حافظ 20 جزء"
                        />
                    </div>
                </TabsContent>

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
};

export default Magazine;
