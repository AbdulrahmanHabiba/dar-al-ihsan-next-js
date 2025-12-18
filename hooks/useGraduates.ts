import { apiClient } from "@/lib/api/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export interface Graduate {
  id: number;
  name: string;
  image?: string | null;
  graduationYear: string;
  achievement?: string | null;
  moreInfo?: string | null;
}

export const useGraduates = () => {
  return useQuery({
    queryKey: ["graduates"],
    queryFn: () => apiClient<Graduate[]>("/api/graduates"),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useCreateGraduate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Graduate>) => apiClient<Graduate>("/api/graduates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["graduates"] });
    },
  });
};

export const useUpdateGraduate = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Graduate>) => apiClient<Graduate>(`/api/graduates/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["graduates"] });
    },
  });
};

export const useDeleteGraduate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient(`/api/graduates/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["graduates"] });
    },
  });
};


