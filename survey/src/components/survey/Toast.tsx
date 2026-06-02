"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  visible: boolean;
  onHide: () => void;
};

export function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(onHide, 3000);
    return () => window.clearTimeout(timer);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[fadeInUp_0.25s_ease-out]"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-3 text-sm shadow-lg">
        {message}
      </div>
    </div>
  );
}
