"use client";

import { SurveyCard } from "@/components/survey/SurveyCard";

type ThankYouScreenProps = {
  variant: "early-exit" | "complete";
  onReset: () => void;
};

export function ThankYouScreen({ variant, onReset }: ThankYouScreenProps) {
  const isEarlyExit = variant === "early-exit";

  return (
    <SurveyCard>
      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-2xl">
            {isEarlyExit ? "🙏" : "✓"}
          </div>
          <h1 className="text-xl font-bold leading-tight">
            설문에 참여해주셔서 감사합니다.
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {isEarlyExit ? (
              <>
                본 설문은 실제 대출 경험이 있는 분들을 대상으로 진행되고
                있습니다.
              </>
            ) : (
              <>소중한 의견은 서비스 개선에 적극 반영하겠습니다.</>
            )}
          </p>
        </div>

        <button type="button" onClick={onReset} className="btn-secondary w-full">
          처음으로 돌아가기
        </button>
      </div>
    </SurveyCard>
  );
}
