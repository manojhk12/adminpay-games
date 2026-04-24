import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownCircle, InboxIcon } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import {
  useApproveWithdrawal,
  usePendingWithdrawals,
  useRejectWithdrawal,
} from "../../hooks/useAdmin";
import type { Transaction } from "../../types";

function truncate(id: string, len = 16) {
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

type WActionMode = "approve" | "reject" | null;

interface WActionDialogProps {
  tx: Transaction | null;
  mode: WActionMode;
  onClose: () => void;
}

function WActionDialog({ tx, mode, onClose }: WActionDialogProps) {
  const [note, setNote] = useState("");
  const approve = useApproveWithdrawal();
  const reject = useRejectWithdrawal();

  if (!tx || mode === null) return null;

  const isApprove = mode === "approve";
  const isPending = approve.isPending || reject.isPending;
  const dest = tx.withdrawalDestination;

  async function handleSubmit() {
    if (!isApprove && !note.trim()) return;
    if (isApprove) {
      await approve.mutateAsync({
        txId: tx!.id,
        note: note.trim() || undefined,
      });
    } else {
      await reject.mutateAsync({ txId: tx!.id, note: note.trim() });
    }
    setNote("");
    onClose();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="bg-card border-border max-w-md"
        data-ocid="admin.withdrawals.dialog"
      >
        <DialogHeader>
          <DialogTitle
            className={`font-display ${isApprove ? "text-green-400" : "text-destructive"}`}
          >
            {isApprove ? "✓ Approve Withdrawal" : "✗ Reject Withdrawal"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User</span>
              <span className="font-mono text-foreground">
                {truncate(tx.userId, 18)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-foreground">
                {fmt(tx.amount)}
              </span>
            </div>
          </div>
          {dest && (
            <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1.5 text-xs">
              <p className="font-semibold text-muted-foreground uppercase tracking-wide text-[10px] mb-2">
                Destination
              </p>
              {dest.upiId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UPI ID</span>
                  <span className="font-mono text-foreground">
                    {dest.upiId}
                  </span>
                </div>
              )}
              {dest.accountNumber && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-mono text-foreground">
                    {dest.accountNumber}
                  </span>
                </div>
              )}
              {dest.ifscCode && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IFSC</span>
                  <span className="font-mono text-foreground">
                    {dest.ifscCode}
                  </span>
                </div>
              )}
              {dest.accountHolder && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Holder</span>
                  <span className="text-foreground">{dest.accountHolder}</span>
                </div>
              )}
            </div>
          )}
          {isApprove && (
            <p className="text-xs text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
              ⚠ Mark paid only after manually transferring funds to user's
              account.
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="wnote" className="text-sm text-muted-foreground">
              {isApprove ? "Note (optional)" : "Rejection reason (required)"}
            </Label>
            <Textarea
              id="wnote"
              data-ocid="admin.withdrawals.note.input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                isApprove ? "Optional note for user…" : "Reason for rejection…"
              }
              rows={3}
              className="bg-background border-border resize-none"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin.withdrawals.dialog.cancel_button"
            className="border-border"
          >
            Cancel
          </Button>
          <Button
            data-ocid="admin.withdrawals.dialog.confirm_button"
            variant={isApprove ? "default" : "destructive"}
            onClick={handleSubmit}
            disabled={isPending || (!isApprove && !note.trim())}
          >
            {isPending ? "Processing…" : isApprove ? "Mark as Paid" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RowSkeleton({ id }: { id: string }) {
  return (
    <tr className="border-b border-border">
      {["c1", "c2", "c3", "c4", "c5", "c6"].map((k) => (
        <td key={`${id}-${k}`} className="px-4 py-3">
          <Skeleton className="h-4 w-20" />
        </td>
      ))}
    </tr>
  );
}

export function AdminWithdrawalsPage() {
  const { data: withdrawals, isLoading } = usePendingWithdrawals();
  const [activeRow, setActiveRow] = useState<Transaction | null>(null);
  const [dialogMode, setDialogMode] = useState<WActionMode>(null);

  function openAction(tx: Transaction, mode: "approve" | "reject") {
    setActiveRow(tx);
    setDialogMode(mode);
  }

  function closeDialog() {
    setActiveRow(null);
    setDialogMode(null);
  }

  const isEmpty = !isLoading && (!withdrawals || withdrawals.length === 0);

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 space-y-6"
      data-ocid="admin.withdrawals.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-400/10 border border-orange-400/20">
          <ArrowDownCircle className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Pending Withdrawals
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and process withdrawal requests
          </p>
        </div>
        {withdrawals && withdrawals.length > 0 && (
          <span className="ml-auto game-badge-pending">
            {withdrawals.length} pending
          </span>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="admin.withdrawals.list">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "User ID",
                  "Amount",
                  "UPI / Bank",
                  "Date",
                  "Status",
                  "Actions",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-xs ${i === 1 || i === 5 ? "text-right" : i === 4 ? "text-center" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <RowSkeleton key={k} id={k} />
                ))}

              {isEmpty && (
                <tr>
                  <td colSpan={6}>
                    <div
                      data-ocid="admin.withdrawals.empty_state"
                      className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground"
                    >
                      <InboxIcon className="w-10 h-10 opacity-40" />
                      <p className="font-medium">No pending withdrawals</p>
                      <p className="text-xs opacity-60">
                        All withdrawal requests have been processed.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {withdrawals?.map((tx, idx) => {
                const dest = tx.withdrawalDestination;
                const destLabel = dest?.upiId
                  ? dest.upiId
                  : dest?.accountNumber
                    ? `${dest.accountNumber}/${dest.ifscCode ?? "—"}`
                    : "—";

                return (
                  <tr
                    key={tx.id}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.withdrawals.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncate(tx.userId)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-orange-400">
                      {fmt(tx.amount)}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-xs text-foreground max-w-[180px] truncate"
                      title={destLabel}
                    >
                      {destLabel}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {fmtDate(tx.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={tx.status} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-700/50 bg-green-900/20 text-green-400 hover:bg-green-900/40 text-xs h-7"
                          onClick={() => openAction(tx, "approve")}
                          data-ocid={`admin.withdrawals.approve_button.${idx + 1}`}
                        >
                          Mark Paid
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs h-7"
                          onClick={() => openAction(tx, "reject")}
                          data-ocid={`admin.withdrawals.reject_button.${idx + 1}`}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <WActionDialog tx={activeRow} mode={dialogMode} onClose={closeDialog} />
    </div>
  );
}
