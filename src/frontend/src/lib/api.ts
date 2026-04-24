import { Principal } from "@icp-sdk/core/principal";
import type { Backend } from "../backend";
import { GameType as BackendGameType, ExternalBlob } from "../backend";
import type {
  AdminSettings,
  BetRecord,
  DashboardStats,
  DepositRequest,
  GameResult,
  GameType,
  Transaction,
  UserProfile,
  WithdrawalRequest,
} from "../types";

// Helper to convert BigInt values from canister responses
function normalizeNumber(val: bigint | number): number {
  return typeof val === "bigint" ? Number(val) : val;
}

// ── User ────────────────────────────────────────────────────────────────────

export async function apiRegisterUser(actor: Backend): Promise<UserProfile> {
  const result = await actor.registerUser();
  return normalizeProfile(result);
}

export async function apiGetMyProfile(
  actor: Backend,
): Promise<UserProfile | null> {
  const result = await actor.getMyProfile();
  if (result === null || result === undefined) return null;
  return normalizeProfile(result);
}

export async function apiGetMyWalletBalance(actor: Backend): Promise<number> {
  const result = await actor.getMyWalletBalance();
  return normalizeNumber(result);
}

export async function apiGetMyTransactions(
  actor: Backend,
): Promise<Transaction[]> {
  const result = await actor.getMyTransactions();
  return Array.isArray(result) ? result.map(normalizeTx) : [];
}

// ── Deposit ──────────────────────────────────────────────────────────────────

export async function apiRequestDeposit(
  actor: Backend,
  req: DepositRequest,
): Promise<Transaction> {
  const blob = ExternalBlob.fromURL(req.paymentProofUrl);
  const result = await actor.requestDeposit(BigInt(req.amount), blob);
  if (result.__kind__ === "err") throw new Error(result.err);
  // Fetch updated transaction list to return the new one
  const txs = await actor.getMyTransactions();
  const normalized = txs.map(normalizeTx);
  // Return the most recent transaction as the created one
  return normalized[normalized.length - 1] ?? normalizeTxFallback(req);
}

// ── Withdrawal ───────────────────────────────────────────────────────────────

export async function apiRequestWithdrawal(
  actor: Backend,
  req: WithdrawalRequest,
): Promise<Transaction> {
  const upiId = req.destination.upiId ?? "";
  const bankDetails = req.destination.accountNumber
    ? `${req.destination.accountNumber}/${req.destination.ifscCode ?? ""}/${req.destination.accountHolder ?? ""}`
    : null;
  const result = await actor.requestWithdrawal(
    BigInt(req.amount),
    upiId,
    bankDetails,
  );
  if (result.__kind__ === "err") throw new Error(result.err);
  // Return a synthetic transaction since backend only returns the ID
  const txs = await actor.getMyTransactions();
  const normalized = txs.map(normalizeTx);
  return normalized[normalized.length - 1] ?? normalizeTxFallback(req);
}

// ── Admin: Deposits ──────────────────────────────────────────────────────────

export async function apiGetPendingDeposits(
  actor: Backend,
): Promise<Transaction[]> {
  const result = await actor.getPendingDeposits();
  return Array.isArray(result) ? result.map(normalizeTx) : [];
}

export async function apiApproveDeposit(
  actor: Backend,
  txId: string,
  note?: string,
): Promise<void> {
  const result = await actor.approveDeposit(BigInt(txId), note ?? null);
  if (result.__kind__ === "err") throw new Error(result.err);
}

export async function apiRejectDeposit(
  actor: Backend,
  txId: string,
  note: string,
): Promise<void> {
  const result = await actor.rejectDeposit(BigInt(txId), note);
  if (result.__kind__ === "err") throw new Error(result.err);
}

// ── Admin: Withdrawals ───────────────────────────────────────────────────────

export async function apiGetPendingWithdrawals(
  actor: Backend,
): Promise<Transaction[]> {
  const result = await actor.getPendingWithdrawals();
  return Array.isArray(result) ? result.map(normalizeTx) : [];
}

export async function apiApproveWithdrawal(
  actor: Backend,
  txId: string,
  note?: string,
): Promise<void> {
  const result = await actor.approveWithdrawal(BigInt(txId), note ?? null);
  if (result.__kind__ === "err") throw new Error(result.err);
}

