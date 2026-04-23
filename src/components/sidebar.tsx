"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const displayName = user
    ? `${user.first_name} ${user.last_name}`.trim()
    : "Admin User";

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#08b27c] flex flex-col z-50">
      {/* Logo */}
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

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-[#08b27c]"
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

      {/* User + Logout */}
      <div className="p-4 border-t border-white/20 space-y-3">
        {/* User info */}
        <div className="flex items-center gap-3 px-4 py-2">
          <Avatar name={displayName} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {displayName}
            </p>
            <p className="text-xs text-white/70 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
