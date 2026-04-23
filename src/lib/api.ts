import axios, { AxiosInstance, AxiosError } from "axios";
import { getToken, removeToken, removeUser } from "./auth";
import type {
  DashboardStatisticsResponse,
  ActivityStatisticsResponse,
  UsersResponse,
  SubscriptionsResponse,
  SubscriptionsStatisticsResponse,
  LoginRequest,
  LoginResponse,
} from "./types";

const API_BASE_URL = "https://api-staging.optisage.ai/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: inject auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: unified error handling + 401 logout
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("[API] Unauthorized request — clearing session");
      removeToken();
      removeUser();
      if (typeof window !== "undefined" && window.location.pathname !== "/auth/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ───

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
  return response.data;
}

// ─── Dashboard ───

export async function getDashboardStatistics(): Promise<DashboardStatisticsResponse> {
  const response = await apiClient.get<DashboardStatisticsResponse>(
    "/admin/statistics/dashboard"
  );
  return response.data;
}

export async function getActivityStatistics(): Promise<ActivityStatisticsResponse> {
  const response = await apiClient.get<ActivityStatisticsResponse>(
    "/admin/statistics/activity"
  );
  return response.data;
}

// ─── Users (Placeholder — endpoint to be provided later) ───

export async function getUsers(): Promise<UsersResponse> {
  // TODO: Replace with actual endpoint when provided
  // const response = await apiClient.get<UsersResponse>("/admin/users");
  // return response.data;
  throw new Error("getUsers() is a placeholder — endpoint not yet provided");
}

export async function getUserById(_id: number): Promise<unknown> {
  // TODO: Replace with actual endpoint when provided
  throw new Error("getUserById() is a placeholder — endpoint not yet provided");
}

// ─── Subscriptions Statistics ───

export async function getSubscriptionStatistics(): Promise<SubscriptionsStatisticsResponse> {
  const response = await apiClient.get<SubscriptionsStatisticsResponse>(
    "/admin/statistics/subscriptions"
  );
  return response.data;
}

// ─── Subscriptions (Placeholder — endpoint to be provided later) ───

export async function getSubscriptions(): Promise<SubscriptionsResponse> {
  // TODO: Replace with actual endpoint when provided
  // const response = await apiClient.get<SubscriptionsResponse>("/admin/subscriptions");
  // return response.data;
  throw new Error("getSubscriptions() is a placeholder — endpoint not yet provided");
}

export async function getSubscriptionById(_id: number): Promise<unknown> {
  // TODO: Replace with actual endpoint when provided
  throw new Error("getSubscriptionById() is a placeholder — endpoint not yet provided");
}

export default apiClient;
