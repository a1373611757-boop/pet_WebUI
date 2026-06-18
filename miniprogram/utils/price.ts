import { prices } from '../data/prices'
import type { BookingForm, PriceBreakdown, ServiceType } from '../types/index'

const EXTRA_KEYWORDS = ['多宠物', '多猫', '节假日', '药']
const EVENING_SLOT = '18:00 - 20:00'

export function getBasePrice(serviceType: ServiceType): number {
  const config = prices.find((item) => item.serviceType === serviceType)
  return config ? config.basePrice : 0
}

export function calculatePrice(form: Pick<BookingForm, 'serviceType' | 'timeSlot' | 'petNotes' | 'userNotes'>): PriceBreakdown {
  const basePrice = getBasePrice(form.serviceType)
  const notes = `${form.petNotes} ${form.userNotes}`
  const hasExtraKeyword = EXTRA_KEYWORDS.some((keyword) => notes.includes(keyword))
  const extraFee = hasExtraKeyword ? 20 : 0
  const eveningFee = form.timeSlot === EVENING_SLOT ? 10 : 0

  return {
    basePrice,
    extraFee,
    eveningFee,
    total: basePrice + extraFee + eveningFee,
  }
}
