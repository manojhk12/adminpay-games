import { c as createLucideIcon, d as useNavigate, u as useAuth, r as reactExports, e as ue, j as jsxRuntimeExports, B as Button, f as LoadingSpinner, E as ExternalBlob } from "./index-61-h5hTH.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BD0k2K4l.js";
import { I as Input } from "./input-8n71MoyQ.js";
import { L as Label } from "./label-QFkCoFUx.js";
import { u as useAdminSettings } from "./useAdmin-Bwe8enWW.js";
import { u as useMyTransactions, a as useRequestDeposit, m as motion } from "./useTransactions-4c28ne6j.js";
import { A as ArrowDownLeft } from "./arrow-down-left-IFW2tWft.js";
import "./useMutation-CLJbhYgK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const QUICK_AMOUNTS = [500, 1e3, 2e3, 5e3];
function StepDot({ n, active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ${active ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`,
      children: n
    }
  );
}
function DepositPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { data: settings, isLoading: settingsLoading } = useAdminSettings(isAuthenticated);
  const { data: txns = [] } = useMyTransactions(isAuthenticated);
  const { mutate: requestDeposit, isPending } = useRequestDeposit();
  const [amount, setAmount] = reactExports.useState("");
  const [step, setStep] = reactExports.useState("amount");
  const [file, setFile] = reactExports.useState(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const handleCopyUpi = reactExports.useCallback(() => {
    const upi = (settings == null ? void 0 : settings.upiId) ?? "admin@upi";
    navigator.clipboard.writeText(upi).then(() => ue.success("UPI ID copied!"));
  }, [settings == null ? void 0 : settings.upiId]);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "deposit.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Add Money" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Please login to make a deposit." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => login(), "data-ocid": "deposit.login_button", children: "Login to Continue" })
        ]
      }
    );
  }
  const hasPendingDeposit = txns.some(
    (t) => t.type === "deposit" && t.status === "pending"
  );
  const minDeposit = (settings == null ? void 0 : settings.minDeposit) ?? 100;
  const maxDeposit = (settings == null ? void 0 : settings.maxDeposit) ?? 5e4;
  const parsedAmount = Number.parseFloat(amount);
  const amountValid = !Number.isNaN(parsedAmount) && parsedAmount >= minDeposit && parsedAmount <= maxDeposit;
  const fileValid = file && acceptedTypes.includes(file.type);
  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      if (!acceptedTypes.includes(dropped.type)) {
        ue.error("Only JPG and PNG images are allowed.");
        return;
      }
      setFile(dropped);
    }
  }
  function handleFileChange(e) {
    var _a;
    const picked = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!picked) return;
    if (!acceptedTypes.includes(picked.type)) {
      ue.error("Only JPG and PNG images are allowed.");
      return;
    }
    setFile(picked);
  }
  function openFileInput() {
    var _a;
    (_a = document.getElementById("file-input")) == null ? void 0 : _a.click();
  }
  async function handleSubmit() {
    if (!amountValid || !fileValid) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
      (pct) => setUploadProgress(pct)
    );
    requestDeposit(
      { amount: parsedAmount, paymentProofUrl: blob },
      { onSuccess: () => navigate({ to: "/wallet" }) }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl",
      "data-ocid": "deposit.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Add Money" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Deposit funds to your gaming wallet" })
          ] })
        ] }),
        hasPendingDeposit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-start gap-3 p-4 rounded-lg bg-yellow-900/20 border border-yellow-700/40 mb-6",
            "data-ocid": "deposit.pending_notice",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-yellow-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-yellow-300", children: "Pending Deposit Exists" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-400/80 mt-0.5", children: "You already have a deposit awaiting admin approval. You can still submit another request, but please wait for the current one to be reviewed." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "bg-card border-border mb-5",
            "data-ocid": "deposit.amount_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StepDot, { n: 1, active: step === "amount" }),
                "Enter Amount"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount (₹)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "amount",
                      type: "number",
                      placeholder: `Min ₹${minDeposit} — Max ₹${maxDeposit}`,
                      value: amount,
                      onChange: (e) => setAmount(e.target.value),
                      min: minDeposit,
                      max: maxDeposit,
                      className: "bg-background border-input font-mono text-lg",
                      "data-ocid": "deposit.amount.input"
                    }
                  ),
                  amount && !amountValid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "deposit.amount.field_error",
                      children: [
                        "Amount must be between ₹",
                        minDeposit,
                        " and ₹",
                        maxDeposit
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: QUICK_AMOUNTS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAmount(String(v)),
                    "data-ocid": `deposit.quick_amount_${v}.button`,
                    className: "px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-primary/15 hover:text-primary text-muted-foreground hover:border-primary/30 transition-smooth border border-border",
                    children: [
                      "₹",
                      v.toLocaleString("en-IN")
                    ]
                  },
                  v
                )) }),
                amountValid && step === "amount" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => setStep("payment"),
                    className: "w-full",
                    "data-ocid": "deposit.continue_button",
                    children: "Continue to Payment →"
                  }
                )
              ] })
            ]
          }
        ),
        (step === "payment" || step === "upload") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "bg-card border-border mb-5",
                "data-ocid": "deposit.payment_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StepDot, { n: 2, active: step === "payment" }),
                    "Payment Details"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: settingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm", label: "Loading payment details…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/50 border border-border space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-0.5", children: "UPI ID" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-primary text-base", children: (settings == null ? void 0 : settings.upiId) || "admin@upi" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            onClick: handleCopyUpi,
                            className: "gap-1.5 text-xs shrink-0",
                            "data-ocid": "deposit.copy_upi_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                              "Copy"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Send exactly" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-xl text-primary", children: [
                          "₹",
                          parsedAmount.toLocaleString("en-IN")
                        ] })
                      ] })
                    ] }),
                    (settings == null ? void 0 : settings.qrCodeUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-card border border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: settings.qrCodeUrl,
                          alt: "Admin QR Code",
                          className: "w-44 h-44 rounded-lg object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground mt-2", children: "Scan to pay" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-yellow-900/20 border border-yellow-700/30", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-yellow-400 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-300", children: "Complete the payment, take a screenshot, then upload it in the next step for admin verification." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: () => setStep("upload"),
                        variant: "outline",
                        className: "w-full",
                        "data-ocid": "deposit.payment_done_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-2" }),
                          "Payment Done — Upload Screenshot"
                        ]
                      }
                    )
                  ] }) })
                ]
              }
            )
          }
        ),
        step === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "bg-card border-border",
                "data-ocid": "deposit.upload_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StepDot, { n: 3, active: true }),
                    "Upload Payment Proof"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onDragOver: (e) => {
                          e.preventDefault();
                          setDragOver(true);
                        },
                        onDragLeave: () => setDragOver(false),
                        onDrop: handleDrop,
                        "data-ocid": "deposit.screenshot.dropzone",
                        className: `w-full relative border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer ${dragOver ? "border-primary bg-primary/10" : file ? "border-green-500/60 bg-green-900/10" : "border-border hover:border-primary/40 hover:bg-muted/50"}`,
                        onClick: openFileInput,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "file-input",
                              type: "file",
                              accept: "image/jpeg,image/jpg,image/png",
                              className: "hidden",
                              onChange: handleFileChange
                            }
                          ),
                          file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-green-400" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: file.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                              (file.size / 1024).toFixed(0),
                              " KB — Click to change"
                            ] })
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-8 h-8 text-muted-foreground" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop screenshot here or click to browse" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "JPG or PNG only • Max 5MB" })
                          ] })
                        ]
                      }
                    ),
                    !fileValid && file && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "deposit.screenshot.field_error",
                        children: "Only JPG and PNG images are accepted."
                      }
                    ),
                    isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "space-y-1.5",
                        "data-ocid": "deposit.upload.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              uploadProgress,
                              "%"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full bg-primary rounded-full transition-all duration-300",
                              style: { width: `${uploadProgress}%` }
                            }
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: handleSubmit,
                        disabled: !fileValid || isPending || hasPendingDeposit,
                        className: "w-full",
                        "data-ocid": "deposit.submit_button",
                        children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                          "Submitting…"
                        ] }) : "Submit Deposit Request"
                      }
                    ),
                    hasPendingDeposit && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Submission disabled — a deposit is already pending approval." })
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  DepositPage
};
