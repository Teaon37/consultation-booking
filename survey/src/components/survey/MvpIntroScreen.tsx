"use client";

import { SurveyCard } from "@/components/survey/SurveyCard";

type MvpIntroScreenProps = {
  onContinue: () => void;
};

export function MvpIntroScreen({ onContinue }: MvpIntroScreenProps) {
  return (
    <SurveyCard>
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">페르소나</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              당신은 현재 자금이 필요한 상황입니다.
              <br />
              은행이나 일반 금융권에서 원하는 만큼 대출이 나오지 않았고,
              <br />
              추가 자금을 알아보는 과정에서 광고를 보고 이 서비스를 방문했습니다.
              <br />
              그런 상황이라고 가정하고 사용해주세요.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">MVP 테스트 안내</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              현재 버전은 실제 서비스 출시 전 MVP 테스트 버전입니다.
              <br />
              <br />
              디자인, 이미지, 애니메이션 등은 추후 개선될 예정이며,
              <br />
              이번 테스트에서는 대출 조회부터 결과 확인, 상담 신청까지의 흐름이
              자연스럽고 이해하기 쉬운지 확인하고자 합니다.
              <br />
              <br />
              사용 중 헷갈리거나 불편했던 점,
              <br />
              신뢰가 가지 않았던 부분,
              <br />
              상담 신청을 망설이게 된 이유 등을 자유롭게 말씀해 주세요.
            </p>
          </div>
        </div>

        <button type="button" onClick={onContinue} className="btn-primary w-full">
          MVP 체험 완료 후 피드백 시작
        </button>
      </div>
    </SurveyCard>
  );
}
