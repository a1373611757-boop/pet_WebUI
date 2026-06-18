Page({
  data: {
    version: '本地演示版',
    items: [
      {
        title: '宠物档案',
        desc: 'MVP 阶段暂展示入口，后续可管理宠物资料。',
      },
      {
        title: '我的预约',
        desc: '查看本地保存的预约订单。',
      },
      {
        title: '客服与应急说明',
        desc: '演示版不接真实客服，请以线下沟通为准。',
      },
    ],
  },

  goOrders(event: WechatMiniprogram.TouchEvent) {
    const dataset = event.currentTarget.dataset as { title?: string }
    if (dataset.title !== '我的预约') {
      wx.showToast({
        title: '本地演示入口',
        icon: 'none',
      })
      return
    }
    wx.switchTab({
      url: '/pages/orders/index',
    })
  },
})
