import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-muted-foreground text-lg">
              نحن هنا للإجابة على جميع استفساراتكم
            </p>
          </div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
