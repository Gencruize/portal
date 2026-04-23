"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { login as apiLogin } from "@/lib/api";
import {
  setToken,
  removeToken,
  getUser,
  setUser as setStoredUser,
  removeUser,
} from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import type { AuthUser } from "@/lib/types";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function RedirectSpinner({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-muted text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(() => getUser());
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = !!user;
  const isLoginPage = pathname === "/login";
  const needsLoginRedirect = !isAuth && !isLoginPage;
  const needsDashboardRedirect = isAuth && isLoginPage;

  // Route guards — still trigger the actual navigation
  useEffect(() => {
    if (needsLoginRedirect) {
      router.replace("/login");
    } else if (needsDashboardRedirect) {
      router.replace("/dashboard");
    }
  }, [needsLoginRedirect, needsDashboardRedirect, router]);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await apiLogin({ email, password });
      if (response.status === 200 && response.data) {
        setToken(response.data.token);
        setStoredUser(response.data.user);
        setUserState(response.data.user);
      } else {
        throw new Error(response.message || "Login failed");
      }
    },
    []
  );

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setUserState(null);
    router.replace("/login");
  }, [router]);

  // Block rendering of protected content while redirecting.
  // This prevents any flash of dashboard / login pages.
  if (needsLoginRedirect) {
    return <RedirectSpinner message="Redirecting to login..." />;
  }

  if (needsDashboardRedirect) {
    return <RedirectSpinner message="Redirecting to dashboard..." />;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: isAuth, isLoading: false, login, logout }}
    >
      <div className="min-h-full flex bg-background">
        {!isLoginPage && <Sidebar />}
        <main
          className={`flex-1 overflow-auto ${isLoginPage ? "" : "ml-64"}`}
        >
          {children}
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
