type ProgressBarProps = {
  percent: number;
  label?: string;
};

export function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{label ?? "진행률"}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--progress-track)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
