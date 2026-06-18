import type {
  BusinessInsightInput,
  BusinessInsightOutput,
  CustomerServiceInput,
  CustomerServiceOutput,
  DailyReportInput,
  DailyReportOutput,
  InsightAction,
  MarketingCopyInput,
  MarketingCopyOutput
} from './aiTypes';
import { marketingChannelGuides, marketingServiceGuides, serviceRules } from './knowledgeBase';
import { formatCurrency, formatPercent, getDashboardSummary } from '../data/metrics';

const riskyQuestionKeywords = ['生病', '受伤', '传染', '术后', '赔', '退款', '投诉', '走失', '咬'];

export function generateCustomerServiceReply(input: CustomerServiceInput): CustomerServiceOutput {
  const question = input.question.trim();
  const needHuman = riskyQuestionKeywords.some((keyword) => question.includes(keyword));

  if (question.includes('没有绝育')) {
    return {
      answer: '没有绝育不代表一定不能寄养，但需要先确认是否处于发情期、是否有明显攻击性或标记行为，以及商家是否具备单独照护空间。平台不建议在状态不稳定时直接下单。',
      nextAction: '补充宠物年龄、性格、是否近期发情和与其他宠物相处情况，再由商家确认是否可接待。',
      needHuman: true,
      riskNote: '未绝育宠物涉及隔离和安全管理，建议人工确认后再预约。'
    };
  }

  if (question.includes('疫苗')) {
    return {
      answer: '寄养通常需要确认基础疫苗和驱虫情况，这是为了降低交叉感染风险，也方便商家判断是否适合与其他宠物同住或需要单独照护。',
      nextAction: '预约前上传或备注疫苗、驱虫时间，并说明宠物近期健康状态。',
      needHuman: false,
      riskNote: '如近期有咳嗽、腹泻、皮肤病等异常，应先转人工评估。'
    };
  }

  if (question.includes('节假日') || question.includes('价格')) {
    return {
      answer: '节假日可能因为照护容量紧张、服务时段延长而有价格调整，具体价格应以页面展示和商家最终确认为准。',
      nextAction: '建议提前 7 天提交预约，并同时填写可接受的替代服务，如上门喂养或接送服务。',
      needHuman: false,
      riskNote: 'AI 不直接承诺真实价格、名额或优惠，最终以人工确认为准。'
    };
  }

  if (needHuman) {
    return {
      answer: '这个问题涉及宠物健康或服务风险，需要人工结合宠物状态、商家能力和平台规则进一步判断。',
      nextAction: '请提供宠物症状、持续时间、是否就医、是否需要用药和应急联系人信息，并转人工处理。',
      needHuman: true,
      riskNote: 'AI 不能提供医疗诊断，也不能替代投诉、赔付或异常履约处理。'
    };
  }

  return {
    answer: `针对“${question || '服务咨询'}”，邻宠到家会优先确认服务类型、宠物状态、服务者能力和履约记录。${serviceRules.trust[1]}`,
    nextAction: `建议选择“${input.serviceType}”后补充宠物档案：${input.petProfile || '年龄、性格、饮食禁忌和应急联系人'}。`,
    needHuman: false,
    riskNote: serviceRules.trust[2]
  };
}

export function generateDailyReport(input: DailyReportInput): DailyReportOutput {
  const report = `今天 ${input.petName} 的整体状态比较稳定。${input.feeding}，${input.water}；${input.toilet}。服务过程中，${input.activity}，情绪方面${input.mood}。${input.merchantNote ? `商家备注：${input.merchantNote}。` : ''}我们会继续按照宠物档案中的习惯照护，并在下一次服务后同步新的照片和记录。`;

  return {
    report,
    confirmationNote: '商家确认后发布',
    riskNote: '日报为 AI 草稿，只基于服务者填写的信息生成；如出现健康异常，应由商家或运营人工跟进。'
  };
}

