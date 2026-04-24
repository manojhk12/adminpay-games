import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-61-h5hTH.js";
import { B as Badge } from "./badge-DSTXIgC-.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { h as useAllUsers, i as useBlockUser, j as useUnblockUser } from "./useAdmin-Bwe8enWW.js";
import { U as Users } from "./users-AC55xNXM.js";
import "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode);
function truncate(id, len = 18) {
  return id.length > len ? `${id.slice(0, len)}…` : id;
}
function fmtDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function fmt(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function UserRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }, k)) });
}
function UserRow({ user, index }) {
  const block = useBlockUser();
  const unblock = useUnblockUser();
  const isBlocked = user.status === "blocked";
  const isBusy = block.isPending || unblock.isPending;
  function handleToggle() {
    if (isBlocked) {
      unblock.mutate(user.id);
    } else {
      block.mutate(user.id);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/20 transition-colors",
      "data-ocid": `admin.users.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: truncate(user.principal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: user.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-primary", children: fmt(user.walletBalance) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: isBlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "destructive",
            className: "uppercase tracking-widest text-[10px] px-2 py-0.5",
            "data-ocid": `admin.users.status_badge.${index + 1}`,
            children: "Blocked"
          }
        ) : user.isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: "uppercase tracking-widest text-[10px] px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30",
            "data-ocid": `admin.users.status_badge.${index + 1}`,
            children: "Admin"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: "uppercase tracking-widest text-[10px] px-2 py-0.5 bg-green-900/30 text-green-400 border border-green-700/40 hover:bg-green-900/40",
            "data-ocid": `admin.users.status_badge.${index + 1}`,
            children: "Active"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs whitespace-nowrap", children: fmtDate(user.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: !user.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleToggle,
            disabled: isBusy,
            "data-ocid": `admin.users.${isBlocked ? "unblock" : "block"}_button.${index + 1}`,
            className: isBlocked ? "border-green-700/50 bg-green-900/20 text-green-400 hover:bg-green-900/40 text-xs h-7" : "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs h-7",
            children: isBlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 mr-1" }),
              "Unblock"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3 h-3 mr-1" }),
              "Block"
            ] })
          }
        ) })
      ]
    }
  );
}
function AdminUsersPage() {
  const { data: users, isLoading } = useAllUsers();
  const isEmpty = !isLoading && (!users || users.length === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "admin.users.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "User Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "View and manage all registered users" })
          ] }),
          users && users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/40 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
              users.length,
              " users"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "admin.users.list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
            "Principal",
            "Username",
            "Balance",
            "Status",
            "Registered",
            "Action"
          ].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: `px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-xs ${i === 2 || i === 5 ? "text-right" : i === 3 ? "text-center" : "text-left"}`,
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            isLoading && ["r1", "r2", "r3", "r4", "r5", "r6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRowSkeleton, {}, id)),
            isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "admin.users.empty_state",
                className: "flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No users yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60", children: "Users will appear here after they register." })
                ]
              }
            ) }) }),
            users == null ? void 0 : users.map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user, index: idx }, user.id))
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  AdminUsersPage
};
