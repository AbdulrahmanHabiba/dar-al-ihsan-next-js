import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "./NavLink";
import { SocialCard } from "./ui/SocialCard";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  دار الإحسان لتحفيظ القرآن وعلومه
                </h3>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2 mt-2" style={{alignItems: 'flex-start'}}>
              <div className="flex flex-col items-start text-right ">
                <span className="text-sm text-muted-foreground">تحت رعاية وإشراف الأزهر الشريف</span>
                <span className="text-sm text-muted-foreground">ترخيص رقم 828 لسنة 2011</span>
              </div>
              <span className="inline-flex justify-center items-start ms-2" style={{height: '4em'}}>
                <img src="/azhar-logo-modern.png" alt="شعار الأزهر الشريف" style={{height:"2.9em", maxHeight:"3.8em", width: "auto", objectFit:"contain"}} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  عن الدار
                </NavLink>
              </li>
              <li>
                <NavLink to="/teachers" className="text-muted-foreground hover:text-primary transition-colors">
                  المعلمون
                </NavLink>
              </li>
              <li>
                <NavLink to="/graduates" className="text-muted-foreground hover:text-primary transition-colors">
                  الخريجون
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/quran" className="text-muted-foreground hover:text-primary transition-colors">
                  المصحف الشريف
                </NavLink>
              </li>
              <li>
                <NavLink to="/azkar" className="text-muted-foreground hover:text-primary transition-colors">
                  الأذكار والأحاديث
                </NavLink>
              </li>
              <li>
                <NavLink to="/location" className="text-muted-foreground hover:text-primary transition-colors">
                  موقعنا
                </NavLink>
              </li>
              <li>
                <span className="text-muted-foreground">تحفيظ القرآن الكريم</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@dar-alihsan.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>مركز إدكو – محافظة البحيرة – شارع البحر – بجوار مسجد الشهداء</span>
              </li>
            </ul>
          </div>

          {/* Social/Official Pages */}
          <div>
            <h4 className="font-semibold mb-4">تابعنا</h4>
            <div className="flex gap-3 justify-center">
              {/* صفحة الفيسبوك */}
              <SocialCard
                name="صفحة الفيسبوك"
                url="https://www.facebook.com/profile.php?id=100013462008509"
                // استخدم Lucide facebook icon بدلاً من imgSrc
                imgSrc={undefined}
                subtitle="فيسبوك رسمي"
                iconType="facebook"
              />
              {/* جروب الفيسبوك */}
              <SocialCard
                name="جروب الفيسبوك"
                url="https://www.facebook.com/groups/1550459465114127"
                imgSrc={undefined}
                subtitle="مجموعة نقاشات"
                iconType="facebook"
              />
              {/* قناة واتساب */}
              {/* <SocialCard
                name="قناة واتساب"
                url="https://wa.me/201234567890"
                imgSrc={undefined}
                subtitle="تواصل مباشر"
                iconType="whatsapp"
              /> */}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 دار الإحسان لتحفيظ وتجويد القرآن الكريم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

