import { useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './App.css'

type Page = 'home' | 'services' | 'detail' | 'booking' | 'confirm' | 'success' | 'mine'
type PetType = '猫' | '狗' | '其他'
type FormState = 'idle' | 'error' | 'checking'

type Service = {
  id: string
  icon: string
  title: string
  desc: string
  price: string
  basePrice: number
  tags: string[]
  audience: string
  process: string[]
  assurance: string[]
  reasons: string[]
  tone: string
}

type BookingForm = {
  petType: PetType
  petCount: number
  date: string
  timeSlot: string
  address: string
  contact: string
  phone: string
  remark: string
}

type Order = BookingForm & {
  serviceTitle: string
  serviceId: string
  estimatePrice: number
  orderNo: string
  status: string
}

const services: Service[] = [
  {
    id: 'feeding',
    icon: 'bowl',
    title: '上门喂养',
    desc: '按预约时间上门换粮换水、清理猫砂、检查宠物状态，并用图文记录同步给主人。',
    price: '¥39-89/次',
    basePrice: 59,
    tags: ['短途出行', '到家签到', '图文反馈'],
    audience: '适合出差、旅行、临时加班，家中猫狗需要定时照护的家庭。',
    process: ['预约时确认喂养习惯与入户方式', '服务人员到达后完成定位签到', '按清单完成喂食、换水、清洁', '提交照片、视频和异常提醒'],
    assurance: ['服务人员实名审核', '服务前后拍照留痕', '异常情况 10 分钟内电话沟通'],
    reasons: ['社区就近派单，减少等待和空跑', '服务清单标准化，避免口头交代遗漏', '每次服务沉淀记录，方便复购和交接'],
    tone: 'daily',
  },
  {
    id: 'boarding',
    icon: 'home',
    title: '宠物寄养',
    desc: '匹配社区附近的寄养家庭，提前查看环境与接待规则，让临时托付更可控。',
    price: '¥69-159/晚',
    basePrice: 99,
    tags: ['家庭寄养', '环境预览', '每日动态'],
    audience: '适合多日出行、家中装修、需要比宠物店更安静照护环境的家庭。',
    process: ['提交宠物性格、疫苗与作息信息', '查看寄养家庭环境和接待限制', '确认入住时间与物品清单', '寄养期间每日同步照片和状态'],
    assurance: ['寄养家庭准入审核', '入住前健康信息确认', '平台保留沟通和服务记录'],
    reasons: ['用家庭场景承接短期托付', '提前透明展示环境，降低不确定感', '寄养状态持续反馈，主人不必反复追问'],
    tone: 'stay',
  },
  {
    id: 'walking',
    icon: 'leash',
    title: '遛狗服务',
    desc: '按固定时间上门牵遛，记录路线、时长和排便情况，帮助狗狗保持稳定运动节奏。',
    price: '¥29-69/次',
    basePrice: 49,
    tags: ['定时牵遛', '路线记录', '状态反馈'],
    audience: '适合工作日时间紧、老年养宠家庭，或需要规律消耗精力的犬只。',
    process: ['确认牵引绳、门禁和狗狗性格', '上门接宠并检查牵引装备', '按约定时长完成牵遛', '反馈路线、时长和状态'],
    assurance: ['全程牵引不离手', '恶劣天气主动提醒改约', '突发情况优先送回并联系主人'],
    reasons: ['固定服务时段，让狗狗形成稳定预期', '路线和时长可追溯，服务结果更透明', '对胆小、兴奋型犬只提前标注注意事项'],
    tone: 'walk',
  },
  {
    id: 'grooming',
    icon: 'spark',
    title: '宠物洗护',
    desc: '预约社区合作洗护师，提供基础清洁、梳毛、指甲修剪和护理提醒。',
    price: '¥79-199/次',
    basePrice: 129,
    tags: ['明码标价', '温和护理', '预约到店'],
    audience: '适合需要定期洗澡、梳毛、基础护理，且希望提前确认价格的宠物家庭。',
    process: ['选择洗护项目并确认宠物体型', '预约到店或接送时间', '洗护师按项目完成护理', '反馈皮肤、毛发和护理建议'],
    assurance: ['项目价格提前展示', '敏感体质可提前备注', '护理过程支持及时沟通'],
    reasons: ['减少临时加价和项目不清晰的问题', '按体型和毛量预估时长', '护理建议沉淀到用户档案'],
    tone: 'clean',
  },
  {
    id: 'medical',
    icon: 'cross',
    title: '陪诊接送',
    desc: '协助前往宠物医院、疫苗接种或复查，记录行程节点并同步就诊信息。',
    price: '¥59-139/次',
    basePrice: 89,
    tags: ['接送陪同', '复诊协助', '节点同步'],
    audience: '适合上班时间冲突、老人不便出行，或需要协助接送复诊的家庭。',
    process: ['确认医院、科室和预约时间', '按约定接送或陪同到院', '同步排队、检查和缴费节点', '完成后安全送回并整理提醒'],
    assurance: ['重要事项二次确认', '行程节点实时同步', '不替代医生做医疗判断'],
    reasons: ['把复杂就诊过程拆成可跟进节点', '减少主人临时请假压力', '适合疫苗、复查等低风险高频场景'],
    tone: 'care',
  },
]

const defaultBooking: BookingForm = {
  petType: '猫',
  petCount: 1,
  date: '',
  timeSlot: '09:00-11:00',
  address: '',
  contact: '',
  phone: '',
  remark: '',
}

const mockRecords: Order[] = [
  {
    serviceId: 'feeding',
    serviceTitle: '上门喂养',
    petType: '猫',
    petCount: 2,
    date: '2026-06-18',
    timeSlot: '17:00-19:00',
    address: '梧桐社区 3 号楼',
    contact: '林女士',
    phone: '13800138000',
    remark: '两只猫分开喂，橘猫少量多餐。',
    estimatePrice: 84,
    orderNo: 'LP202606180812',
    status: '已完成',
  },
  {
    serviceId: 'walking',
    serviceTitle: '遛狗服务',
    petType: '狗',
    petCount: 1,
    date: '2026-06-21',
    timeSlot: '19:00-21:00',
    address: '绿地花园南门',
    contact: '陈先生',
    phone: '13900139000',
    remark: '边牧，出门容易兴奋，需要双手牵引。',
    estimatePrice: 49,
    orderNo: 'LP202606210436',
    status: '待服务',
  },
]

const tabs: Array<{ key: Page; label: string; icon: string }> = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'services', label: '服务', icon: 'grid' },
  { key: 'booking', label: '预约', icon: 'calendar' },
  { key: 'mine', label: '我的', icon: 'user' },
]

