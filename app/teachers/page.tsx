import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, GraduationCap } from "lucide-react";

const Teachers = () => {
  const teachers = [
    {
      name: "الشيخ محمد أحمد",
      title: "مدرس القراءات",
      specialization: "القراءات العشر",
      experience: "15 سنة",
      qualifications: ["إجازة في القراءات العشر", "ماجستير في علوم القرآن"],
      image: "https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDk5fHx8ZW58MHx8fHx8"
    },
    {
      name: "الشيخ عبد الرحمن علي",
      title: "مدرس التجويد",
      specialization: "أحكام التجويد",
      experience: "12 سنة",
      qualifications: ["إجازة في حفص عن عاصم", "دبلوم التجويد"],
      image: "https://plus.unsplash.com/premium_photo-1678652915205-7ff6449ce78b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyMHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "الأستاذة فاطمة محمود",
      title: "معلمة القرآن",
      specialization: "تحفيظ القرآن للأطفال",
      experience: "10 سنوات",
      qualifications: ["إجازة في رواية حفص", "دورات تربوية متخصصة"],
      image: "https://plus.unsplash.com/premium_photo-1678559129864-8307ef614d4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzNXx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "الأستاذة عائشة حسن",
      title: "معلمة التجويد",
      specialization: "تجويد القرآن الكريم",
      experience: "8 سنوات",
      qualifications: ["إجازة في رواية حفص", "ليسانس دراسات إسلامية"],
      image: "https://plus.unsplash.com/premium_photo-1679412451975-866e51d7d9fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0NHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "الشيخ ياسر إبراهيم",
      title: "مدرس علوم القرآن",
      specialization: "التفسير وعلوم القرآن",
      experience: "18 سنة",
      qualifications: ["دكتوراه في التفسير", "إجازة في القراءات السبع"],
      image: "https://plus.unsplash.com/premium_photo-1677699514992-05511883de1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0NXx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "الأستاذة زينب خالد",
      title: "معلمة القرآن للكبار",
      specialization: "تحفيظ وتجويد",
      experience: "9 سنوات",
      qualifications: ["إجازة في رواية حفص", "دبلوم التربية الإسلامية"],
      image: "https://plus.unsplash.com/premium_photo-1738776254643-b853838818bf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-slideUp">
              <h1 className="text-5xl font-bold mb-6">معلمونا</h1>
              <p className="text-xl text-muted-foreground">
                نخبة من المعلمين المتخصصين في علوم القرآن والتجويد
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary mb-3">
                  <BookOpen className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-1">50+</div>
                <div className="text-muted-foreground">معلم ومعلمة</div>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary mb-3">
                  <Award className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-1">200+</div>
                <div className="text-muted-foreground">إجازة معتمدة</div>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary mb-3">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-1">15+</div>
                <div className="text-muted-foreground">سنة خبرة</div>
              </div>
            </div>
          </div>
        </section>

        {/* Teachers Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <Card key={index} className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{teacher.name}</h3>
                    <p className="text-primary font-medium mb-3">{teacher.title}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{teacher.specialization}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">الخبرة:</span> {teacher.experience}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">المؤهلات:</p>
                      <ul className="space-y-1">
                        {teacher.qualifications.map((qual, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto animate-slideUp">
              <h2 className="text-4xl font-bold mb-4">هل تريد الانضمام لفريق المعلمين؟</h2>
              <p className="text-xl mb-8 opacity-90">
                إذا كنت حاصلاً على إجازة في القرآن الكريم ولديك خبرة في التدريس، نرحب بانضمامك لفريقنا
              </p>
              <button className="px-8 py-4 bg-background text-foreground rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-elegant">
                تواصل معنا
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Teachers;

