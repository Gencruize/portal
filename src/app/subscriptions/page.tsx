"use client";

import { useState, useMemo } from "react";
import { DollarSign, Users, Calendar } from "lucide-react";
import { subscriptions, planStats } from "@/lib/data";

import { StatCard } from "@/components/ui/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { PlanBadge, SubscriptionStatusBadge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All" || sub.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const totalRevenue = planStats.reduce((acc, plan) => acc + plan.revenue, 0);
  const totalSubscribers = planStats.reduce((acc, plan) => acc + plan.subscribers, 0);
  const arpu = Math.round(totalRevenue / totalSubscribers);

  const totalPages = Math.ceil(filteredSubscriptions.length / ITEMS_PER_PAGE);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted mt-1">Manage and monitor all subscriptions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-green-500/20 to-green-600/10"
          iconColor="text-green-600"
          iconBg="bg-green-500/10"
        />
        <StatCard
          label="Total Subscribers"
          value={totalSubscribers.toLocaleString()}
          icon={Users}
          color="from-blue-500/20 to-blue-600/10"
          iconColor="text-blue-600"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          label="Avg. Revenue Per User"
          value={`$${arpu}`}
          icon={Calendar}
          color="from-purple-500/20 to-purple-600/10"
          iconColor="text-purple-600"
          iconBg="bg-purple-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {planStats.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.plan}
              className="relative overflow-hidden bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color}`} />
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${plan.color} opacity-10 rounded-full -mr-12 -mt-12 blur-xl`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{plan.plan}</h3>
                  </div>
                  <span className={`text-2xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    ${plan.price}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subscribers</span>
                    <span className="font-bold text-foreground">
                      {plan.subscribers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Revenue</span>
                    <span className="font-bold text-foreground">
                      ${plan.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${plan.color} transition-all duration-1000`}
                      style={{
                        width: `${(plan.subscribers / totalSubscribers) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-muted">
                      {Math.round((plan.subscribers / totalSubscribers) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
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
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-border">
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
            {paginatedSubscriptions.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={sub.user} />
                    <div>
                      <p className="font-semibold text-foreground">{sub.user}</p>
                      <p className="text-sm text-muted">{sub.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PlanBadge plan={sub.plan} />
                </td>
                <td className="px-6 py-4">
                  <SubscriptionStatusBadge status={sub.status} />
                </td>
                <td className="px-6 py-4 text-sm text-foreground font-bold">
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

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted">
          Showing {filteredSubscriptions.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredSubscriptions.length)} of{" "}
          {filteredSubscriptions.length} subscriptions
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
