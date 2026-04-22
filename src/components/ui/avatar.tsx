import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface AvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({ name, className, size = "md" }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-sm shrink-0",
        sizeMap[size],
        className
      )}
    >
      <span className="font-bold text-primary">{getInitials(name)}</span>
    </div>
  );
}
