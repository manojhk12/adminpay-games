import { c as createLucideIcon, j as jsxRuntimeExports, b as Link, B as Button } from "./index-61-h5hTH.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BD0k2K4l.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { S as StatusBadge } from "./StatusBadge-D6wmLnVx.js";
import { a as useDashboardStats, b as usePendingDeposits, c as usePendingWithdrawals } from "./useAdmin-Bwe8enWW.js";
import { C as CircleArrowUp } from "./circle-arrow-up-Ds578DNA.js";
import { C as CircleArrowDown } from "./circle-arrow-down-CZNT4Htf.js";
import { C as Clock } from "./clock-gxBDK2D6.js";
import { U as Users } from "./users-AC55xNXM.js";
import { T as TrendingUp } from "./trending-up-DJTihxAD.js";
import "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
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
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function fmt(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function buildCards(s) {
  return [
    {
      label: "Total Users",
      value: s.totalUsers.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
      accent: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      href: "/admin/users"
    },
    {
      label: "Pending Deposits",
      value: s.pendingDeposits,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "w-5 h-5" }),
      accent: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/20",
      href: "/admin/deposits",
      badge: s.pendingDeposits
    },
    {
      label: "Pending Withdrawals",
      value: s.pendingWithdrawals,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-5 h-5" }),
      accent: "text-orange-400",
      bg: "bg-orange-400/10 border-orange-400/20",
      href: "/admin/withdrawals",
      badge: s.pendingWithdrawals
    },
    {
      label: "Total Deposited",
      value: fmt(s.totalDeposited),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
      accent: "text-green-400",
      bg: "bg-green-400/10 border-green-400/20"
    },
    {
      label: "Total Withdrawn",
      value: fmt(s.totalWithdrawn),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-5 h-5" }),
      accent: "text-primary",
      bg: "bg-primary/10 border-primary/20"
    },
    {
      label: "Approved Transactions",
      value: s.approvedTransactions.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
      accent: "text-green-400",
      bg: "bg-green-400/10 border-green-400/20",
      href: "/admin/transactions"
    }
  ];
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 mb-2" }) })
  ] }, k)) });
}
function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: pendingDeposits = [] } = usePendingDeposits();
  const { data: pendingWithdrawals = [] } = usePendingWithdrawals();
  const cards = stats ? buildCards(stats) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 py-8 space-y-8",
      "data-ocid": "admin_dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Platform overview & quick access" })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "admin_dashboard.stats_grid",
            children: cards.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border-border bg-card hover:border-primary/30 transition-smooth",
                "data-ocid": `admin_dashboard.stats.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: card.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-1.5 rounded-lg border ${card.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: card.accent, children: card.icon }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-2xl font-display font-bold ${card.accent}`,
                          children: card.value
                        }
                      ),
                      card.badge !== void 0 && card.badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "game-badge-pending", children: [
                        card.badge,
                        " pending"
                      ] })
                    ] }),
                    card.href && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: card.href, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "link",
                        className: "p-0 h-auto mt-2 text-xs text-primary",
                        children: [
                          "View all ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-1" })
                        ]
                      }
                    ) })
                  ] })
                ]
              },
              card.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "w-4 h-4 text-yellow-400" }),
                "Pending Deposits"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin/deposits",
                  "data-ocid": "admin_dashboard.view_deposits_link",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs", children: [
                    "View All ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-1" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: pendingDeposits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground py-2",
                "data-ocid": "admin_dashboard.pending_deposits.empty_state",
                children: "No pending deposits. All clear!"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pendingDeposits.slice(0, 3).map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border",
                "data-ocid": `admin_dashboard.pending_deposits.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
                    tx.userId.slice(0, 10),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-green-400", children: fmt(tx.amount) })
                  ] })
                ]
              },
              tx.id
            )) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-4 h-4 text-orange-400" }),
                "Pending Withdrawals"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin/withdrawals",
                  "data-ocid": "admin_dashboard.view_withdrawals_link",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs", children: [
                    "View All ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-1" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: pendingWithdrawals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground py-2",
                "data-ocid": "admin_dashboard.pending_withdrawals.empty_state",
                children: "No pending withdrawals. All clear!"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pendingWithdrawals.slice(0, 3).map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border",
                "data-ocid": `admin_dashboard.pending_withdrawals.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
                    tx.userId.slice(0, 10),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-orange-400", children: fmt(tx.amount) })
                  ] })
                ]
              },
              tx.id
            )) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
            " Quick Navigation"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
              "data-ocid": "admin_dashboard.quick_nav",
              children: [
                {
                  to: "/admin/deposits",
                  label: "Manage Deposits",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "w-5 h-5" }),
                  accent: "text-yellow-400"
                },
                {
                  to: "/admin/withdrawals",
                  label: "Manage Withdrawals",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-5 h-5" }),
                  accent: "text-orange-400"
                },
                {
                  to: "/admin/users",
                  label: "User Management",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
                  accent: "text-primary"
                },
                {
                  to: "/admin/transactions",
                  label: "All Transactions",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5" }),
                  accent: "text-green-400"
                }
              ].map(({ to, label, icon, accent }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to,
                  "data-ocid": `admin_dashboard.nav.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/30 transition-smooth cursor-pointer h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 flex flex-col items-center gap-2 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `p-2 rounded-lg bg-muted/40 border border-border ${accent}`,
                        children: icon
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-tight", children: label })
                  ] }) })
                },
                to
              ))
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminDashboardPage
};
