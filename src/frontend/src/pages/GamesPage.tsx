import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CircleDot,
  Coins,
  Dices,
  Play,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { usePlaceBet } from "../hooks/useGames";
import type { GameResult, GameType } from "../types";

// ── Types ────────────────────────────────────────────────────────────────────

type GameId = "coinFlip" | "diceRoll" | "roulette";
type GamePhase = "idle" | "animating" | "result";

interface BetOutcome {
  playerChoice: GameResult;
  outcome: GameResult;
  isWin: boolean;
  payout: number;
  betAmount: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function choiceLabel(choice: GameResult): string {
  if (choice === "heads") return "Heads";
  if (choice === "tails") return "Tails";
  if (choice === "red") return "Red";
  if (choice === "black") return "Black";
  if (typeof choice === "object" && "dice" in choice) return `${choice.dice}`;
  return String(choice);
}

function outcomeLabel(outcome: GameResult): string {
  if (outcome === "heads") return "🪙 Heads";
  if (outcome === "tails") return "🪙 Tails";
  if (outcome === "red") return "🔴 Red";
  if (outcome === "black") return "⚫ Black";
  if (typeof outcome === "object" && "dice" in outcome)
    return `🎲 ${outcome.dice}`;
  return String(outcome);
}

// ── Quick-bet preset buttons ──────────────────────────────────────────────────

interface BetPresetsProps {
  walletBalance: number;
  disabled: boolean;
  onSet: (v: number) => void;
}

function BetPresets({ walletBalance, disabled, onSet }: BetPresetsProps) {
  return (
    <div className="flex gap-1.5 justify-center flex-wrap">
      {[10, 50, 100, 500].map((v) => (
        <button
          type="button"
          key={v}
          onClick={() => onSet(Math.min(v, walletBalance))}
          className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
          disabled={disabled}
        >
          {v}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onSet(walletBalance)}
        className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
        disabled={disabled}
      >
        Max
      </button>
    </div>
  );
}

// ── Loading dots ──────────────────────────────────────────────────────────────

function LoadingDots({ ocid }: { ocid: string }) {
  return (
    <div
      data-ocid={ocid}
      className="flex items-center justify-center gap-2 py-2"
    >
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

// ── Coin Flip ────────────────────────────────────────────────────────────────

function CoinFlipGame({ walletBalance }: { walletBalance: number }) {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [choice, setChoice] = useState<"heads" | "tails">("heads");
  const [betAmount, setBetAmount] = useState<number>(10);
  const [outcome, setOutcome] = useState<BetOutcome | null>(null);
  const { mutateAsync: placeBet, isPending } = usePlaceBet();

  async function handlePlay() {
    if (betAmount <= 0 || betAmount > walletBalance || isPending) return;
    setPhase("animating");
    try {
      const result = await placeBet({
        gameType: "coinFlip" as GameType,
        betAmount,
        playerChoice: choice,
      });
      setOutcome({
        playerChoice: choice,
        outcome: result.outcome,
        isWin: result.isWin,
        payout: result.payout,
        betAmount,
      });
      setPhase("result");
    } catch (err) {
      setPhase("idle");
      toast.error(
        err instanceof Error ? err.message : "Bet failed. Please try again.",
      );
    }
  }

  function reset() {
    setPhase("idle");
    setOutcome(null);
    setBetAmount(10);
  }

  return (
    <div className="relative min-h-[340px] flex flex-col gap-5">
      {/* Coin Visual */}
      <div className="flex justify-center py-2">
        <div
          className={`w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center text-4xl shadow-lg bg-card select-none ${phase === "animating" ? "animate-[flip_0.7s_ease-in-out_infinite]" : "transition-smooth"}`}
        >
          {phase === "result" && outcome
            ? outcome.outcome === "heads"
              ? "🦅"
              : "🪙"
            : "🪙"}
        </div>
      </div>

      {/* Choice */}
      <div className="game-button-group">
        <button
          type="button"
          data-ocid="coinflip.heads_toggle"
          className={`game-toggle${choice === "heads" ? " active" : ""}`}
          onClick={() => setChoice("heads")}
          disabled={phase !== "idle"}
        >
          Heads
        </button>
        <button
          type="button"
          data-ocid="coinflip.tails_toggle"
          className={`game-toggle${choice === "tails" ? " active" : ""}`}
          onClick={() => setChoice("tails")}
          disabled={phase !== "idle"}
        >
          Tails
        </button>
      </div>

      {/* Bet Amount */}
      <div className="space-y-1.5">
        <Label
          htmlFor="coinflip-bet"
          className="text-xs text-muted-foreground font-semibold uppercase tracking-widest"
        >
          Bet Amount
        </Label>
        <Input
          id="coinflip-bet"
          data-ocid="coinflip.bet_input"
          type="number"
          min={1}
          max={walletBalance}
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          disabled={phase !== "idle"}
          className="font-mono text-center text-base"
        />
        <BetPresets
          walletBalance={walletBalance}
          disabled={phase !== "idle"}
          onSet={setBetAmount}
        />
      </div>

      {/* Play Button */}
      {phase === "idle" && (
        <button
          type="button"
          data-ocid="coinflip.play_button"
          className="game-play-button w-full"
          onClick={handlePlay}
          disabled={betAmount <= 0 || betAmount > walletBalance || isPending}
        >
          <Play className="inline w-4 h-4 mr-1.5" />
          Flip Coin
        </button>
      )}

      {phase === "animating" && <LoadingDots ocid="coinflip.loading_state" />}

      {/* Result Overlay */}
      {phase === "result" && outcome && (
        <div
          data-ocid="coinflip.result_overlay"
          className="game-result-overlay"
        >
          <div className="text-5xl">
            {outcome.outcome === "heads" ? "🦅" : "🪙"}
          </div>
          <div className="text-lg font-display font-bold">
            {outcomeLabel(outcome.outcome)}
          </div>
          {outcome.isWin ? (
            <Badge className="text-sm px-3 py-1 bg-accent text-accent-foreground">
              WIN +{formatCurrency(outcome.payout - outcome.betAmount)}
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-sm px-3 py-1">
              LOSS -{formatCurrency(outcome.betAmount)}
            </Badge>
          )}
          <div className="text-xs text-muted-foreground">
            You picked{" "}
            <span className="text-foreground font-semibold">
              {choiceLabel(outcome.playerChoice)}
            </span>{" "}
            · Result:{" "}
            <span className="text-foreground font-semibold">
              {choiceLabel(outcome.outcome)}
            </span>
          </div>
          <button
            type="button"
            data-ocid="coinflip.play_again_button"
            className="game-play-button"
            onClick={reset}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Dice Roll ────────────────────────────────────────────────────────────────

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function DiceRollGame({ walletBalance }: { walletBalance: number }) {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [choice, setChoice] = useState<number>(1);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [outcome, setOutcome] = useState<BetOutcome | null>(null);
  const [animatingFace, setAnimatingFace] = useState(0);
  const { mutateAsync: placeBet, isPending } = usePlaceBet();

  async function handlePlay() {
    if (betAmount <= 0 || betAmount > walletBalance || isPending) return;
    setPhase("animating");
    const interval = setInterval(
      () => setAnimatingFace((f) => (f + 1) % 6),
      100,
    );
    try {
      const result = await placeBet({
        gameType: "diceRoll" as GameType,
        betAmount,
        playerChoice: { dice: choice },
      });
      clearInterval(interval);
      setOutcome({
        playerChoice: { dice: choice },
        outcome: result.outcome,
        isWin: result.isWin,
        payout: result.payout,
        betAmount,
      });
      setPhase("result");
    } catch (err) {
      clearInterval(interval);
      setPhase("idle");
      toast.error(
        err instanceof Error ? err.message : "Bet failed. Please try again.",
      );
    }
  }

  function reset() {
    setPhase("idle");
    setOutcome(null);
    setBetAmount(10);
  }

  const displayFace =
    phase === "animating"
      ? DICE_FACES[animatingFace]
      : phase === "result" &&
          outcome &&
          typeof outcome.outcome === "object" &&
          "dice" in outcome.outcome
        ? DICE_FACES[outcome.outcome.dice - 1]
        : DICE_FACES[choice - 1];

  return (
    <div className="relative min-h-[340px] flex flex-col gap-5">
      <div className="flex justify-center py-2">
        <div
          className={`w-20 h-20 rounded-xl border-4 border-primary flex items-center justify-center text-5xl bg-card shadow-lg select-none ${phase === "animating" ? "animate-[roll_0.15s_linear_infinite]" : "transition-smooth"}`}
        >
          {displayFace}
        </div>
      </div>

      {/* Number Picker */}
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest text-center">
          Pick a number
        </p>
        <div className="game-number-selector justify-center">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              type="button"
              key={n}
              data-ocid={`diceroll.number_${n}_button`}
              className={`game-number-button${choice === n ? " selected" : ""}`}
              onClick={() => setChoice(n)}
              disabled={phase !== "idle"}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="diceroll-bet"
          className="text-xs text-muted-foreground font-semibold uppercase tracking-widest"
        >
          Bet Amount
        </Label>
        <Input
          id="diceroll-bet"
          data-ocid="diceroll.bet_input"
          type="number"
          min={1}
          max={walletBalance}
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          disabled={phase !== "idle"}
          className="font-mono text-center text-base"
        />
        <BetPresets
          walletBalance={walletBalance}
          disabled={phase !== "idle"}
          onSet={setBetAmount}
        />
      </div>

      {phase === "idle" && (
        <button
          type="button"
          data-ocid="diceroll.play_button"
          className="game-play-button w-full"
          onClick={handlePlay}
          disabled={betAmount <= 0 || betAmount > walletBalance || isPending}
        >
          <Play className="inline w-4 h-4 mr-1.5" />
          Roll Dice
        </button>
      )}
      {phase === "animating" && <LoadingDots ocid="diceroll.loading_state" />}

      {phase === "result" && outcome && (
        <div
          data-ocid="diceroll.result_overlay"
          className="game-result-overlay"
        >
          <div className="text-5xl">
            {typeof outcome.outcome === "object" && "dice" in outcome.outcome
              ? DICE_FACES[outcome.outcome.dice - 1]
              : "🎲"}
          </div>
          <div className="text-lg font-display font-bold">
            {outcomeLabel(outcome.outcome)}
          </div>
          {outcome.isWin ? (
            <Badge className="text-sm px-3 py-1 bg-accent text-accent-foreground">
              WIN +{formatCurrency(outcome.payout - outcome.betAmount)}
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-sm px-3 py-1">
              LOSS -{formatCurrency(outcome.betAmount)}
            </Badge>
          )}
          <div className="text-xs text-muted-foreground">
            You picked{" "}
            <span className="text-foreground font-semibold">
              {choiceLabel(outcome.playerChoice)}
            </span>{" "}
            · Rolled:{" "}
            <span className="text-foreground font-semibold">
              {choiceLabel(outcome.outcome)}
            </span>
          </div>
          <button
            type="button"
            data-ocid="diceroll.play_again_button"
            className="game-play-button"
            onClick={reset}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Roulette ─────────────────────────────────────────────────────────────────

function RouletteGame({ walletBalance }: { walletBalance: number }) {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [choice, setChoice] = useState<"red" | "black">("red");
  const [betAmount, setBetAmount] = useState<number>(10);
  const [outcome, setOutcome] = useState<BetOutcome | null>(null);
  const { mutateAsync: placeBet, isPending } = usePlaceBet();

  async function handlePlay() {
    if (betAmount <= 0 || betAmount > walletBalance || isPending) return;
    setPhase("animating");
    try {
      const result = await placeBet({
        gameType: "roulette" as GameType,
        betAmount,
        playerChoice: choice,
      });
      setOutcome({
        playerChoice: choice,
        outcome: result.outcome,
        isWin: result.isWin,
        payout: result.payout,
        betAmount,
      });
      setPhase("result");
    } catch (err) {
      setPhase("idle");
      toast.error(
        err instanceof Error ? err.message : "Bet failed. Please try again.",
      );
    }
  }

  function reset() {
    setPhase("idle");
    setOutcome(null);
    setBetAmount(10);
  }

  const wheelColor =
    phase === "result" && outcome
      ? outcome.outcome === "red"
        ? "bg-red-600"
        : "bg-zinc-900"
      : choice === "red"
        ? "bg-red-600"
        : "bg-zinc-900";

  return (
    <div className="relative min-h-[340px] flex flex-col gap-5">
      <div className="flex justify-center py-2">
        <div
          className={`w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center text-4xl shadow-lg select-none ${wheelColor} ${phase === "animating" ? "animate-[spin-wheel_0.4s_linear_infinite]" : "transition-smooth"}`}
        >
          {phase === "result" && outcome
            ? outcome.outcome === "red"
              ? "🔴"
              : "⚫"
            : choice === "red"
              ? "🔴"
              : "⚫"}
        </div>
      </div>

      {/* Color Choice */}
      <div className="game-button-group">
        <button
          type="button"
          data-ocid="roulette.red_toggle"
          className={`game-toggle flex items-center gap-2${choice === "red" ? " active" : ""}`}
          onClick={() => setChoice("red")}
          disabled={phase !== "idle"}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-red-600" />
          Red
        </button>
        <button
          type="button"
          data-ocid="roulette.black_toggle"
          className={`game-toggle flex items-center gap-2${choice === "black" ? " active" : ""}`}
          onClick={() => setChoice("black")}
          disabled={phase !== "idle"}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-zinc-900 border border-border" />
          Black
        </button>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="roulette-bet"
          className="text-xs text-muted-foreground font-semibold uppercase tracking-widest"
        >
          Bet Amount
        </Label>
        <Input
          id="roulette-bet"
          data-ocid="roulette.bet_input"
          type="number"
          min={1}
          max={walletBalance}
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          disabled={phase !== "idle"}
          className="font-mono text-center text-base"
        />
        <BetPresets
          walletBalance={walletBalance}
          disabled={phase !== "idle"}
          onSet={setBetAmount}
        />
      </div>

      {phase === "idle" && (
        <button
          type="button"
          data-ocid="roulette.play_button"
          className="game-play-button w-full"
          onClick={handlePlay}
          disabled={betAmount <= 0 || betAmount > walletBalance || isPending}
        >
          <Play className="inline w-4 h-4 mr-1.5" />
          Spin Wheel
        </button>
      )}
      {phase === "animating" && <LoadingDots ocid="roulette.loading_state" />}

      {phase === "result" && outcome && (
        <div
          data-ocid="roulette.result_overlay"
          className="game-result-overlay"
        >
          <div className="text-5xl">
            {outcome.outcome === "red" ? "🔴" : "⚫"}
          </div>
          <div className="text-lg font-display font-bold">
            {outcomeLabel(outcome.outcome)}
          </div>
          {outcome.isWin ? (
            <Badge className="text-sm px-3 py-1 bg-accent text-accent-foreground">
              WIN +{formatCurrency(outcome.payout - outcome.betAmount)}
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-sm px-3 py-1">
              LOSS -{formatCurrency(outcome.betAmount)}
            </Badge>
          )}
          <div className="text-xs text-muted-foreground">
            You picked{" "}
            <span className="text-foreground font-semibold">
              {choiceLabel(outcome.playerChoice)}
            </span>{" "}
            · Result:{" "}
            <span className="text-foreground font-semibold">
              {choiceLabel(outcome.outcome)}
            </span>
          </div>
          <button
            type="button"
            data-ocid="roulette.play_again_button"
            className="game-play-button"
            onClick={reset}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Game Config ───────────────────────────────────────────────────────────────

interface GameConfig {
  id: GameId;
  title: string;
  icon: React.ReactNode;
  description: string;
  payout: string;
  oddsLabel: string;
  component: (props: { walletBalance: number }) => React.ReactNode;
}

const GAMES: GameConfig[] = [
  {
    id: "coinFlip",
    title: "Coin Flip",
    icon: <Coins className="w-7 h-7" />,
    description:
      "Pick heads or tails. Land on your choice to double your money. Simple, fast, and 50/50.",
    payout: "2×",
    oddsLabel: "1 in 2 chance",
    component: CoinFlipGame,
  },
  {
    id: "diceRoll",
    title: "Dice Roll",
    icon: <Dices className="w-7 h-7" />,
    description:
      "Choose a number 1–6. If the dice lands on your pick, you win 6× your bet. High risk, high reward.",
    payout: "6×",
    oddsLabel: "1 in 6 chance",
    component: DiceRollGame,
  },
  {
    id: "roulette",
    title: "Red / Black",
    icon: <CircleDot className="w-7 h-7" />,
    description:
      "Red or black — pick your color. The wheel spins. Win 2× if your color comes up.",
    payout: "2×",
    oddsLabel: "1 in 2 chance",
    component: RouletteGame,
  },
];

// ── GamesPage ────────────────────────────────────────────────────────────────

export function GamesPage() {
  const { isAuthenticated, walletBalance, login, loginStatus, isLoading } =
    useAuth();
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  if (loginStatus === "initializing" || isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        data-ocid="games.login_prompt"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Play Casino Games
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Sign in with Internet Identity to access Coin Flip, Dice Roll, and
            Roulette with instant payouts.
          </p>
        </div>
        <Button
          data-ocid="games.login_button"
          size="lg"
          onClick={() => login()}
          disabled={loginStatus === "logging-in"}
          className="gap-2"
        >
          {loginStatus === "logging-in"
            ? "Connecting…"
            : "Connect with Internet Identity"}
        </Button>
      </div>
    );
  }

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-8 space-y-8"
      data-ocid="games.page"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
            Games
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Instant payouts · Fixed odds · No house tricks
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
            Balance
          </span>
          <span className="font-mono font-bold text-foreground">
            {formatCurrency(walletBalance)}
          </span>
        </div>
      </div>

      {/* Game Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="games.list"
      >
        {GAMES.map((game, idx) => {
          const isOpen = activeGame === game.id;
          return (
            <Card
              key={game.id}
              data-ocid={`games.card.${idx + 1}`}
              className={`game-card flex flex-col overflow-hidden transition-smooth ${isOpen ? "border-primary/60 shadow-lg" : ""}`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    {game.icon}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-foreground text-base leading-tight">
                      {game.title}
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {game.oddsLabel}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="game-payout text-lg">{game.payout}</span>
                  <div className="text-xs text-muted-foreground font-mono">
                    payout
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {game.description}
              </p>

              {!isOpen && (
                <Button
                  data-ocid={`games.open_game.${idx + 1}`}
                  className="mt-auto"
                  onClick={() => setActiveGame(game.id)}
                >
                  <Play className="w-4 h-4 mr-1.5" />
                  Play Now
                </Button>
              )}

              {isOpen && (
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="border-t border-border pt-4">
                    {game.component({ walletBalance })}
                  </div>
                  <button
                    type="button"
                    data-ocid={`games.close_game.${idx + 1}`}
                    className="text-xs text-muted-foreground hover:text-foreground transition-smooth underline-offset-2 hover:underline self-center"
                    onClick={() => setActiveGame(null)}
                  >
                    Close game
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Low balance warning */}
      {walletBalance < 10 && (
        <div
          data-ocid="games.low_balance_warning"
          className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm"
        >
          <span className="text-destructive">⚠️</span>
          <span className="text-destructive">
            Your balance is low. Deposit funds to continue playing.
          </span>
          <a
            href="/wallet"
            className="ml-auto text-destructive font-semibold underline hover:no-underline whitespace-nowrap"
          >
            Add Funds →
          </a>
        </div>
      )}
    </div>
  );
}
