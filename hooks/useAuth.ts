// ════════════════════════════════════════════════════════════════
// Types & Constants
// ════════════════════════════════════════════════════════════════

import { apiClient } from "@/lib/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

interface User {
  id: number;
  username: string;
  role: Role;
  name: string;
  email?: string;
}

interface RegisterData {
  username: string;
  password: string;
  name: string;
  code?: string; // جعل الكود اختياري
}

interface LoginData {
  username: string;
  password: string;
}

// ════════════════════════════════════════════════════════════════
// Register Hook
// ════════════════════════════════════════════════════════════════

const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) =>
      apiClient<{ user: User }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
};

// ════════════════════════════════════════════════════════════════
// Login Hook
// ════════════════════════════════════════════════════════════════

const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LoginData) =>
      apiClient<{ user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // حفظ بيانات المستخدم في الـ cache
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });
};

// ════════════════════════════════════════════════════════════════
// Logout Hook
// ════════════════════════════════════════════════════════════════

const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () =>
      apiClient("/api/auth/logout", {
        method: "POST",
      }),
    onSuccess: () => {
      // مسح بيانات المستخدم من الـ cache
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

// ════════════════════════════════════════════════════════════════
// Me Hook (Session)
// ════════════════════════════════════════════════════════════════

const useMe = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => apiClient<User>("/api/auth/me"),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const user = query.data;
  
  return {
    ...query,
    user,
    isLoggedIn: !!user,
    isAdmin: user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN,
    isSuperAdmin: user?.role === Role.SUPER_ADMIN,
    isTeacher: user?.role === Role.TEACHER,
    isStudent: user?.role === Role.STUDENT,
  };
};

export { useRegister, useLogin, useLogout, useMe };
