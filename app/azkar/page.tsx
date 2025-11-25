"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sunrise, Sun, Sunset, Moon, Heart } from "lucide-react";

const Azkar = () => {
  const morningAzkar = [
    {
      text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      repeat: "مرة واحدة",
      benefit: "من قالها حين يصبح أُجير من الجن حتى يمسي"
    },
    {
      text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
      repeat: "مرة واحدة",
      benefit: "من أذكار الصباح المستحبة"
    },
    {
      text: "أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ، مِنْ هَمْزِهِ وَنَفْخِهِ وَنَفْثِهِ",
      repeat: "ثلاث مرات",
      benefit: "حفظ من الشيطان"
    },
    {
      text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      repeat: "ثلاث مرات",
      benefit: "لم يضره شيء حتى يمسي"
    }
  ];

  const eveningAzkar = [
    {
      text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      repeat: "مرة واحدة",
      benefit: "من قالها حين يمسي أُجير من الجن حتى يصبح"
    },
    {
      text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
      repeat: "مرة واحدة",
      benefit: "من أذكار المساء المستحبة"
    }
  ];

  const sleepAzkar = [
    {
      text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      repeat: "مرة واحدة",
      benefit: "دعاء النوم"
    },
    {
      text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      repeat: "ثلاث مرات",
      benefit: "وقاية من عذاب الله"
    }
  ];

  const ahadith = [
    {
      text: "مَنْ قَالَ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، كَانَتْ لَهُ عَدْلَ عَشْرِ رِقَابٍ، وَكُتِبَتْ لَهُ مِائَةُ حَسَنَةٍ، وَمُحِيَتْ عَنْهُ مِائَةُ سَيِّئَةٍ",
      narrator: "رواه البخاري ومسلم",
      category: "فضل الذكر"
    },
    {
      text: "مَنْ قَرَأَ آيَةَ الْكُرْسِيِّ دُبُرَ كُلِّ صَلاةٍ مَكْتُوبَةٍ لَمْ يَمْنَعْهُ مِنْ دُخُولِ الْجَنَّةِ إِلَّا أَنْ يَمُوتَ",
      narrator: "رواه النسائي",
      category: "فضل آية الكرسي"
    },
    {
      text: "أَحَبُّ الْكَلَامِ إِلَى اللَّهِ أَرْبَعٌ: سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، لَا يَضُرُّكَ بِأَيِّهِنَّ بَدَأْتَ",
      narrator: "رواه مسلم",
      category: "أفضل الكلام"
    }
  ];

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-slideUp">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
                <Heart className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold mb-6">الأذكار والأحاديث</h1>
              <p className="text-xl text-muted-foreground">
                أذكار المسلم اليومية وأحاديث نبوية مختارة
              </p>
            </div>
          </div>
        </section>

        {/* Azkar Sections */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <Tabs defaultValue="morning" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 mb-8">
                <TabsTrigger value="morning" className="gap-2">
                  <Sunrise className="h-4 w-4" />
                  <span className="hidden sm:inline">الصباح</span>
                </TabsTrigger>
                <TabsTrigger value="evening" className="gap-2">
                  <Sunset className="h-4 w-4" />
                  <span className="hidden sm:inline">المساء</span>
                </TabsTrigger>
                <TabsTrigger value="sleep" className="gap-2">
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline">النوم</span>
                </TabsTrigger>
                <TabsTrigger value="ahadith" className="gap-2">
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline">أحاديث</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="morning" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">أذكار الصباح</h2>
                  <p className="text-muted-foreground">تُقرأ بعد صلاة الفجر وحتى طلوع الشمس</p>
                </div>
                {morningAzkar.map((zikr, index) => (
                  <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary">{zikr.repeat}</Badge>
                        <div className="text-3xl font-bold text-primary">{index + 1}</div>
                      </div>
                      <p className="text-2xl leading-loose mb-4 font-serif">{zikr.text}</p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-primary font-medium">{zikr.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="evening" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">أذكار المساء</h2>
                  <p className="text-muted-foreground">تُقرأ بعد صلاة العصر وحتى غروب الشمس</p>
                </div>
                {eveningAzkar.map((zikr, index) => (
                  <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary">{zikr.repeat}</Badge>
                        <div className="text-3xl font-bold text-primary">{index + 1}</div>
                      </div>
                      <p className="text-2xl leading-loose mb-4 font-serif">{zikr.text}</p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-primary font-medium">{zikr.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sleep" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">أذكار النوم</h2>
                  <p className="text-muted-foreground">تُقرأ قبل النوم</p>
                </div>
                {sleepAzkar.map((zikr, index) => (
                  <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary">{zikr.repeat}</Badge>
                        <div className="text-3xl font-bold text-primary">{index + 1}</div>
                      </div>
                      <p className="text-2xl leading-loose mb-4 font-serif">{zikr.text}</p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-primary font-medium">{zikr.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="ahadith" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">أحاديث نبوية مختارة</h2>
                  <p className="text-muted-foreground">من السنة النبوية الشريفة</p>
                </div>
                {ahadith.map((hadith, index) => (
                  <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-gradient-gold text-foreground">{hadith.category}</Badge>
                        <div className="text-3xl font-bold text-primary">{index + 1}</div>
                      </div>
                      <p className="text-2xl leading-loose mb-4 font-serif">{hadith.text}</p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground italic">{hadith.narrator}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Heart className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl font-bold mb-6">فضل الذكر</h2>
              <div className="grid md:grid-cols-3 gap-8 text-right">
                <div>
                  <h3 className="text-2xl font-bold mb-3">طمأنينة القلب</h3>
                  <p className="opacity-90">﴿الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ﴾</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">محبة الله</h3>
                  <p className="opacity-90">من ذكر الله ذكره الله في الملأ الأعلى</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">حفظ من الشيطان</h3>
                  <p className="opacity-90">الذكر حصن من الشيطان ووساوسه</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Azkar;

