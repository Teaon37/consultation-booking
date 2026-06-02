import type { ReactNode } from "react";

type SurveyCardProps = {
  children: ReactNode;
  className?: string;
};

export function SurveyCard({ children, className = "" }: SurveyCardProps) {
  return (
    <div
      className={`w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)] ${className}`}
    >
      {children}
    </div>
  );
}
