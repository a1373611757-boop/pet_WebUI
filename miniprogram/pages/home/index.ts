import { services } from '../../data/services'

Page({
  data: {
    services,
    stats: [
      {
        value: '15分钟',
        label: '最快响应附近订单',
      },
      {
        value: '98.6%',
        label: '服务完成满意率',
      },
      {
        value: '24小时',
        label: '客服与应急支持',
      },
    ],
    trustItems: [
      {
        icon: '接',
        title: '每日接送记录',
        desc: '日托入托、离店、交接人和时间都有记录。',
      },
      {
        icon: '拍',
        title: '照片/视频反馈',
        desc: '喂食、散步、休息、互动状态实时回传。',
      },
      {
        icon: '型',
        title: '分犬种/体型看护',
        desc: '按体型、性格、活动量区分照护节奏。',
      },
      {
        icon: '检',
        title: '入托前健康确认',
        desc: '确认精神、食欲、免疫和异常风险。',
      },
      {
        icon: '免',
        title: '不接高风险宠物',
        desc: '攻击性强或未免疫宠物暂不接待。',
      },
      {
        icon: '急',
        title: '紧急联系人机制',
        desc: '异常情况优先联系主人并留存处理记录。',
      },
    ],
  },

  goBooking() {
    wx.switchTab({
      url: '/pages/booking/index',
    })
  },

})
