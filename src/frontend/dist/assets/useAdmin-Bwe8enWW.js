import { g as useActor, h as useQuery, l as useQueryClient, e as ue, V as apiApproveDeposit, Y as apiRejectDeposit, Z as apiApproveWithdrawal, _ as apiRejectWithdrawal, $ as apiBlockUser, a0 as apiUnblockUser, i as createActor, a1 as apiGetPendingDeposits, a2 as apiGetPendingWithdrawals, a3 as apiGetAllUsers, a4 as apiGetAllTransactions, a5 as apiGetAdminSettings, a6 as apiGetDashboardStats } from "./index-61-h5hTH.js";
import { u as useMutation } from "./useMutation-CLJbhYgK.js";
function usePendingDeposits(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pending-deposits"],
    queryFn: async () => !actor ? [] : apiGetPendingDeposits(actor),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 1e4,
    refetchInterval: 2e4
  });
}
function usePendingWithdrawals(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pending-withdrawals"],
    queryFn: async () => !actor ? [] : apiGetPendingWithdrawals(actor),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 1e4,
    refetchInterval: 2e4
  });
}
function useAllUsers(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["all-users"],
    queryFn: async () => !actor ? [] : apiGetAllUsers(actor),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useAllTransactions(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["all-transactions"],
    queryFn: async () => !actor ? [] : apiGetAllTransactions(actor),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15e3
  });
}
function useAdminSettings(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      if (!actor) return defaultSettings();
      return apiGetAdminSettings(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useDashboardStats(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      if (!actor) return defaultStats();
      return apiGetDashboardStats(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15e3,
    refetchInterval: 3e4
  });
}
function useApproveDeposit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiApproveDeposit(actor, txId, note);
    },
    onSuccess: () => {
      ue.success("Deposit approved ✓");
      qc.invalidateQueries({ queryKey: ["pending-deposits"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      qc.invalidateQueries({ queryKey: ["all-transactions"] });
    },
    onError: (e) => ue.error(e.message ?? "Failed to approve")
  });
}
function useRejectDeposit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiRejectDeposit(actor, txId, note);
    },
    onSuccess: () => {
      ue.error("Deposit rejected");
      qc.invalidateQueries({ queryKey: ["pending-deposits"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e) => ue.error(e.message ?? "Failed to reject")
  });
}
function useApproveWithdrawal() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiApproveWithdrawal(actor, txId, note);
    },
    onSuccess: () => {
      ue.success("Withdrawal approved ✓");
      qc.invalidateQueries({ queryKey: ["pending-withdrawals"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      qc.invalidateQueries({ queryKey: ["all-transactions"] });
    },
    onError: (e) => ue.error(e.message ?? "Failed to approve")
  });
}
function useRejectWithdrawal() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiRejectWithdrawal(actor, txId, note);
    },
    onSuccess: () => {
      ue.error("Withdrawal rejected");
      qc.invalidateQueries({ queryKey: ["pending-withdrawals"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e) => ue.error(e.message ?? "Failed to reject")
  });
}
function useBlockUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      await apiBlockUser(actor, userId);
    },
    onSuccess: () => {
      ue.success("User blocked");
      qc.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (e) => ue.error(e.message ?? "Failed to block user")
  });
}
function useUnblockUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      await apiUnblockUser(actor, userId);
    },
    onSuccess: () => {
      ue.success("User unblocked");
      qc.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (e) => ue.error(e.message ?? "Failed to unblock user")
  });
}
function defaultSettings() {
  return {
    upiId: "",
    qrCodeUrl: "",
    minDeposit: 100,
    minWithdrawal: 100,
    maxDeposit: 5e4,
    maxWithdrawal: 5e4
  };
}
function defaultStats() {
  return {
    totalUsers: 0,
    totalDeposited: 0,
    totalWithdrawn: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    approvedTransactions: 0,
    rejectedTransactions: 0
  };
}
export {
  useDashboardStats as a,
  usePendingDeposits as b,
  usePendingWithdrawals as c,
  useApproveDeposit as d,
  useRejectDeposit as e,
  useApproveWithdrawal as f,
  useRejectWithdrawal as g,
  useAllUsers as h,
  useBlockUser as i,
  useUnblockUser as j,
  useAllTransactions as k,
  useAdminSettings as u
};
