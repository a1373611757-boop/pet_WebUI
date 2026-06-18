import type { Order, OrderStatus, ServiceType } from '../types/index'

const ORDERS_KEY = 'neighbor_pet_orders'

function isServiceType(value: unknown): value is ServiceType {
  return value === 'dogWalking' || value === 'catFeeding' || value === 'dayCare'
}

function isOrderStatus(value: unknown): value is OrderStatus {
  return value === 'pending' || value === 'serving' || value === 'completed'
}

function isOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    isServiceType(candidate.serviceType) &&
    typeof candidate.serviceName === 'string' &&
    typeof candidate.address === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.timeSlot === 'string' &&
    typeof candidate.petName === 'string' &&
    typeof candidate.petType === 'string' &&
    typeof candidate.petNotes === 'string' &&
    typeof candidate.userNotes === 'string' &&
    typeof candidate.estimatedPrice === 'number' &&
    isOrderStatus(candidate.status) &&
    typeof candidate.createdAt === 'number'
  )
}

export function getOrders(): Order[] {
  const value: unknown = wx.getStorageSync(ORDERS_KEY)
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter(isOrder).sort((first, second) => second.createdAt - first.createdAt)
}

export function saveOrder(order: Order): void {
  const orders = getOrders()
  wx.setStorageSync(ORDERS_KEY, [order, ...orders])
}

export function clearOrders(): void {
  wx.removeStorageSync(ORDERS_KEY)
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((order) => order.id === id)
}
