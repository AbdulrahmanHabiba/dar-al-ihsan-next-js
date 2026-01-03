"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Sheet,
    SheetClose,
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
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/sonner";

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

// ============================
// Radio List Sheet Component
// ============================
interface RadioListSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    radios: Radio[];
    currentRadio: Radio;
    onSelectRadio: (radio: Radio) => void;
    isMobile: boolean;
}

const RadioListSheet = ({ open, onOpenChange, radios, currentRadio, onSelectRadio, isMobile }: RadioListSheetProps) => (
    <Sheet open={open} onOpenChange={onOpenChange}>
        {!isMobile && (
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <List className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </SheetTrigger>
        )}
        <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
                <SheetTitle>قائمة القراء</SheetTitle>
                <SheetDescription>اختر القارئ المفضل لديك</SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                {radios.map((radio) => (
                    <SheetClose key={radio.id} asChild>
                        <button
                            onClick={() => onSelectRadio(radio)}
                            className={`flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors ${currentRadio.id === radio.id ? "bg-accent border-primary" : ""
                                }`}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={radio.img} alt={radio.name} />
                                <AvatarFallback>{radio.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-right flex-1">{radio.name}</span>
                        </button>
                    </SheetClose>
                ))}
            </div>
        </SheetContent>
    </Sheet>
);

// ============================
// Playing Indicator Component
// ============================
const PlayingIndicator = () => (
    <div className="hidden md:flex items-center gap-2">
        <div className="flex gap-1">
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-sm text-muted-foreground">جاري التشغيل...</p>
    </div>
);

// ============================
// Main Player Component
// ============================
export const QuranPlayer = () => {
    const [radios, setRadios] = useState<Radio[]>([]);
    const [currentRadio, setCurrentRadio] = useState<Radio>(DEFAULT_RADIO);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [open, setOpen] = useState(false);
    const [audioReady, setAudioReady] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isMobile = useIsMobile();

    // Fetch radios on mount
    useEffect(() => {
        const fetchRadios = async () => {
            try {
                const response = await fetch("https://data-rosy.vercel.app/radio.json");
                const data = await response.json();
                // فلترة إذاعة السنة النبوية
                const filtered = (data.radios || []).filter(
                    (radio: Radio) => !radio.name.includes("السنة النبوية")
                );
                setRadios(filtered);
            } catch {
                setRadios([DEFAULT_RADIO]);
            }
        };

        fetchRadios();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Update audio volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // Setup audio element when radio changes (فقط عند تغيير الراديو)
    useEffect(() => {
        setAudioReady(false);
        setIsLoading(true);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
            audioRef.current.load();
        }

        const audio = new Audio(currentRadio.url);
        audio.volume = 0.7; // قيمة افتراضية
        audio.preload = 'auto';

        const handleError = () => {
            setAudioReady(false);
            setIsPlaying(false);
            setIsLoading(false);
        };

        const handleCanPlay = () => {
            setAudioReady(true);
            setIsLoading(false);
        };

        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('error', handleError);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('ended', handleEnded);

        audio.load();
        audioRef.current = audio;

        return () => {
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, [currentRadio.url]); // فقط عند تغيير URL

    // Auto-play when audio is ready (إذا كان المستخدم ضغط play من قبل)
    useEffect(() => {
        if (audioReady && isLoading && audioRef.current && !isPlaying) {
            const playAudio = async () => {
                try {
                    await audioRef.current!.play();
                    setIsPlaying(true);
                    setIsLoading(false);
                } catch {
                    setIsLoading(false);
                    setTimeout(() => {
                        toast.error("فشل التشغيل", {
                            description: "جرب مرة أخرى",
                        });
                    }, 0);
                }
            };
            playAudio();
        }
    }, [audioReady, isLoading, isPlaying]);

    // Handlers
    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setIsLoading(true);

            // لو الإذاعة مش جاهزة، نحاول نحملها مرة تانية
            if (!audioReady) {
                audioRef.current.load();
                // انتظار جاهزية الإذاعة
                await new Promise((resolve) => {
                    const checkReady = () => {
                        if (audioRef.current && audioRef.current.readyState >= 2) {
                            setAudioReady(true);
                            resolve(true);
                        } else {
                            setTimeout(checkReady, 100);
                        }
                    };
                    checkReady();
                    // timeout بعد 5 ثواني
                    setTimeout(() => resolve(false), 5000);
                });
            }

            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                setTimeout(() => {
                    toast.error("فشل التشغيل", {
                        description: "تأكد من الاتصال بالإنترنت وجرب مرة أخرى",
                    });
                }, 0);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const changeRadio = (radio: Radio) => {
        const wasPlaying = isPlaying;
        setCurrentRadio(radio);
        setIsPlaying(false);
        setIsLoading(wasPlaying); // useEffect auto-play هيشتغل لو wasPlaying = true
    };

    const handleNext = () => {
        if (!radios.length) return;
        const currentIndex = radios.findIndex((r) => r.id === currentRadio.id);
        const nextIndex = (currentIndex + 1) % radios.length;
        changeRadio(radios[nextIndex]);
    };

    const handlePrevious = () => {
        if (!radios.length) return;
        const currentIndex = radios.findIndex((r) => r.id === currentRadio.id);
        const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
        changeRadio(radios[prevIndex]);
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value[0]);
        setIsMuted(false);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur border-t shadow-lg z-50">
            <div className="container mx-auto px-4 py-1 sm:py-2 md:py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Radio Info */}
                    <div
                        className="min-w-0 flex items-center gap-4 cursor-pointer"
                        onClick={() => isMobile && setOpen(true)}
                    >
                        <Avatar className="h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0">
                            <AvatarImage src={currentRadio.img} alt={currentRadio.name} />
                            <AvatarFallback>{currentRadio.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="font-medium truncate text-sm md:text-base">
                                {currentRadio.name}
                            </p>
                            <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">
                                إذاعة القرآن الكريم
                            </p>
                        </div>
                    </div>

                    {/* Playing Indicator */}
                    <div className="flex-1 min-w-0 flex items-center justify-center">
                        {isPlaying && <PlayingIndicator />}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Playback Controls */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePrevious}
                                disabled={!radios.length || isLoading}
                            >
                                <SkipBack className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>

                            <Button
                                variant="default"
                                size="icon"
                                onClick={togglePlay}
                                className="h-8 w-8 sm:h-10 sm:w-10"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                ) : isPlaying ? (
                                    <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
                                ) : (
                                    <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleNext}
                                disabled={!radios.length || isLoading}
                            >
                                <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </div>

                        {/* Volume Control */}
                        <div className="hidden md:flex items-center gap-2 w-32">
                            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                                {isMuted ? (
                                    <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                                ) : (
                                    <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                )}
                            </Button>
                            <Slider
                                value={[isMuted ? 0 : volume]}
                                onValueChange={handleVolumeChange}
                                max={100}
                                step={1}
                                className="flex-1"
                            />
                        </div>

                        {/* Radio List */}
                        <RadioListSheet
                            open={open}
                            onOpenChange={setOpen}
                            radios={radios}
                            currentRadio={currentRadio}
                            onSelectRadio={changeRadio}
                            isMobile={isMobile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
