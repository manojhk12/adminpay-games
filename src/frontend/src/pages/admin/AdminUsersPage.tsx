import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, ShieldOff, Users, UsersIcon } from "lucide-react";
import {
  useAllUsers,
  useBlockUser,
  useUnblockUser,
} from "../../hooks/useAdmin";
import type { UserProfile } from "../../types";

function truncate(id: string, len = 18) {
  return id.length > len ? `${id.slice(0, len)}…` : id;
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function UserRowSkeleton() {
  return (
    <tr className="border-b border-border">
      {["c1", "c2", "c3", "c4", "c5", "c6"].map((k) => (
        <td key={k} className="px-4 py-3">
          <Skeleton className="h-4 w-24" />
        </td>
      ))}
    </tr>
  );
}

interface UserRowProps {
  user: UserProfile;
  index: number;
}

function UserRow({ user, index }: UserRowProps) {
  const block = useBlockUser();
  const unblock = useUnblockUser();

  const isBlocked = user.status === "blocked";
  const isBusy = block.isPending || unblock.isPending;

  function handleToggle() {
    if (isBlocked) {
      unblock.mutate(user.id);
    } else {
      block.mutate(user.id);
    }
  }

  return (
    <tr
      className="border-b border-border hover:bg-muted/20 transition-colors"
      data-ocid={`admin.users.item.${index + 1}`}
    >
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
        {truncate(user.principal)}
      </td>
      <td className="px-4 py-3 font-medium text-foreground">{user.username}</td>
      <td className="px-4 py-3 text-right font-bold text-primary">
        {fmt(user.walletBalance)}
      </td>
      <td className="px-4 py-3 text-center">
        {isBlocked ? (
          <Badge
            variant="destructive"
            className="uppercase tracking-widest text-[10px] px-2 py-0.5"
            data-ocid={`admin.users.status_badge.${index + 1}`}
          >
            Blocked
          </Badge>
        ) : user.isAdmin ? (
          <Badge
            className="uppercase tracking-widest text-[10px] px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
            data-ocid={`admin.users.status_badge.${index + 1}`}
          >
            Admin
          </Badge>
        ) : (
          <Badge
            className="uppercase tracking-widest text-[10px] px-2 py-0.5 bg-green-900/30 text-green-400 border border-green-700/40 hover:bg-green-900/40"
            data-ocid={`admin.users.status_badge.${index + 1}`}
          >
            Active
          </Badge>
        )}
      </td>
      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
        {fmtDate(user.createdAt)}
      </td>
      <td className="px-4 py-3 text-right">
        {!user.isAdmin && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleToggle}
            disabled={isBusy}
            data-ocid={`admin.users.${isBlocked ? "unblock" : "block"}_button.${index + 1}`}
            className={
              isBlocked
                ? "border-green-700/50 bg-green-900/20 text-green-400 hover:bg-green-900/40 text-xs h-7"
                : "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs h-7"
            }
          >
            {isBlocked ? (
              <>
                <ShieldCheck className="w-3 h-3 mr-1" />
                Unblock
              </>
            ) : (
              <>
                <ShieldOff className="w-3 h-3 mr-1" />
                Block
              </>
            )}
          </Button>
        )}
      </td>
    </tr>
  );
}

export function AdminUsersPage() {
  const { data: users, isLoading } = useAllUsers();

  const isEmpty = !isLoading && (!users || users.length === 0);

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 space-y-6"
      data-ocid="admin.users.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage all registered users
          </p>
        </div>
        {users && users.length > 0 && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {users.length} users
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="admin.users.list">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Principal",
                  "Username",
                  "Balance",
                  "Status",
                  "Registered",
                  "Action",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-xs ${i === 2 || i === 5 ? "text-right" : i === 3 ? "text-center" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["r1", "r2", "r3", "r4", "r5", "r6"].map((id) => (
                  <UserRowSkeleton key={id} />
                ))}

              {isEmpty && (
                <tr>
                  <td colSpan={6}>
                    <div
                      data-ocid="admin.users.empty_state"
                      className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground"
                    >
                      <Users className="w-10 h-10 opacity-40" />
                      <p className="font-medium">No users yet</p>
                      <p className="text-xs opacity-60">
                        Users will appear here after they register.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {users?.map((user, idx) => (
                <UserRow key={user.id} user={user} index={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
