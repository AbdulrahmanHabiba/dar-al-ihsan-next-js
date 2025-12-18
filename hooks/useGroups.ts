import { apiClient } from "@/lib/api/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export interface Group {
  id: number;
  name: "MON_THU" | "SAT_TUE" | "SUN_WED";
  time?: string | null;
  moreInfo?: string | null;
  teacherId?: number | null;
  teacher?: { name: string };
  _count?: { students: number };
}

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => apiClient<Group[]>("/api/groups"),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Group>) => apiClient<Group>("/api/groups", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useUpdateGroup = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Group>) => apiClient<Group>(`/api/groups/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient(`/api/groups/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
