import type {
  AiInsight,
  Channel,
  ChannelMetric,
  DailyMetric,
  FunnelStep,
  OccupancyMetric,
  Order,
  OrderStatus,
  PetType,
  RepeatMetric,
  ServiceMetric,
  ServiceType
} from '../types';

export const dataNotice = '模拟数据，仅用于作品集展示';

export const channelLabels: Record<Channel, string> = {
  xiaohongshu: '小红书',
  wechat_moments: '朋友圈',
  wechat_group: '微信群',
  qr_code: '社区二维码',
  organic: '自然搜索'
};

export const serviceLabels: Record<ServiceType, string> = {
  cat_boarding: '猫咪寄养',
  dog_boarding: '狗狗寄养',
  home_feeding: '上门喂养',
  pickup: '接送服务'
};

const dailyPlan = [
  [1, 520, 214, 46, 32, 28, 15120, 48, 30],
  [2, 548, 232, 49, 34, 31, 16880, 48, 32],
  [3, 575, 244, 52, 36, 33, 17960, 48, 34],
  [4, 602, 261, 56, 39, 36, 19840, 50, 37],
  [5, 680, 318, 72, 54, 49, 30720, 50, 45],
  [6, 735, 354, 81, 62, 56, 36380, 50, 48],
  [7, 612, 269, 58, 42, 39, 21920, 50, 40],
  [8, 590, 258, 55, 40, 37, 20640, 50, 38],
  [9, 628, 281, 61, 45, 41, 23880, 50, 42],
  [10, 660, 302, 66, 49, 44, 26640, 52, 45],
  [11, 704, 333, 76, 58, 52, 33820, 52, 49],
  [12, 782, 386, 90, 70, 63, 42160, 52, 51],
  [13, 818, 412, 96, 75, 68, 45980, 52, 52],
  [14, 648, 292, 63, 46, 43, 24760, 52, 44],
  [15, 632, 286, 60, 44, 41, 23520, 52, 43],
  [16, 668, 309, 68, 51, 47, 28680, 54, 47],
  [17, 705, 334, 74, 56, 51, 31840, 54, 50],
  [18, 742, 361, 82, 63, 57, 38120, 54, 52],
  [19, 840, 432, 101, 80, 72, 50160, 54, 54],
  [20, 878, 459, 108, 86, 78, 54640, 54, 54],
  [21, 690, 318, 71, 54, 50, 30480, 54, 48],
  [22, 672, 304, 67, 50, 46, 28120, 56, 46],
  [23, 712, 337, 76, 58, 53, 33480, 56, 51],
  [24, 756, 369, 84, 65, 59, 39420, 56, 53],
  [25, 790, 398, 92, 72, 65, 45260, 58, 55],
  [26, 895, 481, 116, 93, 84, 60240, 58, 58],
  [27, 930, 512, 124, 100, 91, 66180, 58, 58],
  [28, 740, 356, 80, 61, 56, 35620, 58, 52],
  [29, 718, 342, 77, 59, 54, 34280, 58, 50],
  [30, 760, 371, 86, 67, 61, 41160, 60, 54]
] as const;

export const dailyMetrics: DailyMetric[] = dailyPlan.map(
  ([day, visits, serviceClicks, appointments, confirmedOrders, completedOrders, revenue, capacity, occupiedPets]) => ({
    date: `06-${String(day).padStart(2, '0')}`,
    visits,
    serviceClicks,
    appointments,
    confirmedOrders,
    completedOrders,
    revenue,
    capacity,
    occupiedPets
  })
);

const channelCycle: Channel[] = ['wechat_group', 'xiaohongshu', 'wechat_moments', 'organic', 'qr_code'];
const serviceCycle: ServiceType[] = ['cat_boarding', 'dog_boarding', 'home_feeding', 'pickup'];
const statusCycle: OrderStatus[] = ['completed', 'completed', 'confirmed', 'service', 'cancelled'];

const amountByService: Record<ServiceType, number> = {
  cat_boarding: 428,
  dog_boarding: 568,
  home_feeding: 168,
  pickup: 88
};

export const orders: Order[] = dailyMetrics.flatMap((day, dayIndex) =>
  Array.from({ length: Math.min(day.confirmedOrders, 18) }, (_, orderIndex) => {
    const serviceType = serviceCycle[(dayIndex + orderIndex) % serviceCycle.length];
    const channel = channelCycle[(dayIndex * 2 + orderIndex) % channelCycle.length];
    const status = orderIndex < Math.round(day.completedOrders / Math.max(day.confirmedOrders, 1) * 18)
      ? 'completed'
      : statusCycle[(dayIndex + orderIndex) % statusCycle.length];
    const customerType = serviceType === 'home_feeding' && orderIndex % 2 === 0 || orderIndex % 4 === 0 || dayIndex > 18 && orderIndex % 3 === 0 ? 'returning' : 'new';
    const petType: PetType = serviceType === 'dog_boarding' ? 'dog' : serviceType === 'cat_boarding' ? 'cat' : orderIndex % 3 === 0 ? 'dog' : 'cat';

    return {
      orderId: `NP-${day.date.replace('-', '')}-${String(orderIndex + 1).padStart(3, '0')}`,
      customerId: `${customerType === 'returning' ? 'R' : 'N'}-${String((dayIndex + 1) * 100 + orderIndex).padStart(5, '0')}`,
      customerType,
      serviceType,
      channel,
      appointmentDate: day.date,
      status,
      amount: amountByService[serviceType] + (dayIndex % 5) * 20 + (customerType === 'returning' ? 30 : 0),
      petType,
      dailyReportViewed: customerType === 'returning' || status === 'completed' && orderIndex % 5 !== 0
    };
  })
);

