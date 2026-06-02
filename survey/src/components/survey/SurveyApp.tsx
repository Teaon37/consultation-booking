"use client";

import { useCallback, useMemo, useState } from "react";
import { MvpIntroScreen } from "@/components/survey/MvpIntroScreen";
import { ProgressBar } from "@/components/survey/ProgressBar";
import { QuestionStep } from "@/components/survey/QuestionStep";
import { StartScreen } from "@/components/survey/StartScreen";
import { SurveyCard } from "@/components/survey/SurveyCard";
import { ThankYouScreen } from "@/components/survey/ThankYouScreen";
import { Toast } from "@/components/survey/Toast";
import { CUSTOMER_QUESTIONS, FEEDBACK_QUESTIONS } from "@/lib/questions";
import {
  answersToJson,
  getNextStep,
  getPreviousStep,
  getProgressPercent,
  isAnswerValid,
  validateFeedbackForSubmit,
} from "@/lib/survey-flow";
import { saveSurveyResponse } from "@/lib/supabase";
import type {
  Answer,
  CustomerAnswers,
  FeedbackAnswers,
  StepId,
} from "@/types/survey";

const INITIAL_CUSTOMER: CustomerAnswers = {};
const INITIAL_FEEDBACK: FeedbackAnswers = {};

export function SurveyApp() {
  const [step, setStep] = useState<StepId>("start");
  const [customerAnswers, setCustomerAnswers] =
    useState<CustomerAnswers>(INITIAL_CUSTOMER);
  const [feedbackAnswers, setFeedbackAnswers] =
    useState<FeedbackAnswers>(INITIAL_FEEDBACK);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const progress = useMemo(
    () => getProgressPercent(step, customerAnswers, feedbackAnswers),
    [step, customerAnswers, feedbackAnswers],
  );

  const currentQuestion = useMemo(() => {
    return (
      CUSTOMER_QUESTIONS.find((q) => q.id === step) ??
      FEEDBACK_QUESTIONS.find((q) => q.id === step)
    );
  }, [step]);

  const currentAnswer = useMemo(() => {
    if (!currentQuestion) return undefined;
    if (currentQuestion.section === "customer") {
      return customerAnswers[currentQuestion.id];
    }
    return feedbackAnswers[currentQuestion.id];
  }, [currentQuestion, customerAnswers, feedbackAnswers]);

  const canProceed = useMemo(() => {
    if (!currentQuestion) return true;
    return isAnswerValid(currentAnswer, currentQuestion.id);
  }, [currentQuestion, currentAnswer]);

  const showProgress =
    step !== "start" && step !== "early-exit" && step !== "complete";

  const handleAnswerChange = useCallback(
    (answer: Answer) => {
      if (!currentQuestion) return;

      if (currentQuestion.section === "customer") {
        setCustomerAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
        return;
      }

      setFeedbackAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    },
    [currentQuestion],
  );

  const resetSurvey = useCallback(() => {
    setStep("start");
    setCustomerAnswers(INITIAL_CUSTOMER);
    setFeedbackAnswers(INITIAL_FEEDBACK);
    setSaveError(null);
    setIsSaving(false);
  }, []);

  const submitSurvey = useCallback(async () => {
    const validationError = validateFeedbackForSubmit(feedbackAnswers);

    if (validationError) {
      setSaveError(validationError);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await saveSurveyResponse(
        answersToJson(customerAnswers),
        answersToJson(feedbackAnswers),
      );
      setToastVisible(true);
      setStep("complete");
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "응답 저장 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }, [customerAnswers, feedbackAnswers]);

  const handleNext = useCallback(async () => {
    if (step === "start") {
      setStep("b1");
      return;
    }

    if (step === "mvp-intro") {
      setStep("q1");
      return;
    }

    const next = getNextStep(step, customerAnswers, feedbackAnswers);

    if (next === "complete") {
      await submitSurvey();
      return;
    }

    setStep(next);
  }, [step, customerAnswers, feedbackAnswers, submitSurvey]);

  const handleBack = useCallback(() => {
    const prev = getPreviousStep(step, customerAnswers, feedbackAnswers);
    if (prev) {
      setSaveError(null);
      setStep(prev);
    }
  }, [step, customerAnswers, feedbackAnswers]);

  const nextLabel = useMemo(() => {
    if (step === "mvp-intro") return "MVP 체험 완료 후 피드백 시작";
    if (currentQuestion) {
      const next = getNextStep(step, customerAnswers, feedbackAnswers);
      if (next === "complete") return "제출하기";
      if (next === "mvp-intro") return "다음";
      if (next === "early-exit") return "다음";
    }
    return "다음";
  }, [step, currentQuestion, customerAnswers, feedbackAnswers]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-6 sm:py-10">
      {showProgress && (
        <div className="mb-5">
          <ProgressBar percent={progress} />
        </div>
      )}

      {step === "start" && <StartScreen onStart={() => setStep("b1")} />}

      {step === "mvp-intro" && <MvpIntroScreen onContinue={handleNext} />}

      {(step === "early-exit" || step === "complete") && (
        <ThankYouScreen
          variant={step === "early-exit" ? "early-exit" : "complete"}
          onReset={resetSurvey}
        />
      )}

      {currentQuestion && (
        <SurveyCard>
          <QuestionStep
            question={currentQuestion}
            answer={currentAnswer}
            onChange={handleAnswerChange}
          />

          {saveError && (
            <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {saveError}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            {getPreviousStep(step, customerAnswers, feedbackAnswers) && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSaving}
                className="btn-secondary flex-1"
              >
                이전
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed || isSaving}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  저장 중...
                </span>
              ) : (
                nextLabel
              )}
            </button>
          </div>
        </SurveyCard>
      )}

      <Toast
        message="응답이 저장되었습니다."
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </div>
  );
}
