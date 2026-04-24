import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import { apiGetMyWalletBalance } from "../lib/api";

export function useWalletBalance(enabled = true) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<number>({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      if (!actor) return 0;
      return apiGetMyWalletBalance(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}
