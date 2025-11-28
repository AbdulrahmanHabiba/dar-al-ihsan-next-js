import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  return (
   <>
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          يسعدنا تواصلك معنا في أي وقت.  
          يمكنك من خلال هذا النموذج إرسال <span className="font-semibold text-foreground">استفسار عام</span>  
          أو <span className="font-semibold text-foreground">شكاوى واقتراحات</span> 
          بخصوص الدار أو أنشطتنا.  
          نحرص دائمًا على قراءة جميع الرسائل والرد في أقرب وقت ممكن.
        </p>
      </div>

      <ContactForm submitButtonText="إرسال" />
    </div>
  </div>
</>

  );
};

export default Contact;


/**
 <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-muted-foreground text-lg">
              نحن هنا للإجابة على جميع استفساراتكم
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
 */