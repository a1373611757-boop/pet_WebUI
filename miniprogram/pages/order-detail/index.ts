import { formatCreatedAt, formatPrice, getStatusText } from '../../utils/format'
import { getOrderById } from '../../utils/storage'
import type { Order } from '../../types/index'

interface OrderDetailView extends Order {
  createdAtText: string
  priceText: string
  statusText: string
  petNotesText: string
  userNotesText: string
}

Page({
  data: {
    order: undefined as OrderDetailView | undefined,
  },

  onLoad(query: Record<string, string | undefined>) {
    const order = getOrderById(query.id || '')
    if (!order) {
      return
    }
    this.setData({
      order: {
        ...order,
        createdAtText: formatCreatedAt(order.createdAt),
        priceText: formatPrice(order.estimatedPrice),
        statusText: getStatusText(order.status),
        petNotesText: order.petNotes || '暂无',
        userNotesText: order.userNotes || '暂无',
      },
    })
  },
})
