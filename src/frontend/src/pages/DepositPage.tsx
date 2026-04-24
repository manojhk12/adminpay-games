import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowDownLeft,
  CheckCircle,
  Copy,
  Info,
  UploadCloud,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
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
import { useAdminSettings } from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import { useMyTransactions, useRequestDeposit } from "../hooks/useTransactions";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

function StepDot({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-primary/20 text-primary"
      }`}
    >
      {n}
    </span>
  );
}

export function DepositPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { data: settings, isLoading: settingsLoading } =
    useAdminSettings(isAuthenticated);
  const { data: txns = [] } = useMyTransactions(isAuthenticated);
  const { mutate: requestDeposit, isPending } = useRequestDeposit();

  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"amount" | "payment" | "upload">("amount");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];

  const handleCopyUpi = useCallback(() => {
    const upi = settings?.upiId ?? "admin@upi";
    navigator.clipboard
      .writeText(upi)
      .then(() => toast.success("UPI ID copied!"));
  }, [settings?.upiId]);

  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="deposit.page"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
          <ArrowDownLeft className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Add Money
        </h2>
        <p className="text-muted-foreground mb-6">
          Please login to make a deposit.
        </p>
        <Button onClick={() => login()} data-ocid="deposit.login_button">
          Login to Continue
        </Button>
      </div>
    );
  }

  // Check for existing pending deposit
  const hasPendingDeposit = txns.some(
    (t) => t.type === "deposit" && t.status === "pending",
  );

  const minDeposit = settings?.minDeposit ?? 100;
  const maxDeposit = settings?.maxDeposit ?? 50000;
  const parsedAmount = Number.parseFloat(amount);
  const amountValid =
    !Number.isNaN(parsedAmount) &&
    parsedAmount >= minDeposit &&
    parsedAmount <= maxDeposit;

  const fileValid = file && acceptedTypes.includes(file.type);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      if (!acceptedTypes.includes(dropped.type)) {
        toast.error("Only JPG and PNG images are allowed.");
        return;
      }
      setFile(dropped);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!acceptedTypes.includes(picked.type)) {
      toast.error("Only JPG and PNG images are allowed.");
      return;
    }
    setFile(picked);
  }

  function openFileInput() {
    document.getElementById("file-input")?.click();
  }

  async function handleSubmit() {
    if (!amountValid || !fileValid) return;

    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
      setUploadProgress(pct),
    );

    requestDeposit(
      { amount: parsedAmount, paymentProofUrl: blob as unknown as string },
      { onSuccess: () => navigate({ to: "/wallet" }) },
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-2xl"
      data-ocid="deposit.page"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
          <ArrowDownLeft className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Add Money
          </h1>
          <p className="text-sm text-muted-foreground">
            Deposit funds to your gaming wallet
          </p>
        </div>
      </div>

      {/* Pending deposit notice */}
      {hasPendingDeposit && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-lg bg-yellow-900/20 border border-yellow-700/40 mb-6"
          data-ocid="deposit.pending_notice"
        >
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-300">
              Pending Deposit Exists
            </p>
            <p className="text-xs text-yellow-400/80 mt-0.5">
              You already have a deposit awaiting admin approval. You can still
              submit another request, but please wait for the current one to be
              reviewed.
            </p>
          </div>
        </motion.div>
      )}

      {/* Step 1: Amount */}
      <Card
        className="bg-card border-border mb-5"
        data-ocid="deposit.amount_card"
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <StepDot n={1} active={step === "amount"} />
            Enter Amount
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder={`Min ₹${minDeposit} — Max ₹${maxDeposit}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={minDeposit}
              max={maxDeposit}
              className="bg-background border-input font-mono text-lg"
              data-ocid="deposit.amount.input"
            />
            {amount && !amountValid && (
              <p
                className="text-xs text-destructive"
                data-ocid="deposit.amount.field_error"
              >
                Amount must be between ₹{minDeposit} and ₹{maxDeposit}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setAmount(String(v))}
                data-ocid={`deposit.quick_amount_${v}.button`}
                className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-primary/15 hover:text-primary text-muted-foreground hover:border-primary/30 transition-smooth border border-border"
              >
                ₹{v.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          {amountValid && step === "amount" && (
            <Button
              onClick={() => setStep("payment")}
              className="w-full"
              data-ocid="deposit.continue_button"
            >
              Continue to Payment →
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Payment details */}
      {(step === "payment" || step === "upload") && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className="bg-card border-border mb-5"
            data-ocid="deposit.payment_card"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <StepDot n={2} active={step === "payment"} />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {settingsLoading ? (
                <LoadingSpinner size="sm" label="Loading payment details…" />
              ) : (
                <>
                  {/* UPI card */}
                  <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                          UPI ID
                        </p>
                        <p className="font-mono font-semibold text-primary text-base">
                          {settings?.upiId || "admin@upi"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyUpi}
                        className="gap-1.5 text-xs shrink-0"
                        data-ocid="deposit.copy_upi_button"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </Button>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Send exactly
                      </p>
                      <p className="font-mono font-bold text-xl text-primary">
                        ₹{parsedAmount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* QR code if available */}
                  {settings?.qrCodeUrl && (
                    <div className="flex justify-center">
                      <div className="p-3 rounded-xl bg-card border border-border">
                        <img
                          src={settings.qrCodeUrl}
                          alt="Admin QR Code"
                          className="w-44 h-44 rounded-lg object-cover"
                        />
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          Scan to pay
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-900/20 border border-yellow-700/30">
                    <Info className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-yellow-300">
                      Complete the payment, take a screenshot, then upload it in
                      the next step for admin verification.
                    </p>
                  </div>

                  <Button
                    onClick={() => setStep("upload")}
                    variant="outline"
                    className="w-full"
                    data-ocid="deposit.payment_done_button"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Payment Done — Upload Screenshot
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Upload screenshot */}
      {step === "upload" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className="bg-card border-border"
            data-ocid="deposit.upload_card"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <StepDot n={3} active />
                Upload Payment Proof
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drag-and-drop zone */}
              <button
                type="button"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                data-ocid="deposit.screenshot.dropzone"
                className={`w-full relative border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer ${
                  dragOver
                    ? "border-primary bg-primary/10"
                    : file
                      ? "border-green-500/60 bg-green-900/10"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                }`}
                onClick={openFileInput}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <p className="text-sm font-medium text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)} KB — Click to change
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Drop screenshot here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG or PNG only • Max 5MB
                    </p>
                  </div>
                )}
              </button>

              {!fileValid && file && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="deposit.screenshot.field_error"
                >
                  Only JPG and PNG images are accepted.
                </p>
              )}

              {/* Progress bar */}
              {isPending && uploadProgress > 0 && (
                <div
                  className="space-y-1.5"
                  data-ocid="deposit.upload.loading_state"
                >
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Uploading…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!fileValid || isPending || hasPendingDeposit}
                className="w-full"
                data-ocid="deposit.submit_button"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Submitting…
                  </span>
                ) : (
                  "Submit Deposit Request"
                )}
              </Button>

              {hasPendingDeposit && !isPending && (
                <p className="text-xs text-center text-muted-foreground">
                  Submission disabled — a deposit is already pending approval.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
