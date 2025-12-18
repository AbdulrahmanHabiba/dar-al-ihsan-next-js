import { apiClient } from "@/lib/api/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export interface MagazineItem {
  id: number;
  category: "STUDENT_OF_THE_MONTH" | "TEACHER_OF_THE_MONTH";
  month: string;
  name: string;
  moreInfo?: string | null;
  achievement?: string | null;
  image?: string | null;
  published: boolean;
  createdAt?: string;
}

export const useMagazine = () => {
  return useQuery({
    queryKey: ["magazine"],
    queryFn: () => apiClient<MagazineItem[]>("/api/magazine"),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

export const useCreateMagazine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<MagazineItem>) => apiClient<MagazineItem>("/api/magazine", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["magazine"] });
    },
  });
};

export const useUpdateMagazine = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<MagazineItem>) => apiClient<MagazineItem>(`/api/magazine/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["magazine"] });
    },
  });
};

export const useDeleteMagazine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient(`/api/magazine/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["magazine"] });
    },
  });
};

