
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Location = () => {
  return (
    <>
      {/* Page Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-slideUp">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
              <MapPin className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              دار الإحسان لتحفيظ القرآن وعلومه <br /> <Badge className="text-2xl bg-gradient-gold text-foreground shadow-elegant">مدينة إدكو، محافظة البحيرة</Badge>
            </h1>
            <div className="flex flex-col items-center gap-2 mb-4">
              <span className="text-md text-muted-foreground font-semibold">تحت رعاية وإشراف الأزهر الشريف &ndash; ترخيص رقم 828 لسنة 2011</span>
              <img src="/azhar-logo-modern.png" alt="شعار الأزهر الشريف" style={{ height: 32, width: "auto" }} />
            </div>
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
                <p className="text-sm text-muted-foreground">
                  مركز إدكو – محافظة البحيرة – شارع البحر بجوار مسجد الشهداء
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold mb-2">الهاتف</h3>
                <p className="text-sm text-muted-foreground" dir="ltr">01159556715</p>
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
                <p className="text-sm text-muted-foreground">السبت - الخميس<br />8 ص - 8 م</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d213.05044661311987!2d30.2933174!3d31.309075!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f67d00084871b5%3A0x35aa9aa6d1a377f7!2z2K_Yp9ixINin2YTYpdit2LPYp9mGICjYp9mE2YXZgtixKQ!5e0!3m2!1sar!2seg!4v1764229060989!5m2!1sar!2seg" width="100%"
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
                <div className="mb-6">
                  <p className="leading-relaxed space-y-1">
                    تقع دار الإحسان لتحفيظ وتجويد القرآن الكريم في مركز إدكو – محافظة البحيرة،
                    في شارع البحر بحري مسجد الشهداء.
                    <br />
                    <span className="font-semibold text-foreground">• بالقرب من صيدلية د/ نعيم سعيد (الجديدة)</span>
                    <br />
                    <span className="font-semibold text-foreground">• و ورشة الإيطالية للرخام والجرانيت (بشارع البحر) </span>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">المواصلات العامة (التاكسي):</h3>
                  <p className="mr-4">
                    اركب لشارع البحر، وانزل بعد مسجد الشهداء بحوالي 200–300 متر،
                    واسأل عن "دار الإحسان".
                  </p>
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
    </>
  );
};

export default Location;

