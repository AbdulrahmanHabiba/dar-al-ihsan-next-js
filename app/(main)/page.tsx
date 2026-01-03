
import NewSlider2 from "@/components/home/NewSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Star } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { getAllNews } from "@/services/news.service";

const HomePage = async () => {
  const newsData = await getAllNews().catch(() => []);
  const initialNews = JSON.parse(JSON.stringify(newsData)); // Ensure serialization for client component
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
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-[0.07]"></div>

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">

            {/* ===== Desktop Logo (sm وما فوق) ===== */}
            <div className="hidden sm:flex w-1/4 flex-col -mt-[22px] items-center gap-4 animate-fadeIn sm:order-2">
              <div className="relative h-56 w-56  md:h-64 md:w-64 lg:h-80 lg:w-80">
                <Image
                  src="/azhar-logo-modern.png"
                  alt="شعار الأزهر الشريف"
                  fill
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>

              <div className="text-center flex gap-2 sm:block">
                <p className="text-sm md:text-base font-bold text-primary">
                  بإشراف الأزهر الشريف
                </p>
                <span className="block sm:hidden" >-</span>
                <p className="text-xs md:text-base text-muted-foreground font-medium">
                  ترخيص رقم 828 لسنة 2011
                </p>
              </div>


            </div>

            {/* ===== Content ===== */}
            <div className="w-full sm:w-3/4 text-center space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full animate-fadeIn">
                <Star className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">
                  تحت إشراف الشيخ أحمد مرعي
                </span>
              </div>

              {/* ===== Title (SEO + تشكيل خفيف) ===== */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-slideUp font-ruqaa ">
                دَارُ الإِحْسَان
                {/* <br /> */}

                <span className="text-gradient-primary leading-[1.3] pb-2">
                  <br />
                  لِتَحْفِيظِ وَتَجْوِيدِ الْقُرْآنِ الْكَرِيم
                </span>
              </h1>

              {/* ===== Mobile Logo (تحت العنوان مباشرة) ===== */}
              <div className="flex sm:hidden items-center justify-center my-4 animate-fadeIn shadow-b-md  border-r-2 border-l-2">
                <p className="text-xs font-bold text-primary flex flex-col gap-3">
                  <span>بإشراف </span>
                  <span>الأزهر </span>
                  <span>الشريف </span>
                </p>
                <div className="relative h-56 w-56">
                  <Image
                    src="/azhar-logo-modern.png"
                    alt="شعار الأزهر الشريف"
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </div>
                <p className="text-xs font-bold text-muted-foreground font-medium flex flex-col gap-3">
                  <span>ترخيص </span>
                  <span>رقم 828 </span>
                  <span>لسنة 2011 </span>
                </p>
                {/* <div className="text-center flex gap-2 shadow-md rounded-md p-2">
               
                 
                </div> */}
              </div>

              {/* Description */}
              <p
                className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto animate-slideUp"
                style={{ animationDelay: "100ms" }}
              >
                رحلة إيمانية في رحاب القرآن الكريم، نقدم برامج تعليمية متميزة في الحفظ
                والتجويد بإشراف نخبة من المعلمين المتخصصين.
              </p>

              {/* Actions */}
              <div
                className="flex gap-4 justify-center animate-slideUp"
                style={{ animationDelay: "200ms" }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-primary shadow-elegant hover:shadow-glow text-lg px-8 py-6"
                  asChild
                >
                  <NavLink to="/contact">سجِّل الآن</NavLink>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6"
                >
                  <NavLink to="/about">تعرّف علينا</NavLink>
                </Button>
              </div>

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
          <SectionHeading
            title="لماذا دار الإحسان؟"
            description="نقدم لك أفضل بيئة تعليمية لحفظ وتجويد القرآن الكريم"
          />

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
      </section >

      {/* News Slider */}
      < section className="py-20 bg-accent/5" >
        <div className="container">
          <SectionHeading
            title="آخر الأخبار والفعاليات"
            description="ابقَ على اطلاع دائم بكل ما هو جديد في دار الإحسان، من تكريمات ومسابقات وفعاليات تعليمية متميزة."
          />
          <NewSlider2 initialData={initialNews} />
        </div>
      </section >

      {/* CTA Section */}
      <CTASection
        title="انضم إلى رحلتك الإيمانية"
        description="ابدأ اليوم في حفظ كتاب الله وتعلم أحكام التجويد على أيدي معلمين متخصصين"
        buttonText="تواصل معنا الآن"
        buttonLink="/contact"
      />
    </>
  );
};

export default HomePage;

