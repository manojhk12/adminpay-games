import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, e as ue } from "./index-61-h5hTH.js";
import { B as Badge } from "./badge-DSTXIgC-.js";
import { C as Card } from "./card-BD0k2K4l.js";
import { I as Input } from "./input-8n71MoyQ.js";
import { L as Label } from "./label-QFkCoFUx.js";
import { S as Skeleton } from "./skeleton-j03Je6rt.js";
import { T as Trophy, C as Coins, D as Dices, a as usePlaceBet } from "./useGames-CfyhcJMV.js";
import { T as TrendingUp } from "./trending-up-DJTihxAD.js";
import "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
];
const CircleDot = createLucideIcon("circle-dot", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function formatCurrency(n) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function choiceLabel(choice) {
  if (choice === "heads") return "Heads";
  if (choice === "tails") return "Tails";
  if (choice === "red") return "Red";
  if (choice === "black") return "Black";
  if (typeof choice === "object" && "dice" in choice) return `${choice.dice}`;
  return String(choice);
}
function outcomeLabel(outcome) {
  if (outcome === "heads") return "🪙 Heads";
  if (outcome === "tails") return "🪙 Tails";
  if (outcome === "red") return "🔴 Red";
  if (outcome === "black") return "⚫ Black";
  if (typeof outcome === "object" && "dice" in outcome)
    return `🎲 ${outcome.dice}`;
  return String(outcome);
}
function BetPresets({ walletBalance, disabled, onSet }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 justify-center flex-wrap", children: [
    [10, 50, 100, 500].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onSet(Math.min(v, walletBalance)),
        className: "text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth",
        disabled,
        children: v
      },
      v
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onSet(walletBalance),
        className: "text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth",
        disabled,
        children: "Max"
      }
    )
  ] });
}
function LoadingDots({ ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex items-center justify-center gap-2 py-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" })
      ]
    }
  );
}
function CoinFlipGame({ walletBalance }) {
  const [phase, setPhase] = reactExports.useState("idle");
  const [choice, setChoice] = reactExports.useState("heads");
  const [betAmount, setBetAmount] = reactExports.useState(10);
  const [outcome, setOutcome] = reactExports.useState(null);
  const { mutateAsync: placeBet, isPending } = usePlaceBet();
  async function handlePlay() {
    if (betAmount <= 0 || betAmount > walletBalance || isPending) return;
    setPhase("animating");
    try {
      const result = await placeBet({
        gameType: "coinFlip",
        betAmount,
        playerChoice: choice
      });
      setOutcome({
        playerChoice: choice,
        outcome: result.outcome,
        isWin: result.isWin,
        payout: result.payout,
        betAmount
      });
      setPhase("result");
    } catch (err) {
      setPhase("idle");
      ue.error(
        err instanceof Error ? err.message : "Bet failed. Please try again."
      );
    }
  }
  function reset() {
    setPhase("idle");
    setOutcome(null);
    setBetAmount(10);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[340px] flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center text-4xl shadow-lg bg-card select-none ${phase === "animating" ? "animate-[flip_0.7s_ease-in-out_infinite]" : "transition-smooth"}`,
        children: phase === "result" && outcome ? outcome.outcome === "heads" ? "🦅" : "🪙" : "🪙"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "game-button-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "coinflip.heads_toggle",
          className: `game-toggle${choice === "heads" ? " active" : ""}`,
          onClick: () => setChoice("heads"),
          disabled: phase !== "idle",
          children: "Heads"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "coinflip.tails_toggle",
          className: `game-toggle${choice === "tails" ? " active" : ""}`,
          onClick: () => setChoice("tails"),
          disabled: phase !== "idle",
          children: "Tails"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "coinflip-bet",
          className: "text-xs text-muted-foreground font-semibold uppercase tracking-widest",
          children: "Bet Amount"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "coinflip-bet",
          "data-ocid": "coinflip.bet_input",
          type: "number",
          min: 1,
          max: walletBalance,
          value: betAmount,
          onChange: (e) => setBetAmount(Number(e.target.value)),
          disabled: phase !== "idle",
          className: "font-mono text-center text-base"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BetPresets,
        {
          walletBalance,
          disabled: phase !== "idle",
          onSet: setBetAmount
        }
      )
    ] }),
    phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "coinflip.play_button",
        className: "game-play-button w-full",
        onClick: handlePlay,
        disabled: betAmount <= 0 || betAmount > walletBalance || isPending,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "inline w-4 h-4 mr-1.5" }),
          "Flip Coin"
        ]
      }
    ),
    phase === "animating" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingDots, { ocid: "coinflip.loading_state" }),
    phase === "result" && outcome && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "coinflip.result_overlay",
        className: "game-result-overlay",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: outcome.outcome === "heads" ? "🦅" : "🪙" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-display font-bold", children: outcomeLabel(outcome.outcome) }),
          outcome.isWin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-sm px-3 py-1 bg-accent text-accent-foreground", children: [
            "WIN +",
            formatCurrency(outcome.payout - outcome.betAmount)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-sm px-3 py-1", children: [
            "LOSS -",
            formatCurrency(outcome.betAmount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "You picked",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: choiceLabel(outcome.playerChoice) }),
            " ",
            "· Result:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: choiceLabel(outcome.outcome) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "coinflip.play_again_button",
              className: "game-play-button",
              onClick: reset,
              children: "Play Again"
            }
          )
        ]
      }
    )
  ] });
}
const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
function DiceRollGame({ walletBalance }) {
  const [phase, setPhase] = reactExports.useState("idle");
  const [choice, setChoice] = reactExports.useState(1);
  const [betAmount, setBetAmount] = reactExports.useState(10);
  const [outcome, setOutcome] = reactExports.useState(null);
  const [animatingFace, setAnimatingFace] = reactExports.useState(0);
  const { mutateAsync: placeBet, isPending } = usePlaceBet();
  async function handlePlay() {
    if (betAmount <= 0 || betAmount > walletBalance || isPending) return;
    setPhase("animating");
    const interval = setInterval(
      () => setAnimatingFace((f) => (f + 1) % 6),
      100
    );
    try {
      const result = await placeBet({
        gameType: "diceRoll",
        betAmount,
        playerChoice: { dice: choice }
      });
      clearInterval(interval);
      setOutcome({
        playerChoice: { dice: choice },
        outcome: result.outcome,
        isWin: result.isWin,
        payout: result.payout,
        betAmount
      });
      setPhase("result");
    } catch (err) {
      clearInterval(interval);
      setPhase("idle");
      ue.error(
        err instanceof Error ? err.message : "Bet failed. Please try again."
      );
    }
  }
  function reset() {
    setPhase("idle");
    setOutcome(null);
    setBetAmount(10);
  }
  const displayFace = phase === "animating" ? DICE_FACES[animatingFace] : phase === "result" && outcome && typeof outcome.outcome === "object" && "dice" in outcome.outcome ? DICE_FACES[outcome.outcome.dice - 1] : DICE_FACES[choice - 1];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[340px] flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-20 h-20 rounded-xl border-4 border-primary flex items-center justify-center text-5xl bg-card shadow-lg select-none ${phase === "animating" ? "animate-[roll_0.15s_linear_infinite]" : "transition-smooth"}`,
        children: displayFace
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-widest text-center", children: "Pick a number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "game-number-selector justify-center", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `diceroll.number_${n}_button`,
          className: `game-number-button${choice === n ? " selected" : ""}`,
          onClick: () => setChoice(n),
          disabled: phase !== "idle",
          children: n
        },
        n
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "diceroll-bet",
          className: "text-xs text-muted-foreground font-semibold uppercase tracking-widest",
          children: "Bet Amount"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "diceroll-bet",
          "data-ocid": "diceroll.bet_input",
          type: "number",
          min: 1,
          max: walletBalance,
          value: betAmount,
          onChange: (e) => setBetAmount(Number(e.target.value)),
          disabled: phase !== "idle",
          className: "font-mono text-center text-base"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BetPresets,
        {
          walletBalance,
          disabled: phase !== "idle",
          onSet: setBetAmount
        }
      )
    ] }),
    phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "diceroll.play_button",
        className: "game-play-button w-full",
        onClick: handlePlay,
        disabled: betAmount <= 0 || betAmount > walletBalance || isPending,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "inline w-4 h-4 mr-1.5" }),
          "Roll Dice"
        ]
      }
    ),
    phase === "animating" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingDots, { ocid: "diceroll.loading_state" }),
    phase === "result" && outcome && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "diceroll.result_overlay",
        className: "game-result-overlay",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: typeof outcome.outcome === "object" && "dice" in outcome.outcome ? DICE_FACES[outcome.outcome.dice - 1] : "🎲" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-display font-bold", children: outcomeLabel(outcome.outcome) }),
          outcome.isWin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-sm px-3 py-1 bg-accent text-accent-foreground", children: [
            "WIN +",
            formatCurrency(outcome.payout - outcome.betAmount)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-sm px-3 py-1", children: [
            "LOSS -",
            formatCurrency(outcome.betAmount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "You picked",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: choiceLabel(outcome.playerChoice) }),
            " ",
            "· Rolled:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: choiceLabel(outcome.outcome) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "diceroll.play_again_button",
              className: "game-play-button",
              onClick: reset,
              children: "Play Again"
            }
          )
        ]
      }
    )
  ] });
}
function RouletteGame({ walletBalance }) {
  const [phase, setPhase] = reactExports.useState("idle");
  const [choice, setChoice] = reactExports.useState("red");
  const [betAmount, setBetAmount] = reactExports.useState(10);
  const [outcome, setOutcome] = reactExports.useState(null);
  const { mutateAsync: placeBet, isPending } = usePlaceBet();
  async function handlePlay() {
    if (betAmount <= 0 || betAmount > walletBalance || isPending) return;
    setPhase("animating");
    try {
      const result = await placeBet({
        gameType: "roulette",
        betAmount,
        playerChoice: choice
      });
      setOutcome({
        playerChoice: choice,
        outcome: result.outcome,
        isWin: result.isWin,
        payout: result.payout,
        betAmount
      });
      setPhase("result");
    } catch (err) {
      setPhase("idle");
      ue.error(
        err instanceof Error ? err.message : "Bet failed. Please try again."
      );
    }
  }
  function reset() {
    setPhase("idle");
    setOutcome(null);
    setBetAmount(10);
  }
  const wheelColor = phase === "result" && outcome ? outcome.outcome === "red" ? "bg-red-600" : "bg-zinc-900" : choice === "red" ? "bg-red-600" : "bg-zinc-900";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[340px] flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center text-4xl shadow-lg select-none ${wheelColor} ${phase === "animating" ? "animate-[spin-wheel_0.4s_linear_infinite]" : "transition-smooth"}`,
        children: phase === "result" && outcome ? outcome.outcome === "red" ? "🔴" : "⚫" : choice === "red" ? "🔴" : "⚫"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "game-button-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "roulette.red_toggle",
          className: `game-toggle flex items-center gap-2${choice === "red" ? " active" : ""}`,
          onClick: () => setChoice("red"),
          disabled: phase !== "idle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-3 rounded-full bg-red-600" }),
            "Red"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "roulette.black_toggle",
          className: `game-toggle flex items-center gap-2${choice === "black" ? " active" : ""}`,
          onClick: () => setChoice("black"),
          disabled: phase !== "idle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-3 rounded-full bg-zinc-900 border border-border" }),
            "Black"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "roulette-bet",
          className: "text-xs text-muted-foreground font-semibold uppercase tracking-widest",
          children: "Bet Amount"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "roulette-bet",
          "data-ocid": "roulette.bet_input",
          type: "number",
          min: 1,
          max: walletBalance,
          value: betAmount,
          onChange: (e) => setBetAmount(Number(e.target.value)),
          disabled: phase !== "idle",
          className: "font-mono text-center text-base"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BetPresets,
        {
          walletBalance,
          disabled: phase !== "idle",
          onSet: setBetAmount
        }
      )
    ] }),
    phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "roulette.play_button",
        className: "game-play-button w-full",
        onClick: handlePlay,
        disabled: betAmount <= 0 || betAmount > walletBalance || isPending,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "inline w-4 h-4 mr-1.5" }),
          "Spin Wheel"
        ]
      }
    ),
    phase === "animating" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingDots, { ocid: "roulette.loading_state" }),
    phase === "result" && outcome && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "roulette.result_overlay",
        className: "game-result-overlay",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: outcome.outcome === "red" ? "🔴" : "⚫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-display font-bold", children: outcomeLabel(outcome.outcome) }),
          outcome.isWin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-sm px-3 py-1 bg-accent text-accent-foreground", children: [
            "WIN +",
            formatCurrency(outcome.payout - outcome.betAmount)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-sm px-3 py-1", children: [
            "LOSS -",
            formatCurrency(outcome.betAmount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "You picked",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: choiceLabel(outcome.playerChoice) }),
            " ",
            "· Result:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: choiceLabel(outcome.outcome) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "roulette.play_again_button",
              className: "game-play-button",
              onClick: reset,
              children: "Play Again"
            }
          )
        ]
      }
    )
  ] });
}
const GAMES = [
  {
    id: "coinFlip",
    title: "Coin Flip",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-7 h-7" }),
    description: "Pick heads or tails. Land on your choice to double your money. Simple, fast, and 50/50.",
    payout: "2×",
    oddsLabel: "1 in 2 chance",
    component: CoinFlipGame
  },
  {
    id: "diceRoll",
    title: "Dice Roll",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-7 h-7" }),
    description: "Choose a number 1–6. If the dice lands on your pick, you win 6× your bet. High risk, high reward.",
    payout: "6×",
    oddsLabel: "1 in 6 chance",
    component: DiceRollGame
  },
  {
    id: "roulette",
    title: "Red / Black",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { className: "w-7 h-7" }),
    description: "Red or black — pick your color. The wheel spins. Win 2× if your color comes up.",
    payout: "2×",
    oddsLabel: "1 in 2 chance",
    component: RouletteGame
  }
];
function GamesPage() {
  const { isAuthenticated, walletBalance, login, loginStatus, isLoading } = useAuth();
  const [activeGame, setActiveGame] = reactExports.useState(null);
  if (loginStatus === "initializing" || isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-lg" }, i)) })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "games.login_prompt",
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Play Casino Games" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Sign in with Internet Identity to access Coin Flip, Dice Roll, and Roulette with instant payouts." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "games.login_button",
              size: "lg",
              onClick: () => login(),
              disabled: loginStatus === "logging-in",
              className: "gap-2",
              children: loginStatus === "logging-in" ? "Connecting…" : "Connect with Internet Identity"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-8 space-y-8",
      "data-ocid": "games.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight", children: "Games" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Instant payouts · Fixed odds · No house tricks" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-widest", children: "Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: formatCurrency(walletBalance) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            "data-ocid": "games.list",
            children: GAMES.map((game, idx) => {
              const isOpen = activeGame === game.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  "data-ocid": `games.card.${idx + 1}`,
                  className: `game-card flex flex-col overflow-hidden transition-smooth ${isOpen ? "border-primary/60 shadow-lg" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary", children: game.icon }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-base leading-tight", children: game.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: game.oddsLabel })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 text-right", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "game-payout text-lg", children: game.payout }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono", children: "payout" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5", children: game.description }),
                    !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        "data-ocid": `games.open_game.${idx + 1}`,
                        className: "mt-auto",
                        onClick: () => setActiveGame(game.id),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-1.5" }),
                          "Play Now"
                        ]
                      }
                    ),
                    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mt-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-4", children: game.component({ walletBalance }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `games.close_game.${idx + 1}`,
                          className: "text-xs text-muted-foreground hover:text-foreground transition-smooth underline-offset-2 hover:underline self-center",
                          onClick: () => setActiveGame(null),
                          children: "Close game"
                        }
                      )
                    ] })
                  ]
                },
                game.id
              );
            })
          }
        ),
        walletBalance < 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "games.low_balance_warning",
            className: "flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "⚠️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "Your balance is low. Deposit funds to continue playing." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/wallet",
                  className: "ml-auto text-destructive font-semibold underline hover:no-underline whitespace-nowrap",
                  children: "Add Funds →"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  GamesPage
};
