"use client";

import { isOtherOption } from "@/lib/survey-flow";
import type { Answer } from "@/types/survey";
import type { QuestionConfig } from "@/types/survey";

type QuestionStepProps = {
  question: QuestionConfig;
  answer: Answer | undefined;
  onChange: (answer: Answer) => void;
};

export function QuestionStep({ question, answer, onChange }: QuestionStepProps) {
  const isMulti = question.type === "multi";
  const selectedSingle = answer?.type === "single" ? answer.value : "";
  const selectedMulti = answer?.type === "multi" ? answer.values : [];
  const otherText = answer?.other ?? "";

  const handleSingleSelect = (option: string) => {
    onChange({
      type: "single",
      value: option,
      other: isOtherOption(option) ? otherText : undefined,
    });
  };

  const handleMultiToggle = (option: string) => {
    const current = answer?.type === "multi" ? answer.values : [];
    const isSelected = current.includes(option);

    let nextValues: string[];
    if (isSelected) {
      nextValues = current.filter((value) => value !== option);
    } else {
      if (question.maxSelections && current.length >= question.maxSelections) {
        return;
      }
      nextValues = [...current, option];
    }

    onChange({
      type: "multi",
      values: nextValues,
      other: nextValues.some(isOtherOption) ? otherText : undefined,
    });
  };

  const handleOtherChange = (text: string) => {
    if (answer?.type === "single") {
      onChange({ ...answer, other: text });
      return;
    }

    if (answer?.type === "multi") {
      onChange({ ...answer, other: text });
    }
  };

  const showOtherInput =
    (answer?.type === "single" && isOtherOption(selectedSingle)) ||
    (answer?.type === "multi" && selectedMulti.some(isOtherOption));

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold leading-snug">{question.title}</h2>
        {question.description && (
          <p className="text-sm text-[var(--muted)]">{question.description}</p>
        )}
        {question.maxSelections && (
          <p className="text-xs text-[var(--muted)]">
            {selectedMulti.length}/{question.maxSelections}개 선택됨
          </p>
        )}
      </div>

      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = isMulti
            ? selectedMulti.includes(option)
            : selectedSingle === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                isMulti ? handleMultiToggle(option) : handleSingleSelect(option)
              }
              className={`option-button ${isSelected ? "option-button-selected" : ""}`}
              aria-pressed={isSelected}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--card-border)]"
                }`}
              >
                {isMulti ? (
                  isSelected ? (
                    <span className="text-xs">✓</span>
                  ) : null
                ) : (
                  isSelected && <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <span className="text-left text-sm leading-snug">{option}</span>
            </button>
          );
        })}
      </div>

      {showOtherInput && (
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            {question.otherLabel ?? "기타 내용을 입력해주세요"}
          </span>
          <textarea
            value={otherText}
            onChange={(event) => handleOtherChange(event.target.value)}
            placeholder="내용을 입력해주세요"
            rows={3}
            className="input-field resize-none"
          />
        </label>
      )}
    </div>
  );
}
