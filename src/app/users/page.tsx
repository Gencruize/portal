"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { users, userStats } from "@/lib/data";
import type { UserData } from "@/lib/data";
import { StatCard } from "@/components/ui/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { PlanBadge, UserStatusBadge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";

type SortKey = keyof UserData;
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 5;

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterPlan, setFilterPlan] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlan = filterPlan === "All" || user.plan === filterPlan;
        return matchesSearch && matchesPlan;
      })
      .sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, filterPlan, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const columns: { key: SortKey; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "plan", label: "Plan" },
    { key: "status", label: "Status" },
    { key: "joined", label: "Joined" },
    { key: "lastActive", label: "Last Active" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted mt-1">Manage and view all registered users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {userStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            iconColor={stat.iconColor}
            variant="compact"
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted" />
          <select
            value={filterPlan}
            onChange={(e) => {
              setFilterPlan(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="px-6 py-4 text-left text-sm font-bold text-foreground cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    <SortIcon column={column.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-muted">
                  #{user.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} />
                    <span className="font-semibold text-foreground">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                <td className="px-6 py-4">
                  <PlanBadge plan={user.plan} />
                </td>
                <td className="px-6 py-4">
                  <UserStatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4 text-sm text-muted">{user.joined}</td>
                <td className="px-6 py-4 text-sm text-muted">
                  {user.lastActive}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No users found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted">
          Showing {filteredUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
