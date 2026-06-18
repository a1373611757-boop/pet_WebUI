import type { MetricCardItem } from '../types';

interface MetricCardsProps {
  cards: MetricCardItem[];
}

export function MetricCards({ cards }: MetricCardsProps) {
  return (
    <section className="metric-grid" aria-label="核心指标卡">
      {cards.map((card) => (
        <article className={`metric-card metric-card--${card.tone}`} key={card.label}>
          <div>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
          <p>{card.helper}</p>
          <small>{card.trend}</small>
        </article>
      ))}
    </section>
  );
}
