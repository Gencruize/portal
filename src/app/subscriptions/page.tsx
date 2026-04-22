"use client";

import { useState } from "react";
import { Search, Calendar, DollarSign, Users, TrendingUp, CreditCard } from "lucide-react";

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
  { plan: "Starter", subscribers: 5842, revenue: 52578, color: "from-gray-400 to-gray-500", price: 9, icon: CreditCard },
  { plan: "Pro", subscribers: 4674, revenue: 135546, color: "from-primary to-primary-dark", price: 29, icon: TrendingUp },
  { plan: "Enterprise", subscribers: 2331, revenue: 230769, color: "from-purple-400 to-purple-600", price: 99, icon: DollarSign },
];

const planColors: Record<string, { bg: string; text: string; border: string }> = {
  Enterprise: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Pro: { bg: "bg-primary/5", text: "text-primary", border: "border-primary/20" },
  Starter: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
};

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
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500/20 to-green-600/10 border border-border rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-muted font-medium">Total Revenue</span>
            </div>
            <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-muted mt-1">Monthly recurring revenue</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-border rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center backdrop-blur-sm">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-muted font-medium">Total Subscribers</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalSubscribers.toLocaleString()}</p>
            <p className="text-sm text-muted mt-1">Active subscriptions</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-border rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-muted font-medium">Avg. Revenue Per User</span>
            </div>
            <p className="text-3xl font-bold text-foreground">${Math.round(totalRevenue / totalSubscribers)}</p>
            <p className="text-sm text-muted mt-1">Across all plans</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {planStats.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.plan}
              className="relative overflow-hidden bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color}`}></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${plan.color} opacity-10 rounded-full -mr-12 -mt-12 blur-xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{plan.plan}</h3>
                  </div>
                  <span className={`text-2xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>${plan.price}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subscribers</span>
                    <span className="font-bold text-foreground">{plan.subscribers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Revenue</span>
                    <span className="font-bold text-foreground">${plan.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${plan.color} transition-all duration-1000`}
                      style={{
                        width: `${(plan.subscribers / totalSubscribers) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-muted">{Math.round((plan.subscribers / totalSubscribers) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-border">
            <tr>
              {["User", "Plan", "Status", "Amount", "Cycle", "Start Date", "Next Billing"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-bold text-foreground"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSubscriptions.map((sub) => {
              const planStyle = planColors[sub.plan] || planColors.Starter;
              return (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-primary">
                          {sub.user.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{sub.user}</p>
                        <p className="text-sm text-muted">{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${planStyle.bg} ${planStyle.text} ${planStyle.border}`}
                    >
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        sub.status === "Active"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : sub.status === "Cancelled"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        sub.status === "Active" ? "bg-green-500" : sub.status === "Cancelled" ? "bg-yellow-500" : "bg-red-500"
                      }`}></span>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-bold">
                    ${sub.amount}/{sub.billingCycle.toLowerCase()}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{sub.billingCycle}</td>
                  <td className="px-6 py-4 text-sm text-muted">{sub.startDate}</td>
                  <td className="px-6 py-4 text-sm text-muted">{sub.nextBilling}</td>
                </tr>
              );
            })}
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
