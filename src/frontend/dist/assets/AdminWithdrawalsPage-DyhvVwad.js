import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-61-h5hTH.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-D0Ach1z6.js";
import { L as Label } from "./label-QFkCoFUx.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { T as Textarea } from "./textarea-DsMe0YL2.js";
import { S as StatusBadge } from "./StatusBadge-D6wmLnVx.js";
import { c as usePendingWithdrawals, f as useApproveWithdrawal, g as useRejectWithdrawal } from "./useAdmin-Bwe8enWW.js";
import { C as CircleArrowDown } from "./circle-arrow-down-CZNT4Htf.js";
import { I as Inbox } from "./inbox-SA05HmKL.js";
import "./useMutation-CLJbhYgK.js";
function truncate(id, len = 16) {
  return id.length > len ? `${id.slice(0, len)}…` : id;
}
function fmtDate(ts) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function fmt(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function WActionDialog({ tx, mode, onClose }) {
  const [note, setNote] = reactExports.useState("");
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
        txId: tx.id,
        note: note.trim() || void 0
      });
    } else {
      await reject.mutateAsync({ txId: tx.id, note: note.trim() });
    }
    setNote("");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-md",
      "data-ocid": "admin.withdrawals.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DialogTitle,
          {
            className: `font-display ${isApprove ? "text-green-400" : "text-destructive"}`,
            children: isApprove ? "✓ Approve Withdrawal" : "✗ Reject Withdrawal"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/30 border border-border space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: truncate(tx.userId, 18) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: fmt(tx.amount) })
            ] })
          ] }),
          dest && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-muted-foreground uppercase tracking-wide text-[10px] mb-2", children: "Destination" }),
            dest.upiId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "UPI ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: dest.upiId })
            ] }),
            dest.accountNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: dest.accountNumber })
            ] }),
            dest.ifscCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "IFSC" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: dest.ifscCode })
            ] }),
            dest.accountHolder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Holder" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: dest.accountHolder })
            ] })
          ] }),
          isApprove && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2", children: "⚠ Mark paid only after manually transferring funds to user's account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wnote", className: "text-sm text-muted-foreground", children: isApprove ? "Note (optional)" : "Rejection reason (required)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "wnote",
                "data-ocid": "admin.withdrawals.note.input",
                value: note,
                onChange: (e) => setNote(e.target.value),
                placeholder: isApprove ? "Optional note for user…" : "Reason for rejection…",
                rows: 3,
                className: "bg-background border-border resize-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              "data-ocid": "admin.withdrawals.dialog.cancel_button",
              className: "border-border",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "admin.withdrawals.dialog.confirm_button",
              variant: isApprove ? "default" : "destructive",
              onClick: handleSubmit,
              disabled: isPending || !isApprove && !note.trim(),
              children: isPending ? "Processing…" : isApprove ? "Mark as Paid" : "Reject"
            }
          )
        ] })
      ]
    }
  ) });
}
function RowSkeleton({ id }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }, `${id}-${k}`)) });
}
function AdminWithdrawalsPage() {
  const { data: withdrawals, isLoading } = usePendingWithdrawals();
  const [activeRow, setActiveRow] = reactExports.useState(null);
  const [dialogMode, setDialogMode] = reactExports.useState(null);
  function openAction(tx, mode) {
    setActiveRow(tx);
    setDialogMode(mode);
  }
  function closeDialog() {
    setActiveRow(null);
    setDialogMode(null);
  }
  const isEmpty = !isLoading && (!withdrawals || withdrawals.length === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "admin.withdrawals.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-orange-400/10 border border-orange-400/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-6 h-6 text-orange-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Pending Withdrawals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Review and process withdrawal requests" })
          ] }),
          withdrawals && withdrawals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto game-badge-pending", children: [
            withdrawals.length,
            " pending"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "admin.withdrawals.list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
            "User ID",
            "Amount",
            "UPI / Bank",
            "Date",
            "Status",
            "Actions"
          ].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: `px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-xs ${i === 1 || i === 5 ? "text-right" : i === 4 ? "text-center" : "text-left"}`,
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            isLoading && ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, { id: k }, k)),
            isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "admin.withdrawals.empty_state",
                className: "flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-10 h-10 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No pending withdrawals" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60", children: "All withdrawal requests have been processed." })
                ]
              }
            ) }) }),
            withdrawals == null ? void 0 : withdrawals.map((tx, idx) => {
              const dest = tx.withdrawalDestination;
              const destLabel = (dest == null ? void 0 : dest.upiId) ? dest.upiId : (dest == null ? void 0 : dest.accountNumber) ? `${dest.accountNumber}/${dest.ifscCode ?? "—"}` : "—";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border hover:bg-muted/20 transition-colors",
                  "data-ocid": `admin.withdrawals.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: truncate(tx.userId) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-orange-400", children: fmt(tx.amount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-4 py-3 font-mono text-xs text-foreground max-w-[180px] truncate",
                        title: destLabel,
                        children: destLabel
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: fmtDate(tx.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "border-green-700/50 bg-green-900/20 text-green-400 hover:bg-green-900/40 text-xs h-7",
                          onClick: () => openAction(tx, "approve"),
                          "data-ocid": `admin.withdrawals.approve_button.${idx + 1}`,
                          children: "Mark Paid"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs h-7",
                          onClick: () => openAction(tx, "reject"),
                          "data-ocid": `admin.withdrawals.reject_button.${idx + 1}`,
                          children: "Reject"
                        }
                      )
                    ] }) })
                  ]
                },
                tx.id
              );
            })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WActionDialog, { tx: activeRow, mode: dialogMode, onClose: closeDialog })
      ]
    }
  );
}
export {
  AdminWithdrawalsPage
};
