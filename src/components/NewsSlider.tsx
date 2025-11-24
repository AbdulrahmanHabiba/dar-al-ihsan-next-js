import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "تكريم الطلاب المتفوقين في حفظ القرآن الكريم",
    description: "تم تكريم مجموعة من الطلاب المتفوقين الذين أتموا حفظ القرآن الكريم كاملاً بتجويد متقن",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "بدء التسجيل للفصل الدراسي الجديد",
    description: "فتح باب التسجيل للطلاب الجدد في جميع المستويات، مع توفير منح دراسية للمتفوقين",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "محاضرة خاصة في علم التجويد",
    description: "أقيمت محاضرة قيمة في أحكام التجويد بحضور فضيلة الشيخ أحمد مرعي",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1584286595398-a59f21d25edc?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "مسابقة حفظ القرآن الكريم السنوية",
    description: "إطلاق المسابقة السنوية لحفظ القرآن الكريم بجوائز قيمة للفائزين",
    date: "2024-02-28",
    image: "https://images.unsplash.com/photo-1585069146208-6d0e1f495b00?w=800&auto=format&fit=crop"
  }
];

const NewsSlider = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container">
        <div className="text-center mb-12 animate-slideUp">
          <h2 className="text-4xl font-bold mb-4">آخر الأخبار</h2>
          <p className="text-muted-foreground text-lg">
            تابع أحدث الفعاليات والأنشطة في دار الإحسان
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {newsItems.map((news) => (
              <CarouselItem key={news.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={news.date}>
                        {new Date(news.date).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{news.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-auto left-4" />
          <CarouselNext className="left-auto right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsSlider;
