import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownCircle,
  ArrowRight,
  ArrowUpCircle,
  CheckCircle2,
  Clock,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import {
  useDashboardStats,
  usePendingDeposits,
  usePendingWithdrawals,
} from "../../hooks/useAdmin";
import type { DashboardStats } from "../../types";

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

interface StatCardDef {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  href?: string;
  badge?: number;
}

function buildCards(s: DashboardStats): StatCardDef[] {
  return [
    {
      label: "Total Users",
      value: s.totalUsers.toLocaleString(),
      icon: <Users className="w-5 h-5" />,
      accent: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      href: "/admin/users",
    },
    {
      label: "Pending Deposits",
      value: s.pendingDeposits,
      icon: <ArrowUpCircle className="w-5 h-5" />,
      accent: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/20",
      href: "/admin/deposits",
      badge: s.pendingDeposits,
    },
    {
      label: "Pending Withdrawals",
      value: s.pendingWithdrawals,
      icon: <ArrowDownCircle className="w-5 h-5" />,
      accent: "text-orange-400",
      bg: "bg-orange-400/10 border-orange-400/20",
      href: "/admin/withdrawals",
      badge: s.pendingWithdrawals,
    },
    {
      label: "Total Deposited",
      value: fmt(s.totalDeposited),
      icon: <TrendingUp className="w-5 h-5" />,
      accent: "text-green-400",
      bg: "bg-green-400/10 border-green-400/20",
    },
    {
      label: "Total Withdrawn",
      value: fmt(s.totalWithdrawn),
      icon: <ArrowDownCircle className="w-5 h-5" />,
      accent: "text-primary",
      bg: "bg-primary/10 border-primary/20",
    },
    {
      label: "Approved Transactions",
      value: s.approvedTransactions.toLocaleString(),
      icon: <CheckCircle2 className="w-5 h-5" />,
      accent: "text-green-400",
      bg: "bg-green-400/10 border-green-400/20",
      href: "/admin/transactions",
    },
  ];
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
        <Card key={k} className="border-border bg-card">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: pendingDeposits = [] } = usePendingDeposits();
  const { data: pendingWithdrawals = [] } = usePendingWithdrawals();

  const cards = stats ? buildCards(stats) : [];

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 space-y-8"
      data-ocid="admin_dashboard.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Layers className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Platform overview &amp; quick access
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <SkeletonGrid />
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="admin_dashboard.stats_grid"
        >
          {cards.map((card, idx) => (
            <Card
              key={card.label}
              className="border-border bg-card hover:border-primary/30 transition-smooth"
              data-ocid={`admin_dashboard.stats.item.${idx + 1}`}
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <div className={`p-1.5 rounded-lg border ${card.bg}`}>
                  <span className={card.accent}>{card.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p
                    className={`text-2xl font-display font-bold ${card.accent}`}
                  >
                    {card.value}
                  </p>
                  {card.badge !== undefined && card.badge > 0 && (
                    <span className="game-badge-pending">
                      {card.badge} pending
                    </span>
                  )}
                </div>
                {card.href && (
                  <Link to={card.href}>
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-xs text-primary"
                    >
                      View all <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pending Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Deposits Preview */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <ArrowUpCircle className="w-4 h-4 text-yellow-400" />
              Pending Deposits
            </CardTitle>
            <Link
              to="/admin/deposits"
              data-ocid="admin_dashboard.view_deposits_link"
            >
              <Button variant="ghost" size="sm" className="text-xs">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingDeposits.length === 0 ? (
              <p
                className="text-sm text-muted-foreground py-2"
                data-ocid="admin_dashboard.pending_deposits.empty_state"
              >
                No pending deposits. All clear!
              </p>
            ) : (
              <div className="space-y-2">
                {pendingDeposits.slice(0, 3).map((tx, i) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border"
                    data-ocid={`admin_dashboard.pending_deposits.item.${i + 1}`}
                  >
                    <span className="text-xs font-mono text-muted-foreground">
                      {tx.userId.slice(0, 10)}…
                    </span>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={tx.status} size="sm" />
                      <span className="font-bold text-sm text-green-400">
                        {fmt(tx.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Withdrawals Preview */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <ArrowDownCircle className="w-4 h-4 text-orange-400" />
              Pending Withdrawals
            </CardTitle>
            <Link
              to="/admin/withdrawals"
              data-ocid="admin_dashboard.view_withdrawals_link"
            >
              <Button variant="ghost" size="sm" className="text-xs">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingWithdrawals.length === 0 ? (
              <p
                className="text-sm text-muted-foreground py-2"
                data-ocid="admin_dashboard.pending_withdrawals.empty_state"
              >
                No pending withdrawals. All clear!
              </p>
            ) : (
              <div className="space-y-2">
                {pendingWithdrawals.slice(0, 3).map((tx, i) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border"
                    data-ocid={`admin_dashboard.pending_withdrawals.item.${i + 1}`}
                  >
                    <span className="text-xs font-mono text-muted-foreground">
                      {tx.userId.slice(0, 10)}…
                    </span>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={tx.status} size="sm" />
                      <span className="font-bold text-sm text-orange-400">
                        {fmt(tx.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Nav */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Quick Navigation
        </h2>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          data-ocid="admin_dashboard.quick_nav"
        >
          {[
            {
              to: "/admin/deposits",
              label: "Manage Deposits",
              icon: <ArrowUpCircle className="w-5 h-5" />,
              accent: "text-yellow-400",
            },
            {
              to: "/admin/withdrawals",
              label: "Manage Withdrawals",
              icon: <ArrowDownCircle className="w-5 h-5" />,
              accent: "text-orange-400",
            },
            {
              to: "/admin/users",
              label: "User Management",
              icon: <Users className="w-5 h-5" />,
              accent: "text-primary",
            },
            {
              to: "/admin/transactions",
              label: "All Transactions",
              icon: <Layers className="w-5 h-5" />,
              accent: "text-green-400",
            },
          ].map(({ to, label, icon, accent }, i) => (
            <Link
              key={to}
              to={to}
              data-ocid={`admin_dashboard.nav.item.${i + 1}`}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-smooth cursor-pointer h-full">
                <CardContent className="pt-5 flex flex-col items-center gap-2 text-center">
                  <div
                    className={`p-2 rounded-lg bg-muted/40 border border-border ${accent}`}
                  >
                    {icon}
                  </div>
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {label}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