export const channelMetrics: ChannelMetric[] = Object.entries(channelLabels).map(([channel, label]) => {
  const channelOrders = orders.filter((order) => order.channel === channel);
  const weightedVisits = channelOrders.length * (channel === 'xiaohongshu' ? 28 : channel === 'wechat_group' ? 18 : 22);
  const appointments = Math.round(channelOrders.length * (channel === 'wechat_group' ? 1.42 : channel === 'qr_code' ? 1.18 : 1.28));
  const confirmedOrders = channelOrders.filter((order) => order.status !== 'cancelled' && order.status !== 'pending').length;

  return {
    channel: label,
    visits: weightedVisits,
    appointments,
    confirmedOrders,
    conversionRate: confirmedOrders / weightedVisits
  };
});

export const funnelData: FunnelStep[] = [
  { name: '访问落地页', value: dailyMetrics.reduce((sum, item) => sum + item.visits, 0) },
  { name: '点击服务', value: dailyMetrics.reduce((sum, item) => sum + item.serviceClicks, 0) },
  { name: '提交预约', value: dailyMetrics.reduce((sum, item) => sum + item.appointments, 0) },
  { name: '确认订单', value: dailyMetrics.reduce((sum, item) => sum + item.confirmedOrders, 0) },
  { name: '完成服务', value: dailyMetrics.reduce((sum, item) => sum + item.completedOrders, 0) }
];

export const serviceMetrics: ServiceMetric[] = serviceCycle.map((service) => {
  const serviceOrders = orders.filter((order) => order.serviceType === service);
  return {
    service,
    orders: serviceOrders.length,
    revenue: serviceOrders.reduce((sum, order) => sum + order.amount, 0)
  };
});

export const occupancyTrend: OccupancyMetric[] = dailyMetrics.map((item) => ({
  date: item.date,
  capacity: item.capacity,
  occupiedPets: item.occupiedPets,
  occupancyRate: item.occupiedPets / item.capacity
}));

export const repeatMetrics: RepeatMetric[] = [
  { label: '第1周', newCustomers: 128, returningCustomers: 32, repeatRate: 0.2 },
  { label: '第2周', newCustomers: 146, returningCustomers: 43, repeatRate: 0.227 },
  { label: '第3周', newCustomers: 158, returningCustomers: 57, repeatRate: 0.265 },
  { label: '第4周', newCustomers: 171, returningCustomers: 74, repeatRate: 0.302 },
  { label: '第5周', newCustomers: 58, returningCustomers: 29, repeatRate: 0.333 }
];

export const aiInsights: AiInsight[] = [
  {
    title: '小红书访问高但确认率偏低',
    insight: '小红书适合带来新增访问，但用户从浏览到确认订单的信任链路仍偏长。',
    evidence: '模拟数据中小红书访问权重最高，但确认转化率低于微信群等私域渠道。',
    suggestion: '优化首页安全说明、寄养环境照片、真实服务流程说明，并在小红书落地页突出“每日照护报告”。',
    priority: 'high'
  },
  {
    title: '上门喂养复购率较高',
    insight: '上门喂养价格低、决策成本低，更容易成为老客周期性复购服务。',
    evidence: '模拟订单中 home_feeding 服务被设置为更高 returning 客户占比，用于表达低门槛服务带动复购的业务假设。',
    suggestion: '将上门喂养设计为寄养后的轻量复购入口，例如假期前提醒、周末加班喂养券和连续服务套餐。',
    priority: 'high'
  },
  {
    title: '日报查看用户复购可能更强',
    insight: '用户愿意查看每日照护报告，说明他正在关注服务过程，也更可能沉淀为信任关系。',
    evidence: '模拟订单中 returning 客户与 completed 订单更高概率 dailyReportViewed = true。',
    suggestion: '把日报查看作为复购意向标签，对高频查看用户推送下次预约提醒和老客专属权益。',
    priority: 'medium'
  },
  {
    title: '节假日预约需要提前提醒',
    insight: '寄养需求在周五、周六明显抬升，容量扩充后仍会出现满载压力。',
    evidence: '06-26 与 06-27 入住率达到 100%，说明高峰不是单纯流量问题，而是供给承接问题。',
    suggestion: '在节假日前 7 天触达老客，提前锁定预约；满载时引导到上门喂养或接送服务。',
    priority: 'medium'
  }
];
