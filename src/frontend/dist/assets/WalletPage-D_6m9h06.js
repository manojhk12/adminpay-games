import { u as useAuth, j as jsxRuntimeExports, W as Wallet, B as Button, b as Link } from "./index-61-h5hTH.js";
import { S as StatusBadge } from "./StatusBadge-D6wmLnVx.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BD0k2K4l.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { u as useMyTransactions, m as motion } from "./useTransactions-4c28ne6j.js";
import { u as useWalletBalance } from "./useWalletBalance-BJlyLC_c.js";
import { T as TrendingUp } from "./trending-up-DJTihxAD.js";
import { C as Clock } from "./clock-gxBDK2D6.js";
import { A as ArrowDownLeft } from "./arrow-down-left-IFW2tWft.js";
import { A as ArrowUpRight } from "./arrow-up-right-Cpw2HdWB.js";
import "./useMutation-CLJbhYgK.js";
function WalletPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: balance = 0, isLoading: balanceLoading } = useWalletBalance(isAuthenticated);
  const { data: txns = [], isLoading: txLoading } = useMyTransactions(isAuthenticated);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "wallet.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl bg-muted border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "My Wallet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Login to view your wallet balance and transaction history." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => login(), "data-ocid": "wallet.login_button", children: "Login to Continue" })
        ]
      }
    );
  }
  const totalDeposited = txns.filter((t) => t.type === "deposit" && t.status === "approved").reduce((s, t) => s + t.amount, 0);
  const pendingCount = txns.filter((t) => t.status === "pending").length;
  const recent = txns.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", "data-ocid": "wallet.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your balance and track transactions" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-primary/30 relative overflow-hidden h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 pointer-events-none",
                style: {
                  background: "radial-gradient(circle at 80% 20%, oklch(0.72 0.23 260 / 0.08), transparent 60%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 text-primary" }),
              "Available Balance"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "h-10 w-32",
                "data-ocid": "wallet.balance.loading_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "font-mono text-4xl font-bold text-foreground",
                "data-ocid": "wallet.balance",
                children: [
                  "₹",
                  balance.toLocaleString("en-IN")
                ]
              }
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-green-400" }),
              "Total Deposited"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-2xl font-bold text-green-400", children: [
                "₹",
                totalDeposited.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "approved deposits" })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-yellow-400" }),
              "Pending"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-yellow-400", children: pendingCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "awaiting approval" })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deposit", "data-ocid": "wallet.deposit_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4" }),
        "Deposit"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/withdraw", "data-ocid": "wallet.withdraw_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }),
        "Withdraw"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Recent Transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", "data-ocid": "wallet.view_all_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "View All →" }) })
      ] }),
      txLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: ["a", "b", "c", "d", "e"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "h-16 w-full rounded-lg",
          "data-ocid": "wallet.transactions.loading_state"
        },
        id
      )) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-14 bg-card rounded-xl border border-border",
          "data-ocid": "wallet.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No transactions yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Make your first deposit to get started!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deposit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", "data-ocid": "wallet.empty_deposit_button", children: "Add Money" }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col gap-2",
          "data-ocid": "wallet.transactions.list",
          children: recent.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.3, delay: i * 0.05 },
              className: "flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-smooth",
              "data-ocid": `wallet.transactions.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${tx.type === "deposit" ? "bg-primary/15" : "bg-orange-900/20"}`,
                      children: tx.type === "deposit" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-orange-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground capitalize", children: tx.type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: new Date(tx.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: `font-mono font-bold ${tx.type === "deposit" ? "text-green-400" : "text-orange-400"}`,
                      children: [
                        tx.type === "deposit" ? "+" : "-",
                        "₹",
                        tx.amount.toLocaleString("en-IN")
                      ]
                    }
                  )
                ] })
              ]
            },
            tx.id
          ))
        }
      )
    ] })
  ] });
}
export {
  WalletPage
};
