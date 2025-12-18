"use client";

import { useGraduates } from "@/hooks/useGraduates";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, GraduationCap } from "lucide-react";
import Image from "next/image";

const Graduates = () => {
  const { data: graduates = [], isLoading } = useGraduates();

  const stats = [
    { icon: Award, number: "200+", label: "خريج متقن" },
    { icon: Trophy, number: "150+", label: "حاصل على إجازة" },
    { icon: Star, number: "50+", label: "متفوق بامتياز" }
  ];

  if (isLoading) return <div className="py-40 text-center">جاري تحميل قائمة الخريجين...</div>;

  return (
    <>
      {/* Page Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-slideUp">
            <h1 className="text-5xl font-bold mb-6">خريجونا</h1>
            <p className="text-xl text-muted-foreground">
              فخورون بخريجينا الذين أتموا حفظ القرآن الكريم بتجويد متقن
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary mb-3">
                  <stat.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-1">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduates Grid */}
      <section className="py-20">
        <div className="container">
          {graduates.length === 0 ? (
            <div className="text-center text-muted-foreground">لا يوجد خريجون مسجلون حالياً</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {graduates.map((graduate) => (
                <Card key={graduate.id} className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    {graduate.image ? (
                      <Image
                        src={graduate.image}
                        alt={graduate.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-primary/5">
                        <GraduationCap className="h-20 w-20 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-gold text-foreground shadow-elegant">
                        دفعة {graduate.graduationYear}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{graduate.name}</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">الإنجاز:</span> {graduate.achievement}
                      </p>
                      {graduate.moreInfo && (
                        <p className="text-sm text-primary font-medium border-t pt-2 mt-2 italic">
                          "{graduate.moreInfo}"
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto animate-slideUp">
            <Trophy className="h-16 w-16 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl font-bold mb-4">كن أنت التالي</h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلينا اليوم وابدأ رحلتك في حفظ القرآن الكريم
            </p>
            <button className="px-8 py-4 bg-background text-foreground rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-elegant">
              سجل الآن
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Graduates;
