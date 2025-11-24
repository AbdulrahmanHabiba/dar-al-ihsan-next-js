import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star } from "lucide-react";

const Graduates = () => {
  const graduates = [
    {
      name: "محمد عبد الله",
      year: "2023",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "مع إجازة في رواية حفص",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop"
    },
    {
      name: "فاطمة أحمد",
      year: "2023",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "الأولى على الدفعة",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop"
    },
    {
      name: "أحمد حسن",
      year: "2023",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "جيد جداً",
      specialNote: "مع إتقان أحكام التجويد",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop"
    },
    {
      name: "مريم محمود",
      year: "2022",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "حاصلة على إجازة",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop"
    },
    {
      name: "عمر خالد",
      year: "2022",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "مع دراسة القراءات السبع",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop"
    },
    {
      name: "خديجة علي",
      year: "2022",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "جيد جداً",
      specialNote: "أصغر خريجة في الدفعة",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop"
    },
    {
      name: "يوسف إبراهيم",
      year: "2021",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "الآن معلم في الدار",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop"
    },
    {
      name: "سارة حسين",
      year: "2021",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "مع إجازة في رواية حفص",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop"
    },
    {
      name: "عبد الرحمن صالح",
      year: "2021",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "جيد جداً",
      specialNote: "متقن لأحكام التجويد",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop"
    }
  ];

  const stats = [
    { icon: Award, number: "200+", label: "خريج متقن" },
    { icon: Trophy, number: "150+", label: "حاصل على إجازة" },
    { icon: Star, number: "50+", label: "متفوق بامتياز" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {graduates.map((graduate, index) => (
                <Card key={index} className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img
                      src={graduate.image}
                      alt={graduate.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-gold text-foreground shadow-elegant">
                        دفعة {graduate.year}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{graduate.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">الإنجاز:</span> {graduate.achievement}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">التقدير:</span>{" "}
                        <Badge variant="secondary" className="mr-2">{graduate.grade}</Badge>
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-primary font-medium">{graduate.specialNote}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="text-center mb-12 animate-slideUp">
              <h2 className="text-4xl font-bold mb-4">قصص نجاح</h2>
              <p className="text-muted-foreground text-lg">
                شهادات من خريجينا عن تجربتهم في الدار
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop"
                      alt="محمد عبد الله"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg">محمد عبد الله</h4>
                      <p className="text-sm text-muted-foreground">خريج 2023</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "الحمد لله، تجربتي في دار الإحسان كانت رحلة إيمانية رائعة. المعلمون متمكنون وصبورون، والبيئة
                    التعليمية محفزة جداً. أنصح كل من يريد حفظ القرآن بالانضمام لهذه الدار المباركة."
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop"
                      alt="فاطمة أحمد"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg">فاطمة أحمد</h4>
                      <p className="text-sm text-muted-foreground">خريجة 2023</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "بفضل الله ثم بفضل المعلمات في دار الإحسان، تمكنت من حفظ القرآن الكريم كاملاً. المنهج المتبع
                    احترافي وفعال، والمتابعة مستمرة. جزاهم الله خير الجزاء."
                  </p>
                </CardContent>
              </Card>
            </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default Graduates;
