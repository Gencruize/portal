// ─── Dashboard Statistics ───

export interface DashboardUsers {
  total: number;
  subscribed: number;
  registered_only: number;
}

export interface DashboardActivity {
  searches: number;
  reverse_searches: number;
  upc_scans: number;
  go_compare_searches: number;
}

export interface DashboardRecentActivity {
  last_24_hours_logins: number;
  last_7_days_signups: number;
}

export interface DashboardStatisticsData {
  users: DashboardUsers;
  activity: DashboardActivity;
  recent_activity: DashboardRecentActivity;
}

export interface DashboardStatisticsResponse {
  status: number;
  message: string;
  data: DashboardStatisticsData;
  responseCode: string;
  meta: unknown[];
}

// ─── Activity Statistics ───

export interface ActivityStatisticsData {
  last_24_hours_logins: number;
  searches_performed: number;
  reverse_searches: number;
  upc_scans: number;
  go_compare_searches: number;
}

export interface ActivityStatisticsResponse {
  status: number;
  message: string;
  data: ActivityStatisticsData;
  responseCode: string;
  meta: unknown[];
}

// ─── Auth ───

export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string | null;
  phone: string | null;
  image: string | null;
  email_verified_at: string | null;
  account_type: string | null;
  on_trial: number;
  last_login: string | null;
  amazon_merchant_id: string | null;
  subscription_type: string | null;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: AuthUser;
  };
  responseCode: string;
  meta: unknown[];
}

// ─── Users (Placeholder for future endpoint) ───

export interface User {
  id: number;
  name: string;
  email: string;
  plan: "Starter" | "Premium" | "Sage";
  status: "Active" | "Inactive";
  joined: string;
  lastActive: string;
}

export interface UsersResponse {
  status: number;
  message: string;
  data: User[];
  responseCode: string;
  meta: unknown[];
}

// ─── Subscriptions Statistics ───

export interface SubscriptionsStatisticsData {
  total_users: number;
  subscribed_users: number;
  registered_only: number;
  subscription_rate: number;
}

export interface SubscriptionsStatisticsResponse {
  status: number;
  message: string;
  data: SubscriptionsStatisticsData;
  responseCode: string;
  meta: unknown[];
}

// ─── Subscriptions (Placeholder for future endpoint) ───

export interface Subscription {
  id: number;
  user: string;
  email: string;
  plan: "Starter" | "Premium" | "Sage";
  status: "Active" | "Cancelled" | "Expired";
  amount: number;
  billingCycle: string;
  startDate: string;
  nextBilling: string;
}

export interface SubscriptionsResponse {
  status: number;
  message: string;
  data: Subscription[];
  responseCode: string;
  meta: unknown[];
}
