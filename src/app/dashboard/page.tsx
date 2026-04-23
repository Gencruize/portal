"use client";

import { Users, CreditCard, UserPlus, Search, RotateCcw, ScanBarcode, ArrowLeftRight, LogIn, UserCheck, AlertTriangle, RefreshCw } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { StatCard } from "@/components/ui/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { PlanBadge } from "@/components/ui/badge";
import { recentUsers, planDistribution } from "@/lib/data";

export default function DashboardPage() {
  const { data, loading, error, refetch } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted text-sm font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-muted mb-6">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  const totalSubscriptions = planDistribution.reduce((acc, p) => acc + p.count, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">Overview of your application metrics</p>
      </div>

      {/* Users Stats */}
      <div className="mb-2">
        <h2 className="text-sm font-bold text-muted uppercase tracking-wider">Users</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Users"
          value={data?.users.total.toLocaleString() ?? "0"}
          icon={Users}
          color="from-blue-500/20 to-blue-600/10"
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
          variant="featured"
        />
        <StatCard
          label="Subscribed Users"
          value={data?.users.subscribed.toLocaleString() ?? "0"}
          icon={CreditCard}
          color="from-purple-500/20 to-purple-600/10"
          iconColor="text-purple-500"
          iconBg="bg-purple-500/10"
          variant="featured"
        />
        <StatCard
          label="Registered Only"
          value={data?.users.registered_only.toLocaleString() ?? "0"}
          icon={UserPlus}
          color="from-orange-500/20 to-orange-600/10"
          iconColor="text-orange-500"
          iconBg="bg-orange-500/10"
          variant="featured"
        />
      </div>

      {/* Activity Stats */}
      <div className="mb-2">
        <h2 className="text-sm font-bold text-muted uppercase tracking-wider">Activity</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Searches"
          value={data?.activity.searches.toLocaleString() ?? "0"}
          icon={Search}
          color="from-green-500/20 to-green-600/10"
          iconColor="text-green-500"
          iconBg="bg-green-500/10"
          variant="featured"
        />
        <StatCard
          label="Reverse Searches"
          value={data?.activity.reverse_searches.toLocaleString() ?? "0"}
          icon={RotateCcw}
          color="from-indigo-500/20 to-indigo-600/10"
          iconColor="text-indigo-500"
          iconBg="bg-indigo-500/10"
          variant="featured"
        />
        <StatCard
          label="UPC Scans"
          value={data?.activity.upc_scans.toLocaleString() ?? "0"}
          icon={ScanBarcode}
          color="from-pink-500/20 to-pink-600/10"
          iconColor="text-pink-500"
          iconBg="bg-pink-500/10"
          variant="featured"
        />
        <StatCard
          label="Go Compare"
          value={data?.activity.go_compare_searches.toLocaleString() ?? "0"}
          icon={ArrowLeftRight}
          color="from-cyan-500/20 to-cyan-600/10"
          iconColor="text-cyan-500"
          iconBg="bg-cyan-500/10"
          variant="featured"
        />
      </div>

      {/* Recent Activity Stats */}
      <div className="mb-2">
        <h2 className="text-sm font-bold text-muted uppercase tracking-wider">Recent Activity</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          label="Last 24h Logins"
          value={data?.recent_activity.last_24_hours_logins.toLocaleString() ?? "0"}
          icon={LogIn}
          color="from-yellow-500/20 to-yellow-600/10"
          iconColor="text-yellow-500"
          iconBg="bg-yellow-500/10"
          variant="featured"
        />
        <StatCard
          label="Last 7d Signups"
          value={data?.recent_activity.last_7_days_signups.toLocaleString() ?? "0"}
          icon={UserCheck}
          color="from-teal-500/20 to-teal-600/10"
          iconColor="text-teal-500"
          iconBg="bg-teal-500/10"
          variant="featured"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users — mock data until endpoint provided */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
            <span className="ml-auto text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">Sample Data</span>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} />
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <PlanBadge plan={user.plan} />
                  <p className="text-xs text-muted mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Distribution — mock data until endpoint provided */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">
              Subscription Distribution
            </h2>
            <span className="ml-auto text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">Sample Data</span>
          </div>
          <div className="space-y-5">
            {planDistribution.map((item) => (
              <div key={item.plan} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.bgColor}`} />
                    <span className="font-semibold text-foreground">{item.plan}</span>
                  </div>
                  <span className="text-sm font-bold text-muted">
                    {item.count.toLocaleString()} users
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-muted">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted font-medium">Total Subscriptions</span>
              <span className="text-2xl font-bold text-foreground">
                {totalSubscriptions.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
