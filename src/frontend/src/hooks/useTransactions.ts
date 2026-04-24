import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import {
  apiGetMyTransactions,
  apiRequestDeposit,
  apiRequestWithdrawal,
} from "../lib/api";
import type { DepositRequest, Transaction, WithdrawalRequest } from "../types";

export function useMyTransactions(enabled = true) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Transaction[]>({
    queryKey: ["my-transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetMyTransactions(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export function useRequestDeposit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<Transaction, Error, DepositRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return apiRequestDeposit(actor, req);
    },
    onSuccess: () => {
      toast.success("Deposit request submitted! Awaiting admin approval.");
      qc.invalidateQueries({ queryKey: ["my-transactions"] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to submit deposit"),
  });
}

export function useRequestWithdrawal() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<Transaction, Error, WithdrawalRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return apiRequestWithdrawal(actor, req);
    },
    onSuccess: () => {
      toast.success("Withdrawal request submitted! Awaiting admin approval.");
      qc.invalidateQueries({ queryKey: ["my-transactions"] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
    onError: (e) => toast.error(e.message ?? "Failed to submit withdrawal"),
  });
}
