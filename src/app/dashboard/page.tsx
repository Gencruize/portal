import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Active Subscriptions",
    value: "3,291",
    change: "+8.2%",
    icon: CreditCard,
    trend: "up",
  },
  {
    title: "Monthly Revenue",
    value: "$48,250",
    change: "+23.1%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Active Sessions",
    value: "1,432",
    change: "+5.7%",
    icon: Activity,
    trend: "up",
  },
];

const recentUsers = [
  { name: "Sarah Chen", email: "sarah@example.com", plan: "Pro", date: "2 min ago" },
  { name: "James Wilson", email: "james@example.com", plan: "Enterprise", date: "15 min ago" },
  { name: "Maria Garcia", email: "maria@example.com", plan: "Starter", date: "1 hour ago" },
  { name: "Alex Kim", email: "alex@example.com", plan: "Pro", date: "2 hours ago" },
  { name: "Lisa Brown", email: "lisa@example.com", plan: "Starter", date: "3 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">Overview of your application metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Users</h2>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {user.plan}
                  </span>
                  <p className="text-xs text-muted mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Subscription Distribution</h2>
          <div className="space-y-4">
            {[
              { plan: "Starter", count: 5842, percentage: 45, color: "bg-gray-300" },
              { plan: "Pro", count: 4674, percentage: 36, color: "bg-primary" },
              { plan: "Enterprise", count: 2331, percentage: 19, color: "bg-primary/60" },
            ].map((item) => (
              <div key={item.plan}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{item.plan}</span>
                  <span className="text-sm text-muted">{item.count.toLocaleString()} users</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted">Total Subscriptions</span>
              <span className="text-xl font-bold text-foreground">12,847</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
