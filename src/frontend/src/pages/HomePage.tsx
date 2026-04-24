import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Gamepad2,
  LogIn,
  Shield,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useAuth } from "../hooks/useAuth";
import { useMyTransactions } from "../hooks/useTransactions";
import { useWalletBalance } from "../hooks/useWalletBalance";

const features = [
  {
    icon: Shield,
    title: "Admin-Verified Payments",
    desc: "Every deposit and withdrawal is manually reviewed by our admin team for maximum security.",
  },
  {
    icon: Zap,
    title: "Instant Balance Updates",
    desc: "Once approved, your wallet balance updates instantly — no delays, no confusion.",
  },
  {
    icon: TrendingUp,
    title: "Full Transaction History",
    desc: "Track every rupee with detailed transaction logs and real-time status updates.",
  },
];

export function HomePage() {
  const { isAuthenticated, isLoading, login, walletBalance } = useAuth();
  const { loginStatus } = useInternetIdentity();
  const { data: balance, isLoading: balanceLoading } =
    useWalletBalance(isAuthenticated);
  const { data: txns, isLoading: txnsLoading } =
    useMyTransactions(isAuthenticated);

  const displayBalance = balance ?? walletBalance ?? 0;
  const recentTxns = (txns ?? []).slice(0, 3);

  return (
    <div data-ocid="home.page" className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-card border-b border-border py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>AdminPay Games</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Your Gaming <span className="text-primary">Wallet</span>
              <br />
              Under Control
            </h1>

            <p className="text-muted-foreground text-lg max-w-md">
              Deposit funds, request withdrawals, and track every payment — all
              secured by admin approval.
            </p>

            {!isAuthenticated ? (
              <Button
                size="lg"
                onClick={() => login()}
                disabled={loginStatus === "logging-in" || isLoading}
                data-ocid="home.login_button"
                className="gap-2 px-8"
              >
                <LogIn className="w-4 h-4" />
                {loginStatus === "logging-in" ? "Connecting…" : "Login to Play"}
              </Button>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/deposit" data-ocid="home.deposit_button">
                  <Button size="lg" className="gap-2 px-6">
                    <ArrowDownLeft className="w-4 h-4" />
                    Add Money
                  </Button>
                </Link>
                <Link to="/withdraw" data-ocid="home.withdraw_button">
                  <Button size="lg" variant="outline" className="gap-2 px-6">
                    <ArrowUpRight className="w-4 h-4" />
                    Withdraw
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Wallet Balance Card (authenticated) ── */}
      {isAuthenticated && (
        <section className="bg-background py-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card
                className="border-primary/20 bg-card relative overflow-hidden max-w-md mx-auto"
                data-ocid="home.wallet_card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-primary" />
                        Wallet Balance
                      </p>
                      {balanceLoading ? (
                        <Skeleton className="h-10 w-36" />
                      ) : (
                        <p
                          className="font-display text-4xl font-bold text-foreground"
                          data-ocid="home.wallet_balance"
                        >
                          ₹
                          {displayBalance.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link
                      to="/deposit"
                      className="flex-1"
                      data-ocid="home.wallet_deposit_button"
                    >
                      <Button size="sm" className="w-full gap-1.5 text-xs">
                        <ArrowDownLeft className="w-3 h-3" />
                        Add Money
                      </Button>
                    </Link>
                    <Link
                      to="/withdraw"
                      className="flex-1"
                      data-ocid="home.wallet_withdraw_button"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full gap-1.5 text-xs"
                      >
                        <ArrowUpRight className="w-3 h-3" />
                        Withdraw
                      </Button>
                    </Link>
                    <Link
                      to="/history"
                      className="flex-1"
                      data-ocid="home.wallet_history_button"
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full gap-1.5 text-xs text-muted-foreground"
                      >
                        <Clock className="w-3 h-3" />
                        History
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent transactions preview */}
            {(txnsLoading || recentTxns.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 max-w-md mx-auto"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">
                    Recent Activity
                  </p>
                  <Link
                    to="/history"
                    data-ocid="home.view_history_link"
                    className="text-xs text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  {txnsLoading
                    ? ["a", "b", "c"].map((id) => (
                        <Skeleton key={id} className="h-14 w-full rounded-lg" />
                      ))
                    : recentTxns.map((tx, i) => (
                        <div
                          key={tx.id}
                          data-ocid={`home.recent_tx.item.${i + 1}`}
                          className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                                tx.type === "deposit"
                                  ? "bg-green-900/30 text-green-400"
                                  : "bg-orange-900/30 text-orange-400"
                              }`}
                            >
                              {tx.type === "deposit" ? (
                                <ArrowDownLeft className="w-4 h-4" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground capitalize truncate">
                                {tx.type}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(tx.createdAt).toLocaleDateString(
                                  "en-IN",
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <StatusBadge status={tx.status} size="sm" />
                            <span className="font-mono font-semibold text-sm text-foreground">
                              ₹{tx.amount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="bg-muted/30 border-t border-border py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Why AdminPay Games?
            </h2>
            <p className="text-muted-foreground text-sm">
              Built for trust, speed, and complete transparency.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            data-ocid="home.features.list"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={`home.features.item.${i + 1}`}
              >
                <Card className="bg-card border-border h-full hover:border-primary/30 transition-smooth">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1.5">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Login CTA ── */}
      {!isAuthenticated && (
        <section className="bg-background border-t border-border py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                <Gamepad2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Login with Internet Identity to access your wallet and manage
                your gaming funds.
              </p>
              <Button
                size="lg"
                onClick={() => login()}
                disabled={loginStatus === "logging-in"}
                data-ocid="home.cta_login_button"
                className="gap-2 px-8"
              >
                <LogIn className="w-4 h-4" />
                {loginStatus === "logging-in"
                  ? "Connecting…"
                  : "Login with Internet Identity"}
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
