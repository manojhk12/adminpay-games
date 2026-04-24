import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransactionPublic {
    id: TransactionId;
    status: TransactionStatus;
    transactionType: TransactionType;
    userId: UserId;
    createdAt: Timestamp;
    paymentProof?: ExternalBlob;
    adminNote?: string;
    withdrawalDestination?: WithdrawalDestination;
    amount: bigint;
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: BetRecordPublic;
} | {
    __kind__: "err";
    err: string;
};
export type BetId = bigint;
export interface AdminSettingsPublic {
    minWithdrawAmount: bigint;
    upiId: string;
    minDepositAmount: bigint;
    qrCode?: ExternalBlob;
}
export type Result_1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface UserProfilePublic {
    id: UserId;
    status: UserStatus;
    createdAt: Timestamp;
    walletBalance: bigint;
}
export interface DashboardStats {
    totalPendingWithdrawals: bigint;
    totalApprovedDepositAmount: bigint;
    totalApprovedWithdrawalAmount: bigint;
    totalPendingDeposits: bigint;
    totalUsers: bigint;
}
export type UserId = Principal;
export type TransactionId = bigint;
export type Result = {
    __kind__: "ok";
    ok: TransactionId;
} | {
    __kind__: "err";
    err: string;
};
export interface UpdateAdminSettingsArgs {
    minWithdrawAmount: bigint;
    upiId: string;
    minDepositAmount: bigint;
    qrCode?: ExternalBlob;
}
export interface BetRecordPublic {
    id: BetId;
    betAmount: bigint;
    userId: UserId;
    timestamp: Timestamp;
    gameType: GameType;
    playerChoice: GameResult;
    isWin: boolean;
    outcome: GameResult;
    payout: bigint;
}
export type GameResult = {
    __kind__: "red";
    red: null;
} | {
    __kind__: "tails";
    tails: null;
} | {
    __kind__: "heads";
    heads: null;
} | {
    __kind__: "dice";
    dice: bigint;
} | {
    __kind__: "black";
    black: null;
};
export interface WithdrawalDestination {
    bankDetails?: string;
    upiId: string;
}
export enum GameType {
    diceRoll = "diceRoll",
    coinFlip = "coinFlip",
    roulette = "roulette"
}
export enum TransactionStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum TransactionType {
    withdraw = "withdraw",
    deposit = "deposit"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserStatus {
    active = "active",
    blocked = "blocked"
}
export interface backendInterface {
    adminGetAllBets(): Promise<Array<BetRecordPublic>>;
    approveDeposit(txId: TransactionId, note: string | null): Promise<Result_1>;
    approveWithdrawal(txId: TransactionId, note: string | null): Promise<Result_1>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    blockUser(userId: UserId): Promise<void>;
    getAdminSettings(): Promise<AdminSettingsPublic>;
    getAllTransactions(): Promise<Array<TransactionPublic>>;
    getAllUsers(): Promise<Array<UserProfilePublic>>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getMyBets(): Promise<Array<BetRecordPublic>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getMyTransactions(): Promise<Array<TransactionPublic>>;
    getMyWalletBalance(): Promise<bigint>;
    getPendingDeposits(): Promise<Array<TransactionPublic>>;
    getPendingWithdrawals(): Promise<Array<TransactionPublic>>;
    getUser(userId: UserId): Promise<UserProfilePublic | null>;
    /**
     * / Promote the caller to admin. Only works if no admin exists yet (first call).
     */
    initializeAdmin(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    placeBet(gameType: GameType, betAmount: bigint, playerChoice: GameResult): Promise<Result_2>;
    registerUser(): Promise<UserProfilePublic>;
    rejectDeposit(txId: TransactionId, note: string): Promise<Result_1>;
    rejectWithdrawal(txId: TransactionId, note: string): Promise<Result_1>;
    requestDeposit(amount: bigint, paymentProof: ExternalBlob): Promise<Result>;
    requestWithdrawal(amount: bigint, upiId: string, bankDetails: string | null): Promise<Result>;
    unblockUser(userId: UserId): Promise<void>;
    updateAdminSettings(args: UpdateAdminSettingsArgs): Promise<void>;
}
