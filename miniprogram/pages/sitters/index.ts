import { services } from '../../data/services'
import { sitters } from '../../data/sitters'
import type { ServiceType, Sitter } from '../../types/index'

type FilterType = 'all' | ServiceType

interface SitterView extends Sitter {
  initial: string
}

const filterTabs: Array<{ label: string; value: FilterType }> = [
  {
    label: '全部',
    value: 'all',
  },
  ...services.map((service) => ({
    label: service.name,
    value: service.type,
  })),
]

function buildSitterViews(filter: FilterType): SitterView[] {
  return sitters
    .filter((sitter) => filter === 'all' || sitter.serviceType === filter)
    .map((sitter) => ({
      ...sitter,
      initial: sitter.name.slice(0, 1),
    }))
}

Page({
  data: {
    filterTabs,
    activeFilter: 'all' as FilterType,
    sitters: buildSitterViews('all'),
  },

  selectFilter(event: WechatMiniprogram.TouchEvent) {
    const dataset = event.currentTarget.dataset as { value?: FilterType }
    const activeFilter = dataset.value || 'all'
    this.setData({
      activeFilter,
      sitters: buildSitterViews(activeFilter),
    })
  },

  goDetail(event: WechatMiniprogram.TouchEvent) {
    const dataset = event.currentTarget.dataset as { id?: string }
    if (!dataset.id) {
      return
    }
    wx.navigateTo({
      url: `/pages/sitter-detail/index?id=${dataset.id}`,
    })
  },
})
