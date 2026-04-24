import { c as createLucideIcon, g as useActor, h as useQuery, l as useQueryClient, a7 as apiPlaceBet, i as createActor, a8 as apiGetMyBets } from "./index-61-h5hTH.js";
import { u as useMutation } from "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]
];
const Coins = createLucideIcon("coins", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
];
const Dices = createLucideIcon("dices", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const MY_BETS_KEY = ["myBets"];
const WALLET_BALANCE_KEY = ["wallet-balance"];
function useMyBets(enabled = true) {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  return useQuery({
    queryKey: MY_BETS_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return apiGetMyBets(actor);
    },
    enabled: enabled && !!actor && !actorLoading,
    staleTime: 1e4
  });
}
function usePlaceBet() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ gameType, betAmount, playerChoice }) => {
      if (!actor) throw new Error("Not connected");
      return apiPlaceBet(actor, gameType, betAmount, playerChoice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_BETS_KEY });
      queryClient.invalidateQueries({ queryKey: WALLET_BALANCE_KEY });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  });
}
export {
  Coins as C,
  Dices as D,
  Trophy as T,
  usePlaceBet as a,
  useMyBets as u
};
