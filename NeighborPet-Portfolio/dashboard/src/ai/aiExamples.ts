import type { DailyReportInput, MarketingCopyInput } from './aiTypes';

export const defaultDailyReportInput: DailyReportInput = {
  petName: '糯米',
  feeding: '已按备注完成晚餐，食量正常',
  water: '已更换新鲜饮用水',
  toilet: '排便正常，猫砂已清理',
  activity: '陪伴玩逗猫棒约 15 分钟',
  mood: '刚见面有些谨慎，后半段放松很多',
  merchantNote: '今天没有发现明显异常，建议明天继续观察食量'
};

export const dailyReportOptions = {
  feeding: ['食量正常', '食量略少', '已按备注分次喂食', '暂未主动进食'],
  water: ['饮水正常', '已更换新鲜饮用水', '饮水略少，已补充水碗', '水碗清洁后重新加水'],
  toilet: ['排便正常', '暂未排便', '便便略软，建议继续观察', '猫砂/尿垫已清理'],
  activity: ['活动正常', '陪伴互动约 15 分钟', '完成 30 分钟遛狗', '今天更喜欢安静休息'],
  mood: ['状态放松', '有些紧张但可安抚', '亲人活跃', '偏安静，建议继续观察']
};

export const defaultMarketingInput: MarketingCopyInput = {
  channel: '小红书',
  serviceType: '猫咪寄养',
  targetUser: '周末短途出行的城市养宠家庭'
};

export const targetUsers = ['周末短途出行的城市养宠家庭', '临时加班的上班族', '节假日返乡人群', '新手养宠人群'];
