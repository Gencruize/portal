import { Users, CreditCard, TrendingUp, Activity, DollarSign, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Dashboard ───

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  iconBg: string;
}

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    icon: Users,
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Active Subscriptions",
    value: "3,291",
    change: "+8.2%",
    icon: CreditCard,
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Monthly Revenue",
    value: "$48,250",
    change: "+23.1%",
    icon: TrendingUp,
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Active Sessions",
    value: "1,432",
    change: "+5.7%",
    icon: Activity,
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
  },
];

export interface RecentUser {
  name: string;
  email: string;
  plan: Plan;
  date: string;
}

export const recentUsers: RecentUser[] = [
  { name: "Sarah Chen", email: "sarah@example.com", plan: "Premium", date: "2 min ago" },
  { name: "James Wilson", email: "james@example.com", plan: "Sage", date: "15 min ago" },
  { name: "Maria Garcia", email: "maria@example.com", plan: "Starter", date: "1 hour ago" },
  { name: "Alex Kim", email: "alex@example.com", plan: "Premium", date: "2 hours ago" },
  { name: "Lisa Brown", email: "lisa@example.com", plan: "Starter", date: "3 hours ago" },
];

export interface PlanDistribution {
  plan: Plan;
  count: number;
  percentage: number;
  color: string;
  bgColor: string;
}

export const planDistribution: PlanDistribution[] = [
  { plan: "Starter", count: 5842, percentage: 45, color: "from-gray-400 to-gray-500", bgColor: "bg-gray-400" },
  { plan: "Premium", count: 4674, percentage: 36, color: "from-primary to-primary-dark", bgColor: "bg-primary" },
  { plan: "Sage", count: 2331, percentage: 19, color: "from-purple-400 to-purple-600", bgColor: "bg-purple-500" },
];

// ─── Users ───

export type Plan = "Starter" | "Premium" | "Sage";
export type UserStatus = "Active" | "Inactive";

export interface UserData {
  id: number;
  name: string;
  email: string;
  plan: Plan;
  status: UserStatus;
  joined: string;
  lastActive: string;
}

export const users: UserData[] = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", plan: "Premium", status: "Active", joined: "2024-01-15", lastActive: "2 min ago" },
  { id: 2, name: "James Wilson", email: "james@example.com", plan: "Sage", status: "Active", joined: "2024-01-14", lastActive: "15 min ago" },
  { id: 3, name: "Maria Garcia", email: "maria@example.com", plan: "Starter", status: "Active", joined: "2024-01-13", lastActive: "1 hour ago" },
  { id: 4, name: "Alex Kim", email: "alex@example.com", plan: "Premium", status: "Inactive", joined: "2024-01-12", lastActive: "2 days ago" },
  { id: 5, name: "Lisa Brown", email: "lisa@example.com", plan: "Starter", status: "Active", joined: "2024-01-11", lastActive: "3 hours ago" },
  { id: 6, name: "David Lee", email: "david@example.com", plan: "Sage", status: "Active", joined: "2024-01-10", lastActive: "5 min ago" },
  { id: 7, name: "Emma Davis", email: "emma@example.com", plan: "Premium", status: "Active", joined: "2024-01-09", lastActive: "1 hour ago" },
  { id: 8, name: "Michael Johnson", email: "michael@example.com", plan: "Starter", status: "Inactive", joined: "2024-01-08", lastActive: "1 week ago" },
  { id: 9, name: "Sophie Turner", email: "sophie@example.com", plan: "Premium", status: "Active", joined: "2024-01-07", lastActive: "30 min ago" },
  { id: 10, name: "Ryan Martinez", email: "ryan@example.com", plan: "Sage", status: "Active", joined: "2024-01-06", lastActive: "10 min ago" },
];

export const userStats = [
  { label: "Total Users", value: "12,847", color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-500" },
  { label: "Active Users", value: "10,234", color: "from-green-500/20 to-green-600/10", iconColor: "text-green-500" },
  { label: "New Today", value: "+48", color: "from-purple-500/20 to-purple-600/10", iconColor: "text-purple-500" },
  { label: "Premium Users", value: "4,674", color: "from-primary/20 to-primary/10", iconColor: "text-primary" },
];

// ─── Subscriptions ───

export type SubscriptionStatus = "Active" | "Cancelled" | "Expired";

export interface Subscription {
  id: number;
  user: string;
  email: string;
  plan: Plan;
  status: SubscriptionStatus;
  amount: number;
  billingCycle: string;
  startDate: string;
  nextBilling: string;
}

export const subscriptions: Subscription[] = [
  { id: 1, user: "Sarah Chen", email: "sarah@example.com", plan: "Premium", status: "Active", amount: 29, billingCycle: "Monthly", startDate: "2024-01-15", nextBilling: "2024-02-15" },
  { id: 2, user: "James Wilson", email: "james@example.com", plan: "Sage", status: "Active", amount: 99, billingCycle: "Monthly", startDate: "2024-01-14", nextBilling: "2024-02-14" },
  { id: 3, user: "Maria Garcia", email: "maria@example.com", plan: "Starter", status: "Active", amount: 9, billingCycle: "Monthly", startDate: "2024-01-13", nextBilling: "2024-02-13" },
  { id: 4, user: "Alex Kim", email: "alex@example.com", plan: "Premium", status: "Cancelled", amount: 29, billingCycle: "Monthly", startDate: "2024-01-12", nextBilling: "-" },
  { id: 5, user: "Lisa Brown", email: "lisa@example.com", plan: "Starter", status: "Active", amount: 9, billingCycle: "Annual", startDate: "2024-01-11", nextBilling: "2025-01-11" },
  { id: 6, user: "David Lee", email: "david@example.com", plan: "Sage", status: "Active", amount: 99, billingCycle: "Annual", startDate: "2024-01-10", nextBilling: "2025-01-10" },
  { id: 7, user: "Emma Davis", email: "emma@example.com", plan: "Premium", status: "Active", amount: 29, billingCycle: "Monthly", startDate: "2024-01-09", nextBilling: "2024-02-09" },
  { id: 8, user: "Michael Johnson", email: "michael@example.com", plan: "Starter", status: "Expired", amount: 9, billingCycle: "Monthly", startDate: "2024-01-08", nextBilling: "-" },
];

export interface PlanStat {
  plan: Plan;
  subscribers: number;
  revenue: number;
  color: string;
  price: number;
  icon: LucideIcon;
}

export const planStats: PlanStat[] = [
  { plan: "Starter", subscribers: 5842, revenue: 52578, color: "from-gray-400 to-gray-500", price: 9, icon: CreditCard },
  { plan: "Premium", subscribers: 4674, revenue: 135546, color: "from-primary to-primary-dark", price: 29, icon: TrendingUp },
  { plan: "Sage", subscribers: 2331, revenue: 230769, color: "from-purple-400 to-purple-600", price: 99, icon: DollarSign },
];

export const subscriptionSummaryStats = [
  { label: "Total Revenue", value: "$418,893", icon: DollarSign, color: "from-green-500/20 to-green-600/10", iconColor: "text-green-600", iconBg: "bg-green-500/10" },
  { label: "Total Subscribers", value: "12,847", icon: Users, color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-600", iconBg: "bg-blue-500/10" },
  { label: "Avg. Revenue Per User", value: "$33", icon: Calendar, color: "from-purple-500/20 to-purple-600/10", iconColor: "text-purple-600", iconBg: "bg-purple-500/10" },
];
