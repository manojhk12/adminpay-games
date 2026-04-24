import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, InboxIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import { useAllTransactions } from "../../hooks/useAdmin";
import type { TransactionStatus, TransactionType } from "../../types";

type TypeFilter = "all" | TransactionType;
type StatusFilter = "all" | TransactionStatus;

function truncate(id: string, len = 14) {
  return id.length > len ? `${id.slice(0, len)}…` : id;
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function TxRowSkeleton() {
  return (
    <tr className="border-b border-border">
      {["c1", "c2", "c3", "c4", "c5", "c6"].map((id) => (
        <td key={id} className="px-4 py-3">
          <Skeleton className="h-4 w-20" />
        </td>
      ))}
    </tr>
  );
}

export function AdminTransactionsPage() {
  const { data: transactions, isLoading } = useAllTransactions();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    if (!transactions) return [];
    return [...transactions]
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter((tx) => typeFilter === "all" || tx.type === typeFilter)
      .filter((tx) => statusFilter === "all" || tx.status === statusFilter);
  }, [transactions, typeFilter, statusFilter]);

  const isEmpty = !isLoading && filtered.length === 0;

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 space-y-6"
      data-ocid="admin.transactions.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <History className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Transaction History
          </h1>
          <p className="text-sm text-muted-foreground">
            Full audit log — all users
          </p>
        </div>
        {transactions && transactions.length > 0 && (
          <span className="ml-auto text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filtered.length}
            </span>{" "}
            of {transactions.length}
          </span>
        )}
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap items-center gap-3"
        data-ocid="admin.transactions.filters"
      >
        <Tabs
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as TypeFilter)}
        >
          <TabsList className="bg-muted/40 border border-border">
            <TabsTrigger
              value="all"
              data-ocid="admin.transactions.filter_all.tab"
              className="text-xs"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="deposit"
              data-ocid="admin.transactions.filter_deposit.tab"
              className="text-xs"
            >
              Deposits
            </TabsTrigger>
            <TabsTrigger
              value="withdrawal"
              data-ocid="admin.transactions.filter_withdrawal.tab"
              className="text-xs"
            >
              Withdrawals
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger
            className="w-[160px] bg-muted/30 border-border text-sm h-8"
            data-ocid="admin.transactions.status_filter.select"
          >
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="admin.transactions.list">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Date",
                  "User ID",
                  "Type",
                  "Amount",
                  "Status",
                  "Admin Note",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-xs ${i === 3 ? "text-right" : i === 2 || i === 4 ? "text-center" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((id) => (
                  <TxRowSkeleton key={id} />
                ))}

              {isEmpty && (
                <tr>
                  <td colSpan={6}>
                    <div
                      data-ocid="admin.transactions.empty_state"
                      className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground"
                    >
                      <InboxIcon className="w-10 h-10 opacity-40" />
                      <p className="font-medium">No transactions found</p>
                      <p className="text-xs opacity-60">
                        {typeFilter !== "all" || statusFilter !== "all"
                          ? "Try adjusting your filters."
                          : "No transactions have been made yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {filtered.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.transactions.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {fmtDate(tx.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {truncate(tx.userId)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`game-badge text-[10px] px-2 py-0.5 ${
                        tx.type === "deposit"
                          ? "bg-green-900/20 text-green-400 border border-green-700/40"
                          : "bg-orange-900/20 text-orange-400 border border-orange-700/40"
                      }`}
                    >
                      {tx.type === "deposit" ? "Deposit" : "Withdraw"}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-bold ${tx.type === "deposit" ? "text-green-400" : "text-orange-400"}`}
                  >
                    {tx.type === "deposit" ? "+" : "-"}
                    {fmt(tx.amount)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={tx.status} size="sm" />
                  </td>
                  <td
                    className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate"
                    title={tx.adminNote ?? ""}
                  >
                    {tx.adminNote ? (
                      tx.adminNote
                    ) : (
                      <span className="opacity-30">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
