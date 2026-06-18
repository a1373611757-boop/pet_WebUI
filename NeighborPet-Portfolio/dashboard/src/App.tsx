import { useState } from 'react';
import { AiInsightPanel } from './components/AiInsightPanel';
import { AiFeatureCenter } from './components/ai/AiFeatureCenter';
import { ChannelChart } from './components/ChannelChart';
import { FunnelChart } from './components/FunnelChart';
import { MetricCards } from './components/MetricCards';
import { OccupancyChart } from './components/OccupancyChart';
import { RepeatChart } from './components/RepeatChart';
import { ServiceChart } from './components/ServiceChart';
import { TrendChart } from './components/TrendChart';
import {
  channelMetrics,
  dailyMetrics,
  dataNotice,
  funnelData,
  occupancyTrend,
  orders,
  repeatMetrics,
  serviceMetrics,
  aiInsights
} from './data/mockData';
import { getMetricCards } from './data/metrics';
import { PortfolioHome } from './pages/PortfolioHome';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'ai'>('home');
  const cards = getMetricCards(dailyMetrics, orders);

  return (
    <main className="app-shell">
      <nav className="page-switcher" aria-label="页面切换">
        <button
          className={activePage === 'home' ? 'page-switcher__button page-switcher__button--active' : 'page-switcher__button'}
          type="button"
          onClick={() => setActivePage('home')}
        >
          项目案例
        </button>
        <button
          className={activePage === 'dashboard' ? 'page-switcher__button page-switcher__button--active' : 'page-switcher__button'}
          type="button"
          onClick={() => setActivePage('dashboard')}
        >
          经营数据看板
        </button>
        <button
          className={activePage === 'ai' ? 'page-switcher__button page-switcher__button--active' : 'page-switcher__button'}
          type="button"
          onClick={() => setActivePage('ai')}
        >
          AI 功能演示中心
        </button>
      </nav>

      {activePage === 'home' ? (
        <PortfolioHome onNavigate={setActivePage} />
      ) : activePage === 'ai' ? (
        <AiFeatureCenter
          businessData={{
            dailyMetrics,
            orders,
            channelMetrics,
            serviceMetrics
          }}
        />
      ) : (
        <>
          <header className="hero">
            <div>
              <span className="eyebrow">NeighborPet Portfolio Dashboard</span>
              <h1>邻宠到家｜宠物寄养经营数据看板</h1>
              <p>用于展示：私域转化、寄养入住率、复购分析、AI 经营建议。</p>
              <div className="notice-strip">{dataNotice}</div>
            </div>
            <aside className="hero-card">
              <span>面向岗位</span>
              <strong>AI 产品助理 / 数据分析师 / AI 解决方案顾问</strong>
              <p>不含登录、支付、真实接口或真实经营数据。</p>
            </aside>
          </header>

          <section className="project-brief" aria-label="项目说明">
            <article>
              <span>项目背景</span>
              <p>邻宠到家提供猫狗寄养、上门喂养和接送服务。核心经营问题是：如何把私域流量转化为可信预约，并在高峰期稳定承接寄养容量。</p>
            </article>
            <article>
              <span>数据口径</span>
              <p>30 天模拟数据；收入为确认与完成订单的经营估算；入住率 = occupiedPets / capacity；所有数据仅用于作品集展示。</p>
            </article>
            <article>
              <span>看板目标</span>
              <p>帮助面试官快速看到我的指标拆解、漏斗诊断、渠道判断、供给分析和 AI 经营建议表达能力。</p>
            </article>
            <article>
              <span>分析路径</span>
              <p>先看核心 KPI，再拆转化漏斗和渠道质量，随后判断服务结构、入住压力和复购线索，最后输出运营动作。</p>
            </article>
          </section>

          <MetricCards cards={cards} />

          <section className="dashboard-grid" aria-label="经营数据看板">
            <TrendChart data={dailyMetrics} />
            <FunnelChart data={funnelData} />
            <ChannelChart data={channelMetrics} />
            <ServiceChart data={serviceMetrics} />
            <OccupancyChart data={occupancyTrend} />
            <RepeatChart data={repeatMetrics} />
            <AiInsightPanel insights={aiInsights} />
          </section>

        </>
      )}
    </main>
  );
}
