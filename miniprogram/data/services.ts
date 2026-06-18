import type { Service } from '../types/index'

export const services: Service[] = [
  {
    type: 'dogWalking',
    name: '上门遛狗',
    subtitle: '30分钟起',
    description: '按路线记录、便便清理、补水反馈，适合上班日和短途出差。',
    priceLabel: '¥39起',
    duration: '30分钟',
    icon: '狗',
  },
  {
    type: 'catFeeding',
    name: '上门喂猫',
    subtitle: '单次到家',
    description: '喂食换水、铲砂通风、陪玩观察，支持多猫家庭和特殊饮食备注。',
    priceLabel: '¥49起',
    duration: '1次',
    icon: '猫',
  },
  {
    type: 'dayCare',
    name: '宠物日托',
    subtitle: '半日起',
    description: '白天寄托、分区玩耍、定时休息，适合装修、聚会或长时间外出。',
    priceLabel: '¥129起',
    duration: '半日',
    icon: '托',
  },
]
