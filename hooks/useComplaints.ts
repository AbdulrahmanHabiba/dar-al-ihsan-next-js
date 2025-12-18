import { apiClient } from "@/lib/api/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export interface Complaint {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const useComplaints = () => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: () => apiClient<Complaint[]>("/api/complaints"),
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Complaint>) => apiClient<Complaint>("/api/complaints", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
};

export const useMarkComplaintAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient(`/api/complaints/${id}`, {
      method: "PUT",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
};

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient(`/api/complaints/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
};


