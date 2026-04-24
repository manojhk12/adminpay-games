import { d as useNavigate, u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, W as Wallet, f as LoadingSpinner } from "./index-61-h5hTH.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BD0k2K4l.js";
import { I as Input } from "./input-8n71MoyQ.js";
import { L as Label } from "./label-QFkCoFUx.js";
import { T as Textarea } from "./textarea-DsMe0YL2.js";
import { u as useAdminSettings } from "./useAdmin-Bwe8enWW.js";
import { b as useRequestWithdrawal, m as motion } from "./useTransactions-4c28ne6j.js";
import { u as useWalletBalance } from "./useWalletBalance-BJlyLC_c.js";
import { A as ArrowUpRight } from "./arrow-up-right-Cpw2HdWB.js";
import "./useMutation-CLJbhYgK.js";
function WithdrawPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { data: balance = 0 } = useWalletBalance(isAuthenticated);
  const { data: settings } = useAdminSettings(isAuthenticated);
  const { mutate: requestWithdrawal, isPending } = useRequestWithdrawal();
  const [amount, setAmount] = reactExports.useState("");
  const [upiId, setUpiId] = reactExports.useState("");
  const [bankDetails, setBankDetails] = reactExports.useState("");
  const [method, setMethod] = reactExports.useState("upi");
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "withdraw.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl bg-orange-900/20 border border-orange-700/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-8 h-8 text-orange-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Withdraw Funds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Please login to request a withdrawal." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => login(), "data-ocid": "withdraw.login_button", children: "Login to Continue" })
        ]
      }
    );
  }
  const minWithdrawal = (settings == null ? void 0 : settings.minWithdrawal) ?? 100;
  const maxWithdrawal = (settings == null ? void 0 : settings.maxWithdrawal) ?? 5e4;
  const parsedAmount = Number.parseFloat(amount);
  const amountValid = !Number.isNaN(parsedAmount) && parsedAmount >= minWithdrawal && parsedAmount <= maxWithdrawal && parsedAmount <= balance;
  const destinationValid = method === "upi" ? upiId.trim().length > 0 : bankDetails.trim().length > 0;
  const insufficientBalance = !Number.isNaN(parsedAmount) && parsedAmount > balance;
  function handleSubmit() {
    if (!amountValid || !destinationValid) return;
    requestWithdrawal(
      {
        amount: parsedAmount,
        destination: method === "upi" ? { upiId: upiId.trim() } : { upiId: "", accountNumber: bankDetails.trim() }
      },
      { onSuccess: () => navigate({ to: "/history" }) }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl",
      "data-ocid": "withdraw.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-orange-900/20 border border-orange-700/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-5 h-5 text-orange-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Withdraw Funds" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5 text-primary" }),
              "Available:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
                "₹",
                balance.toLocaleString("en-IN")
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Withdrawal Amount" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      placeholder: `${minWithdrawal} – ${Math.min(maxWithdrawal, balance)}`,
                      value: amount,
                      onChange: (e) => setAmount(e.target.value),
                      className: "bg-background border-input font-mono text-lg pl-7",
                      "data-ocid": "withdraw.amount.input"
                    }
                  )
                ] }),
                amount && insufficientBalance && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "withdraw.amount.field_error",
                    children: [
                      "Insufficient balance. Available: ₹",
                      balance.toLocaleString("en-IN")
                    ]
                  }
                ),
                amount && !insufficientBalance && !Number.isNaN(parsedAmount) && parsedAmount < minWithdrawal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "withdraw.amount.field_error",
                    children: [
                      "Minimum withdrawal is ₹",
                      minWithdrawal
                    ]
                  }
                ),
                amount && !Number.isNaN(parsedAmount) && parsedAmount > maxWithdrawal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "withdraw.amount.field_error",
                    children: [
                      "Maximum withdrawal is ₹",
                      maxWithdrawal
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["25%", "50%", "Max"].map((label, i) => {
                  const factor = [0.25, 0.5, 1][i];
                  const v = Math.floor(balance * factor);
                  if (v < minWithdrawal) return null;
                  const ocidKey = label.replace("%", "pct").toLowerCase();
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setAmount(v.toString()),
                      "data-ocid": `withdraw.quick_${ocidKey}.button`,
                      className: "px-3 py-1.5 text-xs rounded-md bg-muted hover:bg-primary/15 hover:text-primary text-muted-foreground border border-border hover:border-primary/30 transition-smooth font-mono",
                      children: [
                        label,
                        " (₹",
                        v.toLocaleString("en-IN"),
                        ")"
                      ]
                    },
                    label
                  );
                }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Withdrawal Method" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMethod("upi"),
                      "data-ocid": "withdraw.method_upi.tab",
                      className: `py-2.5 rounded-lg text-sm font-medium border transition-smooth ${method === "upi" ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted border-border text-muted-foreground hover:text-foreground"}`,
                      children: "UPI Transfer"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMethod("bank"),
                      "data-ocid": "withdraw.method_bank.tab",
                      className: `py-2.5 rounded-lg text-sm font-medium border transition-smooth ${method === "bank" ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted border-border text-muted-foreground hover:text-foreground"}`,
                      children: "Bank Transfer"
                    }
                  )
                ] }),
                method === "upi" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upi-id", children: "UPI ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "upi-id",
                      placeholder: "yourname@upi",
                      value: upiId,
                      onChange: (e) => setUpiId(e.target.value),
                      className: "bg-background border-input font-mono",
                      "data-ocid": "withdraw.upi_id.input"
                    }
                  ),
                  upiId && !upiId.includes("@") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "UPI ID format: name@bank" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bank-details", children: "Bank Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "bank-details",
                      placeholder: "Account Number, IFSC Code, Account Holder Name",
                      value: bankDetails,
                      onChange: (e) => setBankDetails(e.target.value),
                      className: "bg-background border-input resize-none min-h-[100px]",
                      "data-ocid": "withdraw.bank_details.textarea"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Include account number, IFSC code, and account holder name." })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: !amountValid || !destinationValid || isPending,
            className: "w-full",
            size: "lg",
            "data-ocid": "withdraw.submit_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
              "Submitting…"
            ] }) : "Submit Withdrawal Request"
          }
        ),
        !amountValid && amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-center text-muted-foreground mt-2",
            "data-ocid": "withdraw.submit.error_state",
            children: "Please enter a valid amount and payment details to continue."
          }
        )
      ]
    }
  );
}
export {
  WithdrawPage
};
