import { Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useAuth } from "../hooks/useAuth";
import { useMyTransactions } from "../hooks/useTransactions";
import { useWalletBalance } from "../hooks/useWalletBalance";

export function WalletPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: balance = 0, isLoading: balanceLoading } =
    useWalletBalance(isAuthenticated);
  const { data: txns = [], isLoading: txLoading } =
    useMyTransactions(isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="wallet.page"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-muted border border-border flex items-center justify-center mb-4">
          <Wallet className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          My Wallet
        </h2>
        <p className="text-muted-foreground mb-6">
          Login to view your wallet balance and transaction history.
        </p>
        <Button onClick={() => login()} data-ocid="wallet.login_button">
          Login to Continue
        </Button>
      </div>
    );
  }

  const totalDeposited = txns
    .filter((t) => t.type === "deposit" && t.status === "approved")
    .reduce((s, t) => s + t.amount, 0);
  const pendingCount = txns.filter((t) => t.status === "pending").length;
  const recent = txns.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8" data-ocid="wallet.page">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            My Wallet
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your balance and track transactions
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-card border-primary/30 relative overflow-hidden h-full">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, oklch(0.72 0.23 260 / 0.08), transparent 60%)",
              }}
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {balanceLoading ? (
                <Skeleton
                  className="h-10 w-32"
                  data-ocid="wallet.balance.loading_state"
                />
              ) : (
                <p
                  className="font-mono text-4xl font-bold text-foreground"
                  data-ocid="wallet.balance"
                >
                  ₹{balance.toLocaleString("en-IN")}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Total Deposited
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-2xl font-bold text-green-400">
                ₹{totalDeposited.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                approved deposits
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-2xl font-bold text-yellow-400">
                {pendingCount}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                awaiting approval
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-10">
        <Link to="/deposit" data-ocid="wallet.deposit_button">
          <Button className="gap-2">
            <ArrowDownLeft className="w-4 h-4" />
            Deposit
          </Button>
        </Link>
        <Link to="/withdraw" data-ocid="wallet.withdraw_button">
          <Button variant="outline" className="gap-2">
            <ArrowUpRight className="w-4 h-4" />
            Withdraw
          </Button>
        </Link>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Recent Transactions
          </h2>
          <Link to="/history" data-ocid="wallet.view_all_link">
            <Button variant="ghost" size="sm">
              View All →
            </Button>
          </Link>
        </div>

        {txLoading ? (
          <div className="flex flex-col gap-2">
            {["a", "b", "c", "d", "e"].map((id) => (
              <Skeleton
                key={id}
                className="h-16 w-full rounded-lg"
                data-ocid="wallet.transactions.loading_state"
              />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div
            className="text-center py-14 bg-card rounded-xl border border-border"
            data-ocid="wallet.empty_state"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center mb-3">
              <Wallet className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">
              No transactions yet
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Make your first deposit to get started!
            </p>
            <Link to="/deposit">
              <Button size="sm" data-ocid="wallet.empty_deposit_button">
                Add Money
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="flex flex-col gap-2"
            data-ocid="wallet.transactions.list"
          >
            {recent.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-smooth"
                data-ocid={`wallet.transactions.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                      tx.type === "deposit"
                        ? "bg-primary/15"
                        : "bg-orange-900/20"
                    }`}
                  >
                    {tx.type === "deposit" ? (
                      <ArrowDownLeft className="w-4 h-4 text-primary" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-orange-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground capitalize">
                      {tx.type}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <StatusBadge status={tx.status} size="sm" />
                  <p
                    className={`font-mono font-bold ${tx.type === "deposit" ? "text-green-400" : "text-orange-400"}`}
                  >
                    {tx.type === "deposit" ? "+" : "-"}₹
                    {tx.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
