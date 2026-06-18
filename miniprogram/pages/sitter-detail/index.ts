import { sitters } from '../../data/sitters'
import type { Sitter } from '../../types/index'

interface SitterDetailView extends Sitter {
  initial: string
}

Page({
  data: {
    sitter: undefined as SitterDetailView | undefined,
  },

  onLoad(query: Record<string, string | undefined>) {
    const id = query.id || ''
    const sitter = sitters.find((item) => item.id === id)
    if (!sitter) {
      return
    }
    this.setData({
      sitter: {
        ...sitter,
        initial: sitter.name.slice(0, 1),
      },
    })
  },

  goBooking() {
    const sitter = this.data.sitter
    if (!sitter) {
      return
    }
    wx.switchTab({
      url: '/pages/booking/index',
    })
  },
})
