"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, User, Play } from "lucide-react";
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
    <Card className="overflow-hidden shadow-elegant">
      {/* Main Image/Video */}
      <div className="relative aspect-video bg-muted">
        {news.videoUrl ? (
          <div className="relative w-full h-full">
            <video
              src={news.videoUrl}
              controls
              className="w-full h-full object-cover"
              poster={news.images[0] || "/news-image.jpg"}
            />
          </div>
        ) : (
          <Image
            src={news.images[selectedImageIndex] || "/news-image.jpg"}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Like Button */}
        <Button
          onClick={handleLike}
          disabled={isPending}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white gap-2"
          variant="ghost"
          size="sm"
        >
          <Heart
            className={`h-5 w-5 ${
              isPending ? "animate-pulse" : ""
            } fill-red-500 text-red-500`}
          />
          <span className="font-semibold !text-black dark:!text-black">{news.likes}</span>
        </Button>
      </div>

      {/* Thumbnails */}
      {news.images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto bg-muted/50">
          {news.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-primary scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
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
              onClick={() => setSelectedImageIndex(-1)} // -1 للـ video
              className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent bg-black/50 flex items-center justify-center hover:bg-black/70 transition-all"
            >
              <Play className="h-8 w-8 text-white" />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <CardContent className="p-6 space-y-4">
        {/* Publisher & Date */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          {news.publisher && (
            <Badge variant="secondary" className="text-sm">
              <User className="h-4 w-4 ml-1" />
              {news.publisher}
            </Badge>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={news.createdAt}>
              {new Date(news.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </time>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {news.title}
        </h1>

        {/* Description */}
        {news.description && (
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="whitespace-pre-wrap leading-relaxed">
              {news.description}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="border-t pt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>آخر تحديث: {new Date(news.updatedAt).toLocaleDateString("ar-EG")}</span>
          <Badge variant={news.published ? "default" : "secondary"}>
            {news.published ? "منشور" : "مسودة"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}