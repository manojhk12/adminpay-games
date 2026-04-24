import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { apiAdminGetAllBets, apiGetMyBets, apiPlaceBet } from "../lib/api";
import type { BetRecord, GameResult, GameType } from "../types";

export const MY_BETS_KEY = ["myBets"] as const;
export const WALLET_BALANCE_KEY = ["wallet-balance"] as const;

/**
 * Query: fetch the current user's bet history.
 * @param enabled - pass false to skip fetching (e.g. not authenticated)
 */
export function useMyBets(enabled = true) {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  return useQuery<BetRecord[]>({
    queryKey: MY_BETS_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return apiGetMyBets(actor);
    },
    enabled: enabled && !!actor && !actorLoading,
    staleTime: 10_000,
  });
}

/**
 * Query: admin fetch of all bets across all users.
 */
export function useAdminAllBets(enabled = true) {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  return useQuery<BetRecord[]>({
    queryKey: ["adminAllBets"],
    queryFn: async () => {
      if (!actor) return [];
      return apiAdminGetAllBets(actor);
    },
    enabled: enabled && !!actor && !actorLoading,
    staleTime: 15_000,
  });
}

interface PlaceBetArgs {
  gameType: GameType;
  betAmount: number;
  playerChoice: GameResult;
}

/**
 * Mutation: place a bet. Invalidates wallet balance and bet history on success.
 */
export function usePlaceBet() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<BetRecord, Error, PlaceBetArgs>({
    mutationFn: async ({ gameType, betAmount, playerChoice }) => {
      if (!actor) throw new Error("Not connected");
      return apiPlaceBet(actor, gameType, betAmount, playerChoice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_BETS_KEY });
      queryClient.invalidateQueries({ queryKey: WALLET_BALANCE_KEY });
      // Also refetch profile (walletBalance lives in profile query)
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
