import { g as useActor, h as useQuery, i as createActor, k as apiGetMyWalletBalance } from "./index-61-h5hTH.js";
function useWalletBalance(enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      if (!actor) return 0;
      return apiGetMyWalletBalance(actor);
    },
    enabled: enabled && !!actor && !isFetching,
    staleTime: 15e3,
    refetchInterval: 3e4
  });
}
export {
  useWalletBalance as u
};
