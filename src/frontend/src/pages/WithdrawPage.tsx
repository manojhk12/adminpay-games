import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useAdminSettings } from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import { useRequestWithdrawal } from "../hooks/useTransactions";
import { useWalletBalance } from "../hooks/useWalletBalance";

export function WithdrawPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { data: balance = 0 } = useWalletBalance(isAuthenticated);
  const { data: settings } = useAdminSettings(isAuthenticated);
  const { mutate: requestWithdrawal, isPending } = useRequestWithdrawal();

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [method, setMethod] = useState<"upi" | "bank">("upi");

  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="withdraw.page"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-900/20 border border-orange-700/30 flex items-center justify-center mb-4">
          <ArrowUpRight className="w-8 h-8 text-orange-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Withdraw Funds
        </h2>
        <p className="text-muted-foreground mb-6">
          Please login to request a withdrawal.
        </p>
        <Button onClick={() => login()} data-ocid="withdraw.login_button">
          Login to Continue
        </Button>
      </div>
    );
  }

  const minWithdrawal = settings?.minWithdrawal ?? 100;
  const maxWithdrawal = settings?.maxWithdrawal ?? 50000;
  const parsedAmount = Number.parseFloat(amount);

  const amountValid =
    !Number.isNaN(parsedAmount) &&
    parsedAmount >= minWithdrawal &&
    parsedAmount <= maxWithdrawal &&
    parsedAmount <= balance;

  const destinationValid =
    method === "upi" ? upiId.trim().length > 0 : bankDetails.trim().length > 0;

  const insufficientBalance =
    !Number.isNaN(parsedAmount) && parsedAmount > balance;

  function handleSubmit() {
    if (!amountValid || !destinationValid) return;
    requestWithdrawal(
      {
        amount: parsedAmount,
        destination:
          method === "upi"
            ? { upiId: upiId.trim() }
            : { upiId: "", accountNumber: bankDetails.trim() },
      },
      { onSuccess: () => navigate({ to: "/history" }) },
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-2xl"
      data-ocid="withdraw.page"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-orange-900/20 border border-orange-700/30 flex items-center justify-center">
          <ArrowUpRight className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Withdraw Funds
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-primary" />
            Available:{" "}
            <span className="font-mono font-semibold text-foreground">
              ₹{balance.toLocaleString("en-IN")}
            </span>
          </p>
        </div>
      </div>

      {/* Amount card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-card border-border mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Withdrawal Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">
                ₹
              </span>
              <Input
                type="number"
                placeholder={`${minWithdrawal} – ${Math.min(maxWithdrawal, balance)}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-background border-input font-mono text-lg pl-7"
                data-ocid="withdraw.amount.input"
              />
            </div>

            {amount && insufficientBalance && (
              <p
                className="text-xs text-destructive"
                data-ocid="withdraw.amount.field_error"
              >
                Insufficient balance. Available: ₹
                {balance.toLocaleString("en-IN")}
              </p>
            )}
            {amount &&
              !insufficientBalance &&
              !Number.isNaN(parsedAmount) &&
              parsedAmount < minWithdrawal && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="withdraw.amount.field_error"
                >
                  Minimum withdrawal is ₹{minWithdrawal}
                </p>
              )}
            {amount &&
              !Number.isNaN(parsedAmount) &&
              parsedAmount > maxWithdrawal && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="withdraw.amount.field_error"
                >
                  Maximum withdrawal is ₹{maxWithdrawal}
                </p>
              )}

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2">
              {(["25%", "50%", "Max"] as const).map((label, i) => {
                const factor = [0.25, 0.5, 1][i];
                const v = Math.floor(balance * factor);
                if (v < minWithdrawal) return null;
                const ocidKey = label.replace("%", "pct").toLowerCase();
                return (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setAmount(v.toString())}
                    data-ocid={`withdraw.quick_${ocidKey}.button`}
                    className="px-3 py-1.5 text-xs rounded-md bg-muted hover:bg-primary/15 hover:text-primary text-muted-foreground border border-border hover:border-primary/30 transition-smooth font-mono"
                  >
                    {label} (₹{v.toLocaleString("en-IN")})
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Method card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Withdrawal Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod("upi")}
                data-ocid="withdraw.method_upi.tab"
                className={`py-2.5 rounded-lg text-sm font-medium border transition-smooth ${
                  method === "upi"
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-muted border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                UPI Transfer
              </button>
              <button
                type="button"
                onClick={() => setMethod("bank")}
                data-ocid="withdraw.method_bank.tab"
                className={`py-2.5 rounded-lg text-sm font-medium border transition-smooth ${
                  method === "bank"
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-muted border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Bank Transfer
              </button>
            </div>

            {method === "upi" ? (
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="bg-background border-input font-mono"
                  data-ocid="withdraw.upi_id.input"
                />
                {upiId && !upiId.includes("@") && (
                  <p className="text-xs text-muted-foreground">
                    UPI ID format: name@bank
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="bank-details">Bank Details</Label>
                <Textarea
                  id="bank-details"
                  placeholder="Account Number, IFSC Code, Account Holder Name"
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                  className="bg-background border-input resize-none min-h-[100px]"
                  data-ocid="withdraw.bank_details.textarea"
                />
                <p className="text-xs text-muted-foreground">
                  Include account number, IFSC code, and account holder name.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!amountValid || !destinationValid || isPending}
        className="w-full"
        size="lg"
        data-ocid="withdraw.submit_button"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            Submitting…
          </span>
        ) : (
          "Submit Withdrawal Request"
        )}
      </Button>

      {!amountValid && amount && (
        <p
          className="text-xs text-center text-muted-foreground mt-2"
          data-ocid="withdraw.submit.error_state"
        >
          Please enter a valid amount and payment details to continue.
        </p>
      )}
    </div>
  );
}
