"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useCreateComplaint } from "@/hooks/useComplaints";

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100).optional().or(z.literal('')),
  phone: z.string().min(10, { message: "رقم الجوال يجب أن يكون 10 أرقام على الأقل" }).max(20),
  subject: z.string().min(3, { message: "الموضوع مطلوب" }),
  message: z.string().min(10, { message: "الرسالة يجب أن تكون 10 أحرف على الأقل" }).max(1000),
});

interface ContactFormProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  onSuccess?: () => void;
}

export const ContactForm = ({ 
  title = "تواصل معنا",
  description = "يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت",
  submitButtonText = "إرسال",
  onSuccess
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const createComplaintMutation = useCreateComplaint();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      subject: "استفسار عام",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await createComplaintMutation.mutateAsync({
        name: values.name || "زائر",
        phone: values.phone,
        subject: values.subject,
        message: values.message,
      });

      toast({
        title: "تم الإرسال بنجاح",
        description: "شكراً لتواصلك معنا. سنقوم بالرد عليك قريباً",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال الرسالة. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-elegant border-primary/10">
      <CardHeader className="bg-primary/5 border-b mb-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>الاسم (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسمك" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الموبايل</FormLabel>
                    <FormControl>
                      <Input placeholder="05xxxxxxxx" {...field} dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الموضوع</FormLabel>
                  <FormControl>
                    <Input placeholder="عنوان الرسالة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرسالة</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب رسالتك أو شكواك هنا بالتفصيل..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg h-12 bg-gradient-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
