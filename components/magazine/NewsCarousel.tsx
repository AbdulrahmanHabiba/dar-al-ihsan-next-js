import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    images: string[] | null;
    video_url: string | null;
    date: string;
    content: string | null;
}

interface NewsCarouselProps {
    news: NewsItem;
}

export const NewsCarousel = ({ news }: NewsCarouselProps) => {
    const mediaItems = [];

    if (news.video_url) {
        mediaItems.push({ type: "video", url: news.video_url });
    }

    if (news.images && news.images.length > 0) {
        news.images.forEach(img => {
            mediaItems.push({ type: "image", url: img });
        });
    }

    const hasMultipleMedia = mediaItems.length > 1;

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {news.title}
                        </h2>
                        <p className="text-white/90 text-sm md:text-base">
                            {news.description}
                        </p>
                    </div>

                    {hasMultipleMedia ? (
                        <Carousel className="w-full">
                            <CarouselContent>
                                {mediaItems.map((item, index) => (
                                    <CarouselItem key={index}>
                                        {item.type === "video" ? (
                                            <div className="aspect-video bg-black">
                                                <iframe
                                                    src={item.url}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-muted relative">
                                                <Image
                                                    src={item.url}
                                                    alt={`${news.title} - ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                                />
                                            </div>
                                        )}
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>
                    ) : mediaItems.length === 1 ? (
                        mediaItems[0].type === "video" ? (
                            <div className="aspect-video bg-black">
                                <iframe
                                    src={mediaItems[0].url}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <div className="aspect-video bg-muted relative">
                                <Image
                                    src={mediaItems[0].url}
                                    alt={news.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                            </div>
                        )
                    ) : (
                        <div className="aspect-video bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">لا توجد وسائط</p>
                        </div>
                    )}
                </div>

                {news.content && (
                    <div className="p-6">
                        <div className="prose prose-sm md:prose-base max-w-none" dir="rtl">
                            {news.content}
                        </div>
                    </div>
                )}

                <div className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground">
                        {new Date(news.date).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
