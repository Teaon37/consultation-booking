"use client";

import { SurveyCard } from "@/components/survey/SurveyCard";

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <SurveyCard>
      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--accent)]">대출 상담 MVP</p>
          <h1 className="text-2xl font-bold leading-tight tracking-tight">
            대출 상담 MVP 피드백 설문
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            본 설문은 대출 관련 MVP 서비스 개선을 위한 사용자 인터뷰입니다.
            <br />
            약 3~5분 정도 소요됩니다.
          </p>
        </div>
        <button type="button" onClick={onStart} className="btn-primary w-full">
          설문 시작하기
        </button>
      </div>
    </SurveyCard>
  );
}
