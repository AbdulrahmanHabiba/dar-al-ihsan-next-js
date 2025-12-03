"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { News } from "@/types/news";
import { Calendar, Heart, User } from "lucide-react";
import Image from "next/image";
import NewsSliderSkeleton from "./NewsSliderSkeleton";
import { useNews } from "@/hooks/useNews";
import Link from "next/link";
import { Button } from "../ui/button";


interface NewsSliderProps {
  initialNews?: News[];
}

// const newsItems = [
//   {
//     id: 1,
//     title: "تكريم الطلاب المتفوقين في حفظ القرآن الكريم",
//     description: "تم تكريم مجموعة من الطلاب المتفوقين الذين أتموا حفظ القرآن الكريم كاملاً بتجويد متقن",
//     date: "2024-03-15",
//     image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop"
//   },
//   {
//     id: 2,
//     title: "بدء التسجيل للفصل الدراسي الجديد",
//     description: "فتح باب التسجيل للطلاب الجدد في جميع المستويات، مع توفير منح دراسية للمتفوقين",
//     date: "2024-03-10",
//     image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop"
//   },

//   {
//     id: 4,
//     title: "مسابقة حفظ القرآن الكريم السنوية",
//     description: "إطلاق المسابقة السنوية لحفظ القرآن الكريم بجوائز قيمة للفائزين",
//     date: "2024-02-28",
//     image: "https://images.unsplash.com/photo-1575645513913-c002ea3b2e01?q=80&w=773"
//   },
//   {
//     id: 3,
//     title: "محاضرة خاصة في علم التجويد",
//     description: "أقيمت محاضرة قيمة في أحكام التجويد بحضور فضيلة الشيخ أحمد مرعي",
//     date: "2024-03-05",
//     image: "https://plus.unsplash.com/premium_photo-1676929222702-ebbb3aeca4e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4N3x8fGVufDB8fHx8fA%3D%3D"
//   }
// ];


const NewsSlider = ({initialNews}:NewsSliderProps) => {
    const { data: news, isLoading } = useNews(initialNews);
    if (isLoading) {
      return <NewsSliderSkeleton />;
    }
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container">
        <div className="text-center mb-12 animate-slideUp">
          <h2 className="text-4xl font-bold mb-4">آخر الأخبار</h2>
          <p className="text-muted-foreground text-lg">
            تابع أحدث الفعاليات والأنشطة في دار الإحسان
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {news.map((item) => (
              <CarouselItem
                key={item.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Link href="/magazine">
                  <Card className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 h-full group">
                    {/* Image */}
                    <div className="aspect-video overflow-hidden relative">
                      <Image
                        src={item.images[0] || "/news-image.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Likes Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        <span className="text-sm font-semibold">
                          {item.likes}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Publisher Badge */}
                      {item.publisher && (
                        <Badge variant="secondary" className="mb-3">
                          <User className="h-3 w-3 ml-1" />
                          {item.publisher}
                        </Badge>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={item.createdAt}>
                          {new Date(item.createdAt).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-auto left-4" />
          <CarouselNext className="left-auto right-4" />
        </Carousel>

        {/* View All Button */}
        <div className="text-center mt-8">
        <Button size="lg" variant="outline" asChild className="text-lg">
              
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2"
          >
            عرض جميع الأخبار
            <span>←</span>
          </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


export default NewsSlider;

