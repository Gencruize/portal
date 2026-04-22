"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  joined: string;
  lastActive: string;
}

const users: User[] = [
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

type SortKey = keyof User;
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

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted" />
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
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
                  className="px-6 py-4 text-left text-sm font-semibold text-muted cursor-pointer hover:text-foreground transition-colors"
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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-background/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-muted">#{user.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.plan === "Enterprise"
                        ? "bg-purple-500/10 text-purple-400"
                        : user.plan === "Pro"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted">{user.joined}</td>
                <td className="px-6 py-4 text-sm text-muted">{user.lastActive}</td>
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

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>Showing {filteredUsers.length} of {users.length} users</span>
      </div>
    </div>
  );
}
