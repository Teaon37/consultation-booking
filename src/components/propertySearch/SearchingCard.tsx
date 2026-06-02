import { SEARCH_STEPS } from '../../constants/propertyMockData'

type SearchingCardProps = {
  searchStep: number
}

export function SearchingCard({ searchStep }: SearchingCardProps) {
  return (
    <section className="property-search-card property-search-card--searching" aria-live="polite">
      <div className="property-search-card-head">
        <span className="property-search-spinner" aria-hidden="true" />
        <p className="property-search-card-title">부동산 정보를 탐색하고 있어요</p>
      </div>
      <ul className="property-search-steps">
        {SEARCH_STEPS.map((step, index) => {
          const visible = searchStep > index
          return (
            <li
              key={step}
              className={`property-search-step${visible ? ' property-search-step--visible' : ''}`}
            >
              <span className="property-search-step-dot" aria-hidden="true" />
              <span>{step}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
