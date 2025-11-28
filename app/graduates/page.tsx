
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
      image: "https://plus.unsplash.com/premium_photo-1677013623482-6d71ca2dc71a?q=80&w=870&auto=format&fit=crop"
    },
    {
      name: "فاطمة أحمد",
      year: "2023",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "الأولى على الدفعة",
      image: "https://plus.unsplash.com/premium_photo-1677621745797-8dd5dc467dd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
    },
    {
      name: "أحمد حسن",
      year: "2023",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "جيد جداً",
      specialNote: "مع إتقان أحكام التجويد",
      image: "https://plus.unsplash.com/premium_photo-1677523779672-7d70e51dd87e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
    },
    {
      name: "مريم محمود",
      year: "2022",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "حاصلة على إجازة",
      image: "https://plus.unsplash.com/premium_photo-1726783516178-f82051b4f481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
    },
    {
      name: "عمر خالد",
      year: "2022",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "مع دراسة القراءات السبع",
      image: "https://plus.unsplash.com/premium_photo-1750360904392-74edd7829381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
    },
    {
      name: "خديجة علي",
      year: "2022",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "جيد جداً",
      specialNote: "أصغر خريجة في الدفعة",
      image: "https://plus.unsplash.com/premium_photo-1678558710021-fde5127866fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
    },
    {
      name: "يوسف إبراهيم",
      year: "2021",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "الآن معلم في الدار",
      image: "https://plus.unsplash.com/premium_photo-1678580371526-9c5938ad11ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
    },
    {
      name: "سارة حسين",
      year: "2021",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "ممتاز",
      specialNote: "مع إجازة في رواية حفص",
      image: "https://plus.unsplash.com/premium_photo-1678559552200-aa9d8485b94b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8"
    },
    {
      name: "عبد الرحمن صالح",
      year: "2021",
      achievement: "حفظ القرآن الكريم كاملاً",
      grade: "جيد جداً",
      specialNote: "متقن لأحكام التجويد",
      image: "https://plus.unsplash.com/premium_photo-1677015055409-422f5c2c1d95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8"
    }
  ];

  const stats = [
    { icon: Award, number: "200+", label: "خريج متقن" },
    { icon: Trophy, number: "150+", label: "حاصل على إجازة" },
    { icon: Star, number: "50+", label: "متفوق بامتياز" }
  ];

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
                    src="https://plus.unsplash.com/premium_photo-1678559460700-8a1d42ce8239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltJTIwbWFufGVufDB8fDB8fHww"
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
                    src="https://images.unsplash.com/photo-1648593470206-64f8690efeff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG11c2xpbSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D"
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
    </>
  );
};

export default Graduates;

