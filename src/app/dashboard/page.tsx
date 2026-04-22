import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    icon: Users,
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Active Subscriptions",
    value: "3,291",
    change: "+8.2%",
    icon: CreditCard,
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Monthly Revenue",
    value: "$48,250",
    change: "+23.1%",
    icon: TrendingUp,
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Active Sessions",
    value: "1,432",
    change: "+5.7%",
    icon: Activity,
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
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
              className={`relative overflow-hidden bg-gradient-to-br ${stat.color} border border-border rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center backdrop-blur-sm`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted mt-1 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div
                key={user.email}
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-primary">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    user.plan === "Enterprise" 
                      ? "bg-purple-100 text-purple-600" 
                      : user.plan === "Pro"
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {user.plan}
                  </span>
                  <p className="text-xs text-muted mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">Subscription Distribution</h2>
          </div>
          <div className="space-y-5">
            {[
              { plan: "Starter", count: 5842, percentage: 45, color: "from-gray-400 to-gray-500", bgColor: "bg-gray-400" },
              { plan: "Pro", count: 4674, percentage: 36, color: "from-primary to-primary-dark", bgColor: "bg-primary" },
              { plan: "Enterprise", count: 2331, percentage: 19, color: "from-purple-400 to-purple-600", bgColor: "bg-purple-500" },
            ].map((item) => (
              <div key={item.plan} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.bgColor}`}></div>
                    <span className="font-semibold text-foreground">{item.plan}</span>
                  </div>
                  <span className="text-sm font-bold text-muted">{item.count.toLocaleString()} users</span>
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
              <span className="text-2xl font-bold text-foreground">12,847</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
