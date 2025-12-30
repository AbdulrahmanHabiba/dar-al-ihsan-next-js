"use client";

import { useQuery } from "@tanstack/react-query";
import { externalQuranService } from "@/services/external-quran.service";

// Keys for React Query
export const quranKeys = {
  all: ["quran"] as const,
  surahs: () => [...quranKeys.all, "surahs"] as const,
  pages: () => [...quranKeys.all, "pages"] as const,
  ayahs: (suraId: number) => [...quranKeys.all, "ayahs", suraId] as const,
  pageText: (page: number) => [...quranKeys.all, "pageText", page] as const,
};

export function useSurahs() {
  return useQuery({
    queryKey: quranKeys.surahs(),
    queryFn: externalQuranService.getSurahs,
    staleTime: Infinity, // Never becomes stale
    gcTime: Infinity,    // Never garbage collected
  });
}

export function usePagesImages() {
  return useQuery({
    queryKey: quranKeys.pages(),
    queryFn: externalQuranService.getPagesImages,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useAyahs(suraId: number) {
  return useQuery({
    queryKey: quranKeys.ayahs(suraId),
    queryFn: () => externalQuranService.getAyahsBySurah(suraId),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!suraId,
  });
}

export function usePageText(page: number) {
  return useQuery({
    queryKey: quranKeys.pageText(page),
    queryFn: () => externalQuranService.getPageText(page),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!page,
  });
}
