export type SingleAnswer = {
  type: "single";
  value: string;
  other?: string;
};

export type MultiAnswer = {
  type: "multi";
  values: string[];
  other?: string;
};

export type Answer = SingleAnswer | MultiAnswer;

export type CustomerAnswers = Record<string, Answer>;
export type FeedbackAnswers = Record<string, Answer>;

export type StepId =
  | "start"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "mvp-intro"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q8"
  | "q9"
  | "q10"
  | "early-exit"
  | "complete";

export type QuestionConfig = {
  id: StepId;
  title: string;
  description?: string;
  type: "single" | "multi";
  options: string[];
  maxSelections?: number;
  allowOther?: boolean;
  otherLabel?: string;
  section: "customer" | "feedback";
};
