import { clearOrders, getOrders } from '../../utils/storage'
import { formatCreatedAt, formatPrice, getStatusText } from '../../utils/format'
import type { Order } from '../../types/index'

interface OrderView extends Order {
  createdAtText: string
  priceText: string
  statusText: string
}

function buildOrderViews(): OrderView[] {
  return getOrders().map((order) => ({
    ...order,
    createdAtText: formatCreatedAt(order.createdAt),
    priceText: formatPrice(order.estimatedPrice),
    statusText: getStatusText(order.status),
  }))
}

Page({
  data: {
    orders: [] as OrderView[],
  },

  onShow() {
    this.setData({
      orders: buildOrderViews(),
    })
  },

  goBooking() {
    wx.switchTab({
      url: '/pages/booking/index',
    })
  },

  goDetail(event: WechatMiniprogram.TouchEvent) {
    const dataset = event.currentTarget.dataset as { id?: string }
    if (!dataset.id) {
      return
    }
    wx.navigateTo({
      url: `/pages/order-detail/index?id=${dataset.id}`,
    })
  },

  clearLocalOrders() {
    wx.showModal({
      title: '清空订单',
      content: '确定清空本地演示订单吗？',
      confirmText: '清空',
      confirmColor: '#e15d3f',
      success: (result) => {
        if (!result.confirm) {
          return
        }
        clearOrders()
        this.setData({
          orders: [],
        })
        wx.showToast({
          title: '已清空',
          icon: 'success',
        })
      },
    })
  },
})
