"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp, User } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  joined: string;
  lastActive: string;
}

const users: UserData[] = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", plan: "Pro", status: "Active", joined: "2024-01-15", lastActive: "2 min ago" },
  { id: 2, name: "James Wilson", email: "james@example.com", plan: "Enterprise", status: "Active", joined: "2024-01-14", lastActive: "15 min ago" },
  { id: 3, name: "Maria Garcia", email: "maria@example.com", plan: "Starter", status: "Active", joined: "2024-01-13", lastActive: "1 hour ago" },
  { id: 4, name: "Alex Kim", email: "alex@example.com", plan: "Pro", status: "Inactive", joined: "2024-01-12", lastActive: "2 days ago" },
  { id: 5, name: "Lisa Brown", email: "lisa@example.com", plan: "Starter", status: "Active", joined: "2024-01-11", lastActive: "3 hours ago" },
  { id: 6, name: "David Lee", email: "david@example.com", plan: "Enterprise", status: "Active", joined: "2024-01-10", lastActive: "5 min ago" },
  { id: 7, name: "Emma Davis", email: "emma@example.com", plan: "Pro", status: "Active", joined: "2024-01-09", lastActive: "1 hour ago" },
  { id: 8, name: "Michael Johnson", email: "michael@example.com", plan: "Starter", status: "Inactive", joined: "2024-01-08", lastActive: "1 week ago" },
  { id: 9, name: "Sophie Turner", email: "sophie@example.com", plan: "Pro", status: "Active", joined: "2024-01-07", lastActive: "30 min ago" },
  { id: 10, name: "Ryan Martinez", email: "ryan@example.com", plan: "Enterprise", status: "Active", joined: "2024-01-06", lastActive: "10 min ago" },
];

const planColors: Record<string, { bg: string; text: string; border: string }> = {
  Enterprise: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Pro: { bg: "bg-primary/5", text: "text-primary", border: "border-primary/20" },
  Starter: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
};

type SortKey = keyof UserData;
type SortOrder = "asc" | "desc";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterPlan, setFilterPlan] = useState<string>("All");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users
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

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted mt-1">Manage and view all registered users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: "12,847", color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-500" },
          { label: "Active Users", value: "10,234", color: "from-green-500/20 to-green-600/10", iconColor: "text-green-500" },
          { label: "New Today", value: "+48", color: "from-purple-500/20 to-purple-600/10", iconColor: "text-purple-500" },
          { label: "Pro Users", value: "4,674", color: "from-primary/20 to-primary/10", iconColor: "text-primary" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} border border-border rounded-xl p-4`}
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className={`text-sm font-medium ${stat.iconColor}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted" />
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
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
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-border">
            <tr>
              {[
                { key: "id" as SortKey, label: "ID" },
                { key: "name" as SortKey, label: "Name" },
                { key: "email" as SortKey, label: "Email" },
                { key: "plan" as SortKey, label: "Plan" },
                { key: "status" as SortKey, label: "Status" },
                { key: "joined" as SortKey, label: "Joined" },
                { key: "lastActive" as SortKey, label: "Last Active" },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="px-6 py-4 text-left text-sm font-bold text-foreground cursor-pointer hover:bg-gray-100 transition-colors"
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
            {filteredUsers.map((user) => {
              const planStyle = planColors[user.plan] || planColors.Starter;
              return (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-muted">#{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-primary">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${planStyle.bg} ${planStyle.text} ${planStyle.border}`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{user.joined}</td>
                  <td className="px-6 py-4 text-sm text-muted">{user.lastActive}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No users found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>Showing {filteredUsers.length} of {users.length} users</span>
      </div>
    </div>
  );
}
