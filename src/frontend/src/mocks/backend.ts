import type { backendInterface, TransactionPublic, UserProfilePublic, DashboardStats, AdminSettingsPublic, BetRecordPublic, _ImmutableObjectStorageRefillInformation } from "../backend";
import { GameType, TransactionStatus, TransactionType, UserRole, UserStatus } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("aaaaa-aa");

const sampleBets: BetRecordPublic[] = [
  {
    id: BigInt(1),
    userId: samplePrincipal,
    gameType: GameType.coinFlip,
    betAmount: BigInt(100),
    playerChoice: { __kind__: "heads", heads: null },
    outcome: { __kind__: "heads", heads: null },
    payout: BigInt(190),
    isWin: true,
    timestamp: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(2),
    userId: samplePrincipal,
    gameType: GameType.diceRoll,
    betAmount: BigInt(50),
    playerChoice: { __kind__: "dice", dice: BigInt(4) },
    outcome: { __kind__: "dice", dice: BigInt(2) },
    payout: BigInt(0),
    isWin: false,
    timestamp: BigInt(Date.now() - 60000) * BigInt(1000000),
  },
];

const sampleTransactions: TransactionPublic[] = [
  {
    id: BigInt(1),
    status: TransactionStatus.pending,
    transactionType: TransactionType.deposit,
    userId: samplePrincipal,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    amount: BigInt(500),
    adminNote: undefined,
    paymentProof: undefined,
    withdrawalDestination: undefined,
  },
  {
    id: BigInt(2),
    status: TransactionStatus.approved,
    transactionType: TransactionType.deposit,
    userId: samplePrincipal,
    createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    amount: BigInt(1000),
    adminNote: "Verified and approved",
    paymentProof: undefined,
    withdrawalDestination: undefined,
  },
  {
    id: BigInt(3),
    status: TransactionStatus.rejected,
    transactionType: TransactionType.withdraw,
    userId: samplePrincipal,
    createdAt: BigInt(Date.now() - 172800000) * BigInt(1000000),
    amount: BigInt(200),
    adminNote: "Invalid UPI ID",
    withdrawalDestination: { upiId: "user@upi", bankDetails: undefined },
    paymentProof: undefined,
  },
];

const sampleUsers: UserProfilePublic[] = [
  {
    id: samplePrincipal,
    status: UserStatus.active,
    createdAt: BigInt(Date.now() - 604800000) * BigInt(1000000),
    walletBalance: BigInt(1300),
  },
  {
    id: Principal.fromText("2vxsx-fae"),
    status: UserStatus.active,
    createdAt: BigInt(Date.now() - 1209600000) * BigInt(1000000),
    walletBalance: BigInt(500),
  },
];

export const mockBackend: backendInterface = {
  // Object-storage internal stubs (required by backendInterface)
  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash) => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_refill: _ImmutableObjectStorageRefillInformation | null) => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  approveDeposit: async (_txId, _note) => ({ __kind__: "ok", ok: null }),
  approveWithdrawal: async (_txId, _note) => ({ __kind__: "ok", ok: null }),
  assignCallerUserRole: async (_user, _role) => undefined,
  blockUser: async (_userId) => undefined,
  getAdminSettings: async (): Promise<AdminSettingsPublic> => ({
    minWithdrawAmount: BigInt(100),
    upiId: "adminpay@upi",
    minDepositAmount: BigInt(50),
    qrCode: undefined,
  }),
  getAllTransactions: async () => sampleTransactions,
  getAllUsers: async () => sampleUsers,
  getCallerUserRole: async () => UserRole.user,
  getDashboardStats: async (): Promise<DashboardStats> => ({
    totalPendingWithdrawals: BigInt(3),
    totalApprovedDepositAmount: BigInt(15000),
    totalApprovedWithdrawalAmount: BigInt(5000),
    totalPendingDeposits: BigInt(7),
    totalUsers: BigInt(42),
  }),
  getMyProfile: async () => ({
    id: samplePrincipal,
    status: UserStatus.active,
    createdAt: BigInt(Date.now() - 604800000) * BigInt(1000000),
    walletBalance: BigInt(1300),
  }),
  getMyTransactions: async () => sampleTransactions,
  getMyWalletBalance: async () => BigInt(1300),
  getPendingDeposits: async () => sampleTransactions.filter(t => t.status === TransactionStatus.pending && t.transactionType === TransactionType.deposit),
  getPendingWithdrawals: async () => sampleTransactions.filter(t => t.status === TransactionStatus.pending && t.transactionType === TransactionType.withdraw),
  getUser: async (_userId) => sampleUsers[0] ?? null,
  initializeAdmin: async () => undefined,
  isCallerAdmin: async () => false,
  registerUser: async () => ({
    id: samplePrincipal,
    status: UserStatus.active,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    walletBalance: BigInt(0),
  }),
  rejectDeposit: async (_txId, _note) => ({ __kind__: "ok", ok: null }),
  rejectWithdrawal: async (_txId, _note) => ({ __kind__: "ok", ok: null }),
  requestDeposit: async (_amount, _proof) => ({ __kind__: "ok", ok: BigInt(4) }),
  requestWithdrawal: async (_amount, _upiId, _bankDetails) => ({ __kind__: "ok", ok: BigInt(5) }),
  unblockUser: async (_userId) => undefined,
  updateAdminSettings: async (_args) => undefined,
  adminGetAllBets: async () => sampleBets,
  getMyBets: async () => sampleBets,
  placeBet: async (_gameType, _betAmount, _playerChoice) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(Date.now()),
      userId: samplePrincipal,
      gameType: GameType.coinFlip,
      betAmount: _betAmount,
      playerChoice: _playerChoice,
      outcome: { __kind__: "heads", heads: null },
      payout: BigInt(Number(_betAmount) * 1.9),
      isWin: true,
      timestamp: BigInt(Date.now()) * BigInt(1000000),
    },
  }),
};
