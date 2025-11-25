"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Volume2, Download } from "lucide-react";
import { useState } from "react";

const Quran = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // هذا مثال بسيط - يمكن لاحقاً ربطه بـ API حقيقي للقرآن
  const surahs = [
    { number: 1, name: "الفاتحة", verses: 7, type: "مكية" },
    { number: 2, name: "البقرة", verses: 286, type: "مدنية" },
    { number: 3, name: "آل عمران", verses: 200, type: "مدنية" },
    { number: 4, name: "النساء", verses: 176, type: "مدنية" },
    { number: 5, name: "المائدة", verses: 120, type: "مدنية" },
    { number: 6, name: "الأنعام", verses: 165, type: "مكية" },
    { number: 7, name: "الأعراف", verses: 206, type: "مكية" },
    { number: 8, name: "الأنفال", verses: 75, type: "مدنية" },
    { number: 9, name: "التوبة", verses: 129, type: "مدنية" },
    { number: 10, name: "يونس", verses: 109, type: "مكية" },
    { number: 11, name: "هود", verses: 123, type: "مكية" },
    { number: 12, name: "يوسف", verses: 111, type: "مكية" },
    { number: 13, name: "الرعد", verses: 43, type: "مدنية" },
    { number: 14, name: "إبراهيم", verses: 52, type: "مكية" },
    { number: 15, name: "الحجر", verses: 99, type: "مكية" },
    { number: 16, name: "النحل", verses: 128, type: "مكية" },
    { number: 17, name: "الإسراء", verses: 111, type: "مكية" },
    { number: 18, name: "الكهف", verses: 110, type: "مكية" },
  ];

  const filteredSurahs = surahs.filter(surah =>
    surah.name.includes(searchTerm) || surah.number.toString().includes(searchTerm)
  );

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-slideUp">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
                <BookOpen className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold mb-6">المصحف الشريف</h1>
              <p className="text-xl text-muted-foreground">
                اقرأ واستمع إلى القرآن الكريم بصوت أشهر القراء
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">القراءة</h3>
                <p className="text-sm text-muted-foreground">نص واضح بالرسم العثماني</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3">
                  <Volume2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">الاستماع</h3>
                <p className="text-sm text-muted-foreground">بصوت أشهر القراء</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3">
                  <Download className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">التحميل</h3>
                <p className="text-sm text-muted-foreground">حمّل السور للاستماع لاحقاً</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Surahs List */}
        <section className="py-20">
          <div className="container max-w-5xl">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ابحث عن سورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 h-12 text-lg"
                />
              </div>
            </div>

            {/* Info Card */}
            <Card className="mb-8 shadow-elegant bg-gradient-hero">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">قريباً: القرآن الكريم التفاعلي</h3>
                    <p className="text-muted-foreground">
                      نعمل حالياً على إضافة خدمة القرآن الكريم الكاملة مع إمكانية القراءة والاستماع والتحميل.
                      سيتم الربط مع API متخصصة توفر النص والصوت بجودة عالية.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Surahs Grid */}
            <div className="grid gap-4">
              {filteredSurahs.map((surah) => (
                <Card key={surah.number} className="shadow-elegant hover:shadow-glow transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">
                          {surah.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1">سورة {surah.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{surah.type}</span>
                            <span>•</span>
                            <span>{surah.verses} آية</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                          <BookOpen className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSurahs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">لم يتم العثور على نتائج</p>
              </div>
            )}
          </div>
        </section>

        {/* Popular Reciters */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">القراء المشهورون</h2>
              <p className="text-muted-foreground text-lg">
                استمع للقرآن الكريم بصوت أشهر القراء
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: "الشيخ ماهر المعيقلي", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop" },
                { name: "الشيخ عبد الباسط عبد الصمد", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop" },
                { name: "الشيخ محمد صديق المنشاوي", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop" },
                { name: "الشيخ مشاري راشد العفاسي", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop" },
              ].map((reciter, index) => (
                <Card key={index} className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group cursor-pointer">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={reciter.image}
                      alt={reciter.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold">{reciter.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Quran;

