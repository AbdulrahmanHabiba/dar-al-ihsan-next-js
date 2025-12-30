import { ContactForm } from "@/components/ContactForm";

const Complaints = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">الشكاوى والاقتراحات</h1>
            <p className="text-muted-foreground text-lg">
              نرحب بجميع ملاحظاتكم واقتراحاتكم لتحسين خدماتنا
            </p>
          </div>
          <ContactForm
            title="قدم شكوى أو اقتراح"
            description="رأيك يهمنا. شاركنا ملاحظاتك واقتراحاتك"
            submitButtonText="إرسال"
          />
        </div>
      </div>
    </>
  );
};

export default Complaints;