export async function apiRejectWithdrawal(
  actor: Backend,
  txId: string,
  note: string,
): Promise<void> {
  const result = await actor.rejectWithdrawal(BigInt(txId), note);
  if (result.__kind__ === "err") throw new Error(result.err);
}

// ── Admin: Users ─────────────────────────────────────────────────────────────

export async function apiGetAllUsers(actor: Backend): Promise<UserProfile[]> {
  const result = await actor.getAllUsers();
  return Array.isArray(result) ? result.map(normalizeProfile) : [];
}

export async function apiGetAllTransactions(
  actor: Backend,
): Promise<Transaction[]> {
  const result = await actor.getAllTransactions();
  return Array.isArray(result) ? result.map(normalizeTx) : [];
}

export async function apiBlockUser(
  actor: Backend,
  userId: string,
): Promise<void> {
  await actor.blockUser(Principal.fromText(userId));
}

export async function apiUnblockUser(
  actor: Backend,
  userId: string,
): Promise<void> {
  await actor.unblockUser(Principal.fromText(userId));
}

// ── Admin: Settings & Stats ──────────────────────────────────────────────────

export async function apiGetAdminSettings(
  actor: Backend,
): Promise<AdminSettings> {
  const result = await actor.getAdminSettings();
  return normalizeSettings(result);
}

export async function apiUpdateAdminSettings(
  actor: Backend,
  settings: Partial<AdminSettings>,
): Promise<void> {
  const current = await actor.getAdminSettings();
  await actor.updateAdminSettings({
    upiId: settings.upiId ?? current.upiId,
    minDepositAmount: BigInt(
      settings.minDeposit ?? normalizeNumber(current.minDepositAmount),
    ),
    minWithdrawAmount: BigInt(
      settings.minWithdrawal ?? normalizeNumber(current.minWithdrawAmount),
    ),
    qrCode: settings.qrCodeUrl
      ? ExternalBlob.fromURL(settings.qrCodeUrl)
      : current.qrCode,
  });
}

export async function apiGetDashboardStats(
  actor: Backend,
): Promise<DashboardStats> {
  const result = await actor.getDashboardStats();
  return normalizeStats(result);
}

export async function apiInitializeAdmin(actor: Backend): Promise<void> {
  await actor.initializeAdmin();
}

export async function apiIsCallerAdmin(actor: Backend): Promise<boolean> {
  return actor.isCallerAdmin();
}

// ── Normalizers ───────────────────────────────────────────────────────────────

import type {
  AdminSettingsPublic,
  DashboardStats as BackendDashboardStats,
  GameResult as BackendGameResult,
  BetRecordPublic,
  TransactionPublic,
  UserProfilePublic,
} from "../backend";

function normalizeProfile(raw: UserProfilePublic): UserProfile {
  return {
    id: raw.id.toText(),
    principal: raw.id.toText(),
    username: raw.id.toText().slice(0, 12),
    walletBalance: normalizeNumber(raw.walletBalance),
    status: raw.status === "blocked" ? "blocked" : "active",
    isAdmin: false, // must be determined separately via isCallerAdmin()
    createdAt: normalizeNumber(raw.createdAt),
  };
}

function normalizeTx(raw: TransactionPublic): Transaction {
  const proofUrl = raw.paymentProof?.getDirectURL();
  const dest = raw.withdrawalDestination;
  return {
    id: String(raw.id),
    userId: raw.userId.toText(),
    type: raw.transactionType === "withdraw" ? "withdrawal" : "deposit",
    amount: normalizeNumber(raw.amount),
    paymentProofUrl: proofUrl,
    withdrawalDestination: dest
      ? {
          upiId: dest.upiId,
          accountNumber: dest.bankDetails ?? undefined,
        }
      : undefined,
    status:
      raw.status === "approved"
        ? "approved"
        : raw.status === "rejected"
          ? "rejected"
          : "pending",
    adminNote: raw.adminNote ?? undefined,
    createdAt: normalizeNumber(raw.createdAt),
    updatedAt: normalizeNumber(raw.createdAt), // backend has no updatedAt; use createdAt
  };
}

