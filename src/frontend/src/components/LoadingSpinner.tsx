interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  fullPage?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export function LoadingSpinner({
  size = "md",
  label,
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} rounded-full border-primary/30 border-t-primary animate-spin`}
        role="status"
        aria-label={label ?? "Loading"}
      />
      {label && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        data-ocid="loading_state"
        className="min-h-[60vh] flex items-center justify-center"
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
