import { services } from '../data/services'
import type { OrderStatus, ServiceType } from '../types/index'

export function formatPrice(price: number): string {
  return `¥${price}`
}

export function getServiceName(serviceType: ServiceType): string {
  const service = services.find((item) => item.type === serviceType)
  return service ? service.name : '宠物服务'
}

export function getStatusText(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    pending: '待确认',
    serving: '服务中',
    completed: '已完成',
  }
  return statusMap[status]
}

export function formatCreatedAt(timestamp: number): string {
  const date = new Date(timestamp)
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hour = `${date.getHours()}`.padStart(2, '0')
  const minute = `${date.getMinutes()}`.padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}