function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id)
  const [booking, setBooking] = useState<BookingForm>(defaultBooking)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const [order, setOrder] = useState<Order | null>(null)

  const selectedService = services.find((item) => item.id === selectedServiceId) ?? services[0]
  const estimatedPrice = useMemo(
    () => selectedService.basePrice + Math.max(0, booking.petCount - 1) * 25,
    [booking.petCount, selectedService.basePrice],
  )

  const records = useMemo(() => (order ? [order, ...mockRecords] : mockRecords), [order])

  const goToService = (serviceId: string) => {
    setSelectedServiceId(serviceId)
    setPage('detail')
  }

  const startBooking = (serviceId = selectedServiceId) => {
    setSelectedServiceId(serviceId)
    setErrors({})
    setFormState('idle')
    setPage('booking')
  }

  const navigateTab = (target: Page) => {
    if (target === 'booking') {
      startBooking(selectedServiceId)
      return
    }
    setErrors({})
    setFormState('idle')
    setPage(target)
  }

  const updateBooking = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setBooking((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    if (formState === 'error') setFormState('idle')
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof BookingForm, string>> = {}
    if (!booking.date) nextErrors.date = '请选择希望上门的日期'
    if (!booking.address.trim()) nextErrors.address = '请填写小区、楼栋和门牌信息'
    if (!booking.contact.trim()) nextErrors.contact = '请填写方便沟通的联系人'
    if (!/^1[3-9]\d{9}$/.test(booking.phone.trim())) nextErrors.phone = '请输入 11 位中国大陆手机号'
    if (booking.petCount < 1 || Number.isNaN(booking.petCount)) nextErrors.petCount = '宠物数量至少为 1'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submitBooking = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) {
      setFormState('error')
      return
    }
    setFormState('checking')
    window.setTimeout(() => {
      setFormState('idle')
      setPage('confirm')
    }, 360)
  }

  const confirmOrder = () => {
    const orderNo = `LP${new Date().getFullYear()}${String(Date.now()).slice(-8)}`
    setOrder({
      ...booking,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      estimatePrice: estimatedPrice,
      orderNo,
      status: '待联系',
    })
    setPage('success')
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onReserve={() => startBooking()} onOpenService={goToService} />
      case 'services':
        return <ServicesPage onOpenService={goToService} />
      case 'detail':
        return <DetailPage service={selectedService} onBack={() => setPage('services')} onReserve={() => startBooking(selectedService.id)} />
      case 'booking':
        return (
          <BookingPage
            service={selectedService}
            booking={booking}
            errors={errors}
            formState={formState}
            estimatePrice={estimatedPrice}
            onChange={updateBooking}
            onSubmit={submitBooking}
          />
        )
      case 'confirm':
        return <ConfirmPage booking={booking} service={selectedService} estimatePrice={estimatedPrice} onBack={() => setPage('booking')} onConfirm={confirmOrder} />
      case 'success':
        return <SuccessPage order={order} onHome={() => setPage('home')} onMine={() => setPage('mine')} />
      case 'mine':
        return <MinePage records={records} onOpenServices={() => setPage('services')} />
      default:
        return null
    }
  }

  return (
    <main className="phone-shell" aria-label="邻宠到家 H5 作品集 Demo">
      <DeviceStatusBar />
      <section className="screen">{renderPage()}</section>
      <TabBar current={page} onNavigate={navigateTab} />
    </main>
  )
}

function DeviceStatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">9:41</span>
      <span className="dynamic-island" />
      <span className="status-icons">
        <span className="signal-bars"><i /><i /><i /></span>
        <span>5G</span>
        <span className="battery"><i /></span>
      </span>
    </div>
  )
}

function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    home: <path d="M3 10.6 12 3l9 7.6V21h-6v-6H9v6H3Z" />,
    grid: <path d="M4 4h7v7H4Zm9 0h7v7h-7ZM4 13h7v7H4Zm9 0h7v7h-7Z" />,
    calendar: <path d="M7 3v4m10-4v4M4 8h16M5 5h14v16H5Z" />,
    user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" />,
    bowl: <path d="M5 12h14l-1.8 6H6.8Zm2-3c.8-2.3 2.5-3.5 5-3.5s4.2 1.2 5 3.5" />,
    leash: <path d="M7 6a3 3 0 1 0 3 3V6Zm3 3c3 1 5 3.2 5 6.5 0 2 1.3 3.5 3 3.5 1.5 0 2.5-1 2.5-2.4" />,
    spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8Z" />,
    cross: <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <path d="M12 3 5 6v5c0 4.2 2.8 8 7 10 4.2-2 7-5.8 7-10V6Z" />,
  }

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function HomePage({ onReserve, onOpenService }: { onReserve: () => void; onOpenService: (id: string) => void }) {
  return (
    <div className="page page-enter home-page">
      <section className="demo-banner">
        <strong>项目演示模式</strong>
        <span>作品集 H5 Demo，预约、订单与价格均为前端 mock 数据。</span>
      </section>

      <header className="hero-card">
        <div className="brand-row">
          <div className="brand-mark">邻</div>
          <div>
            <h1>邻宠到家</h1>
            <p>社区宠物照护服务平台</p>
          </div>
        </div>
        <div className="hero-metrics">
          <div><strong>2.4k</strong><span>社区预约</span></div>
          <div><strong>98%</strong><span>按时履约</span></div>
          <div><strong>30min</strong><span>响应沟通</span></div>
        </div>
        <div className="hero-visual">
          <div className="route-line" />
          <div className="home-bubble">就近派单</div>
          <div className="care-bubble">图文留痕</div>
        </div>
        <button className="primary-button" type="button" onClick={onReserve}>
          立即预约服务
        </button>
      </header>

      <section className="value-grid">
        {['熟人社区', '上门服务', '透明预约', '安心托付'].map((item) => (
          <div className="value-item" key={item}>
            <Icon name="check" />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <SectionTitle title="核心服务" action="查看" onAction={() => onOpenService(services[0].id)} />
      <div className="service-grid">
        {services.map((service) => (
          <button className={`mini-service ${service.tone}`} key={service.id} type="button" onClick={() => onOpenService(service.id)}>
            <span className="service-icon">
              <Icon name={service.icon} />
            </span>
            <strong>{service.title}</strong>
            <small>{service.price}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function ServicesPage({ onOpenService }: { onOpenService: (id: string) => void }) {
  return (
    <div className="page page-enter">
      <PageHeader eyebrow="Services" title="按场景选择照护服务" subtitle="覆盖短途出行、日常牵遛、寄养托付、洗护护理与陪诊接送。" />
      <div className="service-list">
        {services.map((service) => (
          <button className="service-card" key={service.id} type="button" onClick={() => onOpenService(service.id)}>
            <span className={`service-icon large ${service.tone}`}>
              <Icon name={service.icon} />
            </span>
            <span className="service-copy">
              <strong>{service.title}</strong>
              <em>{service.desc}</em>
              <span className="tag-row">
                {service.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </span>
            </span>
            <span className="price">{service.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DetailPage({ service, onBack, onReserve }: { service: Service; onBack: () => void; onReserve: () => void }) {
  return (
    <div className="page page-enter">
      <button className="ghost-button compact" type="button" onClick={onBack}>返回服务</button>
      <header className={`detail-hero ${service.tone}`}>
        <span className="service-icon large">
          <Icon name={service.icon} />
        </span>
        <h2>{service.title}</h2>
        <p>{service.desc}</p>
        <strong>{service.price}</strong>
      </header>

      <InfoBlock title="适合人群" items={[service.audience]} />
      <InfoBlock title="服务流程" items={service.process} ordered />
      <InfoBlock title="保障机制" items={service.assurance} icon="shield" />
      <InfoBlock title="为什么选择邻宠到家" items={service.reasons} />

      <button className="primary-button sticky-action" type="button" onClick={onReserve}>
        预约此服务
      </button>
    </div>
  )
}

function BookingPage({
  service,
  booking,
  errors,
  formState,
  estimatePrice,
  onChange,
  onSubmit,
}: {
  service: Service
  booking: BookingForm
  errors: Partial<Record<keyof BookingForm, string>>
  formState: FormState
  estimatePrice: number
  onChange: <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => void
  onSubmit: (event: FormEvent) => void
}) {
  const hasErrors = formState === 'error'

  return (
    <form className="page page-enter booking-form" onSubmit={onSubmit}>
      <PageHeader eyebrow="Booking" title="填写预约信息" subtitle={`当前服务：${service.title}，系统预估 ¥${estimatePrice} 起`} />

      {hasErrors && (
        <div className="form-alert error" role="alert">
          <strong>还有信息需要补充</strong>
          <span>请检查标红字段，确认后即可进入订单确认页。</span>
        </div>
      )}

      {formState === 'checking' && (
        <div className="form-alert success" role="status">
          <strong>信息已通过校验</strong>
          <span>正在生成预约确认单...</span>
        </div>
      )}

      <label className="field">
        <span>宠物类型</span>
        <div className="segmented">
          {(['猫', '狗', '其他'] as PetType[]).map((item) => (
            <button className={booking.petType === item ? 'active' : ''} key={item} type="button" onClick={() => onChange('petType', item)}>
              {item}
            </button>
          ))}
        </div>
      </label>

      <div className="two-fields">
        <label className={`field ${errors.petCount ? 'has-error' : ''}`}>
          <span>宠物数量</span>
          <input type="number" min="1" value={booking.petCount} onChange={(event) => onChange('petCount', Number(event.target.value))} />
          <ErrorText text={errors.petCount} />
        </label>
        <label className={`field ${errors.date ? 'has-error' : ''}`}>
          <span>服务日期</span>
          <input type="date" value={booking.date} onChange={(event) => onChange('date', event.target.value)} />
          <ErrorText text={errors.date} />
        </label>
      </div>

      <label className="field">
        <span>服务时间段</span>
        <select value={booking.timeSlot} onChange={(event) => onChange('timeSlot', event.target.value)}>
          <option>09:00-11:00</option>
          <option>11:00-13:00</option>
          <option>14:00-16:00</option>
          <option>17:00-19:00</option>
          <option>19:00-21:00</option>
        </select>
      </label>

      <label className={`field ${errors.address ? 'has-error' : ''}`}>
        <span>服务地址</span>
        <input placeholder="例如：梧桐社区 3 号楼 1202" value={booking.address} onChange={(event) => onChange('address', event.target.value)} />
        <ErrorText text={errors.address} />
      </label>

      <div className="two-fields">
        <label className={`field ${errors.contact ? 'has-error' : ''}`}>
          <span>联系人</span>
          <input placeholder="姓名" value={booking.contact} onChange={(event) => onChange('contact', event.target.value)} />
          <ErrorText text={errors.contact} />
        </label>
        <label className={`field ${errors.phone ? 'has-error' : ''}`}>
          <span>手机号</span>
          <input placeholder="11 位手机号" value={booking.phone} onChange={(event) => onChange('phone', event.target.value)} />
          <ErrorText text={errors.phone} />
        </label>
      </div>

      <label className="field">
        <span>备注</span>
        <textarea placeholder="可填写饮食习惯、钥匙交接、性格提醒等，便于服务人员提前准备。" value={booking.remark} onChange={(event) => onChange('remark', event.target.value)} />
      </label>

      <button className="primary-button" type="submit" disabled={formState === 'checking'}>
        {formState === 'checking' ? '正在校验信息...' : '提交预约'}
      </button>
    </form>
  )
}

function ConfirmPage({
  booking,
  service,
  estimatePrice,
  onBack,
  onConfirm,
}: {
  booking: BookingForm
  service: Service
  estimatePrice: number
  onBack: () => void
  onConfirm: () => void
}) {
  const rows = [
    ['服务项目', service.title],
    ['宠物信息', `${booking.petType} · ${booking.petCount} 只`],
    ['服务时间', `${booking.date} ${booking.timeSlot}`],
    ['服务地址', booking.address],
    ['联系人', `${booking.contact} ${booking.phone}`],
    ['备注', booking.remark || '无特殊备注'],
  ]

  return (
    <div className="page page-enter">
      <PageHeader eyebrow="Confirm" title="确认预约信息" subtitle="提交后将生成模拟订单，服务人员会在 30 分钟内联系确认细节。" />
      <section className="summary-card">
        {rows.map(([label, value]) => (
          <div className="summary-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
      <section className="notice-card">
        <div>
          <span>预估价格</span>
          <strong>¥{estimatePrice}</strong>
        </div>
        <p>最终价格会根据服务距离、宠物数量和特殊需求确认。请提前准备钥匙、食物、牵引绳或护理用品，保障服务按时开始。</p>
      </section>
      <div className="action-row">
        <button className="ghost-button" type="button" onClick={onBack}>返回修改</button>
        <button className="primary-button" type="button" onClick={onConfirm}>确认提交</button>
      </div>
    </div>
  )
}

function SuccessPage({ order, onHome, onMine }: { order: Order | null; onHome: () => void; onMine: () => void }) {
  return (
    <div className="page page-enter success-page">
      <div className="success-mark">
        <Icon name="check" />
      </div>
      <h2>预约已提交</h2>
      <p>服务人员将在 30 分钟内联系你确认入户方式、宠物习惯和服务细节。</p>
      <section className="summary-card">
        <div className="summary-row">
          <span>模拟订单编号</span>
          <strong>{order?.orderNo ?? 'LP202600000000'}</strong>
        </div>
        <div className="summary-row">
          <span>预约项目</span>
          <strong>{order?.serviceTitle ?? '上门喂养'}</strong>
        </div>
        <div className="summary-row">
          <span>订单状态</span>
          <strong className="status-pill">{order?.status ?? '待联系'}</strong>
        </div>
      </section>
      <div className="action-row">
        <button className="ghost-button" type="button" onClick={onHome}>返回首页</button>
        <button className="primary-button" type="button" onClick={onMine}>查看预约信息</button>
      </div>
    </div>
  )
}

function MinePage({ records, onOpenServices }: { records: Order[]; onOpenServices: () => void }) {
  return (
    <div className="page page-enter">
      <section className="profile-card">
        <div className="avatar">L</div>
        <div>
          <h2>社区养宠人</h2>
          <p>已建立 2 只宠物的照护偏好档案</p>
        </div>
      </section>

      <SectionTitle title="预约记录" action="再约一次" onAction={onOpenServices} />
      <div className="record-list">
        {records.map((item) => (
          <article className="record-card" key={item.orderNo}>
            <div className="record-head">
              <strong>{item.serviceTitle}</strong>
              <span className={`status-pill ${item.status === '已完成' ? 'done' : ''}`}>{item.status}</span>
            </div>
            <p>{item.date} {item.timeSlot} · {item.petType} {item.petCount} 只</p>
            <div className="record-meta">
              <span>{item.orderNo}</span>
              <strong>¥{item.estimatePrice}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="mine-grid">
        <div><Icon name="shield" /><span>服务保障</span><strong>实名审核</strong></div>
        <div><Icon name="check" /><span>透明反馈</span><strong>图文记录</strong></div>
        <div><Icon name="calendar" /><span>联系客服</span><strong>09:00-21:00</strong></div>
      </div>
    </div>
  )
}

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <header className="page-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  )
}

function SectionTitle({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <button type="button" onClick={onAction}>{action}</button>
    </div>
  )
}

function InfoBlock({ title, items, ordered = false, icon }: { title: string; items: string[]; ordered?: boolean; icon?: string }) {
  return (
    <section className="info-block">
      <h3>{title}</h3>
      <div className="info-list">
        {items.map((item, index) => (
          <div className="info-item" key={item}>
            <span>{icon ? <Icon name={icon} /> : ordered ? index + 1 : <Icon name="check" />}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ErrorText({ text }: { text?: string }) {
  if (!text) return null
  return <em className="error-text">{text}</em>
}

function TabBar({ current, onNavigate }: { current: Page; onNavigate: (target: Page) => void }) {
  const active = current === 'detail' ? 'services' : current === 'confirm' || current === 'success' ? 'booking' : current

  return (
    <nav className="tab-bar" aria-label="底部导航">
      {tabs.map((tab) => (
        <button className={active === tab.key ? 'active' : ''} key={tab.key} type="button" onClick={() => onNavigate(tab.key)}>
          <Icon name={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default App
