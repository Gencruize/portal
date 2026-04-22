"use client";

import { useState } from "react";
import { Search, Calendar, DollarSign, Users } from "lucide-react";

interface Subscription {
  id: number;
  user: string;
  email: string;
  plan: string;
  status: string;
  amount: number;
  billingCycle: string;
  startDate: string;
  nextBilling: string;
}

const subscriptions: Subscription[] = [
  { id: 1, user: "Sarah Chen", email: "sarah@example.com", plan: "Pro", status: "Active", amount: 29, billingCycle: "Monthly", startDate: "2024-01-15", nextBilling: "2024-02-15" },
  { id: 2, user: "James Wilson", email: "james@example.com", plan: "Enterprise", status: "Active", amount: 99, billingCycle: "Monthly", startDate: "2024-01-14", nextBilling: "2024-02-14" },
  { id: 3, user: "Maria Garcia", email: "maria@example.com", plan: "Starter", status: "Active", amount: 9, billingCycle: "Monthly", startDate: "2024-01-13", nextBilling: "2024-02-13" },
  { id: 4, user: "Alex Kim", email: "alex@example.com", plan: "Pro", status: "Cancelled", amount: 29, billingCycle: "Monthly", startDate: "2024-01-12", nextBilling: "-" },
  { id: 5, user: "Lisa Brown", email: "lisa@example.com", plan: "Starter", status: "Active", amount: 9, billingCycle: "Annual", startDate: "2024-01-11", nextBilling: "2025-01-11" },
  { id: 6, user: "David Lee", email: "david@example.com", plan: "Enterprise", status: "Active", amount: 99, billingCycle: "Annual", startDate: "2024-01-10", nextBilling: "2025-01-10" },
  { id: 7, user: "Emma Davis", email: "emma@example.com", plan: "Pro", status: "Active", amount: 29, billingCycle: "Monthly", startDate: "2024-01-09", nextBilling: "2024-02-09" },
  { id: 8, user: "Michael Johnson", email: "michael@example.com", plan: "Starter", status: "Expired", amount: 9, billingCycle: "Monthly", startDate: "2024-01-08", nextBilling: "-" },
];

const planStats = [
  { plan: "Starter", subscribers: 5842, revenue: 52578, color: "bg-muted", price: 9 },
  { plan: "Pro", subscribers: 4674, revenue: 135546, color: "bg-primary", price: 29 },
  { plan: "Enterprise", subscribers: 2331, revenue: 230769, color: "bg-primary/60", price: 99 },
];

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || sub.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = planStats.reduce((acc, plan) => acc + plan.revenue, 0);
  const totalSubscribers = planStats.reduce((acc, plan) => acc + plan.subscribers, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted mt-1">Manage and monitor all subscriptions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted mt-1">Monthly recurring revenue</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted">Total Subscribers</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalSubscribers.toLocaleString()}</p>
          <p className="text-sm text-muted mt-1">Active subscriptions</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted">Avg. Revenue Per User</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${Math.round(totalRevenue / totalSubscribers)}</p>
          <p className="text-sm text-muted mt-1">Across all plans</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {planStats.map((plan) => (
          <div
            key={plan.plan}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{plan.plan}</h3>
              <span className="text-2xl font-bold text-primary">${plan.price}</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted">Subscribers</span>
                <span className="font-medium text-foreground">{plan.subscribers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Revenue</span>
                <span className="font-medium text-foreground">${plan.revenue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-background rounded-full h-2 mt-2">
                <div
                  className={`${plan.color} h-2 rounded-full`}
                  style={{
                    width: `${(plan.subscribers / totalSubscribers) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              {["User", "Plan", "Status", "Amount", "Cycle", "Start Date", "Next Billing"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-semibold text-muted"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSubscriptions.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-background/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {sub.user.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{sub.user}</p>
                      <p className="text-sm text-muted">{sub.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sub.plan === "Enterprise"
                        ? "bg-purple-500/10 text-purple-400"
                        : sub.plan === "Pro"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    {sub.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sub.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : sub.status === "Cancelled"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground font-medium">
                  ${sub.amount}/{sub.billingCycle.toLowerCase()}
                </td>
                <td className="px-6 py-4 text-sm text-muted">{sub.billingCycle}</td>
                <td className="px-6 py-4 text-sm text-muted">{sub.startDate}</td>
                <td className="px-6 py-4 text-sm text-muted">{sub.nextBilling}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No subscriptions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
