import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Location = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-slideUp">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
                <MapPin className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold mb-6">موقعنا</h1>
              <p className="text-xl text-muted-foreground">
                نحن في انتظارك، تفضل بزيارتنا في أي وقت
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="shadow-elegant text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">العنوان</h3>
                  <p className="text-sm text-muted-foreground">القاهرة، مصر</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">الهاتف</h3>
                  <p className="text-sm text-muted-foreground" dir="ltr">+20 123 456 7890</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                  <p className="text-sm text-muted-foreground" dir="ltr">info@dar-alihsan.com</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4">
                    <Clock className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">أوقات العمل</h3>
                  <p className="text-sm text-muted-foreground">السبت - الخميس<br/>8 ص - 8 م</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-20">
          <div className="container max-w-6xl">
            <Card className="overflow-hidden shadow-elegant">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative">
                  {/* Google Maps Embed - يمكن استبدال src بالرابط الحقيقي */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.33652974631!2d31.223096!3d30.044420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 shadow-elegant">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">كيف تصل إلينا؟</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    تقع دار الإحسان لتحفيظ وتجويد القرآن الكريم في موقع متميز وسهل الوصول إليه في قلب القاهرة.
                  </p>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">بالمواصلات العامة:</h3>
                    <ul className="space-y-1 mr-4">
                      <li>• متاح المترو - أقرب محطة: [اسم المحطة]</li>
                      <li>• الحافلات: خطوط [أرقام الخطوط]</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">بالسيارة:</h3>
                    <p>متوفر موقف سيارات مجاني للزوار</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto animate-slideUp">
              <MapPin className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl font-bold mb-4">تفضل بزيارتنا</h2>
              <p className="text-xl mb-8 opacity-90">
                سنكون سعداء باستقبالك والإجابة على جميع استفساراتك
              </p>
              <button className="px-8 py-4 bg-background text-foreground rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-elegant">
                حدد موعد زيارة
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Location;
