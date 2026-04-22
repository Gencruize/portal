"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
