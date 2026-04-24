import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useAuth, B as Button } from "./index-61-h5hTH.js";
import { S as StatusBadge } from "./StatusBadge-D6wmLnVx.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { u as useMyBets, C as Coins, D as Dices, T as Trophy } from "./useGames-CfyhcJMV.js";
import { M as MotionConfigContext, i as isHTMLElement, c as useConstant, P as PresenceContext, d as usePresence, e as useIsomorphicLayoutEffect, L as LayoutGroupContext, u as useMyTransactions, m as motion } from "./useTransactions-4c28ne6j.js";
import { H as History } from "./history-BMiaI2Ti.js";
import { A as ArrowDownLeft } from "./arrow-down-left-IFW2tWft.js";
import { A as ArrowUpRight } from "./arrow-up-right-Cpw2HdWB.js";
import "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h10", key: "1w87gc" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }]
];
const ArrowDownWideNarrow = createLucideIcon("arrow-down-wide-narrow", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function formatGameType(gameType) {
  switch (gameType) {
    case "coinFlip":
      return "Coin Flip";
    case "diceRoll":
      return "Dice Roll";
    case "roulette":
      return "Roulette";
  }
}
function formatGameResult(result) {
  if (result === "heads") return "Heads";
  if (result === "tails") return "Tails";
  if (result === "red") return "Red";
  if (result === "black") return "Black";
  if (typeof result === "object" && "dice" in result)
    return `Dice ${result.dice}`;
  return String(result);
}
function GameTypeIcon({ gameType }) {
  if (gameType === "coinFlip")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4 text-primary" });
  if (gameType === "diceRoll")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-4 h-4 text-secondary-foreground" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-none", children: "🎰" });
}
const filterTabs = [
  { key: "all", label: "All" },
  { key: "deposit", label: "Deposits" },
  { key: "withdrawal", label: "Withdrawals" }
];
function TxCard({ tx, index }) {
  var _a;
  const isDeposit = tx.type === "deposit";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.25, delay: index * 0.03 },
      className: "flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-smooth",
      "data-ocid": `history.transactions.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${isDeposit ? "bg-primary/15" : "bg-orange-900/20"}`,
              children: isDeposit ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-orange-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground capitalize", children: tx.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(tx.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) }),
            tx.adminNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic mt-0.5 truncate max-w-xs", children: [
              "Admin note: ",
              tx.adminNote
            ] }),
            ((_a = tx.withdrawalDestination) == null ? void 0 : _a.upiId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate max-w-xs font-mono", children: [
              "→ ",
              tx.withdrawalDestination.upiId
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-right ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: `font-mono font-bold text-base ${isDeposit ? "text-green-400" : "text-orange-400"}`,
            children: [
              isDeposit ? "+" : "-",
              "₹",
              tx.amount.toLocaleString("en-IN")
            ]
          }
        ) })
      ]
    }
  );
}
function TxCardMobile({ tx, index }) {
  const isDeposit = tx.type === "deposit";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, delay: index * 0.03 },
      className: "p-4 bg-card rounded-lg border border-border",
      "data-ocid": `history.transactions.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${isDeposit ? "bg-primary/15" : "bg-orange-900/20"}`,
                children: isDeposit ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-orange-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground capitalize text-sm", children: tx.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `font-mono font-bold text-sm ${isDeposit ? "text-green-400" : "text-orange-400"}`,
              children: [
                isDeposit ? "+" : "-",
                "₹",
                tx.amount.toLocaleString("en-IN")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(tx.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status, size: "sm" })
        ] }),
        tx.adminNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic mt-1.5 truncate", children: [
          "Note: ",
          tx.adminNote
        ] })
      ]
    }
  );
}
function WinLossBadge({ isWin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${isWin ? "bg-green-900/30 text-green-400 border-green-700/50" : "bg-destructive/20 text-destructive border-destructive/30"}`,
      children: [
        isWin ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
        isWin ? "Win" : "Loss"
      ]
    }
  );
}
function BetCard({ bet, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.25, delay: index * 0.03 },
      className: "flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-smooth",
      "data-ocid": `history.games.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameTypeIcon, { gameType: bet.gameType }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatGameType(bet.gameType) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WinLossBadge, { isWin: bet.isWin })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Your pick:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatGameResult(bet.playerChoice) }),
              " · ",
              "Outcome:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatGameResult(bet.outcome) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(bet.timestamp).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right ml-3 space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Bet:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              "₹",
              bet.betAmount.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `font-mono font-bold text-base ${bet.isWin ? "text-green-400" : "text-destructive"}`,
              children: [
                bet.isWin ? "+" : "−",
                "₹",
                bet.payout.toLocaleString("en-IN")
              ]
            }
          )
        ] })
      ]
    }
  );
}
function BetCardMobile({ bet, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, delay: index * 0.03 },
      className: "p-4 bg-card rounded-lg border border-border",
      "data-ocid": `history.games.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameTypeIcon, { gameType: bet.gameType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: formatGameType(bet.gameType) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WinLossBadge, { isWin: bet.isWin })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `font-mono font-bold text-sm ${bet.isWin ? "text-green-400" : "text-destructive"}`,
              children: [
                bet.isWin ? "+" : "−",
                "₹",
                bet.payout.toLocaleString("en-IN")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Pick:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatGameResult(bet.playerChoice) }),
            " · ",
            "Got:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatGameResult(bet.outcome) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(bet.timestamp).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "Bet:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
            "₹",
            bet.betAmount.toLocaleString("en-IN")
          ] })
        ] })
      ]
    }
  );
}
function HistoryPage() {
  const { isAuthenticated, login } = useAuth();
  const [mainTab, setMainTab] = reactExports.useState("transactions");
  const [filter, setFilter] = reactExports.useState("all");
  const { data: txns = [], isLoading: txLoading } = useMyTransactions(isAuthenticated);
  const { data: bets = [], isLoading: betsLoading } = useMyBets(isAuthenticated);
  const filtered = reactExports.useMemo(() => {
    const list = filter === "all" ? txns : txns.filter((t) => t.type === filter);
    return [...list].sort((a, b) => b.createdAt - a.createdAt);
  }, [txns, filter]);
  const sortedBets = reactExports.useMemo(
    () => [...bets].sort((a, b) => b.timestamp - a.timestamp),
    [bets]
  );
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "history.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl bg-muted border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Login to view your transaction and game history." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => login(), "data-ocid": "history.login_button", children: "Login to Continue" })
        ]
      }
    );
  }
  const depositCount = txns.filter((t) => t.type === "deposit").length;
  const withdrawalCount = txns.filter((t) => t.type === "withdrawal").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", "data-ocid": "history.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: mainTab === "transactions" ? `${txns.length} total · ${depositCount} deposits · ${withdrawalCount} withdrawals` : `${bets.length} bets placed` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownWideNarrow, { className: "w-3.5 h-3.5" }),
        "Newest first"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 p-1 bg-muted rounded-lg border border-border mb-6 w-fit",
        "data-ocid": "history.main_tabs",
        children: ["transactions", "games"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMainTab(tab),
            "data-ocid": `history.${tab}.tab`,
            className: `px-5 py-2 rounded-md text-sm font-semibold transition-smooth ${mainTab === tab ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
            children: tab === "transactions" ? "Transactions" : "Game History"
          },
          tab
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: mainTab === "transactions" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.2 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 flex-wrap mb-6",
              "data-ocid": "history.filters",
              children: filterTabs.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setFilter(key),
                  "data-ocid": `history.filter_${key}.tab`,
                  className: `px-4 py-1.5 rounded-md text-sm font-medium border transition-smooth ${filter === key ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted border-border text-muted-foreground hover:text-foreground"}`,
                  children: [
                    label,
                    key === "deposit" && depositCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
                      "(",
                      depositCount,
                      ")"
                    ] }),
                    key === "withdrawal" && withdrawalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
                      "(",
                      withdrawalCount,
                      ")"
                    ] })
                  ]
                },
                key
              ))
            }
          ),
          txLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: ["a", "b", "c", "d", "e", "f"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Skeleton,
            {
              className: "h-16 w-full rounded-lg",
              "data-ocid": "history.transactions.loading_state"
            },
            id
          )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "text-center py-16 bg-card rounded-xl border border-border",
              "data-ocid": "history.transactions.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-7 h-7 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: filter === "all" ? "No transactions yet" : `No ${filter}s found` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: filter === "all" ? "Your transaction history will appear here after your first deposit." : `You have no ${filter} transactions to show.` })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "hidden sm:flex flex-col gap-2",
                "data-ocid": "history.transactions.list",
                children: filtered.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TxCard, { tx, index: i }, tx.id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex sm:hidden flex-col gap-3",
                "data-ocid": "history.transactions.list",
                children: filtered.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TxCardMobile, { tx, index: i }, tx.id))
              }
            )
          ] })
        ]
      },
      "transactions"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.2 },
        children: betsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: ["a", "b", "c", "d", "e"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-20 w-full rounded-lg",
            "data-ocid": "history.games.loading_state"
          },
          id
        )) }) : sortedBets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "text-center py-16 bg-card rounded-xl border border-border",
            "data-ocid": "history.games.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center mb-4 text-2xl", children: "🎰" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No games played yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try your luck on the Games page!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "hidden sm:flex flex-col gap-2",
              "data-ocid": "history.games.list",
              children: sortedBets.map((bet, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BetCard, { bet, index: i }, bet.id))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex sm:hidden flex-col gap-3",
              "data-ocid": "history.games.list",
              children: sortedBets.map((bet, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BetCardMobile, { bet, index: i }, bet.id))
            }
          )
        ] })
      },
      "games"
    ) })
  ] });
}
export {
  HistoryPage
};
