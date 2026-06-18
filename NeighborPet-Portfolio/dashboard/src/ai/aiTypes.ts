import type { ChannelMetric, DailyMetric, Order, ServiceMetric } from '../types';

export const AI_OUTPUT_NOTICE = '模拟 AI 输出，仅用于作品集展示';

export type AiFeatureKey = 'customerService' | 'dailyReport' | 'marketingCopy' | 'businessInsight';

export type CustomerServiceQuestion =
  | '猫咪没有绝育可以寄养吗？'
  | '寄养需要疫苗证明吗？'
  | '节假日价格怎么算？'
  | '宠物生病了可以寄养吗？'
  | string;

export interface CustomerServiceInput {
  question: CustomerServiceQuestion;
  serviceType: '猫咪寄养' | '狗狗寄养' | '上门喂养' | '节假日预约';
  petProfile: string;
}

export interface CustomerServiceOutput {
  answer: string;
  nextAction: string;
  needHuman: boolean;
  riskNote: string;
}

export interface DailyReportInput {
  petName: string;
  feeding: string;
  water: string;
  toilet: string;
  activity: string;
  mood: string;
  merchantNote: string;
}

export interface DailyReportOutput {
  report: string;
  confirmationNote: string;
  riskNote: string;
}

export type MarketingChannel = '朋友圈' | '小红书' | '微信群';

export type MarketingServiceType = '猫咪寄养' | '狗狗寄养' | '上门喂养' | '节假日预约提醒';

export interface MarketingCopyInput {
  channel: MarketingChannel;
  serviceType: MarketingServiceType;
  targetUser: string;
}

export interface MarketingCopyOutput {
  title: string;
  body: string;
  callToAction: string;
  channel: MarketingChannel;
  complianceNote: string;
}

export interface BusinessInsightInput {
  dailyMetrics: DailyMetric[];
  orders: Order[];
  channelMetrics: ChannelMetric[];
  serviceMetrics: ServiceMetric[];
}

export interface InsightAction {
  insight: string;
  evidence: string;
  suggestion: string;
}

export interface BusinessInsightOutput {
  summary: string;
  findings: InsightAction[];
  risks: string[];
  actions: InsightAction[];
}
