import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AdminGuard } from "./components/AdminGuard";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";

// ── Lazy page imports ─────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const WalletPage = lazy(() =>
  import("./pages/WalletPage").then((m) => ({ default: m.WalletPage })),
);
const DepositPage = lazy(() =>
  import("./pages/DepositPage").then((m) => ({ default: m.DepositPage })),
);
const WithdrawPage = lazy(() =>
  import("./pages/WithdrawPage").then((m) => ({ default: m.WithdrawPage })),
);
const HistoryPage = lazy(() =>
  import("./pages/HistoryPage").then((m) => ({ default: m.HistoryPage })),
);
const AdminDashboardPage = lazy(() =>
  import("./pages/admin/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminDepositsPage = lazy(() =>
  import("./pages/admin/AdminDepositsPage").then((m) => ({
    default: m.AdminDepositsPage,
  })),
);
const AdminWithdrawalsPage = lazy(() =>
  import("./pages/admin/AdminWithdrawalsPage").then((m) => ({
    default: m.AdminWithdrawalsPage,
  })),
);
const AdminUsersPage = lazy(() =>
  import("./pages/admin/AdminUsersPage").then((m) => ({
    default: m.AdminUsersPage,
  })),
);
const AdminTransactionsPage = lazy(() =>
  import("./pages/admin/AdminTransactionsPage").then((m) => ({
    default: m.AdminTransactionsPage,
  })),
);
const GamesPage = lazy(() =>
  import("./pages/GamesPage").then((m) => ({ default: m.GamesPage })),
);

// ── Page wrapper ──────────────────────────────────────────────────────────────
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner fullPage label="Loading…" />}>
        {children}
      </Suspense>
    </Layout>
  );
}

// ── Routes ────────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageShell>
      <HomePage />
    </PageShell>
  ),
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: () => (
    <PageShell>
      <WalletPage />
    </PageShell>
  ),
});

const depositRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deposit",
  component: () => (
    <PageShell>
      <DepositPage />
    </PageShell>
  ),
});

const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/withdraw",
  component: () => (
    <PageShell>
      <WithdrawPage />
    </PageShell>
  ),
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: () => (
    <PageShell>
      <HistoryPage />
    </PageShell>
  ),
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
  component: () => (
    <PageShell>
      <GamesPage />
    </PageShell>
  ),
});

// Admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <PageShell>
      <AdminGuard>
        <AdminDashboardPage />
      </AdminGuard>
    </PageShell>
  ),
});

const adminDepositsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/deposits",
  component: () => (
    <PageShell>
      <AdminGuard>
        <AdminDepositsPage />
      </AdminGuard>
    </PageShell>
  ),
});

const adminWithdrawalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/withdrawals",
  component: () => (
    <PageShell>
      <AdminGuard>
        <AdminWithdrawalsPage />
      </AdminGuard>
    </PageShell>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <PageShell>
      <AdminGuard>
        <AdminUsersPage />
      </AdminGuard>
    </PageShell>
  ),
});

const adminTransactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/transactions",
  component: () => (
    <PageShell>
      <AdminGuard>
        <AdminTransactionsPage />
      </AdminGuard>
    </PageShell>
  ),
});

// ── Router ────────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  walletRoute,
  depositRoute,
  withdrawRoute,
  historyRoute,
  gamesRoute,
  adminRoute,
  adminDepositsRoute,
  adminWithdrawalsRoute,
  adminUsersRoute,
  adminTransactionsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
