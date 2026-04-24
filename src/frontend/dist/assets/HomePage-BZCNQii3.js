import { c as createLucideIcon, u as useAuth, a as useInternetIdentity, j as jsxRuntimeExports, G as Gamepad2, B as Button, L as LogIn, b as Link, W as Wallet, S as Shield } from "./index-61-h5hTH.js";
import { S as StatusBadge } from "./StatusBadge-D6wmLnVx.js";
import { C as Card, a as CardContent } from "./card-BD0k2K4l.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { u as useMyTransactions, m as motion } from "./useTransactions-4c28ne6j.js";
import { u as useWalletBalance } from "./useWalletBalance-BJlyLC_c.js";
import { A as ArrowDownLeft } from "./arrow-down-left-IFW2tWft.js";
import { A as ArrowUpRight } from "./arrow-up-right-Cpw2HdWB.js";
import { C as Clock } from "./clock-gxBDK2D6.js";
import { T as TrendingUp } from "./trending-up-DJTihxAD.js";
import "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const features = [
  {
    icon: Shield,
    title: "Admin-Verified Payments",
    desc: "Every deposit and withdrawal is manually reviewed by our admin team for maximum security."
  },
  {
    icon: Zap,
    title: "Instant Balance Updates",
    desc: "Once approved, your wallet balance updates instantly — no delays, no confusion."
  },
  {
    icon: TrendingUp,
    title: "Full Transaction History",
    desc: "Track every rupee with detailed transaction logs and real-time status updates."
  }
];
function HomePage() {
  const { isAuthenticated, isLoading, login, walletBalance } = useAuth();
  const { loginStatus } = useInternetIdentity();
  const { data: balance, isLoading: balanceLoading } = useWalletBalance(isAuthenticated);
  const { data: txns, isLoading: txnsLoading } = useMyTransactions(isAuthenticated);
  const displayBalance = balance ?? walletBalance ?? 0;
  const recentTxns = (txns ?? []).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-card border-b border-border py-16 md:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-0 opacity-[0.03]",
          style: {
            backgroundImage: "linear-gradient(oklch(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "flex flex-col items-center text-center gap-6 max-w-2xl mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AdminPay Games" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight", children: [
              "Your Gaming ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Wallet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Under Control"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md", children: "Deposit funds, request withdrawals, and track every payment — all secured by admin approval." }),
            !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                onClick: () => login(),
                disabled: loginStatus === "logging-in" || isLoading,
                "data-ocid": "home.login_button",
                className: "gap-2 px-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  loginStatus === "logging-in" ? "Connecting…" : "Login to Play"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deposit", "data-ocid": "home.deposit_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2 px-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4" }),
                "Add Money"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/withdraw", "data-ocid": "home.withdraw_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", className: "gap-2 px-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }),
                "Withdraw"
              ] }) })
            ] })
          ]
        }
      ) })
    ] }),
    isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "border-primary/20 bg-card relative overflow-hidden max-w-md mx-auto",
              "data-ocid": "home.wallet_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 relative z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-1 flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5 text-primary" }),
                        "Wallet Balance"
                      ] }),
                      balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-36" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "font-display text-4xl font-bold text-foreground",
                          "data-ocid": "home.wallet_balance",
                          children: [
                            "₹",
                            displayBalance.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-primary" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/deposit",
                        className: "flex-1",
                        "data-ocid": "home.wallet_deposit_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "w-full gap-1.5 text-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-3 h-3" }),
                          "Add Money"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/withdraw",
                        className: "flex-1",
                        "data-ocid": "home.wallet_withdraw_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "w-full gap-1.5 text-xs",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" }),
                              "Withdraw"
                            ]
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/history",
                        className: "flex-1",
                        "data-ocid": "home.wallet_history_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "ghost",
                            className: "w-full gap-1.5 text-xs text-muted-foreground",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                              "History"
                            ]
                          }
                        )
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        }
      ),
      (txnsLoading || recentTxns.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.2 },
          className: "mt-6 max-w-md mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Recent Activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/history",
                  "data-ocid": "home.view_history_link",
                  className: "text-xs text-primary hover:underline",
                  children: "View all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: txnsLoading ? ["a", "b", "c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, id)) : recentTxns.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `home.recent_tx.item.${i + 1}`,
                className: "flex items-center justify-between p-3 rounded-lg bg-card border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${tx.type === "deposit" ? "bg-green-900/30 text-green-400" : "bg-orange-900/30 text-orange-400"}`,
                        children: tx.type === "deposit" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground capitalize truncate", children: tx.type }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(tx.createdAt).toLocaleDateString(
                        "en-IN"
                      ) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-sm text-foreground", children: [
                      "₹",
                      tx.amount.toLocaleString("en-IN")
                    ] })
                  ] })
                ]
              },
              tx.id
            )) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-2", children: "Why AdminPay Games?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Built for trust, speed, and complete transparency." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto",
          "data-ocid": "home.features.list",
          children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: i * 0.1 },
              "data-ocid": `home.features.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border h-full hover:border-primary/30 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1.5", children: f.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: f.desc })
              ] }) })
            },
            f.title
          ))
        }
      )
    ] }) }),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-t border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.4 },
        className: "max-w-md mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Ready to get started?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Login with Internet Identity to access your wallet and manage your gaming funds." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => login(),
              disabled: loginStatus === "logging-in",
              "data-ocid": "home.cta_login_button",
              className: "gap-2 px-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                loginStatus === "logging-in" ? "Connecting…" : "Login with Internet Identity"
              ]
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  HomePage
};
