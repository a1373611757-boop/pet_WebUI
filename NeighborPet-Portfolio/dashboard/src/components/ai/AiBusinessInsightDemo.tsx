import { useMemo } from 'react';
import { AI_OUTPUT_NOTICE, type BusinessInsightInput } from '../../ai/aiTypes';
import { generateBusinessInsight } from '../../ai/mockAiEngine';
import { PromptDesignPanel } from './PromptDesignPanel';

interface AiBusinessInsightDemoProps {
  data: BusinessInsightInput;
}

export function AiBusinessInsightDemo({ data }: AiBusinessInsightDemoProps) {
  const output = useMemo(() => generateBusinessInsight(data), [data]);

  return (
    <section className="ai-business-demo" aria-label="AI 经营分析助手">
      <div className="panel-header">
        <div>
          <p>AI 经营分析助手</p>
          <h2>读取模拟看板数据生成复盘建议</h2>
        </div>
        <span className="mock-badge">{AI_OUTPUT_NOTICE}</span>
      </div>

      <p className="chart-note">{output.summary}</p>

      <div className="ai-section-title">关键发现</div>
      <div className="insight-stack insight-stack--grid">
        {output.findings.map((item) => (
          <article className="insight-card insight-card--high" key={item.insight}>
            <strong>洞察：{item.insight}</strong>
            <small>证据：{item.evidence}</small>
            <b>建议：{item.suggestion}</b>
          </article>
        ))}
      </div>

      <div className="ai-analysis-grid">
        <article className="ai-result-card">
          <div className="ai-result-card__head">
            <strong>风险提醒</strong>
            <span>{AI_OUTPUT_NOTICE}</span>
          </div>
          <ul className="ai-bullet-list">
            {output.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </article>

        <article className="ai-result-card">
          <div className="ai-result-card__head">
            <strong>行动建议</strong>
            <span>洞察 - 证据 - 建议</span>
          </div>
          <div className="ai-action-stack">
            {output.actions.map((item) => (
              <div className="ai-action-item" key={item.insight}>
                <strong>{item.insight}</strong>
                <span>{item.evidence}</span>
                <b>{item.suggestion}</b>
              </div>
            ))}
          </div>
        </article>
      </div>

      <PromptDesignPanel feature="businessInsight" />
    </section>
  );
}
