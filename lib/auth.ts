// Simple authentication utility for temporary admin login

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin1234";
const STORAGE_KEY = "dar_al_ihsan_admin_user";

export interface AuthUser {
  email: string;
  isAuthenticated: boolean;
}

/**
 * Login function - validates credentials against env variables
 */
export function login(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const user: AuthUser = {
      email: ADMIN_EMAIL,
      isAuthenticated: true,
    };
    
    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    
    return true;
  }
  
  return false;
}

/**
 * Logout function - removes user from localStorage
 */
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const user = JSON.parse(stored) as AuthUser;
    return user.isAuthenticated ? user : null;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const user = getCurrentUser();
  return user?.isAuthenticated === true;
}
