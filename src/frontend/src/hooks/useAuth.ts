import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  apiGetMyProfile,
  apiInitializeAdmin,
  apiIsCallerAdmin,
  apiRegisterUser,
} from "../lib/api";
import type { UserProfile } from "../types";

export function useAuth() {
  const { identity, loginStatus, login, clear, isAuthenticated } =
    useInternetIdentity();
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const queryClient = useQueryClient();

  const principal = isAuthenticated
    ? identity?.getPrincipal().toText()
    : undefined;

  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useQuery<UserProfile | null>({
    queryKey: ["profile", principal],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return null;
      try {
        let p = await apiGetMyProfile(actor);
        if (!p) {
          p = await apiRegisterUser(actor);
        }
        return p;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    staleTime: 30_000,
  });

  const { data: isAdmin = false } = useQuery<boolean>({
    queryKey: ["isCallerAdmin", principal],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return false;
      try {
        return await apiIsCallerAdmin(actor);
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    staleTime: 60_000,
  });

  const walletBalance = profile?.walletBalance ?? 0;

  async function logout() {
    clear();
    queryClient.clear();
  }

  async function initAdmin() {
    if (!actor) return;
    await apiInitializeAdmin(actor);
    refetchProfile();
  }

  return {
    principal,
    isAuthenticated,
    isAdmin,
    profile,
    walletBalance,
    loginStatus,
    login,
    logout,
    isLoading: actorLoading || profileLoading,
    refetchProfile,
    initAdmin,
  };
}
