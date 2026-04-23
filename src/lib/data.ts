import { CreditCard, TrendingUp, DollarSign, Users, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Shared Types ───

export type Plan = "Starter" | "Premium" | "Sage";
export type UserStatus = "Active" | "Inactive";
export type SubscriptionStatus = "Active" | "Cancelled" | "Expired";

// ─── Recent Users (Dashboard — sample data until endpoint provided) ───

export interface RecentUser {
  name: string;
  email: string;
  plan: Plan;
  date: string;
}

const MOCK_USERS = [
  { name: "Peter Optisage", email: "peter@optisage.ai" },
  { name: "Simeon Optisage", email: "simeon@optisage.ai" },
  { name: "Kudirat Otisage", email: "kudirat@optisage.ai" },
  { name: "Nne Optisage", email: "nne@optisage.ai" },
  { name: "Babatunde Optisage", email: "babatunde@optisage.ai" },
];

export const recentUsers: RecentUser[] = [
  { ...MOCK_USERS[0], plan: "Premium", date: "2 min ago" },
  { ...MOCK_USERS[1], plan: "Sage", date: "15 min ago" },
  { ...MOCK_USERS[2], plan: "Starter", date: "1 hour ago" },
  { ...MOCK_USERS[3], plan: "Premium", date: "2 hours ago" },
  { ...MOCK_USERS[4], plan: "Starter", date: "3 hours ago" },
];

// ─── Plan Distribution (Dashboard — sample data until endpoint provided) ───

export interface PlanDistribution {
  plan: Plan;
  count: number;
  percentage: number;
  color: string;
  bgColor: string;
}

export const planDistribution: PlanDistribution[] = [
  { plan: "Starter", count: 0, percentage: 0, color: "from-gray-400 to-gray-500", bgColor: "bg-gray-400" },
  { plan: "Premium", count: 0, percentage: 0, color: "from-primary to-primary-dark", bgColor: "bg-primary" },
  { plan: "Sage", count: 0, percentage: 0, color: "from-purple-400 to-purple-600", bgColor: "bg-purple-500" },
];

// ─── Users Page ───

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
  { id: 1, ...MOCK_USERS[0], plan: "Premium", status: "Active", joined: "2024-01-15", lastActive: "2 min ago" },
  { id: 2, ...MOCK_USERS[1], plan: "Sage", status: "Active", joined: "2024-01-14", lastActive: "15 min ago" },
  { id: 3, ...MOCK_USERS[2], plan: "Starter", status: "Active", joined: "2024-01-13", lastActive: "1 hour ago" },
  { id: 4, ...MOCK_USERS[3], plan: "Premium", status: "Inactive", joined: "2024-01-12", lastActive: "2 days ago" },
  { id: 5, ...MOCK_USERS[4], plan: "Starter", status: "Active", joined: "2024-01-11", lastActive: "3 hours ago" },
  { id: 6, ...MOCK_USERS[0], plan: "Sage", status: "Active", joined: "2024-01-10", lastActive: "5 min ago" },
  { id: 7, ...MOCK_USERS[1], plan: "Premium", status: "Active", joined: "2024-01-09", lastActive: "1 hour ago" },
  { id: 8, ...MOCK_USERS[2], plan: "Starter", status: "Inactive", joined: "2024-01-08", lastActive: "1 week ago" },
  { id: 9, ...MOCK_USERS[3], plan: "Premium", status: "Active", joined: "2024-01-07", lastActive: "30 min ago" },
  { id: 10, ...MOCK_USERS[4], plan: "Sage", status: "Active", joined: "2024-01-06", lastActive: "10 min ago" },
];

export const userStats = [
  { label: "Total Users", value: "0", color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-500" },
  { label: "Active Users", value: "0", color: "from-green-500/20 to-green-600/10", iconColor: "text-green-500" },
  { label: "New Today", value: "0", color: "from-purple-500/20 to-purple-600/10", iconColor: "text-purple-500" },
  { label: "Premium Users", value: "0", color: "from-primary/20 to-primary/10", iconColor: "text-primary" },
];

// ─── Subscriptions Page ───

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
  { id: 1, user: MOCK_USERS[0].name, email: MOCK_USERS[0].email, plan: "Premium", status: "Active", amount: 0, billingCycle: "Monthly", startDate: "2024-01-15", nextBilling: "2024-02-15" },
  { id: 2, user: MOCK_USERS[1].name, email: MOCK_USERS[1].email, plan: "Sage", status: "Active", amount: 0, billingCycle: "Monthly", startDate: "2024-01-14", nextBilling: "2024-02-14" },
  { id: 3, user: MOCK_USERS[2].name, email: MOCK_USERS[2].email, plan: "Starter", status: "Active", amount: 0, billingCycle: "Monthly", startDate: "2024-01-13", nextBilling: "2024-02-13" },
  { id: 4, user: MOCK_USERS[3].name, email: MOCK_USERS[3].email, plan: "Premium", status: "Cancelled", amount: 0, billingCycle: "Monthly", startDate: "2024-01-12", nextBilling: "-" },
  { id: 5, user: MOCK_USERS[4].name, email: MOCK_USERS[4].email, plan: "Starter", status: "Active", amount: 0, billingCycle: "Annual", startDate: "2024-01-11", nextBilling: "2025-01-11" },
  { id: 6, user: MOCK_USERS[0].name, email: MOCK_USERS[0].email, plan: "Sage", status: "Active", amount: 0, billingCycle: "Annual", startDate: "2024-01-10", nextBilling: "2025-01-10" },
  { id: 7, user: MOCK_USERS[1].name, email: MOCK_USERS[1].email, plan: "Premium", status: "Active", amount: 0, billingCycle: "Monthly", startDate: "2024-01-09", nextBilling: "2024-02-09" },
  { id: 8, user: MOCK_USERS[2].name, email: MOCK_USERS[2].email, plan: "Starter", status: "Expired", amount: 0, billingCycle: "Monthly", startDate: "2024-01-08", nextBilling: "-" },
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
  { plan: "Starter", subscribers: 0, revenue: 0, color: "from-gray-400 to-gray-500", price: 35, icon: CreditCard },
  { plan: "Premium", subscribers: 0, revenue: 0, color: "from-primary to-primary-dark", price: 79, icon: TrendingUp },
  { plan: "Sage", subscribers: 0, revenue: 0, color: "from-purple-400 to-purple-600", price: 199, icon: DollarSign },
];

export const subscriptionSummaryStats = [
  { label: "Total Revenue", value: "$0", icon: DollarSign, color: "from-green-500/20 to-green-600/10", iconColor: "text-green-600", iconBg: "bg-green-500/10" },
  { label: "Total Subscribers", value: "0", icon: Users, color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-600", iconBg: "bg-blue-500/10" },
  { label: "Avg. Revenue Per User", value: "$0", icon: Calendar, color: "from-purple-500/20 to-purple-600/10", iconColor: "text-purple-600", iconBg: "bg-purple-500/10" },
];
