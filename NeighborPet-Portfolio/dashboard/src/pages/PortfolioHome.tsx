type PortfolioTarget = 'dashboard' | 'ai';

type PortfolioHomeProps = {
  onNavigate: (target: PortfolioTarget) => void;
};

type Deliverable = {
  name: string;
  description: string;
  capability: string;
  status: string;
  button: string;
  icon: IconName;
  href?: string;
  target?: PortfolioTarget;
};

type IconName = 'doc' | 'chart' | 'spark' | 'phone' | 'video' | 'globe' | 'report' | 'search' | 'calendar' | 'file' | 'bot';

const keywords = ['AI 产品设计', '数据分析', '小程序 MVP', '私域转化', '宠物服务数字化'];

const problems = [
  {
    role: '宠主侧',
    title: '预约前信息不透明，寄养中缺少过程反馈',
    text: '用户在选择寄养或上门照护时，不只比较价格，也会关注安全、环境、服务者经验和照护过程是否可见。'
  },
  {
    role: '商家侧',
    title: '私域咨询分散，订单和宠物档案难沉淀',
    text: '小商家常依赖微信、小红书和朋友圈获客，但咨询、预约、档案、备注和服务记录分散在不同工具中。'
  },
  {
    role: '经营侧',
    title: '缺少渠道、转化、入住率和复购数据分析',
    text: '如果没有统一看板，商家很难判断哪个渠道带来有效订单、什么时候接近满房、哪些服务更适合复购。'
  }
];

const solutionModules: Array<{ title: string; text: string; icon: IconName }> = [
  { title: '小程序预约', text: '承接服务浏览、照护者选择、价格确认和预约提交。', icon: 'phone' },
  { title: '宠物档案', text: '沉淀宠物基础信息、照护偏好、禁忌事项和应急联系人。', icon: 'file' },
  { title: '寄养日报', text: '把喂食、饮水、排便、活动和照片反馈整理成可追踪记录。', icon: 'doc' },
  { title: '商家管理', text: '帮助商家查看订单、确认服务、记录履约状态和管理服务能力。', icon: 'calendar' },
  { title: '数据看板', text: '围绕渠道、转化、入住率、服务结构和复购形成经营复盘。', icon: 'chart' },
  { title: 'AI 助手', text: '辅助客服问答、日报草稿、运营文案和经营建议生成。', icon: 'bot' }
];

const flowSteps = [
  '私域触达',
  '服务浏览',
  '在线预约',
  '宠物建档',
  '商家确认',
  '照护记录',
  'AI 日报',
  '数据复盘',
  '复购运营'
];

const deliverables: Deliverable[] = [
  {
    name: 'PRD 产品文档',
    description: '产品背景、目标用户、MVP 范围、指标口径、风险约束和 AI 功能方向。',
    capability: '产品分析、业务流程设计、AI 功能设计',
    status: '已完成',
    button: '查看 PRD',
    icon: 'doc',
    href: 'docs/prd.html'
  },
  {
    name: '数据看板',
    description: '30 天模拟经营数据，覆盖私域转化、渠道来源、入住率、服务结构和复购分析。',
    capability: '指标体系、经营分析、可视化表达',
    status: '已完成',
    button: '查看数据看板',
    icon: 'chart',
    target: 'dashboard'
  },
  {
    name: 'AI 功能演示',
    description: 'AI 客服、寄养日报、运营文案、经营分析助手，展示业务边界与 Prompt 设计。',
    capability: 'AI 场景设计、Prompt 设计、业务边界设计',
    status: '已完成',
    button: '查看 AI 功能',
    icon: 'spark',
    target: 'ai'
  },
  {
    name: '小程序 Demo',
    description: 'H5 移动端作品集 Demo，模拟微信小程序的服务浏览、预约提交、订单确认和个人中心流程。',
    capability: 'H5 Demo、小程序核心流程、用户体验落地',
    status: '已接入 H5 体验',
    button: '体验 H5 Demo',
    icon: 'phone',
    href: 'h5-demo/'
  },
  {
    name: '演示视频',
    description: '30 秒竖版项目演示视频，用简洁叙事呈现服务价值和产品体验。',
    capability: '项目表达、商业包装、视频叙事',
    status: '已接入视频文件',
    button: '观看视频',
    icon: 'video',
    href: 'videos/neighbor-pet-home-promo-9x16.mp4'
  },
  {
    name: '演示项目官网',
    description: '用于承接品牌介绍、服务说明和预约转化的项目官网入口。',
    capability: '品牌落地页、服务展示、转化设计',
    status: '已接入官网链接',
    button: '查看官网',
    icon: 'globe',
    href: 'https://neighbor-pet-home-20260610-luis.netlify.app/'
  },
  {
    name: '行业报告',
    description: '宠物寄养行业机会、用户需求、服务供给和 AI 应用空间分析。',
    capability: '行业研究、商业分析、机会判断',
    status: '已接入 PDF',
    button: '查看行业报告',
    icon: 'report',
    href: 'docs/宠物寄养行业机会分析报告.html'
  },
  {
    name: '竞品分析',
    description: '对比宠物寄养、本地生活和社区服务产品，分析差异化机会。',
    capability: '竞品研究、差异化分析、产品机会判断',
    status: '已接入 PDF',
    button: '查看竞品分析',
    icon: 'search',
    href: 'docs/宠物寄养数字化服务竞品分析报告.html'
  }
];

