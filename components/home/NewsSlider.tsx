"use client";

import { useNews } from "@/hooks/useNews";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, Heart, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NewsSlider = () => {
  const { data: news = [], isLoading } = useNews();
  const publishedNews = news.filter(n => n.published && n.title && n.images?.length > 0).slice(0, 6);

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-video bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
    );
  }

  if (publishedNews.length === 0) return null;

  return (<>
     {/* <section className="bg-gradient-to-b from-background to-accent/20"> */}
        {/* <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl animate-slideRight">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              آخر الأخبار والفعاليات
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              ابقَ على اطلاع دائم بكل ما هو جديد في دار الإحسان، من تكريمات ومسابقات وفعاليات تعليمية متميزة.
            </p>
          </div>
     
        </div> */}

        <div className="relative">
          <Carousel
            // opts={{
            //   align: "start",
            //   loop: publishedNews.length > 3,
            // }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {publishedNews.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link href="/magazine">
                    <Card className="overflow-hidden border-none shadow-elegant hover:shadow-glow transition-all duration-500 group h-full bg-card/50 backdrop-blur-sm">
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <Image
                          src={item.images[0] || "/news-image.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-white/90 text-black border-none hover:bg-white flex items-center gap-1.5 px-3 py-1.5 shadow-lg">
                            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                            <span className="font-bold">{item.likes}</span>
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-7 relative">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-primary/60" />
                            {new Date(item.createdAt).toLocaleDateString("ar-EG", { day: 'numeric', month: 'long' })}
                          </div>
                          {item.publisher && (
                            <div className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-primary/60" />
                              {item.publisher}
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                          {item.title}
                        </h3>

                        <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* {publishedNews.length > 3 && (
              <div className="hidden md:flex justify-end gap-3 mt-8">
                <CarouselPrevious className="static h-12 w-12 border-2 bg-background hover:bg-primary hover:text-white transition-all duration-300 translate-x-0" />
                <CarouselNext className="static h-12 w-12 border-2 bg-background hover:bg-primary hover:text-white transition-all duration-300 translate-x-0" />
              </div>
            )} */}
          </Carousel>
        </div>
        <Button variant="ghost" asChild className="group text-primary hover:text-primary hover:bg-primary/5 animate-slideLeft w-[200px] mx-auto">
            <Link href="/magazine" className="flex items-center gap-2 font-bold text-lg">
              عرض كل الأخبار
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>

    {/* </section> */}
 </> );
};


export default NewsSlider;