function normalizeSettings(raw: AdminSettingsPublic): AdminSettings {
  return {
    upiId: raw.upiId ?? "",
    qrCodeUrl: raw.qrCode?.getDirectURL() ?? "",
    bankAccount: undefined,
    ifscCode: undefined,
    minDeposit: normalizeNumber(raw.minDepositAmount ?? 100n),
    minWithdrawal: normalizeNumber(raw.minWithdrawAmount ?? 100n),
    maxDeposit: 50000,
    maxWithdrawal: 50000,
  };
}

function normalizeStats(raw: BackendDashboardStats): DashboardStats {
  return {
    totalUsers: normalizeNumber(raw.totalUsers),
    totalDeposited: normalizeNumber(raw.totalApprovedDepositAmount),
    totalWithdrawn: normalizeNumber(raw.totalApprovedWithdrawalAmount),
    pendingDeposits: normalizeNumber(raw.totalPendingDeposits),
    pendingWithdrawals: normalizeNumber(raw.totalPendingWithdrawals),
    approvedTransactions: 0, // not in backend stats
    rejectedTransactions: 0, // not in backend stats
  };
}

// Fallback for when we can't retrieve the created transaction
function normalizeTxFallback(
  req: DepositRequest | WithdrawalRequest,
): Transaction {
  const isDeposit = "paymentProofUrl" in req;
  return {
    id: String(Date.now()),
    userId: "",
    type: isDeposit ? "deposit" : "withdrawal",
    amount: req.amount,
    paymentProofUrl: isDeposit
      ? (req as DepositRequest).paymentProofUrl
      : undefined,
    status: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// ── Games ─────────────────────────────────────────────────────────────────────

/** Convert frontend GameResult → backend variant */
function serializeGameResult(result: GameResult): BackendGameResult {
  if (result === "heads") return { __kind__: "heads", heads: null };
  if (result === "tails") return { __kind__: "tails", tails: null };
  if (result === "red") return { __kind__: "red", red: null };
  if (result === "black") return { __kind__: "black", black: null };
  return { __kind__: "dice", dice: BigInt(result.dice) };
}

/** Convert backend GameResult variant → frontend GameResult */
function deserializeGameResult(raw: BackendGameResult): GameResult {
  if (raw.__kind__ === "heads") return "heads";
  if (raw.__kind__ === "tails") return "tails";
  if (raw.__kind__ === "red") return "red";
  if (raw.__kind__ === "black") return "black";
  return { dice: Number((raw as { __kind__: "dice"; dice: bigint }).dice) };
}

/** Convert frontend GameType → backend enum */
function serializeGameType(gameType: GameType): BackendGameType {
  if (gameType === "coinFlip") return BackendGameType.coinFlip;
  if (gameType === "diceRoll") return BackendGameType.diceRoll;
  return BackendGameType.roulette;
}

export function normalizeBetRecord(raw: BetRecordPublic): BetRecord {
  return {
    id: Number(raw.id),
    userId: raw.userId.toText(),
    gameType: raw.gameType as GameType,
    betAmount: Number(raw.betAmount),
    playerChoice: deserializeGameResult(raw.playerChoice),
    outcome: deserializeGameResult(raw.outcome),
    payout: Number(raw.payout),
    isWin: raw.isWin,
    timestamp: Number(raw.timestamp),
  };
}

export async function apiPlaceBet(
  actor: Backend,
  gameType: GameType,
  betAmount: number,
  playerChoice: GameResult,
): Promise<BetRecord> {
  const result = await actor.placeBet(
    serializeGameType(gameType),
    BigInt(betAmount),
    serializeGameResult(playerChoice),
  );
  if (result.__kind__ === "err") throw new Error(result.err);
  return normalizeBetRecord(result.ok);
}

export async function apiGetMyBets(actor: Backend): Promise<BetRecord[]> {
  const result = await actor.getMyBets();
  return Array.isArray(result) ? result.map(normalizeBetRecord) : [];
}

export async function apiAdminGetAllBets(actor: Backend): Promise<BetRecord[]> {
  const result = await actor.adminGetAllBets();
  return Array.isArray(result) ? result.map(normalizeBetRecord) : [];
}
