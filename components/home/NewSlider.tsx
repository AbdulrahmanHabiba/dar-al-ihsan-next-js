"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { News } from "@/types/news";
import { useNews, useUpdateLikes } from "@/hooks/useNews";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, ArrowLeft,  ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewSliderProps {
    initialData: News[];
}

export default function NewSlider({ initialData }: NewSliderProps) {
    const { data: news = initialData, isLoading } = useNews(initialData);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        direction: "rtl",
        loop: true,
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 2 },
            "(min-width: 1024px)": { slidesToScroll: 3 },
        },
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const publishedNews = news
        .filter((n) => n.published)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (isLoading && !news.length) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (publishedNews.length === 0) return null;

    return (
        <div className="relative group/slider">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 rtl:-mr-4">
                    {publishedNews.map((item) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_100%] min-w-0 pl-4 rtl:pr-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                        >
                            <NewsCard item={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 flex-col sm:flex-row sm:justify-between mt-8">
                <div className="flex gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                selectedIndex === index ? "w-8 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                            )}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-3 ">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className="rounded-full border-2 hover:bg-primary hover:text-secondary transition-all duration-300 shadow-sm"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className="rounded-full border-2 hover:bg-primary hover:text-secondary transition-all duration-300 shadow-sm"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <Button variant="ghost" asChild className="group text-primary hover:text-primary hover:bg-primary/5">
                    <Link href="/magazine" className="flex items-center gap-2 font-bold text-lg">
                        عرض كل الأخبار والفعاليات
                        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

function NewsCard({ item }: { item: News }) {
    const updateLikes = useUpdateLikes(item.id);
    const [isLiked, setIsLiked] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = isLiked ? -1 : 1;
        updateLikes.mutate(delta);
        setIsLiked(!isLiked);
    };

    return (
        <Card className="h-full overflow-hidden border-none shadow-elegant hover:shadow-glow transition-all duration-500 group bg-card/50 backdrop-blur-sm rounded-2xl flex flex-col relative">
            {/* Link overlay for the whole card area (below the like button) */}
            <Link href={`/magazine`} className="absolute inset-0 z-10" aria-label={item.title} />

            <div className="aspect-[16/10] overflow-hidden relative">
                <Image
                    src={item.images[0] || "/news-image.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Like Button - Above the Link overlay */}
                <div className="absolute top-4 right-4 z-20">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={cn(
                            "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black rounded-full gap-1.5 px-3",
                            isLiked && "text-red-500 bg-white"
                        )}
                    >
                        <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                        <span className="font-bold">{item.likes}</span>
                    </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                    <Badge className="bg-primary/90 text-primary-foreground border-none px-3 py-1 mb-2">
                        {item.publisher || "دار الإحسان"}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-6 flex flex-col flex-1 relative z-20 pointer-events-none">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary/60" />
                        {mounted ? new Date(item.createdAt).toLocaleDateString("ar-EG", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }) : null}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {item.title}
                </h3>

                {item.description &&
                    <div
                        className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                }

                <div className="flex items-center font-bold text-sm gap-2 mt-auto">
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 hover:text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}
