import type { FinanceProvider } from '../../types/providerComparison'

type ProviderCardProps = {
  provider: FinanceProvider
  visible: boolean
  onSelect: (provider: FinanceProvider) => void
}

export function ProviderCard({ provider, visible, onSelect }: ProviderCardProps) {
  if (!visible) return null

  return (
    <button
      type="button"
      className="comparison-provider-card comparison-provider-card--visible"
      onClick={() => onSelect(provider)}
    >
      <div className="comparison-provider-top">
        <span
          className="comparison-provider-badge"
          style={{ backgroundColor: provider.badgeColor }}
        >
          {provider.badge}
        </span>
        <div className="comparison-provider-main">
          <p className="comparison-provider-name">{provider.name}</p>
          <div className="comparison-provider-tags">
            {provider.tags.map((tag) => (
              <span key={tag} className="comparison-provider-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="comparison-provider-rate-box">
          <div className="comparison-provider-limit-row">
            <p className="comparison-provider-limit">{provider.limit}</p>
            <svg
              className="comparison-provider-chevron"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="comparison-provider-rate">{provider.rate}</p>
        </div>
      </div>
      <dl className="comparison-provider-details">
        <div className="comparison-provider-detail-row">
          <dt>상환기간</dt>
          <dd>{provider.repaymentPeriod}</dd>
        </div>
        <div className="comparison-provider-detail-row">
          <dt>중도상환수수료</dt>
          <dd>{provider.prepaymentFee}</dd>
        </div>
        <div className="comparison-provider-detail-row">
          <dt>대출방식</dt>
          <dd>{provider.loanMethod}</dd>
        </div>
        <div className="comparison-provider-detail-row">
          <dt>특징</dt>
          <dd>{provider.feature}</dd>
        </div>
      </dl>
    </button>
  )
}
