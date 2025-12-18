import { apiClient } from "@/lib/api/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export interface Teacher {
  id: number;
  name: string;
  gender?: "MALE" | "FEMALE" | null;
  phone?: string | null;
  specialty?: string | null;
  email?: string | null;
  _count?: {
    students: number;
    groups: number;
  };
}

export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => apiClient<Teacher[]>("/api/teachers"),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Teacher>) => apiClient<Teacher>("/api/teachers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};

export const useUpdateTeacher = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Teacher>) => apiClient<Teacher>(`/api/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient(`/api/teachers/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
