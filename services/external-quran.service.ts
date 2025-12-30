import { ApiError } from "@/lib/api/error";

const BASE_URL = "https://quran.yousefheiba.com/api";

export interface Sura {
  number: string;
  name_ar: string;
  name_en: string;
  type: string;
  ayat_count: string;
}

export interface QuranPageImage {
  page_number: number;
  page_url: string;
}

export interface PagesResponse {
  status: string;
  total_pages: number;
  pages: QuranPageImage[];
}

export interface Ayah {
  id: string;
  number: string;
  text: string;
  number_in_surah: string;
  page: string;
  surah_id: string;
}

// Simple fetcher for external APIs
async function fetchExternal<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw ApiError.internal(`Failed to fetch from Quran API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.internal("Network error or invalid API response");
  }
}

export const externalQuranService = {
  getSurahs: () => fetchExternal<Sura[]>("/surahs"),
  
  getAyahsBySurah: (number: number) => 
    fetchExternal<Ayah[]>(`/ayah?number=${number}`),
  
  getPagesImages: () => 
    fetchExternal<PagesResponse>("/quranPagesImage"),
    
  getAzkar: () => fetchExternal<any>("/azkar"),
  
  getDuas: () => fetchExternal<any>("/duas"),
  
  getReciters: () => fetchExternal<any>("/reciters"),
  
  getPrayerTimes: () => fetchExternal<any>("/getPrayerTimes"),
  
  getPageText: (page: number) => 
    fetchExternal<any>(`/quranPagesText?page=${page}`),

  getPageAudioUrl: (reciter: string, page: number) => {
    const formatted = page.toString().padStart(3, '0');
    return `https://quran.yousefheiba.com/api/reciterAudio?reciter=${reciter}&page=${formatted}`;
  }
};
