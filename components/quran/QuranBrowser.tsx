import React, { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
    ChevronRight,
    ChevronLeft,
    Menu,
    X,
    Maximize2,
    Minimize2,
    Settings,
    LayoutGrid,
    BookOpen,
    ZoomIn,
    ZoomOut,
    Volume2,
    VolumeX,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    ListFilter,
    Layers,
    Hash,
    Book,
    ArrowRight,
    Download
} from "lucide-react";
import { QURAN_SURAS, QURAN_JUZS, QURAN_HIZBS, QURAN_QUARTERS, RECITERS } from "@/lib/quran-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { externalQuranService } from "@/services/external-quran.service";
import { Button } from "@/components/ui/button";
import { useSurahs, usePagesImages } from "@/hooks/use-quran";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import kingFahadMushafData from '@sahabaplus/mushaf-engine/data/king_fahad_mushaf.json';

const TOTAL_PAGES = 604;

export default function QuranBrowser() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [currentReciter, setCurrentReciter] = useState(RECITERS[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const jumpPageRef = React.useRef<number | null>(null);

    const togglePlay = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle Audio Playback
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(err => console.error("Audio play failed:", err));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentReciter, currentPage]);

    // Background Prefetching
    useEffect(() => {
        if (!mounted) return;

        // Prefetch pages in chunks to avoid slamming the network
        const prefetchPages = async () => {
            for (let i = 1; i <= TOTAL_PAGES; i++) {
                // If the page is already likely in cache or very close, skip or delay
                const img = new (window as any).Image();
                img.src = getPageUrl(i);

                // Wait a bit every 10 images to let regular traffic through
                if (i % 5 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        };

        const timeout = setTimeout(prefetchPages, 5000); // Start after 5s of idle
        return () => clearTimeout(timeout);
    }, [mounted]);

    // Embla setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        direction: 'rtl',
        loop: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        slidesToScroll: isDesktop ? 2 : 1,
        breakpoints: {
            '(max-width: 1023px)': { slidesToScroll: 1 }
        }
    });

    const { data: surahs, isLoading: surasLoading } = useSurahs();
    const { data: pagesData, isLoading: pagesLoading } = usePagesImages();

    // Detect Device
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    useEffect(() => {
        if (emblaApi) emblaApi.reInit();
    }, [isDesktop, emblaApi]);

    // Map Surahs to start pages
    const suraToPageMap = useMemo(() => {
        const map: Record<number, number> = {};
        (kingFahadMushafData as any).forEach((page: any[], pageIdx: number) => {
            page.forEach((v: any) => {
                if (v.ayah === 1 && !map[v.sura]) {
                    map[v.sura] = pageIdx + 1;
                }
            });
        });
        return map;
    }, []);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const index = emblaApi.selectedScrollSnap();

        // Use the jumped page if it belongs to this snap, otherwise fallback to snap base
        if (jumpPageRef.current !== null) {
            const snapOfJumped = isDesktop ? Math.floor((jumpPageRef.current - 1) / 2) : jumpPageRef.current - 1;
            if (snapOfJumped === index) {
                setCurrentPage(jumpPageRef.current);
                jumpPageRef.current = null;
                return;
            }
            jumpPageRef.current = null;
        }

        const actualPage = isDesktop ? (index * 2) + 1 : index + 1;
        setCurrentPage(actualPage);
    }, [emblaApi, isDesktop]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const jumpToSura = (suraNum: number) => {
        const pageNum = suraToPageMap[suraNum] || 1;
        jumpToPage(pageNum);
    };

    const jumpToPage = (pageNum: number) => {
        if (!emblaApi) return;
        jumpPageRef.current = pageNum;
        const snapIndex = isDesktop ? Math.floor((pageNum - 1) / 2) : pageNum - 1;
        emblaApi.scrollTo(snapIndex);
    };

    const currentSura = useMemo(() => {
        if (!surahs) return null;
        const entries = Object.entries(suraToPageMap);
        const currentEntry = entries
            .filter(([_, startPage]) => startPage <= currentPage)
            .sort((a, b) => b[1] - a[1])[0];

        const suraNum = currentEntry ? parseInt(currentEntry[0]) : 1;
        return surahs.find(s => parseInt(s.number) === suraNum);
    }, [currentPage, surahs, suraToPageMap]);

    const getPageUrl = (num: number) => {
        const formatted = num.toString().padStart(3, '0');
        return `https://quran.yousefheiba.com/api/quran-pages/${formatted}.png`;
    };

    if (!mounted || pagesLoading || surasLoading) {
        return (
            <div className="fixed inset-0 bg-[#fdfaf3] flex items-center justify-center p-4">
                <div className="space-y-6 text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground animate-pulse font-amiri text-2xl text-primary font-bold">جاري تحميل المصحف الشريف...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[40] bg-background dark:bg-slate-950 flex flex-col font-cairo overflow-hidden select-none text-right" dir="rtl">

            {/* Immersive Header */}
            <div className="h-16 bg-background/90 backdrop-blur-md border-b flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/5 text-primary">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 flex flex-col bg-background border-r">
                            <SheetHeader className="p-6 bg-primary text-white text-right">
                                <SheetTitle className="text-right text-white font-ruqaa text-3xl">الفهرس</SheetTitle>
                            </SheetHeader>

                            <Tabs defaultValue="suras" className="flex-1 flex flex-col overflow-hidden ">
                                <div className="px-4 py-2 bg-muted/30 border-b">
                                    <TabsList className="grid w-full grid-cols-4 bg-muted p-1 text-right" dir="rtl">
                                        <TabsTrigger value="suras" className="text-[10px] md:text-sm data-[state=active]:bg-background data-[state=active]:text-primary font-bold">السور</TabsTrigger>
                                        <TabsTrigger value="juzs" className="text-[10px] md:text-sm data-[state=active]:bg-background data-[state=active]:text-primary font-bold">الأجزاء</TabsTrigger>
                                        <TabsTrigger value="hizbs" className="text-[10px] md:text-sm data-[state=active]:bg-background data-[state=active]:text-primary font-bold">الأحزاب</TabsTrigger>
                                        <TabsTrigger value="arba" className="text-[10px] md:text-sm data-[state=active]:bg-background data-[state=active]:text-primary font-bold">الأرباع</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="suras" className="flex-1 overflow-y-auto m-0 p-2 text-right" dir="rtl">
                                    {QURAN_SURAS.map((sura) => (
                                        <button
                                            key={sura.number}
                                            onClick={() => jumpToPage(sura.page)}
                                            className={`w-full text-right px-4 py-3 border-b border-border/50 hover:bg-primary/5 rounded-md flex items-center justify-between transition-all ${currentPage >= sura.page && currentPage < (QURAN_SURAS[sura.number]?.page || 605) ? 'bg-primary/10' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary text-xs font-bold font-sans">
                                                    {sura.number}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-lg text-foreground">{sura.name}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{sura.type} • {sura.ayat} آيات</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-sans">ص {sura.page}</span>
                                        </button>
                                    ))}
                                </TabsContent>

                                <TabsContent value="juzs" className="flex-1 overflow-y-auto m-0 p-2 text-right" dir="rtl">
                                    {QURAN_JUZS.map((juz) => (
                                        <button
                                            key={juz.number}
                                            onClick={() => jumpToPage(juz.startPage)}
                                            className={`w-full text-right px-4 py-3 border-b border-border/50 hover:bg-primary/5 rounded-md flex items-center justify-between transition-all ${currentPage >= juz.startPage && currentPage < (QURAN_JUZS[juz.number]?.startPage || 605) ? 'bg-primary/10' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Book className="h-4 w-4 text-primary/40" />
                                                <span className="font-bold text-lg text-foreground">{juz.name}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-sans">ص {juz.startPage}</span>
                                        </button>
                                    ))}
                                </TabsContent>

                                <TabsContent value="hizbs" className="flex-1 overflow-y-auto m-0 p-2 text-right" dir="rtl">
                                    {QURAN_HIZBS.map((hizb) => (
                                        <button
                                            key={hizb.number}
                                            onClick={() => jumpToPage(hizb.startPage)}
                                            className={`w-full text-right px-4 py-3 border-b border-border/50 hover:bg-primary/5 rounded-md flex items-center justify-between transition-all ${currentPage >= hizb.startPage && currentPage < (QURAN_HIZBS[hizb.number]?.startPage || 605) ? 'bg-primary/10' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Layers className="h-4 w-4 text-primary/40" />
                                                <span className="font-bold text-lg text-foreground">{hizb.name}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-sans">ص {hizb.startPage}</span>
                                        </button>
                                    ))}
                                </TabsContent>

                                <TabsContent value="arba" className="flex-1 overflow-y-auto m-0 p-2 text-right" dir="rtl">
                                    {QURAN_QUARTERS.map((quarter) => (
                                        <button
                                            key={quarter.number}
                                            onClick={() => jumpToPage(quarter.startPage)}
                                            className={`w-full text-right px-4 py-3 border-b border-border/50 hover:bg-primary/5 rounded-md flex items-center justify-between transition-all ${currentPage >= quarter.startPage && currentPage < (QURAN_QUARTERS[quarter.number]?.startPage || 605) ? 'bg-primary/10' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Hash className="h-3 w-3 text-primary/30" />
                                                <span className="font-bold text-md text-foreground/80">{quarter.name}</span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground font-sans">ص {quarter.startPage}</span>
                                        </button>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </SheetContent>
                    </Sheet>

                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-foreground leading-tight font-amiri">
                            {currentSura?.name_ar || (currentSura as any)?.name || "..."}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1 flex justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.history.back()}
                            className="rounded-full md:px-6 border-primary/20 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowRight className="h-5 w-5 md:hidden" />
                            <span className="hidden md:inline">إغلاق المصحف</span>
                        </Button>
                    </div>

                    <div className="flex items-center bg-muted rounded-full px-2 mr-4">
                        <Button variant="ghost" size="icon" onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))} className="h-8 w-8 text-primary">
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <span className="text-[10px] font-sans font-bold w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
                        <Button variant="ghost" size="icon" onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.6))} className="h-8 w-8 text-primary">
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                    </div>


                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        title={isFullscreen ? "تصغير" : "ملء الشاشة"}
                    >
                        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Main Pages Area */}
            <div className="flex-1 relative flex items-center justify-center bg-slate-100 dark:bg-slate-900 overflow-hidden group ">

                {/* Navigation Arrows (Desktop Only) */}
                {isDesktop && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 z-40 h-12 w-12 rounded-full bg-background/50 backdrop-blur shadow-lg text-primary hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => jumpToPage(currentPage + (isDesktop ? 2 : 1))}
                            disabled={currentPage >= TOTAL_PAGES}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 z-40 h-12 w-12 rounded-full bg-background/50 backdrop-blur shadow-lg text-primary hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => jumpToPage(currentPage - (isDesktop ? 2 : 1))}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </Button>
                    </>
                )}

                {/* Embla Viewport */}
                <div className="w-full h-full overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full embla__container">
                        {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
                            const pageNum = i + 1;
                            // Lazy loading logic: only render if within 20 pages of current
                            const isVisible = Math.abs(pageNum - currentPage) <= 20;

                            return (
                                <div
                                    key={pageNum}
                                    className={`flex-[0_0_100%] lg:flex-[0_0_50%] h-full flex justify-center p-2 lg:p-8 select-none overflow-y-auto overflow-x-hidden items-start pt-4 lg:pt-8 ${zoomLevel > 1 ? 'pb-20' : ''}`}
                                >
                                    {isVisible ? (
                                        <div
                                            className={`relative w-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] rounded-lg bg-card max-w-[650px] border border-border group/page transition-transform duration-300 ${zoomLevel > 1 ? 'origin-top' : 'origin-center'}`}
                                            style={{
                                                transform: `scale(${zoomLevel})`,
                                                height: '92vh',
                                                minHeight: '92vh',
                                                marginBottom: zoomLevel > 1 ? `${(zoomLevel - 1) * 92}vh` : '0',
                                            }}
                                        >
                                            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.08] bg-black rounded-lg" />
                                            <Image
                                                src={getPageUrl(pageNum)}
                                                alt={`Page ${pageNum}`}
                                                fill
                                                className="object-contain pointer-events-none dark:opacity-90 dark:contrast-125"
                                                draggable={false}
                                                onContextMenu={(e) => e.preventDefault()}
                                                priority={Math.abs(pageNum - currentPage) <= 1}
                                                sizes="(max-width: 1023px) 100vw, 50vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                                            <Skeleton className="w-32 h-32 rounded-full" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div >

            {/* Footer Toolbar */}
            <div className="h-auto min-h-16 bg-background border-t flex flex-col z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                {/* Audio Bar (Toggleable) */}
                <div className="flex items-center justify-between px-6 py-3 bg-muted/30 border-b">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                                <SkipForward className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                className="h-10 w-10 rounded-full shadow-md bg-primary hover:bg-primary/90 hover:scale-105 transition-all text-white"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                                <SkipBack className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="hidden md:flex flex-col">
                            <span className="text-xs font-bold text-foreground">مشاري راشد العفاسي</span>
                            <span className="text-[10px] text-muted-foreground">ص {currentPage}</span>
                        </div>
                    </div>

                    <div className="flex-1 max-w-xl mx-8 hidden lg:block">
                        <Slider
                            value={[audioProgress]}
                            max={100}
                            step={0.1}
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1">
                            <Volume2 className="h-4 w-4 text-primary" />
                            <Slider className="w-24 cursor-pointer" defaultValue={[70]} max={100} />
                        </div>
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
                            <Download className="h-4 w-4 mr-2" />
                            تحميل الصفحة
                        </Button>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="h-10 bg-background px-6 flex items-center justify-between text-[10px] md:text-sm text-muted-foreground border-t border-border/10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-primary font-sans">{(currentPage / 6.04).toFixed(1)}%</span>
                            <span className="font-sans">مكتمل</span>
                        </div>
                        <div className="h-1 w-32 bg-muted rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-primary" style={{ width: `${(currentPage / 6.04)}%` }} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 font-bold">
                        <span className="font-sans">صفحة {currentPage} من 604</span>
                        <div className="w-[1px] h-3 bg-border" />
                        <span>الجزء {Math.ceil(currentPage / 20)}</span>
                    </div>
                </div>
            </div>

            {/* Hidden Audio Element */}
            < audio
                ref={audioRef}
                src={externalQuranService.getPageAudioUrl(currentReciter.id, currentPage)}
                onTimeUpdate={(e) => setAudioProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100)
                }
                onEnded={() => {
                    if (currentPage < TOTAL_PAGES) jumpToPage(currentPage + 1);
                }}
            />

            < style jsx global > {`
        body { overflow: hidden !important; }
        .embla__container {
          display: flex;
          height: 100%;
          will-change: transform;
        }
        /* Allow vertical scroll in viewport if zoomed */
        .embla__viewport {
           overflow-y: ${zoomLevel > 1.05 ? 'auto' : 'hidden'} !important;
        }
      `}</style >
        </div >
    );
}
