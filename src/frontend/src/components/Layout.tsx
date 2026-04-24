import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Dice5,
  Gamepad2,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Shield,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const userNavItems = [
  { to: "/", label: "Home", icon: Gamepad2, requiresAuth: false },
  { to: "/wallet", label: "Wallet", icon: Wallet, requiresAuth: true },
  { to: "/games", label: "Games", icon: Dice5, requiresAuth: true },
  {
    to: "/history",
    label: "History",
    icon: LayoutDashboard,
    requiresAuth: true,
  },
];

const adminNavItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/deposits", label: "Deposits", icon: Wallet },
  { to: "/admin/withdrawals", label: "Withdrawals", icon: Wallet },
  { to: "/admin/users", label: "Users", icon: Shield },
  { to: "/admin/transactions", label: "Transactions", icon: LayoutDashboard },
];

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isAdmin, walletBalance, login, logout } = useAuth();
  const { loginStatus } = useInternetIdentity();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isAdminPath = currentPath.startsWith("/admin");

  const navItems =
    isAdminPath && isAdmin
      ? adminNavItems
      : userNavItems.filter((item) => !item.requiresAuth || isAuthenticated);

  function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <>
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = currentPath === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              data-ocid={`nav.${label.toLowerCase()}.link`}
              className={[
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              ].join(" ")}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border-border text-foreground",
          },
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center animate-pulse-glow">
              <Gamepad2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              AdminPay <span className="text-primary">Games</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav.desktop"
          >
            <NavLinks />
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin" data-ocid="nav.admin_badge.link">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              </Link>
            )}

            {isAuthenticated && !isAdminPath && (
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted border border-border text-sm"
                data-ocid="nav.wallet_balance"
              >
                <Wallet className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono font-semibold text-foreground">
                  ₹{walletBalance.toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                data-ocid="nav.logout_button"
                className="hidden sm:flex gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                disabled={loginStatus === "logging-in"}
                data-ocid="nav.login_button"
                className="hidden sm:flex gap-2"
              >
                <LogIn className="w-4 h-4" />
                {loginStatus === "logging-in" ? "Connecting…" : "Login"}
              </Button>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-ocid="nav.mobile_menu_button"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-card border-border p-0"
                data-ocid="nav.mobile_sheet"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <span className="font-display font-bold text-foreground">
                      Menu
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile_close_button"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {isAuthenticated && !isAdminPath && (
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                        <Wallet className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Wallet Balance
                          </p>
                          <p className="font-mono font-bold text-foreground">
                            ₹{walletBalance.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <nav className="flex-1 flex flex-col gap-1 p-4">
                    <NavLinks onNavigate={() => setMobileOpen(false)} />
                    {isAdmin && isAdminPath === false && (
                      <>
                        <Separator className="my-2" />
                        <p className="text-xs text-muted-foreground px-3 mb-1 uppercase tracking-widest">
                          Admin
                        </p>
                        {adminNavItems.map(({ to, label, icon: Icon }) => (
                          <Link
                            key={to}
                            to={to}
                            onClick={() => setMobileOpen(false)}
                            data-ocid={`nav.admin_${label.toLowerCase()}.link`}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </Link>
                        ))}
                      </>
                    )}
                  </nav>

                  <div className="p-4 border-t border-border">
                    {isAuthenticated ? (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        data-ocid="nav.mobile_logout_button"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    ) : (
                      <Button
                        className="w-full gap-2"
                        onClick={() => {
                          login();
                          setMobileOpen(false);
                        }}
                        disabled={loginStatus === "logging-in"}
                        data-ocid="nav.mobile_login_button"
                      >
                        <LogIn className="w-4 h-4" />
                        {loginStatus === "logging-in"
                          ? "Connecting…"
                          : "Login with Internet Identity"}
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 bg-background">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-3.5 h-3.5 text-primary" />
            <span>AdminPay Games — All payments admin-controlled</span>
          </div>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
