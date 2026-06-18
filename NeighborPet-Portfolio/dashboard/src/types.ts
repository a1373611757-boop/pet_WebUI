export type CustomerType = 'new' | 'returning';

export type ServiceType = 'cat_boarding' | 'dog_boarding' | 'home_feeding' | 'pickup';

export type Channel = 'xiaohongshu' | 'wechat_moments' | 'wechat_group' | 'qr_code' | 'organic';

export type OrderStatus = 'pending' | 'confirmed' | 'service' | 'completed' | 'cancelled';

export type PetType = 'cat' | 'dog';

export interface DailyMetric {
  date: string;
  visits: number;
  serviceClicks: number;
  appointments: number;
  confirmedOrders: number;
  completedOrders: number;
  revenue: number;
  capacity: number;
  occupiedPets: number;
}

export interface Order {
  orderId: string;
  customerId: string;
  customerType: CustomerType;
  serviceType: ServiceType;
  channel: Channel;
  appointmentDate: string;
  status: OrderStatus;
  amount: number;
  petType: PetType;
  dailyReportViewed: boolean;
}

export interface ChannelMetric {
  channel: string;
  visits: number;
  appointments: number;
  confirmedOrders: number;
  conversionRate: number;
}

export interface AiInsight {
  title: string;
  insight: string;
  evidence: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FunnelStep {
  name: string;
  value: number;
}

export interface ServiceMetric {
  service: ServiceType;
  orders: number;
  revenue: number;
}

export interface OccupancyMetric {
  date: string;
  capacity: number;
  occupiedPets: number;
  occupancyRate: number;
}

export interface RepeatMetric {
  label: string;
  newCustomers: number;
  returningCustomers: number;
  repeatRate: number;
}

export interface MetricCardItem {
  label: string;
  value: string;
  helper: string;
  trend: string;
  tone: 'green' | 'blue' | 'amber' | 'rose' | 'violet';
}
