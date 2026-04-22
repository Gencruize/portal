import { StatCard } from "@/components/ui/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { PlanBadge } from "@/components/ui/badge";
import { dashboardStats, recentUsers, planDistribution } from "@/lib/data";

export default function DashboardPage() {
  const totalSubscriptions = planDistribution.reduce((acc, p) => acc + p.count, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">Overview of your application metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            label={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            iconColor={stat.iconColor}
            iconBg={stat.iconBg}
            change={stat.change}
            variant="featured"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-border"
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

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">
              Subscription Distribution
            </h2>
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
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
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