export function generateMarketingCopy(input: MarketingCopyInput): MarketingCopyOutput {
  const channelGuide = marketingChannelGuides[input.channel];
  const serviceGuide = marketingServiceGuides[input.serviceType];
  const isXiaohongshu = input.channel === '小红书';
  const title = isXiaohongshu
    ? `${input.serviceType}怎么选？先看过程反馈和照护记录`
    : `${input.serviceType}预约提醒`;
  const body = `面向${input.targetUser}，邻宠到家提供${input.serviceType}服务。${serviceGuide}服务过程可记录喂食、饮水、清洁、活动和照片反馈，让宠主能看到照护过程，而不是只等一句“已完成”。${channelGuide}`;

  return {
    title,
    body,
    callToAction: '有需要可以先提交宠物信息和服务时间，由商家确认是否可接待。',
    channel: input.channel,
    complianceNote: '文案为草稿，不虚构真实评价、真实名额和真实价格；发布前需人工确认活动和服务规则。'
  };
}

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export function generateBusinessInsight(input: BusinessInsightInput): BusinessInsightOutput {
  const summary = getDashboardSummary(input.dailyMetrics, input.orders);
  const latest = input.dailyMetrics[input.dailyMetrics.length - 1];
  const peak = input.dailyMetrics.reduce((max, item) => {
    const rate = item.occupiedPets / item.capacity;
    return rate > max.rate ? { date: item.date, rate } : max;
  }, { date: '', rate: 0 });
  const topChannel = [...input.channelMetrics].sort((a, b) => b.visits - a.visits)[0];
  const bestConversionChannel = [...input.channelMetrics].sort((a, b) => b.conversionRate - a.conversionRate)[0];
  const reportViewedOrders = input.orders.filter((order) => order.dailyReportViewed).length;
  const reportViewedRate = reportViewedOrders / input.orders.length;
  const homeFeeding = input.serviceMetrics.find((item) => item.service === 'home_feeding');

  const findings: InsightAction[] = [
    {
      insight: '私域渠道更适合承接高信任转化。',
      evidence: `${bestConversionChannel.channel} 的确认转化率为 ${formatPercent(bestConversionChannel.conversionRate)}，高于访问量最大的 ${topChannel.channel}。`,
      suggestion: '将小红书等公域内容引导到微信群或一对一咨询，用服务流程、日报样例和商家确认降低决策成本。'
    },
    {
      insight: '高峰入住率接近满载，供给承接是关键风险。',
      evidence: `${peak.date} 入住率达到 ${formatPercent(peak.rate)}，最新日入住率为 ${formatPercent(latest.occupiedPets / latest.capacity)}。`,
      suggestion: '节假日前提前触达老客，满载时引导上门喂养或接送服务作为替代方案。'
    },
    {
      insight: '日报查看行为可以作为复购意向线索。',
      evidence: `模拟订单中日报查看率为 ${formatPercent(reportViewedRate)}，复购率为 ${formatPercent(summary.repeatRate)}。`,
      suggestion: '对高频查看日报的用户增加下次预约提醒，并在客服话术中突出“服务过程可追踪”。'
    }
  ];

  return {
    summary: `近 30 天模拟数据累计 ${summary.appointments} 次预约、${summary.confirmedOrders} 个确认订单，预估收入 ${formatCurrency(summary.revenue)}，整体入住率 ${formatPercent(summary.occupancyRate)}。这些结论仅用于作品集演示。`,
    findings,
    risks: [
      '周末和节假日容量压力较高，不能只追求获客增长。',
      'AI 建议不能替代人工对价格、名额、异常服务和退款赔付的确认。',
      '模拟数据不能包装为真实经营成绩，面试中需要明确说明数据口径。'
    ],
    actions: [
      {
        insight: '把公域流量转入可信咨询链路。',
        evidence: `${topChannel.channel} 访问量为 ${topChannel.visits}，但最佳确认转化来自 ${bestConversionChannel.channel}。`,
        suggestion: '在小红书落地页增加寄养日报样例、服务者资质说明和微信群咨询入口。'
      },
      {
        insight: '强化低门槛复购服务。',
        evidence: `上门喂养模拟订单 ${homeFeeding?.orders ?? 0} 单，收入 ${formatCurrency(homeFeeding?.revenue ?? 0)}。`,
        suggestion: '将上门喂养包装为节假日前后的轻量复购入口，配合日报查看用户做提醒。'
      },
      {
        insight: '把 AI 输出纳入人工确认流程。',
        evidence: `近 30 天完成订单 ${sum(input.dailyMetrics.map((item) => item.completedOrders))} 单，服务反馈质量会影响复购信任。`,
        suggestion: '日报、客服和经营建议都保留“确认后发布/采纳/待验证”状态，避免自动化带来服务承诺风险。'
      }
    ]
  };
}
