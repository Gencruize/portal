"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar-bg flex flex-col">
      <div className="p-6 bg-white flex items-center justify-center">
        <Link href="/dashboard" className="block">
          <Image
            src="/Optisage-Logo.svg"
            alt="optisage.ai"
            width={160}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-sidebar-bg"
                      : "text-white hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20 space-y-2">
        <ThemeToggle />
        <div className="px-4 py-3 rounded-lg bg-white/10">
          <p className="text-xs text-white/60">Portal v1.0</p>
          <p className="text-xs text-white/80 mt-1">No login required</p>
        </div>
      </div>
    </aside>
  );
}
