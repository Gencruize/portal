import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  color?: string;
  iconColor?: string;
  iconBg?: string;
  change?: string;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function StatCard({
  label,
  value,
  icon,
  color = "from-gray-500/20 to-gray-600/10",
  iconColor = "text-gray-500",
  iconBg = "bg-gray-500/10",
  change,
  className,
  variant = "default",
}: StatCardProps) {
  const Icon = icon;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          `bg-gradient-to-br ${color} border border-border rounded-xl p-4`,
          className
        )}
      >
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className={cn("text-sm font-medium", iconColor)}>{label}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        `relative overflow-hidden bg-gradient-to-br ${color} border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300`,
        variant === "featured" && "hover:scale-[1.02]",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm",
                iconBg
              )}
            >
              <Icon className={cn("w-6 h-6", iconColor)} />
            </div>
          )}
          {change && (
            <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {change}
            </span>
          )}
        </div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
}
