import type { TransactionStatus } from "../types";

interface StatusBadgeProps {
  status: TransactionStatus;
  size?: "sm" | "md";
}

const labels: Record<TransactionStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const classMap: Record<TransactionStatus, string> = {
  pending: "game-badge-pending",
  approved: "game-badge-approved",
  rejected: "game-badge-rejected",
};

const dotMap: Record<TransactionStatus, string> = {
  pending: "status-pending",
  approved: "status-approved",
  rejected: "status-rejected",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "";
  return (
    <span className={`${classMap[status]} ${sizeClass}`}>
      <span className={dotMap[status]} />
      {labels[status]}
    </span>
  );
}
