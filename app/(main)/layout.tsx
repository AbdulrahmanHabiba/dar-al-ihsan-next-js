import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingActionButton
        type="whatsapp"
        phoneNumber="+201159556715"
        message="مرحباً، أود الاستفسار عن دار الإحسان لتحفيظ القرآن الكريم"
      />
      <Toaster position="top-center" richColors />
    </>
  );
}
