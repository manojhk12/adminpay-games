import { j as jsxRuntimeExports } from "./index-61-h5hTH.js";
const labels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected"
};
const classMap = {
  pending: "game-badge-pending",
  approved: "game-badge-approved",
  rejected: "game-badge-rejected"
};
const dotMap = {
  pending: "status-pending",
  approved: "status-approved",
  rejected: "status-rejected"
};
function StatusBadge({ status, size = "md" }) {
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${classMap[status]} ${sizeClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: dotMap[status] }),
    labels[status]
  ] });
}
export {
  StatusBadge as S
};
