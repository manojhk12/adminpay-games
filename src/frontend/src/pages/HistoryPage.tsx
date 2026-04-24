import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  Dices,
  History,
  SortDesc,
  TrendingDown,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { useAuth } from "../hooks/useAuth";
import { useMyBets } from "../hooks/useGames";
import { useMyTransactions } from "../hooks/useTransactions";
import type {
  BetRecord,
  GameResult,
  GameType,
  Transaction,
  TransactionType,
} from "../types";

// ── Types ─────────────────────────────────────────────────────────────────────

type MainTab = "transactions" | "games";
type FilterType = "all" | TransactionType;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatGameType(gameType: GameType): string {
  switch (gameType) {
    case "coinFlip":
      return "Coin Flip";
    case "diceRoll":
      return "Dice Roll";
    case "roulette":
      return "Roulette";
  }
}

function formatGameResult(result: GameResult): string {
  if (result === "heads") return "Heads";
  if (result === "tails") return "Tails";
  if (result === "red") return "Red";
  if (result === "black") return "Black";
  if (typeof result === "object" && "dice" in result)
    return `Dice ${result.dice}`;
  return String(result);
}

function GameTypeIcon({ gameType }: { gameType: GameType }) {
  if (gameType === "coinFlip")
    return <Coins className="w-4 h-4 text-primary" />;
  if (gameType === "diceRoll")
    return <Dices className="w-4 h-4 text-secondary-foreground" />;
  // roulette
  return <span className="text-sm leading-none">🎰</span>;
}

// ── Transaction sub-components ────────────────────────────────────────────────

const filterTabs: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "deposit", label: "Deposits" },
  { key: "withdrawal", label: "Withdrawals" },
];

