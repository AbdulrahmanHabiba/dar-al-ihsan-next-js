"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar } from "lucide-react";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "تكريم الطلاب المتفوقين في حفظ القرآن الكريم",
    description: "تم تكريم مجموعة من الطلاب المتفوقين الذين أتموا حفظ القرآن الكريم كاملاً بتجويد متقن",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "بدء التسجيل للفصل الدراسي الجديد",
    description: "فتح باب التسجيل للطلاب الجدد في جميع المستويات، مع توفير منح دراسية للمتفوقين",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop"
  },

  {
    id: 4,
    title: "مسابقة حفظ القرآن الكريم السنوية",
    description: "إطلاق المسابقة السنوية لحفظ القرآن الكريم بجوائز قيمة للفائزين",
    date: "2024-02-28",
    image: "https://images.unsplash.com/photo-1575645513913-c002ea3b2e01?q=80&w=773"
  },
  {
    id: 3,
    title: "محاضرة خاصة في علم التجويد",
    description: "أقيمت محاضرة قيمة في أحكام التجويد بحضور فضيلة الشيخ أحمد مرعي",
    date: "2024-03-05",
    image: "https://plus.unsplash.com/premium_photo-1676929222702-ebbb3aeca4e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4N3x8fGVufDB8fHx8fA%3D%3D"
  }
];
/*
https://plus.unsplash.com/premium_photo-1677013623482-6d71ca2dc71a?q=80&w=870&auto=format&fit=crop
https://plus.unsplash.com/premium_photo-1677621745797-8dd5dc467dd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D
https://plus.unsplash.com/premium_photo-1677523779672-7d70e51dd87e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D
https://plus.unsplash.com/premium_photo-1726783516178-f82051b4f481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D
https://plus.unsplash.com/premium_photo-1750360904392-74edd7829381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D
https://plus.unsplash.com/premium_photo-1678558710021-fde5127866fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D
https://plus.unsplash.com/premium_photo-1678580371526-9c5938ad11ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8
https://plus.unsplash.com/premium_photo-1678559552200-aa9d8485b94b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8
https://plus.unsplash.com/premium_photo-1677015055409-422f5c2c1d95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8
https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDk5fHx8ZW58MHx8fHx8
https://plus.unsplash.com/premium_photo-1678652915205-7ff6449ce78b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyMHx8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1678559129864-8307ef614d4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzNXx8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1679412451975-866e51d7d9fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0NHx8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1677699514992-05511883de1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0NXx8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1677621879474-4578b626d624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0N3x8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1676925807937-c03f50a25b94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1OXx8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1676929358446-2b98a564ab06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2N3x8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1677621745874-aa00c3d1042d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4Nnx8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1676929222702-ebbb3aeca4e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4N3x8fGVufDB8fHx8fA%3D%3D
https://plus.unsplash.com/premium_photo-1677699514988-9d380fb9b463?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5Mnx8fGVufDB8fHx8fA%3D%3D

//studets
https://plus.unsplash.com/premium_photo-1678559460700-8a1d42ce8239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltJTIwbWFufGVufDB8fDB8fHww
https://images.unsplash.com/photo-1648593470206-64f8690efeff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG11c2xpbSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D

// woman teacher
https://plus.unsplash.com/premium_photo-1738776254643-b853838818bf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

 */

const NewsSlider = () => {
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
            {newsItems.map((news) => (
              <CarouselItem key={news.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={news.date}>
                        {new Date(news.date).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{news.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-auto left-4" />
          <CarouselNext className="left-auto right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsSlider;