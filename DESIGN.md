# Design Brief

## Direction

AdminPay Games — Payment platform extended with instant betting games. Dark cyberpunk aesthetic with electric cyan CTAs, high-contrast gaming UI overlays, and instant-play mechanics.

## Tone

Brutalist gaming dashboard: dark, direct, high-contrast cyan/purple. Game UI inherits payment platform's admin severity—no cheerful game-show energy, pure strategy & odds.

## Differentiation

Three betting game cards (Coin Flip, Dice Roll, Roulette) with fixed odds, instant payouts, micro-animations (flip, roll, spin), and result overlays. Games live alongside payment history on a dedicated Games page with consistent dark-theme card UI.

## Color Palette

| Token           | OKLCH          | Role                                    |
|-----------------|----------------|----------------------------------------|
| background      | 0.11 0.008 260 | Near-black base, game board backdrop    |
| foreground      | 0.93 0.01 260  | Off-white text, game labels, odds       |
| card            | 0.16 0.01 260  | Game card surface, elevated             |
| primary         | 0.72 0.23 260  | Electric cyan, Play button, active UI   |
| secondary       | 0.62 0.18 290  | Purple, payout text, secondary toggles  |
| accent          | 0.72 0.23 260  | Cyan win highlights, result emphasis    |
| destructive     | 0.58 0.21 18   | Red loss indicator, rejection clarity   |
| muted           | 0.22 0.01 260  | Inactive toggles, odds text, borders    |
| border          | 0.25 0.01 260  | Card edges, toggle boundaries           |

## Typography

- Display: Space Grotesk — game titles, bet amounts, result banners
- Body: DM Sans — game descriptions, odds labels, button text
- Mono: Geist Mono — odds multipliers (2x, 6x), payout amounts, game IDs
- Scale: Game title `text-2xl font-bold`, odds `text-sm font-mono`, payout `text-lg font-semibold`

## Elevation & Depth

Game cards inherit platform layering: background (0.11L) → card (0.16L) → result overlay (0.11L/80% opacity, backdrop blur). Toggle/button states: active = primary cyan, inactive = muted gray. No shadows; pure lightness + border color shifts.

## Structural Zones

| Zone           | Background       | Border                | Notes                                      |
|----------------|------------------|--------------------|--------------------------------------------|
| Games Page     | background       | —                  | Game grid, 3-column responsive             |
| Game Card      | card (0.16L)     | border / 1px       | Game UI container, hover border dims       |
| Game Controls  | card (0.16L)     | —                  | Toggles/number selectors, gap-3            |
| Play Button    | primary (cyan)   | —                   | Full-width, uppercase, disabled when no bet |
| Result Overlay | background/80%   | backdrop-blur      | Centered text, animation slide-in          |

## Spacing & Rhythm

Game grid: 24px gap. Card padding: 24px. Control groups (toggles/selectors): 12px gap. Play button: 16px vertical margin. Result text centered, 16px spacing.

## Component Patterns

- Game Card: `game-card` utility, 2xl title, sm odds label, lg mono payout, hover border-primary/50
- Toggle: `game-toggle` (active = primary, inactive = muted), px-4 py-2, rounded-md, bold text
- Number Selector: `game-number-button` grid, 12x12, mono font, selected = primary, hover = muted/80
- Play Button: `game-play-button`, full-width, uppercase tracking, disabled opacity-50
- Result: `game-result-overlay`, centered, text-2xl font-bold, green (win) or red (loss), payout mono

## Motion

- Game entry: slide-in 0.3s ease-out (cards load into view)
- Coin flip: flip 0.6s ease-in-out (3D rotate)
- Dice roll: roll 0.8s ease-in-out (2D rotate)
- Roulette spin: spin-wheel 0.8s ease-in-out (circular rotate)
- Result: overlay fades in, text bold, 2-second display before fade-out
- Pending bet: pulse animation on Play button (yellow glow during rollout)

## Constraints

- Never use shadows; rely on lightness separation + border colors
- Game animations: 0.6–0.8s duration, ease-in-out easing, play once per bet
- Toggle states must be unambiguous: active = primary, inactive = muted (no secondary colors)
- Payout text always mono font, never prose font
- Play button disabled when: insufficient wallet balance, already playing, invalid selection

## Signature Detail

Game card result overlays with instant payout confirmation—brings payment-approval rigor to gaming, embedding financial clarity into entertainment mechanics. Fixed odds (2x/6x) clearly labeled on every game.

