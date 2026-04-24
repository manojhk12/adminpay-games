import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import {
  apiApproveDeposit,
  apiApproveWithdrawal,
  apiBlockUser,
  apiGetAdminSettings,
  apiGetAllTransactions,
  apiGetAllUsers,
  apiGetDashboardStats,
  apiGetPendingDeposits,
  apiGetPendingWithdrawals,
  apiRejectDeposit,
  apiRejectWithdrawal,
  apiUnblockUser,
  apiUpdateAdminSettings,
} from "../lib/api";
import type {
  AdminSettings,
  DashboardStats,
  Transaction,
  UserProfile,
} from "../types";

// ── Data hooks ────────────────────────────────────────────────────────────────

export function usePendingDeposits(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Transaction[]>({
    queryKey: ["pending-deposits"],
    queryFn: async () => (!actor ? [] : apiGetPendingDeposits(actor)),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 10_000,
    refetchInterval: 20_000,
  });
}

export function usePendingWithdrawals(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Transaction[]>({
    queryKey: ["pending-withdrawals"],
    queryFn: async () => (!actor ? [] : apiGetPendingWithdrawals(actor)),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 10_000,
    refetchInterval: 20_000,
  });
}

export function useAllUsers(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile[]>({
    queryKey: ["all-users"],
    queryFn: async () => (!actor ? [] : apiGetAllUsers(actor)),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAllTransactions(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Transaction[]>({
    queryKey: ["all-transactions"],
    queryFn: async () => (!actor ? [] : apiGetAllTransactions(actor)),
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export function useAdminSettings(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AdminSettings>({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      if (!actor) return defaultSettings();
      return apiGetAdminSettings(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useDashboardStats(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      if (!actor) return defaultStats();
      return apiGetDashboardStats(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

// ── Mutation hooks ────────────────────────────────────────────────────────────

export function useApproveDeposit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { txId: string; note?: string }>({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiApproveDeposit(actor, txId, note);
    },
    onSuccess: () => {
      toast.success("Deposit approved ✓");
      qc.invalidateQueries({ queryKey: ["pending-deposits"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      qc.invalidateQueries({ queryKey: ["all-transactions"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to approve"),
  });
}

export function useRejectDeposit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { txId: string; note: string }>({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiRejectDeposit(actor, txId, note);
    },
    onSuccess: () => {
      toast.error("Deposit rejected");
      qc.invalidateQueries({ queryKey: ["pending-deposits"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to reject"),
  });
}

export function useApproveWithdrawal() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { txId: string; note?: string }>({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiApproveWithdrawal(actor, txId, note);
    },
    onSuccess: () => {
      toast.success("Withdrawal approved ✓");
      qc.invalidateQueries({ queryKey: ["pending-withdrawals"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      qc.invalidateQueries({ queryKey: ["all-transactions"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to approve"),
  });
}

export function useRejectWithdrawal() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { txId: string; note: string }>({
    mutationFn: async ({ txId, note }) => {
      if (!actor) throw new Error("Not connected");
      await apiRejectWithdrawal(actor, txId, note);
    },
    onSuccess: () => {
      toast.error("Withdrawal rejected");
      qc.invalidateQueries({ queryKey: ["pending-withdrawals"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to reject"),
  });
}

export function useBlockUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      await apiBlockUser(actor, userId);
    },
    onSuccess: () => {
      toast.success("User blocked");
      qc.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to block user"),
  });
}

export function useUnblockUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      await apiUnblockUser(actor, userId);
    },
    onSuccess: () => {
      toast.success("User unblocked");
      qc.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to unblock user"),
  });
}

export function useUpdateAdminSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, Partial<AdminSettings>>({
    mutationFn: async (settings) => {
      if (!actor) throw new Error("Not connected");
      await apiUpdateAdminSettings(actor, settings);
    },
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to save settings"),
  });
}

// ── Defaults ──────────────────────────────────────────────────────────────────

function defaultSettings(): AdminSettings {
  return {
    upiId: "",
    qrCodeUrl: "",
    minDeposit: 100,
    minWithdrawal: 100,
    maxDeposit: 50000,
    maxWithdrawal: 50000,
  };
}

function defaultStats(): DashboardStats {
  return {
    totalUsers: 0,
    totalDeposited: 0,
    totalWithdrawn: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    approvedTransactions: 0,
    rejectedTransactions: 0,
  };
}
