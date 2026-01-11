"use client";

import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Calendar,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export function StatsCards() {
  const [stats, setStats] = React.useState<Stats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [previousStats, setPreviousStats] = React.useState<Stats | null>(null);
  const [resendNotConfigured, setResendNotConfigured] = React.useState(false);

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/waitlist/stats");
        const data = await response.json();

        if (!response.ok && data.error) {
          // Handle Resend not configured error gracefully
          if (data.error.includes("Resend is not configured") || data.error.includes("RESEND_AUDIENCE_ID is not configured")) {
            setResendNotConfigured(true);
            setStats({ total: 0, today: 0, thisWeek: 0, thisMonth: 0 });
            return;
          }
        }

        setResendNotConfigured(false);
        if (data.stats) {
          setPreviousStats(stats);
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const calculateTrend = (current: number, previous: number | null) => {
    if (!previous || previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  const statCards = [
    {
      title: "Total Signups",
      value: stats.total,
      description: "All time signups",
      icon: Users,
      gradient: "from-primary/20 to-accent/20",
      iconBg: "bg-primary/10",
      trend: null,
    },
    {
      title: "Today",
      value: stats.today,
      description: "New signups today",
      icon: Calendar,
      gradient: "from-accent/20 to-primary/20",
      iconBg: "bg-accent/10",
      trend: calculateTrend(stats.today, previousStats?.today || null),
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      description: "Last 7 days",
      icon: TrendingUp,
      gradient: "from-primary/20 via-accent/20 to-secondary/20",
      iconBg: "bg-primary/10",
      trend: calculateTrend(stats.thisWeek, previousStats?.thisWeek || null),
    },
    {
      title: "This Month",
      value: stats.thisMonth,
      description: "Last 30 days",
      icon: Mail,
      gradient: "from-accent/20 to-primary/20",
      iconBg: "bg-accent/10",
      trend: calculateTrend(stats.thisMonth, previousStats?.thisMonth || null),
    },
  ];

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const trend = stat.trend;
        const isPositive = trend !== null && trend > 0;
        const isNegative = trend !== null && trend < 0;

        return (
          <Card
            key={stat.title}
            className={cn(
              "group relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
              isLoading && "animate-pulse"
            )}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                stat.gradient
              )}
            />
            <CardHeader className="relative z-10 p-4 sm:p-6">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <CardDescription className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    {stat.title}
                  </CardDescription>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                    {isLoading ? (
                      <span className="inline-block h-8 w-20 bg-muted animate-pulse rounded" />
                    ) : (
                      stat.value.toLocaleString()
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <CardDescription className="text-[10px] sm:text-xs text-muted-foreground">
                      {stat.description}
                    </CardDescription>
                    {trend !== null && !isLoading && (
                      <div
                        className={cn(
                          "flex items-center gap-0.5 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded",
                          isPositive &&
                            "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30",
                          isNegative &&
                            "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                        )}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="size-3" />
                        ) : (
                          <ArrowDownRight className="size-3" />
                        )}
                        <span>{Math.abs(trend).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={cn("p-2 sm:p-2.5 rounded-lg", stat.iconBg)}>
                  <stat.icon className="size-4 sm:size-5 text-primary" />
                </div>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
