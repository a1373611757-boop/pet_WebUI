import { useState } from 'react';
import type { BusinessInsightInput } from '../../ai/aiTypes';
import { promptTemplates } from '../../ai/prompts';
import { AiBusinessInsightDemo } from './AiBusinessInsightDemo';
import { AiCustomerServiceDemo } from './AiCustomerServiceDemo';
import { AiDailyReportDemo } from './AiDailyReportDemo';
import { AiMarketingCopyDemo } from './AiMarketingCopyDemo';

interface AiFeatureCenterProps {
  businessData: BusinessInsightInput;
}

const featureTabs = [
  { key: 'customerService', label: 'AI 客服助手' },
  { key: 'dailyReport', label: 'AI 寄养日报生成' },
  { key: 'marketingCopy', label: 'AI 运营文案生成' },
  { key: 'businessInsight', label: 'AI 经营分析助手' }
] as const;

type FeatureTab = typeof featureTabs[number]['key'];

export function AiFeatureCenter({ businessData }: AiFeatureCenterProps) {
  const [activeTab, setActiveTab] = useState<FeatureTab>('customerService');

  return (
    <section className="ai-center" aria-label="AI 功能演示中心">
      <header className="ai-center__header">
        <div>
          <span className="eyebrow">AI Demo Center</span>
          <h1>邻宠到家｜AI 功能演示中心</h1>
          <p>基于本地 mock 输出，展示 AI 如何嵌入宠物寄养的客服、履约、运营和经营分析链路。</p>
        </div>
        <aside className="hero-card">
          <span>演示原则</span>
          <strong>模拟 AI 输出，仅用于作品集展示</strong>
          <p>不接真实 API，不包含真实用户数据，所有高风险动作都需要人工确认。</p>
        </aside>
      </header>

      <nav className="ai-tabs" aria-label="AI 功能切换">
        {featureTabs.map((item) => (
          <button
            className={activeTab === item.key ? 'ai-tab ai-tab--active' : 'ai-tab'}
            key={item.key}
            type="button"
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="ai-prompt-note" aria-label="Prompt 设计说明">
        <strong>Prompt 设计口径</strong>
        <p>{promptTemplates[activeTab]}</p>
      </section>

      {activeTab === 'customerService' && <AiCustomerServiceDemo />}
      {activeTab === 'dailyReport' && <AiDailyReportDemo />}
      {activeTab === 'marketingCopy' && <AiMarketingCopyDemo />}
      {activeTab === 'businessInsight' && <AiBusinessInsightDemo data={businessData} />}

      <section className="ai-boundary-panel" aria-label="AI 边界说明">
        <div>
          <p className="eyebrow">AI Boundary</p>
          <h2>AI 边界说明</h2>
          <p>这个演示中心强调 AI 辅助业务，而不是替代人工判断。</p>
        </div>
        <ul>
          <li>AI 不做宠物医疗诊断，只能整理照护信息和提示关注异常。</li>
          <li>AI 不处理退款争议定责，投诉、赔付和责任判断必须转人工。</li>
          <li>AI 日报必须由商家确认事实和措辞后发布。</li>
          <li>AI 经营建议只作为参考，不自动执行投放、改价、扩容或服务规则调整。</li>
        </ul>
      </section>
    </section>
  );
}
