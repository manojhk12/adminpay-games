export type TransactionType = "deposit" | "withdrawal";
export type TransactionStatus = "pending" | "approved" | "rejected";

export interface WithdrawalDestination {
  upiId?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolder?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  paymentProofUrl?: string;
  withdrawalDestination?: WithdrawalDestination;
  status: TransactionStatus;
  adminNote?: string;
  createdAt: number; // Unix ms timestamp
  updatedAt: number;
}

export interface UserProfile {
  id: string;
  principal: string;
  username: string;
  walletBalance: number;
  status: "active" | "blocked";
  isAdmin: boolean;
  createdAt: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalDeposited: number;
  totalWithdrawn: number;
  pendingDeposits: number;
  pendingWithdrawals: number;
  approvedTransactions: number;
  rejectedTransactions: number;
}

export interface AdminSettings {
  upiId: string;
  qrCodeUrl: string;
  bankAccount?: string;
  ifscCode?: string;
  minDeposit: number;
  minWithdrawal: number;
  maxDeposit: number;
  maxWithdrawal: number;
}

export interface DepositRequest {
  amount: number;
  paymentProofUrl: string;
}

export interface WithdrawalRequest {
  amount: number;
  destination: WithdrawalDestination;
}

// ── Games ──────────────────────────────────────────────────────────────────────

export type GameType = "coinFlip" | "diceRoll" | "roulette";

export type GameResult = "heads" | "tails" | { dice: number } | "red" | "black";

export interface BetRecord {
  id: number;
  userId: string;
  gameType: GameType;
  betAmount: number;
  playerChoice: GameResult;
  outcome: GameResult;
  payout: number;
  isWin: boolean;
  timestamp: number;
}
