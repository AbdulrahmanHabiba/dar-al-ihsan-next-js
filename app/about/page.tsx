
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <>
    {/* Page Header */}
    <section className="py-20 bg-gradient-hero">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center animate-slideUp">
          <h1 className="text-5xl font-bold mb-6">عن دار الإحسان</h1>
          <p className="text-xl text-muted-foreground">
            رسالتنا نشر القرآن الكريم وتعليم أحكام التجويد للجميع
          </p>
        </div>
      </div>
    </section>

    {/* Main Content */}
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-3xl font-bold">من نحن</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              دار الإحسان لتحفيظ وتجويد القرآن الكريم هي مؤسسة تعليمية متخصصة في تعليم القرآن الكريم وعلومه،
              تأسست على يد فضيلة الشيخ أحمد مرعي، بهدف نشر كتاب الله وتعليم أحكام التجويد لجميع الفئات العمرية.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              نحن نؤمن بأن حفظ القرآن الكريم وتعلم أحكام تلاوته هو شرف عظيم وعبادة جليلة، لذلك نسعى جاهدين لتوفير
              أفضل بيئة تعليمية تساعد طلابنا على تحقيق هذا الهدف النبيل.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              تحت إشراف نخبة من المعلمين المتخصصين في علوم القرآن والقراءات، نقدم برامج تعليمية متنوعة تناسب
              جميع المستويات، مع الحرص على تطبيق أحدث الأساليب التعليمية في مجال تحفيظ القرآن الكريم.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop"
              alt="القرآن الكريم"
              className="rounded-lg shadow-elegant w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    أن نكون المؤسسة الرائدة في تعليم القرآن الكريم وعلومه، ونشر ثقافة حفظ وتجويد القرآن في المجتمع،
                    مع تخريج أجيال متقنة لكتاب الله عاملة بأحكامه.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    توفير بيئة تعليمية متميزة لحفظ القرآن الكريم وتعلم أحكام التجويد، من خلال معلمين مؤهلين وبرامج
                    تعليمية حديثة، مع غرس القيم الإسلامية النبيلة في نفوس الطلاب.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="text-center mb-12 animate-slideUp">
          <h2 className="text-4xl font-bold mb-4">قيمنا</h2>
          <p className="text-muted-foreground text-lg">
            المبادئ التي نؤمن بها ونعمل على تحقيقها
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: "الإخلاص", description: "نبتغي بعملنا وجه الله الكريم" },
            { icon: Award, title: "الإتقان", description: "الحرص على جودة التعليم والتميز" },
            { icon: Target, title: "الالتزام", description: "الوفاء بالوعود والمسؤوليات" },
            { icon: Eye, title: "الشفافية", description: "الوضوح والمصداقية في التعامل" }
          ].map((value, index) => (
            <Card key={index} className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Supervisor Section */}
    <section className="py-20 bg-gradient-hero">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                <div className="mx-auto">
                  <div className="w-48 h-48 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                    <span className="text-6xl text-primary-foreground">أ</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <h3 className="text-3xl font-bold mb-2">الشيخ أحمد مرعي</h3>
                  <p className="text-primary text-lg mb-4">المشرف العام على الدار</p>
                  <p className="text-muted-foreground leading-relaxed">
                    فضيلة الشيخ أحمد مرعي، حافظ لكتاب الله، حاصل على إجازات في القراءات العشر، له خبرة واسعة
                    في تعليم القرآن الكريم وعلوم التجويد تمتد لأكثر من 20 عامًا. يشرف فضيلته على جميع البرامج
                    التعليمية في الدار ويحرص على تطوير المناهج بما يخدم طلاب العلم.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </>
  );

};

export default About;

