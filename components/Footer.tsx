"use client";

import {  Mail, MapPin, Phone, Globe } from "lucide-react";
import { NavLink } from "./NavLink";
import { SocialCard } from "./SocialCard";
import { usePathname } from "next/navigation";



const Footer = () => {
  const pathname = usePathname();
const isDashboard = pathname?.startsWith("/dashboard");

if (isDashboard) {
  return <div className="mt-20"></div> ;
}
return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section - Compact with Enhanced Map */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg flex-shrink-0">
                <BookOpen className="h-5 w-5 text-white" />
              </div> */}
              <div className="flex-1 min-w-0 mt-[-35px]">
                <h3 className="font-bold text-base leading-tight mb-1">
                  دار الإحسان لتحفيظ وتجويد القرآن
                </h3>
                <div className="flex items-center gap-2">
                  {/* <div className="relative h-12 w-10 flex-shrink-0">
                    <Image
                      src="/azhar-logo-modern.png"
                      alt="شعار الأزهر"
                      fill
                      className="object-contain"
                    />
                  </div> */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-tight flex gap-3">
                    <p>تحت إشراف الأزهر الشريف</p>
                    <p className="text-slate-500">ترخيص 828/2011</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Map - Bigger & More Prominent */}
            <div className="rounded-xl overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-52 bg-slate-200 dark:bg-slate-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d213.05044661311987!2d30.2933174!3d31.309075!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f67d00084871b5%3A0x35aa9aa6d1a377f7!2z2K/Yp9ixINin2YTYpdit2LPYp9mGICjYp9mE2YXZgtixKQ!5e0!3m2!1sar!2seg!4v1764229060989!5m2!1sar!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-300 dark:border-slate-600">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink 
                  to="/" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  عن الدار
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/teachers" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  المعلمون
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/graduates" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  الخريجون
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-300 dark:border-slate-600">
              خدماتنا
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink 
                  to="/quran" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  المصحف الشريف
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/azkar" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  الأذكار والأحاديث
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/location" 
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:w-2 transition-all"></span>
                  موقعنا بالتفصيل
                </NavLink>
              </li>
              <li className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                تحفيظ القرآن الكريم
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-300 dark:border-slate-600">
              تواصل معنا
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="tel:01159556715"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors">
                    <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm">01159556715</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@dar-alihsan.com"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors">
                    <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm break-all">info@dar-alihsan.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm leading-relaxed">
                  مركز إدكو – البحيرة – شارع البحر
                </span>
              </li>
            </ul>
          </div>
        </div>        

        {/* Social/Official Pages */}
        <div className="text-center mt-8">
        <h4 className="font-semibold text-center bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">تابعنا على منصات التواصل .</h4>

          <div className="flex justify-center items-center gap-3 flex-col md:flex-row">
            {/* صفحة الفيسبوك */}
            <SocialCard
              name="صفحة الدار على الفيسبوك"
              url="https://www.facebook.com/profile.php?id=100013462008509"
              imgSrc="https://scontent.fcai11-1.fna.fbcdn.net/v/t39.30808-1/238374365_1278677039257684_6726629224603724103_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=103&ccb=1-7&_nc_sid=9a2c5d&_nc_eui2=AeHWYXdLcPMc9nNa43mCDW0sOWYeh1zbub05Zh6HXNu5vdpTK8bw23g7Ry23QT2vAEck2tTWBi-nNgZmNKRAj11B&_nc_ohc=8H_9UuG2-JUQ7kNvwE1Y3sh&_nc_oc=Adk55onBCPkOu5ZZGYUq0FrSZDU32HdCQ7InBC2-S5kEN93DPaU3Zz7oZXIw3-UTlBg&_nc_zt=24&_nc_ht=scontent.fcai11-1.fna&_nc_gid=Y86O3y5ecNC1WyFgiUXWyA&oh=00_AfjjHC3SWJJGcIGYLOmnueo1U3DIawV0ACpqsvB87Ifvdg&oe=69306F50"
              subtitle="الحساب الرسمي للدار"
              iconType="facebook"
            />
            {/* جروب الفيسبوك */}
            <SocialCard
              name="جروب الدار على الفيسبوك"
              url="https://www.facebook.com/groups/1550459465114127"
              imgSrc="https://scontent.fcai11-1.fna.fbcdn.net/v/t1.6435-9/92219348_930040607454664_7874757111979180032_n.jpg?stp=c56.0.332.332a_cp0_dst-jpg_s75x225_tt6&_nc_cat=101&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeF97k3cw9gYeiUyY3QHqMk1wN6XTQMPdSDA3pdNAw91ILVeFvqflAR17VGzWlvz52o6ejDzGXeXDtA4gjWEmW6X&_nc_ohc=MuPIEmT9n7AQ7kNvwGwt2sB&_nc_oc=AdmIdRspMg9xV4sPnCSuB2nMOckxqfpF0_dlMy-Za-nFGECYqkAHYr-iTAetwQe8uW8&_nc_zt=23&_nc_ht=scontent.fcai11-1.fna&_nc_gid=Y86O3y5ecNC1WyFgiUXWyA&oh=00_Afi2mBZozjl2mxOghb57pubgk-dRVgR-Cgetld2emJqPSQ&oe=6951EB5F"
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
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function FooterCopyright() {
  return (
    <section className="pt-6 pb-4 text-center text-sm text-muted-foreground">
      <p className="text-xs sm:text-sm">
        جميع الحقوق محفوظة © 2025 - دار الإحسان لتحفيظ وتجويد القرآن الكريم.
      </p>

      <div className="mt-3 flex items-center justify-center gap-6">
        <a
          href="https://abdulrahman-habiba.vercel.app"
          className="flex items-center gap-2 text-xs sm:text-sm hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Globe className="h-4 w-4" />
          <span>موقع المطوّر</span>
        </a>

        <a
          href="https://wa.me/201113951795"
          className="flex items-center gap-2 text-xs sm:text-sm hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Phone className="h-4 w-4" />
          <span>تواصل واتساب</span>
        </a>
      </div>

      <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground">
        تطوير وبرمجة: عبدالرحمن حبيبة
      </p>
    </section>
  );
}