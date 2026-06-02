import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase 환경변수가 설정되지 않았습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해주세요.",
    );
  }

  client = createClient(url, key);
  return client;
}

export async function saveSurveyResponse(
  customerAnswers: Record<string, unknown>,
  feedbackAnswers: Record<string, unknown>,
) {
  const supabase = getSupabaseClient();

  const { error } = await supabase.from("responses").insert({
    customer_answers: customerAnswers,
    feedback_answers: feedbackAnswers,
  });

  if (error) {
    throw new Error(error.message);
  }
}
