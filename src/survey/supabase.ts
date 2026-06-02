type SupabaseConfig = {
  url: string
  key: string
}

const PLACEHOLDER_HOST = 'your-project.supabase.co'
const LOCAL_STORAGE_KEY = 'ribbon-survey-responses'

function readEnv(name: string): string | undefined {
  const value = import.meta.env[name]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = readEnv('VITE_SUPABASE_URL')
  const key =
    readEnv('VITE_SUPABASE_PUBLISHABLE_KEY') ?? readEnv('VITE_SUPABASE_ANON_KEY')

  if (!url || !key) return null
  if (url.includes(PLACEHOLDER_HOST)) return null

  return { url: url.replace(/\/$/, ''), key }
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null
}

function saveToLocalStorage(
  customerAnswers: Record<string, unknown>,
  feedbackAnswers: Record<string, unknown>,
) {
  const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]') as unknown[]
  existing.push({
    saved_at: new Date().toISOString(),
    customer_answers: customerAnswers,
    feedback_answers: feedbackAnswers,
  })
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing))
}

function formatSaveError(error: unknown): string {
  if (error instanceof TypeError) {
    return (
      'Supabase 서버에 연결할 수 없습니다. .env.local의 VITE_SUPABASE_URL이 ' +
      'Supabase 대시보드의 Project URL과 일치하는지 확인해주세요.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return '응답 저장 중 오류가 발생했습니다.'
}

export type SaveSurveyResult = {
  savedTo: 'supabase' | 'local'
}

export async function saveSurveyResponse(
  customerAnswers: Record<string, unknown>,
  feedbackAnswers: Record<string, unknown>,
): Promise<SaveSurveyResult> {
  const config = getSupabaseConfig()

  if (!config) {
    saveToLocalStorage(customerAnswers, feedbackAnswers)
    return { savedTo: 'local' }
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        customer_answers: customerAnswers,
        feedback_answers: feedbackAnswers,
      }),
    })

    if (!response.ok) {
      let message = `저장 실패 (${response.status})`

      try {
        const payload = (await response.json()) as { message?: string; hint?: string }
        if (payload.message) {
          message = payload.hint ? `${payload.message} ${payload.hint}` : payload.message
        }
      } catch {
        // ignore JSON parse errors
      }

      throw new Error(message)
    }

    return { savedTo: 'supabase' }
  } catch (error) {
    if (error instanceof TypeError) {
      saveToLocalStorage(customerAnswers, feedbackAnswers)
      return { savedTo: 'local' }
    }

    throw error instanceof Error ? error : new Error('응답 저장 중 오류가 발생했습니다.')
  }
}

export function toSaveErrorMessage(error: unknown): string {
  return formatSaveError(error)
}
