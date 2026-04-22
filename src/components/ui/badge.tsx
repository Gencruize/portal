import { cn } from "@/lib/utils";
import type { Plan, UserStatus, SubscriptionStatus } from "@/lib/data";

// ─── Plan Badges ───

const planStyles: Record<Plan, string> = {
  Sage: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800",
  Premium: "bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-primary dark:border-primary/30",
  Starter: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
};

interface PlanBadgeProps {
  plan: Plan;
  className?: string;
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border",
        planStyles[plan] || planStyles.Starter,
        className
      )}
    >
      {plan}
    </span>
  );
}

// ─── User Status Badges ───

const userStatusStyles: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
  Inactive: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800",
};

interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border",
        userStatusStyles[status],
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full mr-2",
          status === "Active" ? "bg-green-500" : "bg-red-500"
        )}
      />
      {status}
    </span>
  );
}

// ─── Subscription Status Badges ───

const subscriptionStatusStyles: Record<SubscriptionStatus, string> = {
  Active: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
  Cancelled: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800",
  Expired: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800",
};

const subscriptionStatusDot: Record<SubscriptionStatus, string> = {
  Active: "bg-green-500",
  Cancelled: "bg-yellow-500",
  Expired: "bg-red-500",
};

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
  className?: string;
}

export function SubscriptionStatusBadge({ status, className }: SubscriptionStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border",
        subscriptionStatusStyles[status],
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full mr-2", subscriptionStatusDot[status])} />
      {status}
    </span>
  );
}
