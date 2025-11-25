import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsSlider from "@/components/NewsSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Star, Heart } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "تحفيظ القرآن الكريم",
      description: "برامج متخصصة لحفظ القرآن الكريم بالتجويد والقراءات"
    },
    {
      icon: Users,
      title: "معلمون أكفاء",
      description: "نخبة من المعلمين المتخصصين في علوم القرآن والتجويد"
    },
    {
      icon: Award,
      title: "شهادات معتمدة",
      description: "شهادات موثقة في حفظ وتجويد القرآن الكريم"
    },
    {
      icon: GraduationCap,
      title: "مستويات متعددة",
      description: "برامج تعليمية لجميع الأعمار والمستويات"
    }
  ];

  const stats = [
    { number: "500+", label: "طالب وطالبة" },
    { number: "50+", label: "معلم ومعلمة" },
    { number: "200+", label: "خريج متقن" },
    { number: "15+", label: "سنة خبرة" }
  ];

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-slideUp">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">تحت إشراف الشيخ أحمد مرعي</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                دار الإحسان
                <br />
                <span className="text-gradient-primary">لتحفيظ وتجويد القرآن الكريم</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                رحلة إيمانية في رحاب القرآن الكريم، نقدم برامج تعليمية متميزة في الحفظ والتجويد بإشراف نخبة من المعلمين المتخصصين
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary shadow-elegant hover:shadow-glow text-lg">
                  سجل الآن
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <NavLink to="/about">تعرف علينا</NavLink>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gradient-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12 animate-slideUp">
              <h2 className="text-4xl font-bold mb-4">لماذا دار الإحسان؟</h2>
              <p className="text-muted-foreground text-lg">
                نقدم لك أفضل بيئة تعليمية لحفظ وتجويد القرآن الكريم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News Slider */}
        <NewsSlider />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto animate-slideUp">
              <Heart className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl font-bold mb-4">انضم إلى رحلتك الإيمانية</h2>
              <p className="text-xl mb-8 opacity-90">
                ابدأ اليوم في حفظ كتاب الله وتعلم أحكام التجويد على أيدي معلمين متخصصين
              </p>
              <Button size="lg" variant="secondary" className="text-lg">
                تواصل معنا الآن
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