function TxCard({ tx, index }: { tx: Transaction; index: number }) {
  const isDeposit = tx.type === "deposit";
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-smooth"
      data-ocid={`history.transactions.item.${index + 1}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
            isDeposit ? "bg-primary/15" : "bg-orange-900/20"
          }`}
        >
          {isDeposit ? (
            <ArrowDownLeft className="w-4 h-4 text-primary" />
          ) : (
            <ArrowUpRight className="w-4 h-4 text-orange-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-foreground capitalize">{tx.type}</p>
            <StatusBadge status={tx.status} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(tx.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {tx.adminNote && (
            <p className="text-xs text-muted-foreground italic mt-0.5 truncate max-w-xs">
              Admin note: {tx.adminNote}
            </p>
          )}
          {tx.withdrawalDestination?.upiId && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs font-mono">
              → {tx.withdrawalDestination.upiId}
            </p>
          )}
        </div>
      </div>
      <div className="shrink-0 text-right ml-3">
        <p
          className={`font-mono font-bold text-base ${isDeposit ? "text-green-400" : "text-orange-400"}`}
        >
          {isDeposit ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
        </p>
      </div>
    </motion.div>
  );
}

function TxCardMobile({ tx, index }: { tx: Transaction; index: number }) {
  const isDeposit = tx.type === "deposit";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="p-4 bg-card rounded-lg border border-border"
      data-ocid={`history.transactions.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${isDeposit ? "bg-primary/15" : "bg-orange-900/20"}`}
          >
            {isDeposit ? (
              <ArrowDownLeft className="w-4 h-4 text-primary" />
            ) : (
              <ArrowUpRight className="w-4 h-4 text-orange-400" />
            )}
          </div>
          <span className="font-medium text-foreground capitalize text-sm">
            {tx.type}
          </span>
        </div>
        <p
          className={`font-mono font-bold text-sm ${isDeposit ? "text-green-400" : "text-orange-400"}`}
        >
          {isDeposit ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {new Date(tx.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <StatusBadge status={tx.status} size="sm" />
      </div>
      {tx.adminNote && (
        <p className="text-xs text-muted-foreground italic mt-1.5 truncate">
          Note: {tx.adminNote}
        </p>
      )}
    </motion.div>
  );
}

// ── Game History sub-components ───────────────────────────────────────────────

function WinLossBadge({ isWin }: { isWin: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
        isWin
          ? "bg-green-900/30 text-green-400 border-green-700/50"
          : "bg-destructive/20 text-destructive border-destructive/30"
      }`}
    >
      {isWin ? (
        <Trophy className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      {isWin ? "Win" : "Loss"}
    </span>
  );
}

function BetCard({ bet, index }: { bet: BetRecord; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-smooth"
      data-ocid={`history.games.item.${index + 1}`}
    >
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <GameTypeIcon gameType={bet.gameType} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-foreground">
              {formatGameType(bet.gameType)}
            </p>
            <WinLossBadge isWin={bet.isWin} />
          </div>
          <p className="text-xs text-muted-foreground">
            Your pick:{" "}
            <span className="font-medium text-foreground">
              {formatGameResult(bet.playerChoice)}
            </span>
            {" · "}
            Outcome:{" "}
            <span className="font-medium text-foreground">
              {formatGameResult(bet.outcome)}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(bet.timestamp).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="shrink-0 text-right ml-3 space-y-0.5">
        <p className="text-xs text-muted-foreground">
          Bet:{" "}
          <span className="font-mono text-foreground">
            ₹{bet.betAmount.toLocaleString("en-IN")}
          </span>
        </p>
        <p
          className={`font-mono font-bold text-base ${bet.isWin ? "text-green-400" : "text-destructive"}`}
        >
          {bet.isWin ? "+" : "−"}₹{bet.payout.toLocaleString("en-IN")}
        </p>
      </div>
    </motion.div>
  );
}

function BetCardMobile({ bet, index }: { bet: BetRecord; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="p-4 bg-card rounded-lg border border-border"
      data-ocid={`history.games.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <GameTypeIcon gameType={bet.gameType} />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">
              {formatGameType(bet.gameType)}
            </p>
            <WinLossBadge isWin={bet.isWin} />
          </div>
        </div>
        <p
          className={`font-mono font-bold text-sm ${bet.isWin ? "text-green-400" : "text-destructive"}`}
        >
          {bet.isWin ? "+" : "−"}₹{bet.payout.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Pick:{" "}
          <span className="text-foreground">
            {formatGameResult(bet.playerChoice)}
          </span>
          {" · "}
          Got:{" "}
          <span className="text-foreground">
            {formatGameResult(bet.outcome)}
          </span>
        </span>
        <span>
          {new Date(bet.timestamp).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Bet:{" "}
        <span className="font-mono text-foreground">
          ₹{bet.betAmount.toLocaleString("en-IN")}
        </span>
      </p>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function HistoryPage() {
  const { isAuthenticated, login } = useAuth();
  const [mainTab, setMainTab] = useState<MainTab>("transactions");
  const [filter, setFilter] = useState<FilterType>("all");

  const { data: txns = [], isLoading: txLoading } =
    useMyTransactions(isAuthenticated);
  const { data: bets = [], isLoading: betsLoading } =
    useMyBets(isAuthenticated);

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? txns : txns.filter((t) => t.type === filter);
    return [...list].sort((a, b) => b.createdAt - a.createdAt);
  }, [txns, filter]);

  const sortedBets = useMemo(
    () => [...bets].sort((a, b) => b.timestamp - a.timestamp),
    [bets],
  );

  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="history.page"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-muted border border-border flex items-center justify-center mb-4">
          <History className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          History
        </h2>
        <p className="text-muted-foreground mb-6">
          Login to view your transaction and game history.
        </p>
        <Button onClick={() => login()} data-ocid="history.login_button">
          Login to Continue
        </Button>
      </div>
    );
  }

  const depositCount = txns.filter((t) => t.type === "deposit").length;
  const withdrawalCount = txns.filter((t) => t.type === "withdrawal").length;

  return (
    <div className="container mx-auto px-4 py-8" data-ocid="history.page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center">
            <History className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              History
            </h1>
            <p className="text-xs text-muted-foreground">
              {mainTab === "transactions"
                ? `${txns.length} total · ${depositCount} deposits · ${withdrawalCount} withdrawals`
                : `${bets.length} bets placed`}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <SortDesc className="w-3.5 h-3.5" />
          Newest first
        </div>
      </div>

      {/* Main tab switcher */}
      <div
        className="flex gap-1 p-1 bg-muted rounded-lg border border-border mb-6 w-fit"
        data-ocid="history.main_tabs"
      >
        {(["transactions", "games"] as MainTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMainTab(tab)}
            data-ocid={`history.${tab}.tab`}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-smooth ${
              mainTab === tab
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "transactions" ? "Transactions" : "Game History"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mainTab === "transactions" ? (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {/* Filter tabs */}
            <div
              className="flex gap-2 flex-wrap mb-6"
              data-ocid="history.filters"
            >
              {filterTabs.map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setFilter(key)}
                  data-ocid={`history.filter_${key}.tab`}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-smooth ${
                    filter === key
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-muted border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {key === "deposit" && depositCount > 0 && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({depositCount})
                    </span>
                  )}
                  {key === "withdrawal" && withdrawalCount > 0 && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({withdrawalCount})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {txLoading ? (
              <div className="flex flex-col gap-2">
                {["a", "b", "c", "d", "e", "f"].map((id) => (
                  <Skeleton
                    key={id}
                    className="h-16 w-full rounded-lg"
                    data-ocid="history.transactions.loading_state"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-card rounded-xl border border-border"
                data-ocid="history.transactions.empty_state"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center mb-4">
                  <History className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  {filter === "all"
                    ? "No transactions yet"
                    : `No ${filter}s found`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {filter === "all"
                    ? "Your transaction history will appear here after your first deposit."
                    : `You have no ${filter} transactions to show.`}
                </p>
              </motion.div>
            ) : (
              <>
                <div
                  className="hidden sm:flex flex-col gap-2"
                  data-ocid="history.transactions.list"
                >
                  {filtered.map((tx, i) => (
                    <TxCard key={tx.id} tx={tx} index={i} />
                  ))}
                </div>
                <div
                  className="flex sm:hidden flex-col gap-3"
                  data-ocid="history.transactions.list"
                >
                  {filtered.map((tx, i) => (
                    <TxCardMobile key={tx.id} tx={tx} index={i} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="games"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {betsLoading ? (
              <div className="flex flex-col gap-2">
                {["a", "b", "c", "d", "e"].map((id) => (
                  <Skeleton
                    key={id}
                    className="h-20 w-full rounded-lg"
                    data-ocid="history.games.loading_state"
                  />
                ))}
              </div>
            ) : sortedBets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-card rounded-xl border border-border"
                data-ocid="history.games.empty_state"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center mb-4 text-2xl">
                  🎰
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No games played yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Try your luck on the Games page!
                </p>
              </motion.div>
            ) : (
              <>
                <div
                  className="hidden sm:flex flex-col gap-2"
                  data-ocid="history.games.list"
                >
                  {sortedBets.map((bet, i) => (
                    <BetCard key={bet.id} bet={bet} index={i} />
                  ))}
                </div>
                <div
                  className="flex sm:hidden flex-col gap-3"
                  data-ocid="history.games.list"
                >
                  {sortedBets.map((bet, i) => (
                    <BetCardMobile key={bet.id} bet={bet} index={i} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
