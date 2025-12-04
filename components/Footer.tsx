import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "./NavLink";
import { SocialCard } from "./SocialCard";
import Image from "next/image";
import FooterCopyright from "./FooterCopyright";

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
            <div className="flex flex-row items-start gap-2 mt-2" style={{ alignItems: 'flex-start' }}>
              <div className="flex flex-col items-start text-right ">
                <span className="text-sm text-muted-foreground">تحت رعاية وإشراف الأزهر الشريف</span>
                <span className="text-sm text-muted-foreground">ترخيص رقم 828 لسنة 2011</span>
              </div>
              <span className="inline-flex justify-center items-start ms-2 relative" style={{ height: '4em', width: '3.5em' }}>
                <Image
                  src="/azhar-logo-modern.png"
                  alt="شعار الأزهر الشريف"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
                <span>01159556715</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@dar-alihsan.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-6 w-6" />
                <span>مركز إدكو – محافظة البحيرة – شارع البحر – بجوار مسجد الشهداء</span>
              </li>
            </ul>
          </div>
        </div>

          {/* Social/Official Pages */}
          <div className="text-center mt-4">
            <h4 className="font-semibold text-center bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">تابعنا على منصات التواصل .</h4>
            <div className="flex justify-center items-center gap-3 flex-col md:flex-row">
              {/* صفحة الفيسبوك */}
              <SocialCard
                name="صفحة الدار على الفيسبوك"
                url="https://www.facebook.com/profile.php?id=100013462008509"
                imgSrc={"https://scontent.fcai11-1.fna.fbcdn.net/v/t39.30808-1/238374365_1278677039257684_6726629224603724103_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=103&ccb=1-7&_nc_sid=9a2c5d&_nc_eui2=AeHWYXdLcPMc9nNa43mCDW0sOWYeh1zbub05Zh6HXNu5vdpTK8bw23g7Ry23QT2vAEck2tTWBi-nNgZmNKRAj11B&_nc_ohc=8H_9UuG2-JUQ7kNvwE1Y3sh&_nc_oc=Adk55onBCPkOu5ZZGYUq0FrSZDU32HdCQ7InBC2-S5kEN93DPaU3Zz7oZXIw3-UTlBg&_nc_zt=24&_nc_ht=scontent.fcai11-1.fna&_nc_gid=Y86O3y5ecNC1WyFgiUXWyA&oh=00_AfjjHC3SWJJGcIGYLOmnueo1U3DIawV0ACpqsvB87Ifvdg&oe=69306F50"}
                subtitle="الحساب الرسمي للدار"
                iconType="facebook"
              />
              {/* جروب الفيسبوك */}
              <SocialCard
                name="جروب الدار على الفيسبوك"
                url="https://www.facebook.com/groups/1550459465114127"
                imgSrc={"https://scontent.fcai11-1.fna.fbcdn.net/v/t1.6435-9/92219348_930040607454664_7874757111979180032_n.jpg?stp=c56.0.332.332a_cp0_dst-jpg_s75x225_tt6&_nc_cat=101&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeF97k3cw9gYeiUyY3QHqMk1wN6XTQMPdSDA3pdNAw91ILVeFvqflAR17VGzWlvz52o6ejDzGXeXDtA4gjWEmW6X&_nc_ohc=MuPIEmT9n7AQ7kNvwGwt2sB&_nc_oc=AdmIdRspMg9xV4sPnCSuB2nMOckxqfpF0_dlMy-Za-nFGECYqkAHYr-iTAetwQe8uW8&_nc_zt=23&_nc_ht=scontent.fcai11-1.fna&_nc_gid=Y86O3y5ecNC1WyFgiUXWyA&oh=00_Afi2mBZozjl2mxOghb57pubgk-dRVgR-Cgetld2emJqPSQ&oe=6951EB5F"}
                subtitle="مجموعة الأخبار و النقاشات"
                iconType="facebook"
              />
              {/* قناة الواتساب */}
              <SocialCard
                name="قناة الدار على الواتساب"
                url="https://wa.me/201159556715"
                imgSrc={undefined}
                subtitle="اخر الأخبار على واتساب"
                iconType="whatsapp"
              />
            </div>
          </div>

        <div className="mt-12 pb-10 pt-5 border-t border-border text-center text-sm text-muted-foreground">
          {/* <p>© 2025 دار الإحسان لتحفيظ وتجويد القرآن الكريم. جميع الحقوق محفوظة.</p> */}
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/*
git add .
git commit -m "update footer"
git push
*/