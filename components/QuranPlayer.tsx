"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Volume2,
    VolumeX,
    List,
    Loader2,
} from "lucide-react";

interface Radio {
    id: number;
    name: string;
    url: string;
    img: string;
}

const DEFAULT_RADIO: Radio = {
    id: 21,
    name: "تلاوات خاشعة",
    url: "https://backup.qurango.net/radio/salma;stream.mp3",
    img: "https://pbs.twimg.com/profile_images/1396812808659079169/5ft2haLD_400x400.jpg",
};

export const QuranPlayer = () => {
    const [radios, setRadios] = useState<Radio[]>([]);
    const [currentRadio, setCurrentRadio] = useState<Radio>(DEFAULT_RADIO);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetchRadios();

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    const fetchRadios = async () => {
        try {
            const response = await fetch("https://data-rosy.vercel.app/radio.json");
            const data = await response.json();
            setRadios(data.radios || []);
        } catch (error) {
            setRadios([DEFAULT_RADIO]);
        }
    };

    const togglePlay = async () => {
        setIsLoading(true);
        try {
            if (!audioRef.current || audioRef.current.src !== currentRadio.url) {
                // إنشاء audio element جديد أو تحديث الـ src
                if (audioRef.current) {
                    audioRef.current.pause();
                }
                audioRef.current = new Audio(currentRadio.url);
                audioRef.current.volume = isMuted ? 0 : volume / 100;

                // إضافة event listeners للأخطاء
                audioRef.current.addEventListener('error', () => {
                    setError("حدث خطأ أثناء تشغيل الصوت، اختر إذاعة أخرى");
                    setIsPlaying(false);
                    setIsLoading(false);
                });

                audioRef.current.addEventListener('ended', () => {
                    setIsPlaying(false);
                });

                audioRef.current.addEventListener('loadeddata', () => {
                    setIsLoading(false);
                    setError(null);
                });

                audioRef.current.addEventListener('canplay', () => {
                    setIsLoading(false);
                });
            }

            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                setIsLoading(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
                setIsLoading(false);
            }
        } catch (error: any) {
            setError(error.message || "حدث خطأ أثناء تشغيل الصوت، اختر إذاعة أخرى");
            setIsPlaying(false);
            setIsLoading(false);
        }
    };

    const changeRadio = (radio: Radio) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setCurrentRadio(radio);
        setIsPlaying(false);
        setError(null);
    };

    const handleNext = () => {
        if (radios.length === 0) return;
        const currentIndex = radios.findIndex((r) => r.id === currentRadio.id);
        const nextIndex = (currentIndex + 1) % radios.length;
        changeRadio(radios[nextIndex]);
    };

    const handlePrevious = () => {
        if (radios.length === 0) return;
        const currentIndex = radios.findIndex((r) => r.id === currentRadio.id);
        const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
        changeRadio(radios[prevIndex]);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* LEFT: Avatar + info */}
                    <div className="flex-1 min-w-0 flex items-center gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage src={currentRadio.img} alt={currentRadio.name} />
                            <AvatarFallback>{currentRadio.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="font-medium truncate">{currentRadio.name}</p>
                            <p className="text-sm text-muted-foreground">إذاعة القرآن الكريم</p>
                        </div>
                    </div>

                    {/* CENTER: Error message only */}
                    <div className="flex-1 min-w-0 flex items-center justify-center">
                        {error && (
                            <div className="text-center">
                                <p className="text-lg text-destructive font-medium animate-pulse">
                                    <span className="hidden md:inline">حدث خطأ أثناء تشغيل الصوت، اختر إذاعة أخرى</span>
                                    <span className="md:hidden">جرب إذاعة أخرى</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Controls + volume + sheet */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePrevious}
                                disabled={radios.length === 0 || isLoading}
                            >
                                <SkipBack className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="default"
                                size="icon"
                                onClick={togglePlay}
                                className="h-10 w-10"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : isPlaying ? (
                                    <Pause className="h-4 w-4" />
                                ) : (
                                    <Play className="h-4 w-4" />
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleNext}
                                disabled={radios.length === 0 || isLoading}
                            >
                                <SkipForward className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="hidden md:flex items-center gap-2 w-32">
                            <Button variant="ghost" size="icon" onClick={toggleMute}>
                                {isMuted ? (
                                    <VolumeX className="h-4 w-4" />
                                ) : (
                                    <Volume2 className="h-4 w-4" />
                                )}
                            </Button>
                            <Slider
                                value={[isMuted ? 0 : volume]}
                                onValueChange={(value) => {
                                    setVolume(value[0]);
                                    setIsMuted(false);
                                }}
                                max={100}
                                step={1}
                                className="flex-1"
                            />
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <List className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80vh]">
                                <SheetHeader>
                                    <SheetTitle>قائمة القراء</SheetTitle>
                                    <SheetDescription>اختر القارئ المفضل لديك</SheetDescription>
                                </SheetHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                                    {radios.map((radio) => (
                                        <button
                                            key={radio.id}
                                            onClick={() => changeRadio(radio)}
                                            className={`flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors ${currentRadio.id === radio.id ? "bg-accent border-primary" : ""
                                                }`}
                                        >
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={radio.img} alt={radio.name} />
                                                <AvatarFallback>{radio.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-right flex-1">{radio.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
};
