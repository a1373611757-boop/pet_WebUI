import type { DailyMetric, MetricCardItem, Order } from '../types';

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0
  }).format(value);

export const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export const getDashboardSummary = (dailyMetrics: DailyMetric[], orders: Order[]) => {
  const appointments = sum(dailyMetrics.map((item) => item.appointments));
  const confirmedOrders = sum(dailyMetrics.map((item) => item.confirmedOrders));
  const completedOrders = sum(dailyMetrics.map((item) => item.completedOrders));
  const revenue = sum(dailyMetrics.map((item) => item.revenue));
  const occupiedPets = sum(dailyMetrics.map((item) => item.occupiedPets));
  const capacity = sum(dailyMetrics.map((item) => item.capacity));
  const returningCustomers = new Set(orders.filter((order) => order.customerType === 'returning').map((order) => order.customerId)).size;
  const allCustomers = new Set(orders.map((order) => order.customerId)).size;

  return {
    appointments,
    confirmedOrders,
    completedOrders,
    revenue,
    occupancyRate: occupiedPets / capacity,
    repeatRate: returningCustomers / allCustomers,
    confirmationRate: confirmedOrders / appointments,
    completionRate: completedOrders / confirmedOrders
  };
};

export const getMetricCards = (dailyMetrics: DailyMetric[], orders: Order[]): MetricCardItem[] => {
  const summary = getDashboardSummary(dailyMetrics, orders);
  const last = dailyMetrics[dailyMetrics.length - 1];
  const previous = dailyMetrics[dailyMetrics.length - 2];
  const appointmentTrend = (last.appointments - previous.appointments) / previous.appointments;
  const orderTrend = (last.confirmedOrders - previous.confirmedOrders) / previous.confirmedOrders;
  const revenueTrend = (last.revenue - previous.revenue) / previous.revenue;
  const lastOccupancy = last.occupiedPets / last.capacity;

  return [
    {
      label: '预约量',
      value: `${summary.appointments}`,
      helper: '30 天累计提交预约',
      trend: `较昨日 ${formatPercent(appointmentTrend)}`,
      tone: 'blue'
    },
    {
      label: '确认订单',
      value: `${summary.confirmedOrders}`,
      helper: `预约确认率 ${formatPercent(summary.confirmationRate)}`,
      trend: `较昨日 ${formatPercent(orderTrend)}`,
      tone: 'green'
    },
    {
      label: '预估收入',
      value: formatCurrency(summary.revenue),
      helper: '30 天模拟订单收入',
      trend: `较昨日 ${formatPercent(revenueTrend)}`,
      tone: 'violet'
    },
    {
      label: '入住率',
      value: formatPercent(summary.occupancyRate),
      helper: `最新日 ${formatPercent(lastOccupancy)}`,
      trend: '周末峰值 100%',
      tone: 'amber'
    },
    {
      label: '复购率',
      value: formatPercent(summary.repeatRate),
      helper: '复购客户 / 全部下单客户',
      trend: '日报查看可作为复购线索',
      tone: 'rose'
    }
  ];
};
