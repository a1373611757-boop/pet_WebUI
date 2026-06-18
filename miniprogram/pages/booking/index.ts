import { services } from '../../data/services'
import { calculatePrice } from '../../utils/price'
import { getServiceName } from '../../utils/format'
import { saveOrder } from '../../utils/storage'
import type { BookingForm, ServiceType } from '../../types/index'

const timeSlots = ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '18:00 - 20:00']

const defaultForm: BookingForm = {
  serviceType: 'dogWalking',
  address: '',
  date: '',
  timeSlot: '',
  petName: '',
  petType: '',
  petNotes: '',
  userNotes: '',
}

type InputEvent = WechatMiniprogram.CustomEvent<{ value: string }>
type PickerEvent = WechatMiniprogram.CustomEvent<{ value: string | number }>

Page({
  data: {
    services,
    timeSlots,
    form: defaultForm,
    price: calculatePrice(defaultForm),
  },

  onLoad(query: Record<string, string | undefined>) {
    const serviceType = query.serviceType
    if (serviceType === 'dogWalking' || serviceType === 'catFeeding' || serviceType === 'dayCare') {
      this.updateForm({
        serviceType,
      })
    }
  },

  selectService(event: WechatMiniprogram.TouchEvent) {
    const dataset = event.currentTarget.dataset as { serviceType?: ServiceType }
    if (!dataset.serviceType) {
      return
    }
    this.updateForm({
      serviceType: dataset.serviceType,
    })
  },

  onAddressInput(event: InputEvent) {
    this.updateForm({
      address: event.detail.value,
    })
  },

  onDateChange(event: PickerEvent) {
    this.updateForm({
      date: `${event.detail.value}`,
    })
  },

  onTimeChange(event: PickerEvent) {
    const index = Number(event.detail.value)
    this.updateForm({
      timeSlot: timeSlots[index] || '',
    })
  },

  onPetNameInput(event: InputEvent) {
    this.updateForm({
      petName: event.detail.value,
    })
  },

  onPetTypeInput(event: InputEvent) {
    this.updateForm({
      petType: event.detail.value,
    })
  },

  onPetNotesInput(event: InputEvent) {
    this.updateForm({
      petNotes: event.detail.value,
    })
  },

  onUserNotesInput(event: InputEvent) {
    this.updateForm({
      userNotes: event.detail.value,
    })
  },

  submitBooking() {
    const form = this.data.form
    const requiredFields: Array<keyof BookingForm> = ['serviceType', 'address', 'date', 'timeSlot', 'petName', 'petType']
    const missing = requiredFields.some((field) => !form[field])

    if (missing) {
      wx.showToast({
        title: '请补全必填信息',
        icon: 'none',
      })
      return
    }

    const price = calculatePrice(form)
    const createdAt = Date.now()
    saveOrder({
      ...form,
      id: `NP${createdAt}`,
      serviceName: getServiceName(form.serviceType),
      estimatedPrice: price.total,
      status: 'pending',
      createdAt,
    })

    wx.showToast({
      title: '提交成功',
      icon: 'success',
    })

    setTimeout(() => {
      wx.switchTab({
        url: '/pages/orders/index',
      })
    }, 600)
  },

  updateForm(partial: Partial<BookingForm>) {
    const form = {
      ...this.data.form,
      ...partial,
    }
    this.setData({
      form,
      price: calculatePrice(form),
    })
  },
})
