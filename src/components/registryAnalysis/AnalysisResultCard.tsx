import type { AnalysisCardIcon } from '../../constants/registryAnalysis'
import { useTypingText } from '../../hooks/useTypingText'

function CardIcon({ type }: { type: AnalysisCardIcon }) {
  switch (type) {
    case 'building':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="8" width="16" height="12" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M8 12H10M14 12H16M8 16H10M14 16H16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 4L18 8H6L12 4Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'owner':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="9" r="3.5" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M6 20C6.8 16.5 9.2 15 12 15C14.8 15 17.2 16.5 18 20" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17" cy="7" r="3" fill="#22c55e" />
          <path d="M16 7L16.8 7.8L18.5 6.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'mortgage':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="10" width="14" height="10" rx="1.5" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          <path d="M6 14H14M6 17H11" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="16" r="4" fill="#fff" stroke="#8b5cf6" strokeWidth="1.5" />
          <path d="M16.5 16L17.5 17.5L19.5 14.5" stroke="#8b5cf6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'rights':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3L20 7V12C20 16.5 16.5 19.5 12 21C7.5 19.5 4 16.5 4 12V7L12 3Z" fill="#ffedd5" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12L11 14L15 10" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'check':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M8 12L11 15L16 9" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

type AnalysisResultCardProps = {
  icon: AnalysisCardIcon
  title: string
  content: string | null
  visible: boolean
}

function TypingTitle({ title }: { title: string }) {
  const displayed = useTypingText(title, true)

  return (
    <p className="registry-result-title">
      {displayed}
      <span className="registry-typing-cursor" aria-hidden="true">
        {displayed.length < title.length ? '|' : ''}
      </span>
    </p>
  )
}

export function AnalysisResultCard({ icon, title, content, visible }: AnalysisResultCardProps) {
  if (!visible) return null

  const isSummary = icon === 'check'

  return (
    <article
      className={`registry-result-card registry-result-card--visible${isSummary ? ' registry-result-card--summary' : ''}`}
    >
      <span className="registry-result-icon">
        <CardIcon type={icon} />
      </span>
      <div className="registry-result-text">
        {isSummary ? (
          <p className="registry-result-title registry-result-title--summary">{title}</p>
        ) : (
          <TypingTitle title={title} />
        )}
        {content && <p className="registry-result-content">{content}</p>}
      </div>
    </article>
  )
}
