export type ServiceType = 'dogWalking' | 'catFeeding' | 'dayCare'

export type OrderStatus = 'pending' | 'serving' | 'completed'

export interface Service {
  type: ServiceType
  name: string
  subtitle: string
  description: string
  priceLabel: string
  duration: string
  icon: string
}

export interface Sitter {
  id: string
  name: string
  serviceType: ServiceType
  serviceName: string
  area: string
  specialty: string
  serviceCount: number
  rating: number
  tags: string[]
  bio: string
}

export interface PriceConfig {
  serviceType: ServiceType
  basePrice: number
}

export interface BookingForm {
  serviceType: ServiceType
  address: string
  date: string
  timeSlot: string
  petName: string
  petType: string
  petNotes: string
  userNotes: string
}

export interface Order extends BookingForm {
  id: string
  serviceName: string
  estimatedPrice: number
  status: OrderStatus
  createdAt: number
}

export interface PriceBreakdown {
  basePrice: number
  extraFee: number
  eveningFee: number
  total: number
}
