import type { AiInsight } from '../types';

interface AiInsightPanelProps {
  insights: AiInsight[];
}

const priorityLabel = {
  high: '高优先级',
  medium: '中优先级',
  low: '低优先级'
};

export function AiInsightPanel({ insights }: AiInsightPanelProps) {
  return (
    <section className="insight-panel">
      <div className="panel-header">
        <div>
          <p>AI 经营建议</p>
          <h2>从数据异常到运营动作</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">
        这个模块展示“AI 不是替代分析师”，而是把指标变化翻译成业务语言：先说发现，再给证据，最后落到可执行建议。
      </p>

      <div className="insight-stack insight-stack--grid">
        {insights.map((item) => (
          <article className={`insight-card insight-card--${item.priority}`} key={item.title}>
            <div className="insight-card__head">
              <strong>{item.title}</strong>
              <em>{priorityLabel[item.priority]}</em>
            </div>
            <span>{item.insight}</span>
            <small>证据：{item.evidence}</small>
            <b>建议：{item.suggestion}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
