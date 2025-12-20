"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, User, Play, Clock } from "lucide-react";
import Image from "next/image";
import { useUpdateLikes } from "@/hooks/useNews";
import type { News } from "@/types/news";

interface NewsDetailCardProps {
  news: News;
}

export function NewsDetailCard({ news }: NewsDetailCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { mutate: likeNews, isPending } = useUpdateLikes(news.id);

  const handleLike = () => {
    likeNews(1);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-elegant text-right border bg-card">
      {/* Main Image/Video Section */}
      <div className="relative aspect-video bg-muted overflow-hidden group/media">
        {news.videoUrl && selectedImageIndex === -1 ? (
          <div className="relative w-full h-full bg-black">
            <video
              src={news.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster={news.images[0] || "/news-image.jpg"}
            />
          </div>
        ) : (
          <Image
            src={news.images[selectedImageIndex] || "/news-image.jpg"}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-700 group-hover/media:scale-105"
            priority
          />
        )}

        {/* Like Button - Restored to Right and Original Style */}
        <Button
          onClick={handleLike}
          disabled={isPending}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white gap-2 shadow-sm border"
          variant="ghost"
          size="sm"
        >
          <Heart
            className={`h-5 w-5 ${isPending ? "animate-pulse" : ""
              } fill-red-500 text-red-500`}
          />
          <span className="font-bold !text-black dark:!text-black">{news.likes}</span>
        </Button>
      </div>

      {/* Gallery Thumbnails */}
      {(news.images.length > 1 || news.videoUrl) && (
        <div className="flex gap-3 p-4 overflow-x-auto bg-muted/50 scrollbar-hide border-y">
          {news.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === index
                ? "border-primary shadow-md scale-105"
                : "border-muted-foreground/20 opacity-60 hover:opacity-100 hover:scale-105"
                }`}
            >
              <Image
                src={image}
                alt={`${news.title} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
          {/* Video Thumbnail */}
          {news.videoUrl && (
            <button
              onClick={() => setSelectedImageIndex(-1)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-black/80 flex items-center justify-center hover:scale-105 ${selectedImageIndex === -1
                ? "border-primary shadow-md scale-105"
                : "border-muted-foreground/20 opacity-60 hover:opacity-100"
                }`}
            >
              <Play className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <CardContent className="p-8 flex-1 space-y-6">
        {/* Info Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <Calendar className="h-4 w-4 text-primary" />
            <time dateTime={news.createdAt}>
              {new Date(news.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {news.publisher && (
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary border-none">
              <User className="h-3.5 w-3.5 ml-1.5" />
              {news.publisher}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black leading-[1.2] text-foreground tracking-tight">
          {news.title}
        </h1>

        {/* Description */}
        {news.description && (
          <div
            className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        )}
      </CardContent>

      {/* Footer - Fixed at bottom */}
      <CardFooter className="mt-auto border-t border-border px-8 py-6 bg-muted/20">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
            <Clock className="h-3.5 w-3.5" />
            <span>آخر تحديث: {new Date(news.updatedAt).toLocaleDateString("ar-EG")}</span>
          </div>
          <Badge
            variant={news.published ? "default" : "secondary"}
            className={`px-4 py-1 rounded-lg ${news.published ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-none' : ''}`}
          >
            {news.published ? "منشور" : "مسودة"}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}