const dataTopics = [
  { title: '私域转化漏斗', text: '观察访问、点击、预约和确认订单之间的流失。' },
  { title: '渠道来源分析', text: '比较小红书、微信群、朋友圈等渠道的流量质量。' },
  { title: '入住率趋势', text: '识别周末和节假日的寄养容量压力。' },
  { title: '服务类型占比', text: '判断寄养、上门喂养、接送等服务结构。' },
  { title: '复购分析', text: '观察新老客户构成与复购入口。' },
  { title: 'AI 经营建议', text: '把指标发现转化为可执行的经营动作。' }
];

const aiFeatures = [
  { title: 'AI 客服助手', text: '回答价格、疫苗、流程、安全等售前问题，降低重复沟通成本。' },
  { title: 'AI 寄养日报', text: '把照护记录生成温暖、专业的用户反馈，提升过程可见性。' },
  { title: 'AI 运营文案', text: '生成朋友圈、小红书、微信群内容，辅助私域运营。' },
  { title: 'AI 经营分析', text: '把数据看板结果转化为经营建议，支持日常复盘。' }
];

const capabilities = [
  '行业研究与问题拆解',
  '产品方案设计',
  '小程序 MVP 落地',
  '数据指标体系设计',
  'AI 应用场景设计',
  '可视化表达与项目包装'
];

function CaseIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, JSX.Element> = {
    doc: (
      <>
        <path d="M7 3.5h7l3 3V20.5H7z" />
        <path d="M14 3.5v4h4" />
        <path d="M9.5 11.5h5" />
        <path d="M9.5 15h5" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19.5h16" />
        <path d="M7 16v-5" />
        <path d="M12 16V7" />
        <path d="M17 16v-8" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3.5l1.7 5 4.8 1.7-4.8 1.7-1.7 5-1.7-5-4.8-1.7 4.8-1.7z" />
        <path d="M18 15.5l.6 1.7 1.6.6-1.6.6-.6 1.7-.6-1.7-1.6-.6 1.6-.6z" />
      </>
    ),
    phone: (
      <>
        <rect x="8" y="3.5" width="8" height="17" rx="2" />
        <path d="M11 17.5h2" />
      </>
    ),
    video: (
      <>
        <rect x="4" y="6" width="12" height="12" rx="2" />
        <path d="M16 10l4-2.5v9L16 14" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16" />
        <path d="M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8" />
        <path d="M12 4c-2 2.2-3 4.9-3 8s1 5.8 3 8" />
      </>
    ),
    report: (
      <>
        <path d="M6 4.5h12v15H6z" />
        <path d="M9 8h6" />
        <path d="M9 11.5h6" />
        <path d="M9 15h3" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="M15 15l4 4" />
      </>
    ),
    calendar: (
      <>
        <rect x="5" y="6" width="14" height="13" rx="2" />
        <path d="M8 3.5v4" />
        <path d="M16 3.5v4" />
        <path d="M5 10h14" />
      </>
    ),
    file: (
      <>
        <path d="M6 5h12v14H6z" />
        <path d="M9 9h6" />
        <path d="M9 12h6" />
        <path d="M9 15h4" />
      </>
    ),
    bot: (
      <>
        <rect x="5" y="8" width="14" height="10" rx="3" />
        <path d="M12 5v3" />
        <path d="M9 13h.01" />
        <path d="M15 13h.01" />
        <path d="M10 16h4" />
      </>
    )
  };

  return (
    <svg className="case-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function HeroSection({ onNavigate }: PortfolioHomeProps) {
  return (
    <header className="case-hero">
      <div className="case-hero__content">
        <div className="case-hero__mark" aria-hidden="true">
          <img src="images/neighbor-pet-icon.png" alt="" />
        </div>
        <span className="case-kicker">NeighborPet Case Study</span>
        <h1>邻宠到家</h1>
        <p className="case-hero__subtitle">宠物寄养行业 AI 数字化解决方案</p>
        <p className="case-hero__intro">
          用小程序、数据看板与 AI 助手，重构宠物寄养服务的预约、照护反馈与私域复购流程。
        </p>
        <div className="case-tags" aria-label="项目关键词">
          {keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
        <div className="case-actions" aria-label="主要入口">
          <button className="case-button case-button--primary" type="button" onClick={() => onNavigate('dashboard')}>
            查看数据看板
          </button>
          <button className="case-button" type="button" onClick={() => onNavigate('ai')}>
            查看 AI 功能
          </button>
          <a className="case-button" href="docs/prd.html">
            查看 PRD
          </a>
          <a className="case-button case-button--subtle" href="videos/neighbor-pet-home-promo-9x16.mp4">
            查看演示视频
          </a>
          <a className="case-button case-button--subtle" href="h5-demo/">
            体验小程序 Demo
          </a>
        </div>
      </div>
      <aside className="case-hero__visual" aria-label="项目视觉预览">
        <img src="images/trust-photo.jpg" alt="宠物照护服务场景" />
        <div className="case-visual-card">
          <span>Project Scope</span>
          <strong>预约、档案、履约反馈、数据复盘、AI 辅助运营</strong>
          <p>模拟数据仅用于说明分析方法；AI 输出为模拟演示，所有高风险场景保留人工确认。</p>
        </div>
      </aside>
    </header>
  );
}

function BackgroundSection() {
  return (
    <section className="case-section case-background" aria-labelledby="background-title">
      <div>
        <span className="case-kicker">Background</span>
        <h2 id="background-title">为什么选择宠物寄养？</h2>
      </div>
      <div className="case-background__text">
        <p>
          宠物寄养是一个强信任、强情感、强履约的本地生活服务场景。用户不仅关心价格，也会关注安全、环境、照护过程和反馈质量。
        </p>
        <p>
          很多小商家依赖微信、小红书、朋友圈获客，但预约、宠物档案、照护记录和复购管理分散在不同工具中，难以形成稳定沉淀。
        </p>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="case-section" aria-labelledby="problem-title">
      <div className="case-section__head">
        <span className="case-kicker">Core Problems</span>
        <h2 id="problem-title">从宠主、商家和经营三个层面拆解问题</h2>
      </div>
      <div className="case-grid case-grid--three">
        {problems.map((problem) => (
          <article className="case-card" key={problem.role}>
            <span className="case-card__label">{problem.role}</span>
            <h3>{problem.title}</h3>
            <p>{problem.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="case-section case-section--tinted" aria-labelledby="solution-title">
      <div className="case-section__head">
        <span className="case-kicker">Solution</span>
        <h2 id="solution-title">解决方案总览</h2>
      </div>
      <div className="case-grid case-grid--six">
        {solutionModules.map((module) => (
          <article className="case-module" key={module.title}>
            <CaseIcon name={module.icon} />
            <h3>{module.title}</h3>
            <p>{module.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className="case-section" aria-labelledby="flow-title">
      <div className="case-section__head">
        <span className="case-kicker">Business Loop</span>
        <h2 id="flow-title">形成从触达到复购的业务闭环</h2>
      </div>
      <div className="case-flow">
        {flowSteps.map((step, index) => (
          <div className="case-flow__item" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function DeliverableAction({ item, onNavigate }: { item: Deliverable; onNavigate: (target: PortfolioTarget) => void }) {
  const target = item.target;

  if (target) {
    return (
      <button className="case-card-button" type="button" onClick={() => onNavigate(target)}>
        {item.button}
      </button>
    );
  }

  if (item.href) {
    return (
      <a className="case-card-button" href={item.href}>
        {item.button}
      </a>
    );
  }

  return (
    <button className="case-card-button case-card-button--disabled" type="button" disabled>
      {item.button}
    </button>
  );
}

function DeliverablesSection({ onNavigate }: PortfolioHomeProps) {
  return (
    <section className="case-section" aria-labelledby="deliverables-title">
      <div className="case-section__head">
        <span className="case-kicker">Deliverables</span>
        <h2 id="deliverables-title">项目成果</h2>
      </div>
      <div className="case-deliverables">
        {deliverables.map((item) => (
          <article className="case-deliverable" id={item.name === '小程序 Demo' ? 'demo-placeholder' : undefined} key={item.name}>
            <div>
              <span className={item.status.includes('待') || item.status.includes('制作') ? 'case-status case-status--muted' : 'case-status'}>
                {item.status}
              </span>
              <CaseIcon name={item.icon} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="case-deliverable__foot">
              <span>{item.capability}</span>
              <DeliverableAction item={item} onNavigate={onNavigate} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DataSummarySection({ onNavigate }: PortfolioHomeProps) {
  return (
    <section className="case-section case-summary" aria-labelledby="data-title">
      <div className="case-summary__copy">
        <span className="case-kicker">Data Analysis</span>
        <h2 id="data-title">数据分析展示摘要</h2>
        <p>
          看板不在首页堆叠完整图表，而是围绕经营复盘中的关键问题组织分析方向：渠道是否有效、转化在哪里流失、容量是否承压、复购是否形成。
        </p>
        <button className="case-button case-button--primary" type="button" onClick={() => onNavigate('dashboard')}>
          查看数据看板
        </button>
      </div>
      <div className="case-topic-grid">
        {dataTopics.map((topic) => (
          <article className="case-topic" key={topic.title}>
            <h3>{topic.title}</h3>
            <p>{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiSummarySection({ onNavigate }: PortfolioHomeProps) {
  return (
    <section className="case-section case-summary case-summary--ai" aria-labelledby="ai-title">
      <div className="case-summary__copy">
        <span className="case-kicker">AI Design</span>
        <h2 id="ai-title">AI 功能摘要</h2>
        <p>
          AI 被放在具体业务节点中：售前咨询、照护反馈、内容运营和经营复盘。功能目标是降低沟通成本、提升过程可见性，并辅助商家做更稳定的运营判断。
        </p>
        <button className="case-button case-button--primary" type="button" onClick={() => onNavigate('ai')}>
          查看 AI 功能
        </button>
      </div>
      <div className="case-ai-panel">
        <div className="case-ai-list">
          {aiFeatures.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
        <div className="case-boundary">
          <strong>AI 边界</strong>
          <ul>
            <li>不做宠物医疗诊断</li>
            <li>不处理退款和责任争议</li>
            <li>日报发布前需要商家确认</li>
            <li>经营建议只作为参考</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function CapabilitySection() {
  return (
    <section className="case-section" aria-labelledby="capability-title">
      <div className="case-section__head">
        <span className="case-kicker">Capabilities</span>
        <h2 id="capability-title">这个项目体现的能力</h2>
      </div>
      <div className="case-capabilities">
        {capabilities.map((capability) => (
          <span key={capability}>{capability}</span>
        ))}
      </div>
    </section>
  );
}

export function PortfolioHome({ onNavigate }: PortfolioHomeProps) {
  return (
    <div className="case-home">
      <HeroSection onNavigate={onNavigate} />
      <BackgroundSection />
      <ProblemSection />
      <SolutionSection />
      <FlowSection />
      <DeliverablesSection onNavigate={onNavigate} />
      <DataSummarySection onNavigate={onNavigate} />
      <AiSummarySection onNavigate={onNavigate} />
      <CapabilitySection />
    </div>
  );
}
