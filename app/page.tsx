'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Factory,
  Globe2,
  LayoutDashboard,
  Menu,
  PackageCheck,
  Plus,
  Search,
  Settings2,
  Ship,
  Truck,
  Users,
  UserPlus,
  LogOut,
  Trash2,
  Warehouse,
  X,
  Save,
  Edit2,
  FileText,
} from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { Badge } from '@/components/ui/badge'
import { translations, getTranslation } from '@/lib/translations'
import { Language } from '@/lib/types'
import * as storage from '@/lib/storage'

const navItems = [
  { label: { ar: 'لوحة التحكم', en: 'Dashboard', it: 'Dashboard' }, icon: LayoutDashboard, key: 'dashboard' },
  { label: { ar: 'الاستلام والميزان', en: 'Reception & Weighing', it: 'Ricevimento e Pesatura' }, icon: ArrowDownToLine, key: 'reception' },
  { label: { ar: 'الإنتاج والتصنيع', en: 'Production', it: 'Produzione' }, icon: Factory, key: 'production' },
  { label: { ar: 'المخازن والتبريد', en: 'Warehouse', it: 'Magazzino' }, icon: Warehouse, key: 'warehouse' },
  { label: { ar: 'الجودة وسلامة الغذاء', en: 'Quality Control', it: 'Controllo Qualità' }, icon: ClipboardCheck, key: 'quality' },
  { label: { ar: 'التصدير والشحن', en: 'Shipping', it: 'Spedizioni' }, icon: Ship, key: 'shipping' },
  { label: { ar: 'المبيعات والعملاء', en: 'Sales', it: 'Vendite' }, icon: Users, key: 'sales' },
  { label: { ar: 'التتبع والاستدعاء', en: 'Traceability', it: 'Tracciabilità' }, icon: BarChart3, key: 'traceability' },
]

export default function Page() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [language, setLanguage] = useState<Language>('ar')
  const [notice, setNotice] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')

  // Data states
  const [receptions, setReceptions] = useState(storage.getReceptions())
  const [productions, setProductions] = useState(storage.getProductions())
  const [inventory, setInventory] = useState(storage.getInventory())
  const [qualityChecks, setQualityChecks] = useState(storage.getQualityChecks())
  const [shipments, setShipments] = useState(storage.getShipments())
  const [customers, setCustomers] = useState(storage.getCustomers())
  const [salesOrders, setSalesOrders] = useState(storage.getSalesOrders())
  const [dashboardStats, setDashboardStats] = useState(storage.getDashboardStats())
  const [searchQuery, setSearchQuery] = useState('')

  // Form states
  const [receptionForm, setReceptionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    supplier: '',
    product: '',
    weight: '',
    quality: 'good' as const,
    status: 'accepted' as const,
    temperature: '',
    notes: '',
  })

  const [productionForm, setProductionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    rawMaterial: '',
    rawWeight: '',
    product: '',
    finalWeight: '',
    waste: '',
    status: 'in-progress' as const,
    productionLine: '',
    notes: '',
  })

  const [qualityForm, setQualityForm] = useState({
    date: new Date().toISOString().split('T')[0],
    product: '',
    lotNumber: '',
    inspector: '',
    appearance: 'good' as const,
    smell: 'fresh' as const,
    color: 'good' as const,
    texture: 'firm' as const,
    result: 'approved' as const,
    certificate: '',
    notes: '',
  })

  const [shipmentForm, setShipmentForm] = useState({
    date: new Date().toISOString().split('T')[0],
    destination: '',
    customer: '',
    country: '',
    port: '',
    containerNumber: '',
    productName: '',
    productQuantity: '',
    productLot: '',
    totalBoxes: '',
    status: 'preparing' as const,
    estimatedArrival: '',
    notes: '',
  })

  const [customerForm, setCustomerForm] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
  })

  const [salesOrderForm, setSalesOrderForm] = useState({
    date: new Date().toISOString().split('T')[0],
    customer: '',
    productName: '',
    quantity: '',
    price: '',
    status: 'new' as const,
    deliveryDate: '',
    paymentStatus: 'pending' as const,
    notes: '',
  })

  const [accounts, setAccounts] = useState([{ username: 'admin', name: 'مدير النظام', role: 'مدير النظام' }])
  const [newAccount, setNewAccount] = useState({ username: '', name: '', role: 'موظف' })
  const [accountMessage, setAccountMessage] = useState('')
  
  // Additional UI states
  const [salesTab, setSalesTab] = useState<'customers' | 'orders'>('customers')
  const [warehouseTab, setWarehouseTab] = useState<'inventory' | 'movements' | 'alerts'>('inventory')
  const [traceabilityLot, setTraceabilityLot] = useState('')

  const t = translations[language]

  useEffect(() => {
    const user = sessionStorage.getItem('king-fish-user')
    if (!user) router.replace('/login')
    storage.initializeSampleData()
    refreshData()
  }, [router])

  function refreshData() {
    setReceptions(storage.getReceptions())
    setProductions(storage.getProductions())
    setInventory(storage.getInventory())
    setQualityChecks(storage.getQualityChecks())
    setShipments(storage.getShipments())
    setCustomers(storage.getCustomers())
    setSalesOrders(storage.getSalesOrders())
    setDashboardStats(storage.getDashboardStats())
  }

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2800)
  }

  function changeLanguage() {
    const languages: Language[] = ['ar', 'en', 'it']
    const nextIndex = (languages.indexOf(language) + 1) % languages.length
    setLanguage(languages[nextIndex])
    const messages = {
      ar: 'تم تغيير اللغة إلى العربية',
      en: 'Language changed to English',
      it: 'Lingua cambiata in italiano',
    }
    showNotice(messages[languages[nextIndex]])
  }

  function openModal(type: string) {
    setModalType(type)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setModalType('')
    resetForms()
  }

  function resetForms() {
    setReceptionForm({
      date: new Date().toISOString().split('T')[0],
      supplier: '',
      product: '',
      weight: '',
      quality: 'good',
      status: 'accepted',
      temperature: '',
      notes: '',
    })
    setProductionForm({
      date: new Date().toISOString().split('T')[0],
      rawMaterial: '',
      rawWeight: '',
      product: '',
      finalWeight: '',
      waste: '',
      status: 'in-progress',
      productionLine: '',
      notes: '',
    })
    setQualityForm({
      date: new Date().toISOString().split('T')[0],
      product: '',
      lotNumber: '',
      inspector: '',
      appearance: 'good',
      smell: 'fresh',
      color: 'good',
      texture: 'firm',
      result: 'approved',
      certificate: '',
      notes: '',
    })
    setShipmentForm({
      date: new Date().toISOString().split('T')[0],
      destination: '',
      customer: '',
      country: '',
      port: '',
      containerNumber: '',
      productName: '',
      productQuantity: '',
      productLot: '',
      totalBoxes: '',
      status: 'preparing',
      estimatedArrival: '',
      notes: '',
    })
    setCustomerForm({
      name: '',
      company: '',
      country: '',
      email: '',
      phone: '',
      address: '',
      taxId: '',
    })
    setSalesOrderForm({
      date: new Date().toISOString().split('T')[0],
      customer: '',
      productName: '',
      quantity: '',
      price: '',
      status: 'new',
      deliveryDate: '',
      paymentStatus: 'pending',
      notes: '',
    })
  }

  // Reception handlers
  function handleReceptionSubmit(e: React.FormEvent) {
    e.preventDefault()
    storage.addReception({
      date: receptionForm.date,
      supplier: receptionForm.supplier,
      product: receptionForm.product,
      weight: parseFloat(receptionForm.weight),
      quality: receptionForm.quality,
      status: receptionForm.status,
      temperature: parseFloat(receptionForm.temperature),
      notes: receptionForm.notes,
    })
    refreshData()
    closeModal()
    showNotice(t.addedSuccessfully)
  }

  function deleteReception(id: string) {
    if (confirm(t.confirmDelete)) {
      storage.deleteReception(id)
      refreshData()
      showNotice(t.deletedSuccessfully)
    }
  }

  // Production handlers
  function handleProductionSubmit(e: React.FormEvent) {
    e.preventDefault()
    storage.addProduction({
      date: productionForm.date,
      rawMaterial: productionForm.rawMaterial,
      rawWeight: parseFloat(productionForm.rawWeight),
      product: productionForm.product,
      finalWeight: parseFloat(productionForm.finalWeight),
      waste: parseFloat(productionForm.waste),
      status: productionForm.status,
      productionLine: productionForm.productionLine,
      notes: productionForm.notes,
    })
    refreshData()
    closeModal()
    showNotice(t.addedSuccessfully)
  }

  function deleteProduction(id: string) {
    if (confirm(t.confirmDelete)) {
      storage.deleteProduction(id)
      refreshData()
      showNotice(t.deletedSuccessfully)
    }
  }

  // Quality handlers
  function handleQualitySubmit(e: React.FormEvent) {
    e.preventDefault()
    storage.addQualityCheck({
      date: qualityForm.date,
      product: qualityForm.product,
      lotNumber: qualityForm.lotNumber,
      inspector: qualityForm.inspector,
      appearance: qualityForm.appearance,
      smell: qualityForm.smell,
      color: qualityForm.color,
      texture: qualityForm.texture,
      result: qualityForm.result,
      certificate: qualityForm.certificate,
      notes: qualityForm.notes,
    })
    refreshData()
    closeModal()
    showNotice(t.addedSuccessfully)
  }

  function deleteQualityCheck(id: string) {
    if (confirm(t.confirmDelete)) {
      storage.deleteQualityCheck(id)
      refreshData()
      showNotice(t.deletedSuccessfully)
    }
  }

  // Shipment handlers
  function handleShipmentSubmit(e: React.FormEvent) {
    e.preventDefault()
    storage.addShipment({
      date: shipmentForm.date,
      destination: shipmentForm.destination,
      customer: shipmentForm.customer,
      country: shipmentForm.country,
      port: shipmentForm.port,
      containerNumber: shipmentForm.containerNumber,
      products: [{
        product: shipmentForm.productName,
        quantity: parseFloat(shipmentForm.productQuantity),
        lotNumber: shipmentForm.productLot,
      }],
      totalBoxes: parseInt(shipmentForm.totalBoxes),
      status: shipmentForm.status,
      estimatedArrival: shipmentForm.estimatedArrival,
      documents: [],
      notes: shipmentForm.notes,
    })
    refreshData()
    closeModal()
    showNotice(t.addedSuccessfully)
  }

  function deleteShipment(id: string) {
    if (confirm(t.confirmDelete)) {
      storage.deleteShipment(id)
      refreshData()
      showNotice(t.deletedSuccessfully)
    }
  }

  // Customer handlers
  function handleCustomerSubmit(e: React.FormEvent) {
    e.preventDefault()
    storage.addCustomer(customerForm)
    refreshData()
    closeModal()
    showNotice(t.addedSuccessfully)
  }

  function deleteCustomer(id: string) {
    if (confirm(t.confirmDelete)) {
      storage.deleteCustomer(id)
      refreshData()
      showNotice(t.deletedSuccessfully)
    }
  }

  // Sales order handlers
  function handleSalesOrderSubmit(e: React.FormEvent) {
    e.preventDefault()
    const total = parseFloat(salesOrderForm.quantity) * parseFloat(salesOrderForm.price)
    storage.addSalesOrder({
      date: salesOrderForm.date,
      customer: salesOrderForm.customer,
      products: [{
        product: salesOrderForm.productName,
        quantity: parseFloat(salesOrderForm.quantity),
        price: parseFloat(salesOrderForm.price),
      }],
      total,
      status: salesOrderForm.status,
      deliveryDate: salesOrderForm.deliveryDate,
      paymentStatus: salesOrderForm.paymentStatus,
      notes: salesOrderForm.notes,
    })
    refreshData()
    closeModal()
    showNotice(t.addedSuccessfully)
  }

  function deleteOrder(id: string) {
    if (confirm(t.confirmDelete)) {
      storage.deleteOrder(id)
      refreshData()
      showNotice(t.deletedSuccessfully)
    }
  }

  // Account handlers
  function createAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newAccount.username.trim() || !newAccount.name.trim()) return
    if (accounts.some((account) => account.username === newAccount.username.trim())) {
      setAccountMessage('اسم المستخدم مستخدم بالفعل')
      return
    }
    setAccounts((current) => [...current, { ...newAccount, username: newAccount.username.trim(), name: newAccount.name.trim() }])
    setNewAccount({ username: '', name: '', role: 'موظف' })
    setAccountMessage('تم إنشاء حساب الموظف بنجاح')
  }

  function logout() {
    sessionStorage.removeItem('king-fish-user')
    router.push('/login')
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="erp-shell" dir={dir}>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><img src="/king-fish-logo.png" alt="" /></div>
          <div><div className="brand-name">KING FISH</div><div className="brand-subtitle">SEAFOOD ERP</div></div>
          <button className="icon-button sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="إغلاق القائمة"><X /></button>
        </div>
        <div className="branch-switcher">
          <div className="branch-icon"><Globe2 /></div>
          <div className="branch-copy"><span>{t.branch}</span><strong>{t.location}</strong></div>
          <ChevronDown />
        </div>
        <nav className="nav-section" aria-label="القائمة الرئيسية">
          <div className="nav-label">{t.workspace}</div>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => { setActiveNav(item.key); setSidebarOpen(false) }}
              >
                <Icon /><span>{item.label[language]}</span>
              </button>
            )
          })}
          <div className="nav-label secondary-label">{t.management}</div>
          <button className={`nav-item ${activeNav === 'purchasing' ? 'active' : ''}`} onClick={() => { setActiveNav('purchasing'); setSidebarOpen(false) }}>
            <PackageCheck /><span>{t.purchasing}</span>
          </button>
          <button className={`nav-item ${activeNav === 'transport' ? 'active' : ''}`} onClick={() => { setActiveNav('transport'); setSidebarOpen(false) }}>
            <Truck /><span>{t.transport}</span>
          </button>
          <button className={`nav-item ${activeNav === 'accounts' ? 'active' : ''}`} onClick={() => { setActiveNav('accounts'); setSidebarOpen(false) }}>
            <Settings2 /><span>{t.accounts}</span>
          </button>
        </nav>
        <div className="sidebar-footer"><div className="support-icon"><CircleHelp /></div><div><strong>تحتاج إلى مساعدة؟</strong><span>مركز المساعدة والدعم</span></div><ArrowUpRight /></div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-start">
            <button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="فتح القائمة"><Menu /></button>
            <div className="breadcrumb"><span>{t.workspace}</span><b>/</b><strong>{navItems.find(i => i.key === activeNav)?.label[language] || t.dashboard}</strong></div>
          </div>
          <div className="topbar-actions">
            <button className="language-button" onClick={changeLanguage} aria-label="تغيير اللغة">
              {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : 'Italiano'} <ChevronDown />
            </button>
            <button className="icon-button notification-button" onClick={() => showNotice(language === 'ar' ? 'لا توجد تنبيهات جديدة' : 'No new notifications')} aria-label="الإشعارات">
              <Bell /><i>3</i>
            </button>
            <button className="profile profile-button" onClick={() => { setActiveNav('accounts'); setSidebarOpen(false) }} aria-label="فتح ملف المدير">
              <div className="avatar">م</div>
              <div className="profile-copy"><strong>{t.admin}</strong><span>{t.fullAccess}</span></div>
              <ChevronDown className="profile-chevron" />
            </button>
            <button className="logout-button" onClick={logout}><LogOut /> {language === 'ar' ? 'خروج' : language === 'en' ? 'Logout' : 'Esci'}</button>
          </div>
        </header>

        <div className="page-content">
          {notice && <div className="system-notice" role="status">{notice}</div>}

          {/* Dashboard */}
          {activeNav === 'dashboard' && (
            <>
              <section className="hero-row">
                <div>
                  <div className="eyebrow"><span className="live-dot" /> {language === 'ar' ? 'الثلاثاء، 20 أكتوبر 2026' : 'Tuesday, October 20, 2026'}</div>
                  <h1>{language === 'ar' ? 'صباح الخير، محمد' : language === 'en' ? 'Good morning, Mohamed' : 'Buongiorno, Mohamed'}</h1>
                  <p>{language === 'ar' ? 'إليك ملخص عمليات KING FISH لهذا اليوم.' : language === 'en' ? "Here's your KING FISH operations summary for today." : 'Ecco il riepilogo delle operazioni KING FISH di oggi.'}</p>
                </div>
              </section>

              <div className="metric-grid">
                <div className="metric-card">
                  <div className="metric-icon sea"><ArrowDownToLine /></div>
                  <div className="metric-label">{t.todayReceptions}</div>
                  <div className="metric-value">{dashboardStats.todayReceptions}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon blue"><Factory /></div>
                  <div className="metric-label">{t.activeProductions}</div>
                  <div className="metric-value">{dashboardStats.activeProductions}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon green"><Boxes /></div>
                  <div className="metric-label">{t.currentInventory}</div>
                  <div className="metric-value">{dashboardStats.currentInventory.toLocaleString()} <small>kg</small></div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon amber"><Ship /></div>
                  <div className="metric-label">{t.activeShipments}</div>
                  <div className="metric-value">{dashboardStats.activeShipments}</div>
                </div>
              </div>

              {/* Alerts Section */}
              {(dashboardStats.lowStockItems > 0 || dashboardStats.temperatureAlerts > 0) && (
                <section className="panel">
                  <div className="section-header">
                    <div>
                      <h2>{t.alerts}</h2>
                      <p>{language === 'ar' ? 'التنبيهات التي تحتاج إلى انتباه' : 'Alerts requiring attention'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {dashboardStats.lowStockItems > 0 && (
                      <div style={{ padding: '12px', background: '#fff4e6', border: '1px solid #ffa726', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle size={20} color="#f57c00" />
                        <div>
                          <strong>{language === 'ar' ? 'مخزون منخفض' : 'Low Stock'}</strong>
                          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                            {dashboardStats.lowStockItems} {language === 'ar' ? 'منتج يحتاج إعادة تموين' : 'products need restocking'}
                          </p>
                        </div>
                      </div>
                    )}
                    {dashboardStats.temperatureAlerts > 0 && (
                      <div style={{ padding: '12px', background: '#ffebee', border: '1px solid #ef5350', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle size={20} color="#c62828" />
                        <div>
                          <strong>{language === 'ar' ? 'تحذير درجة حرارة' : 'Temperature Alert'}</strong>
                          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                            {dashboardStats.temperatureAlerts} {language === 'ar' ? 'غرفة بدرجة حرارة غير طبيعية' : 'room(s) with abnormal temperature'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Recent Shipments */}
              <section className="panel">
                <div className="section-header">
                  <div>
                    <h2>{t.recentShipments}</h2>
                    <p>{language === 'ar' ? 'آخر عمليات الشحن والتصدير' : 'Recent shipping operations'}</p>
                  </div>
                </div>
                {shipments.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon"><Ship /></div>
                    <h3>{t.noDataYet}</h3>
                  </div>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>{language === 'ar' ? 'رقم الشحنة' : 'Shipment ID'}</th>
                        <th>{t.destination}</th>
                        <th>{t.customer}</th>
                        <th>{t.status}</th>
                        <th>{t.date}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.slice(0, 5).map((shipment) => (
                        <tr key={shipment.id}>
                          <td><strong>{shipment.id}</strong></td>
                          <td>{shipment.destination}</td>
                          <td>{shipment.customer}</td>
                          <td><Badge variant={shipment.status === 'delivered' ? 'success' : shipment.status === 'in-transit' ? 'info' : 'warning'}>{shipment.status}</Badge></td>
                          <td>{shipment.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>

              {/* Recent Production Lots */}
              <section className="panel">
                <div className="section-header">
                  <div>
                    <h2>{t.recentLots}</h2>
                    <p>{language === 'ar' ? 'آخر دفعات الإنتاج' : 'Recent production batches'}</p>
                  </div>
                </div>
                {productions.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon"><Factory /></div>
                    <h3>{t.noDataYet}</h3>
                  </div>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>{t.lotNumber}</th>
                        <th>{t.product}</th>
                        <th>{t.finalWeight} (kg)</th>
                        <th>{t.status}</th>
                        <th>{t.date}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productions.slice(0, 5).map((production) => (
                        <tr key={production.id}>
                          <td><strong>{production.lotNumber}</strong></td>
                          <td>{production.product}</td>
                          <td>{production.finalWeight.toLocaleString()}</td>
                          <td><Badge variant={production.status === 'completed' ? 'success' : 'info'}>{production.status}</Badge></td>
                          <td>{production.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>
            </>
          )}

          {/* Reception Section */}
          {activeNav === 'reception' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.reception}</h2>
                  <p>{language === 'ar' ? 'إدارة عمليات استلام المأكولات البحرية' : 'Manage seafood reception operations'}</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('reception')}>
                  <Plus /> {t.newReception}
                </button>
              </div>

              <div className="search-box" style={{ marginBottom: '20px' }}>
                <Search />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {receptions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><ArrowDownToLine /></div>
                  <h3>{t.noDataYet}</h3>
                  <p>{language === 'ar' ? 'ابدأ بإضافة أول عملية استلام' : 'Start by adding your first reception'}</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{language === 'ar' ? 'الرقم' : 'ID'}</th>
                      <th>{t.date}</th>
                      <th>{t.supplier}</th>
                      <th>{t.product}</th>
                      <th>{t.weight} (kg)</th>
                      <th>{t.status}</th>
                      <th>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receptions
                      .filter(r => !searchQuery || r.product.toLowerCase().includes(searchQuery.toLowerCase()) || r.supplier.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((reception) => (
                      <tr key={reception.id}>
                        <td><strong>{reception.id}</strong></td>
                        <td>{reception.date}</td>
                        <td>{reception.supplier}</td>
                        <td>{reception.product}</td>
                        <td>{reception.weight.toLocaleString()}</td>
                        <td>
                          <Badge variant={reception.status === 'accepted' ? 'success' : reception.status === 'rejected' ? 'danger' : 'warning'}>
                            {reception.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="data-table-actions">
                            <button className="btn btn-sm btn-danger" onClick={() => deleteReception(reception.id)}>
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}

          {/* Production Section */}
          {activeNav === 'production' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.production}</h2>
                  <p>{language === 'ar' ? 'متابعة عمليات الإنتاج والتصنيع' : 'Track production and manufacturing'}</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('production')}>
                  <Plus /> {t.newProduction}
                </button>
              </div>

              {productions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><Factory /></div>
                  <h3>{t.noDataYet}</h3>
                  <p>{language === 'ar' ? 'ابدأ بإضافة أول عملية إنتاج' : 'Start by adding your first production'}</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t.lotNumber}</th>
                      <th>{t.date}</th>
                      <th>{t.product}</th>
                      <th>{t.finalWeight} (kg)</th>
                      <th>{t.status}</th>
                      <th>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productions.map((production) => (
                      <tr key={production.id}>
                        <td><strong>{production.lotNumber}</strong></td>
                        <td>{production.date}</td>
                        <td>{production.product}</td>
                        <td>{production.finalWeight.toLocaleString()}</td>
                        <td>
                          <Badge variant={production.status === 'completed' ? 'success' : production.status === 'in-progress' ? 'info' : 'warning'}>
                            {production.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="data-table-actions">
                            <button className="btn btn-sm btn-danger" onClick={() => deleteProduction(production.id)}>
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}

          {/* Warehouse Section */}
          {activeNav === 'warehouse' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.warehouse}</h2>
                  <p>{language === 'ar' ? 'إدارة المخزون والتبريد' : 'Manage inventory and cooling'}</p>
                </div>
              </div>

              <div className="tabs" style={{ marginBottom: '20px' }}>
                <button className={`tab ${warehouseTab === 'inventory' ? 'active' : ''}`} onClick={() => setWarehouseTab('inventory')}>
                  {t.currentStock}
                </button>
                <button className={`tab ${warehouseTab === 'movements' ? 'active' : ''}`} onClick={() => setWarehouseTab('movements')}>
                  {t.movements}
                </button>
                <button className={`tab ${warehouseTab === 'alerts' ? 'active' : ''}`} onClick={() => setWarehouseTab('alerts')}>
                  {t.alerts}
                </button>
              </div>

              {/* Current Inventory Tab */}
              {warehouseTab === 'inventory' && (
                <>
                  {inventory.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-state-icon"><Warehouse /></div>
                      <h3>{t.noDataYet}</h3>
                      <p>{language === 'ar' ? 'المخزون فارغ حالياً' : 'Inventory is currently empty'}</p>
                    </div>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{t.product}</th>
                          <th>{t.quantity} (kg)</th>
                          <th>{t.location}</th>
                          <th>{t.room}</th>
                          <th>{t.temperature}</th>
                          <th>{t.lotNumber}</th>
                          <th>{t.expiryDate}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map((item) => (
                          <tr key={item.id}>
                            <td><strong>{item.product}</strong></td>
                            <td>
                              {item.quantity.toLocaleString()}
                              {item.quantity < 100 && <Badge variant="warning" style={{ marginLeft: '8px' }}>{t.lowStock}</Badge>}
                            </td>
                            <td>{item.location}</td>
                            <td>{item.room}</td>
                            <td>
                              <Badge variant={item.temperature < -15 ? 'success' : 'warning'}>
                                {item.temperature}°C
                              </Badge>
                            </td>
                            <td>{item.lotNumber}</td>
                            <td>{item.expiryDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}

              {/* Inventory Movements Tab */}
              {warehouseTab === 'movements' && (
                <>
                  {storage.getInventoryMovements().length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-state-icon"><ArrowUpRight /></div>
                      <h3>{t.noDataYet}</h3>
                      <p>{language === 'ar' ? 'لا توجد حركات مخزون مسجلة' : 'No inventory movements recorded'}</p>
                    </div>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{t.date}</th>
                          <th>{t.type}</th>
                          <th>{t.product}</th>
                          <th>{t.quantity} (kg)</th>
                          <th>{t.from}</th>
                          <th>{t.to}</th>
                          <th>{t.reference}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storage.getInventoryMovements().slice(0, 20).map((movement) => (
                          <tr key={movement.id}>
                            <td>{movement.date}</td>
                            <td>
                              <Badge variant={movement.type === 'in' ? 'success' : 'info'}>
                                {movement.type === 'in' ? t.movementIn : t.movementOut}
                              </Badge>
                            </td>
                            <td>{movement.product}</td>
                            <td>{movement.quantity.toLocaleString()}</td>
                            <td>{movement.from}</td>
                            <td>{movement.to}</td>
                            <td>{movement.reference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}

              {/* Alerts Tab */}
              {warehouseTab === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Low Stock Alerts */}
                  {inventory.filter(item => item.quantity < 100).length > 0 && (
                    <div style={{ padding: '16px', background: '#fff4e6', border: '1px solid #ffa726', borderRadius: '8px' }}>
                      <h3 style={{ margin: '0 0 12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} color="#f57c00" />
                        {t.lowStock}
                      </h3>
                      <table className="data-table" style={{ background: 'white' }}>
                        <thead>
                          <tr>
                            <th>{t.product}</th>
                            <th>{t.quantity}</th>
                            <th>{t.location}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventory.filter(item => item.quantity < 100).map((item) => (
                            <tr key={item.id}>
                              <td><strong>{item.product}</strong></td>
                              <td>{item.quantity} kg</td>
                              <td>{item.location} - {item.room}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Temperature Alerts */}
                  {inventory.filter(item => item.temperature > -15).length > 0 && (
                    <div style={{ padding: '16px', background: '#ffebee', border: '1px solid #ef5350', borderRadius: '8px' }}>
                      <h3 style={{ margin: '0 0 12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} color="#c62828" />
                        {t.temperatureAlert}
                      </h3>
                      <table className="data-table" style={{ background: 'white' }}>
                        <thead>
                          <tr>
                            <th>{t.product}</th>
                            <th>{t.temperature}</th>
                            <th>{t.location}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventory.filter(item => item.temperature > -15).map((item) => (
                            <tr key={item.id}>
                              <td><strong>{item.product}</strong></td>
                              <td><Badge variant="danger">{item.temperature}°C</Badge></td>
                              <td>{item.location} - {item.room}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {inventory.filter(item => item.quantity >= 100 && item.temperature <= -15).length === inventory.length && (
                    <div className="empty-state">
                      <div className="empty-state-icon"><ClipboardCheck /></div>
                      <h3>{language === 'ar' ? 'كل شيء على ما يرام' : 'All clear'}</h3>
                      <p>{language === 'ar' ? 'لا توجد تنبيهات حالياً' : 'No alerts at this time'}</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Quality Section */}
          {activeNav === 'quality' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.quality}</h2>
                  <p>{language === 'ar' ? 'إدارة فحوصات الجودة' : 'Manage quality inspections'}</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('quality')}>
                  <Plus /> {t.newQualityCheck}
                </button>
              </div>

              {qualityChecks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><ClipboardCheck /></div>
                  <h3>{t.noDataYet}</h3>
                  <p>{language === 'ar' ? 'ابدأ بإضافة أول فحص جودة' : 'Start by adding your first quality check'}</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t.date}</th>
                      <th>{t.product}</th>
                      <th>{t.lotNumber}</th>
                      <th>{t.inspector}</th>
                      <th>{t.result}</th>
                      <th>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualityChecks.map((check) => (
                      <tr key={check.id}>
                        <td>{check.date}</td>
                        <td>{check.product}</td>
                        <td><strong>{check.lotNumber}</strong></td>
                        <td>{check.inspector}</td>
                        <td>
                          <Badge variant={check.result === 'approved' ? 'success' : check.result === 'rejected' ? 'danger' : 'warning'}>
                            {check.result}
                          </Badge>
                        </td>
                        <td>
                          <div className="data-table-actions">
                            <button className="btn btn-sm btn-danger" onClick={() => deleteQualityCheck(check.id)}>
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}

          {/* Shipping Section */}
          {activeNav === 'shipping' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.shipping}</h2>
                  <p>{language === 'ar' ? 'إدارة شحنات التصدير' : 'Manage export shipments'}</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('shipment')}>
                  <Plus /> {t.newShipment}
                </button>
              </div>

              {shipments.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><Ship /></div>
                  <h3>{t.noDataYet}</h3>
                  <p>{language === 'ar' ? 'ابدأ بإضافة أول شحنة' : 'Start by adding your first shipment'}</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{language === 'ar' ? 'رقم الشحنة' : 'Shipment ID'}</th>
                      <th>{t.destination}</th>
                      <th>{t.customer}</th>
                      <th>{t.totalBoxes}</th>
                      <th>{t.status}</th>
                      <th>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id}>
                        <td><strong>{shipment.id}</strong></td>
                        <td>{shipment.destination}</td>
                        <td>{shipment.customer}</td>
                        <td>{shipment.totalBoxes}</td>
                        <td>
                          <Badge variant={shipment.status === 'delivered' ? 'success' : shipment.status === 'in-transit' ? 'info' : 'warning'}>
                            {shipment.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="data-table-actions">
                            <button className="btn btn-sm btn-danger" onClick={() => deleteShipment(shipment.id)}>
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}

          {/* Sales Section */}
          {activeNav === 'sales' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.sales}</h2>
                  <p>{language === 'ar' ? 'إدارة العملاء والطلبات' : 'Manage customers and orders'}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-primary" onClick={() => openModal('customer')}>
                    <Plus /> {t.newCustomer}
                  </button>
                  <button className="btn btn-primary" onClick={() => openModal('salesOrder')}>
                    <Plus /> {t.newOrder}
                  </button>
                </div>
              </div>

              <div className="tabs" style={{ marginBottom: '20px' }}>
                <button className={`tab ${salesTab === 'customers' ? 'active' : ''}`} onClick={() => setSalesTab('customers')}>
                  {t.customerList}
                </button>
                <button className={`tab ${salesTab === 'orders' ? 'active' : ''}`} onClick={() => setSalesTab('orders')}>
                  {t.orderList}
                </button>
              </div>

              {/* Customers Tab */}
              {salesTab === 'customers' && (
                <>
                  {customers.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-state-icon"><Users /></div>
                      <h3>{t.noDataYet}</h3>
                      <p>{language === 'ar' ? 'ابدأ بإضافة أول عميل' : 'Start by adding your first customer'}</p>
                    </div>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{t.name}</th>
                          <th>{t.company}</th>
                          <th>{t.country}</th>
                          <th>{t.email}</th>
                          <th>{t.phone}</th>
                          <th>{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer) => (
                          <tr key={customer.id}>
                            <td><strong>{customer.name}</strong></td>
                            <td>{customer.company}</td>
                            <td>{customer.country}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>
                              <div className="data-table-actions">
                                <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(customer.id)}>
                                  <Trash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}

              {/* Orders Tab */}
              {salesTab === 'orders' && (
                <>
                  {salesOrders.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-state-icon"><FileText /></div>
                      <h3>{t.noDataYet}</h3>
                      <p>{language === 'ar' ? 'ابدأ بإضافة أول طلب' : 'Start by adding your first order'}</p>
                    </div>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{language === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
                          <th>{t.date}</th>
                          <th>{t.customer}</th>
                          <th>{t.total}</th>
                          <th>{t.status}</th>
                          <th>{t.paymentStatus}</th>
                          <th>{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesOrders.map((order) => (
                          <tr key={order.id}>
                            <td><strong>{order.id}</strong></td>
                            <td>{order.date}</td>
                            <td>{order.customer}</td>
                            <td>${order.total.toLocaleString()}</td>
                            <td>
                              <Badge variant={order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'danger' : 'info'}>
                                {order.status}
                              </Badge>
                            </td>
                            <td>
                              <Badge variant={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'partial' ? 'warning' : 'default'}>
                                {order.paymentStatus}
                              </Badge>
                            </td>
                            <td>
                              <div className="data-table-actions">
                                <button className="btn btn-sm btn-danger" onClick={() => deleteOrder(order.id)}>
                                  <Trash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </section>
          )}

          {/* Traceability Section */}
          {activeNav === 'traceability' && (
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>{t.traceability}</h2>
                  <p>{language === 'ar' ? 'تتبع المنتجات من الاستلام حتى التصدير' : 'Track products from reception to export'}</p>
                </div>
              </div>

              <div className="search-box" style={{ marginBottom: '20px', maxWidth: '100%' }}>
                <Search />
                <input
                  type="text"
                  placeholder={t.searchByLot}
                  value={traceabilityLot}
                  onChange={(e) => setTraceabilityLot(e.target.value)}
                />
              </div>

              {traceabilityLot && productions.filter(p => p.lotNumber.toLowerCase().includes(traceabilityLot.toLowerCase())).length > 0 ? (
                <div>
                  {productions.filter(p => p.lotNumber.toLowerCase().includes(traceabilityLot.toLowerCase())).map(prod => {
                    const relatedReceptions = receptions.filter(r => r.product === prod.rawMaterial)
                    const relatedQuality = qualityChecks.filter(q => q.lotNumber === prod.lotNumber)
                    const relatedShipments = shipments.filter(s => s.products.some(p => p.lotNumber === prod.lotNumber))
                    const relatedInventory = inventory.filter(i => i.lotNumber === prod.lotNumber)
                    
                    return (
                      <div key={prod.id} style={{ background: '#f8fbfc', border: '1px solid #d8e3ea', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                        <div style={{ marginBottom: '24px' }}>
                          <h3 style={{ margin: '0 0 8px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <BarChart3 size={20} />
                            {t.traceabilityReport}: {prod.lotNumber}
                          </h3>
                          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{prod.product}</p>
                        </div>

                        {/* Timeline */}
                        <div style={{ position: 'relative', paddingLeft: '32px' }}>
                          {/* Production Info */}
                          <div style={{ position: 'relative', marginBottom: '24px' }}>
                            <div style={{ position: 'absolute', left: '-32px', top: '4px', width: '20px', height: '20px', borderRadius: '50%', background: '#2196F3', border: '3px solid white', boxShadow: '0 0 0 2px #2196F3' }} />
                            <div style={{ position: 'absolute', left: '-22px', top: '24px', width: '2px', height: 'calc(100% + 24px)', background: '#ddd' }} />
                            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Factory size={16} color="#2196F3" />
                                <strong>{t.production}</strong>
                                <Badge variant="info">{prod.status}</Badge>
                              </div>
                              <div style={{ fontSize: '13px', color: '#666', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div><strong>{t.date}:</strong> {prod.date}</div>
                                <div><strong>{t.rawMaterial}:</strong> {prod.rawMaterial}</div>
                                <div><strong>{t.rawWeight}:</strong> {prod.rawWeight} kg</div>
                                <div><strong>{t.finalWeight}:</strong> {prod.finalWeight} kg</div>
                                <div><strong>{t.waste}:</strong> {prod.waste} kg</div>
                                <div><strong>{t.productionLine}:</strong> {prod.productionLine}</div>
                              </div>
                            </div>
                          </div>

                          {/* Quality Checks */}
                          {relatedQuality.length > 0 && (
                            <div style={{ position: 'relative', marginBottom: '24px' }}>
                              <div style={{ position: 'absolute', left: '-32px', top: '4px', width: '20px', height: '20px', borderRadius: '50%', background: '#4CAF50', border: '3px solid white', boxShadow: '0 0 0 2px #4CAF50' }} />
                              {relatedInventory.length > 0 || relatedShipments.length > 0 ? (
                                <div style={{ position: 'absolute', left: '-22px', top: '24px', width: '2px', height: 'calc(100% + 24px)', background: '#ddd' }} />
                              ) : null}
                              <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                  <ClipboardCheck size={16} color="#4CAF50" />
                                  <strong>{t.quality}</strong>
                                  <Badge variant={relatedQuality[0].result === 'approved' ? 'success' : 'danger'}>{relatedQuality[0].result}</Badge>
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                  <div><strong>{t.inspector}:</strong> {relatedQuality[0].inspector}</div>
                                  <div><strong>{t.date}:</strong> {relatedQuality[0].date}</div>
                                  <div><strong>{t.appearance}:</strong> {relatedQuality[0].appearance}</div>
                                  <div><strong>{t.smell}:</strong> {relatedQuality[0].smell}</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Inventory */}
                          {relatedInventory.length > 0 && (
                            <div style={{ position: 'relative', marginBottom: '24px' }}>
                              <div style={{ position: 'absolute', left: '-32px', top: '4px', width: '20px', height: '20px', borderRadius: '50%', background: '#FF9800', border: '3px solid white', boxShadow: '0 0 0 2px #FF9800' }} />
                              {relatedShipments.length > 0 ? (
                                <div style={{ position: 'absolute', left: '-22px', top: '24px', width: '2px', height: 'calc(100% + 24px)', background: '#ddd' }} />
                              ) : null}
                              <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                  <Warehouse size={16} color="#FF9800" />
                                  <strong>{t.warehouse}</strong>
                                  <Badge variant="warning">{t.currentStock}</Badge>
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                  <div><strong>{t.quantity}:</strong> {relatedInventory[0].quantity} kg</div>
                                  <div><strong>{t.location}:</strong> {relatedInventory[0].location}</div>
                                  <div><strong>{t.room}:</strong> {relatedInventory[0].room}</div>
                                  <div><strong>{t.temperature}:</strong> {relatedInventory[0].temperature}°C</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Shipments */}
                          {relatedShipments.length > 0 && (
                            <div style={{ position: 'relative' }}>
                              <div style={{ position: 'absolute', left: '-32px', top: '4px', width: '20px', height: '20px', borderRadius: '50%', background: '#9C27B0', border: '3px solid white', boxShadow: '0 0 0 2px #9C27B0' }} />
                              <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                  <Ship size={16} color="#9C27B0" />
                                  <strong>{t.shipping}</strong>
                                  <Badge variant={relatedShipments[0].status === 'delivered' ? 'success' : 'info'}>{relatedShipments[0].status}</Badge>
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                  <div><strong>{t.destination}:</strong> {relatedShipments[0].destination}</div>
                                  <div><strong>{t.customer}:</strong> {relatedShipments[0].customer}</div>
                                  <div><strong>{t.date}:</strong> {relatedShipments[0].date}</div>
                                  <div><strong>{t.containerNumber}:</strong> {relatedShipments[0].containerNumber}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon"><BarChart3 /></div>
                  <h3>{language === 'ar' ? 'ابحث برقم اللوط' : 'Search by lot number'}</h3>
                  <p>{language === 'ar' ? 'أدخل رقم اللوط في خانة البحث لعرض سجل التتبع الكامل' : 'Enter a lot number to view full traceability'}</p>
                  {productions.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                        {language === 'ar' ? 'أرقام لوط متوفرة:' : 'Available lot numbers:'}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                        {productions.slice(0, 5).map(p => (
                          <button 
                            key={p.id} 
                            className="btn btn-sm" 
                            onClick={() => setTraceabilityLot(p.lotNumber)}
                            style={{ fontSize: '12px' }}
                          >
                            {p.lotNumber}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Accounts Section */}
          {activeNav === 'accounts' && (
            <section className="panel account-panel">
              <div className="panel-heading">
                <div>
                  <h2>{t.accounts}</h2>
                  <p>{language === 'ar' ? 'إنشاء حسابات الموظفين وتحديد مستوى الوصول' : 'Create employee accounts and set access levels'}</p>
                </div>
                <UserPlus />
              </div>
              <form className="account-form" onSubmit={createAccount}>
                <input aria-label="اسم الموظف" placeholder={language === 'ar' ? 'اسم الموظف' : 'Employee name'} value={newAccount.name} onChange={(event) => setNewAccount({ ...newAccount, name: event.target.value })} required />
                <input aria-label="اسم المستخدم" placeholder={language === 'ar' ? 'اسم المستخدم' : 'Username'} value={newAccount.username} onChange={(event) => setNewAccount({ ...newAccount, username: event.target.value })} required />
                <select aria-label="الصلاحية" value={newAccount.role} onChange={(event) => setNewAccount({ ...newAccount, role: event.target.value })}>
                  <option>{language === 'ar' ? 'موظف' : 'Employee'}</option>
                  <option>{language === 'ar' ? 'مشرف مخازن' : 'Warehouse Manager'}</option>
                  <option>{language === 'ar' ? 'مسؤول جودة' : 'Quality Manager'}</option>
                  <option>{language === 'ar' ? 'مسؤول شحن' : 'Shipping Manager'}</option>
                </select>
                <button className="primary-button" type="submit"><UserPlus /> {language === 'ar' ? 'إنشاء الحساب' : 'Create Account'}</button>
              </form>
              {accountMessage && <p className="account-message" role="status">{accountMessage}</p>}
              <div className="accounts-list">
                {accounts.map((account) => (
                  <div className="account-row" key={account.username}>
                    <div className="avatar">{account.name.slice(0, 1)}</div>
                    <div><strong>{account.name}</strong><span>{account.username} · {account.role}</span></div>
                    {account.username === 'admin' && <em>{language === 'ar' ? 'الحساب الرئيسي' : 'Main Account'}</em>}
                    {account.username !== 'admin' && (
                      <button className="icon-button" aria-label={`حذف حساب ${account.name}`} onClick={() => setAccounts((current) => current.filter((item) => item.username !== account.username))}>
                        <Trash2 />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Other Sections (Purchasing, Transport) */}
          {(activeNav === 'purchasing' || activeNav === 'transport') && (
            <section className="panel empty-module" aria-live="polite">
              <div className="empty-module-icon">
                {activeNav === 'purchasing' ? <PackageCheck /> : <Truck />}
              </div>
              <h2>{activeNav === 'purchasing' ? t.purchasing : t.transport}</h2>
              <p>{t.noDataYet}</p>
              <span>{language === 'ar' ? 'سيتم تفعيل هذا القسم قريباً' : 'This section will be activated soon'}</span>
            </section>
          )}

          <footer className="page-footer">
            <span>© 2026 KING FISH Seafood ERP</span>
            <span>{language === 'ar' ? 'نظام متكامل — جميع البيانات محفوظة محلياً' : 'Complete system — All data saved locally'}</span>
          </footer>
        </div>
      </main>

      {/* Modals */}
      <Modal isOpen={showModal && modalType === 'reception'} onClose={closeModal} title={t.newReception} size="large">
        <form onSubmit={handleReceptionSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t.date}</label>
              <input className="form-input" type="date" value={receptionForm.date} onChange={(e) => setReceptionForm({ ...receptionForm, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.supplier}</label>
              <input className="form-input" value={receptionForm.supplier} onChange={(e) => setReceptionForm({ ...receptionForm, supplier: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.product}</label>
              <input className="form-input" value={receptionForm.product} onChange={(e) => setReceptionForm({ ...receptionForm, product: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.weightKg}</label>
              <input className="form-input" type="number" step="0.1" value={receptionForm.weight} onChange={(e) => setReceptionForm({ ...receptionForm, weight: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.qualityGrade}</label>
              <select className="form-select" value={receptionForm.quality} onChange={(e) => setReceptionForm({ ...receptionForm, quality: e.target.value as any })}>
                <option value="excellent">{t.excellent}</option>
                <option value="good">{t.good}</option>
                <option value="acceptable">{t.acceptable}</option>
                <option value="rejected">{t.rejected}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.status}</label>
              <select className="form-select" value={receptionForm.status} onChange={(e) => setReceptionForm({ ...receptionForm, status: e.target.value as any })}>
                <option value="accepted">{t.accepted}</option>
                <option value="rejected">{t.rejected}</option>
                <option value="quality-hold">{t.qualityHold}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.temperatureC}</label>
              <input className="form-input" type="number" step="0.1" value={receptionForm.temperature} onChange={(e) => setReceptionForm({ ...receptionForm, temperature: e.target.value })} required />
            </div>
            <div className="form-group form-full">
              <label>{t.notes}</label>
              <textarea className="form-textarea" value={receptionForm.notes} onChange={(e) => setReceptionForm({ ...receptionForm, notes: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn btn-primary"><Save /> {t.save}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showModal && modalType === 'production'} onClose={closeModal} title={t.newProduction} size="large">
        <form onSubmit={handleProductionSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t.date}</label>
              <input className="form-input" type="date" value={productionForm.date} onChange={(e) => setProductionForm({ ...productionForm, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.rawMaterial}</label>
              <input className="form-input" value={productionForm.rawMaterial} onChange={(e) => setProductionForm({ ...productionForm, rawMaterial: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.rawWeight} (kg)</label>
              <input className="form-input" type="number" step="0.1" value={productionForm.rawWeight} onChange={(e) => setProductionForm({ ...productionForm, rawWeight: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.finalProduct}</label>
              <input className="form-input" value={productionForm.product} onChange={(e) => setProductionForm({ ...productionForm, product: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.finalWeight} (kg)</label>
              <input className="form-input" type="number" step="0.1" value={productionForm.finalWeight} onChange={(e) => setProductionForm({ ...productionForm, finalWeight: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.waste} (kg)</label>
              <input className="form-input" type="number" step="0.1" value={productionForm.waste} onChange={(e) => setProductionForm({ ...productionForm, waste: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.productionLine}</label>
              <input className="form-input" value={productionForm.productionLine} onChange={(e) => setProductionForm({ ...productionForm, productionLine: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.status}</label>
              <select className="form-select" value={productionForm.status} onChange={(e) => setProductionForm({ ...productionForm, status: e.target.value as any })}>
                <option value="in-progress">{t.inProgress}</option>
                <option value="completed">{t.completed}</option>
                <option value="on-hold">{t.onHold}</option>
              </select>
            </div>
            <div className="form-group form-full">
              <label>{t.notes}</label>
              <textarea className="form-textarea" value={productionForm.notes} onChange={(e) => setProductionForm({ ...productionForm, notes: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn btn-primary"><Save /> {t.save}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showModal && modalType === 'quality'} onClose={closeModal} title={t.newQualityCheck} size="large">
        <form onSubmit={handleQualitySubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t.date}</label>
              <input className="form-input" type="date" value={qualityForm.date} onChange={(e) => setQualityForm({ ...qualityForm, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.product}</label>
              <input className="form-input" value={qualityForm.product} onChange={(e) => setQualityForm({ ...qualityForm, product: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.lotNumber}</label>
              <input className="form-input" value={qualityForm.lotNumber} onChange={(e) => setQualityForm({ ...qualityForm, lotNumber: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.inspector}</label>
              <input className="form-input" value={qualityForm.inspector} onChange={(e) => setQualityForm({ ...qualityForm, inspector: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.appearance}</label>
              <select className="form-select" value={qualityForm.appearance} onChange={(e) => setQualityForm({ ...qualityForm, appearance: e.target.value as any })}>
                <option value="excellent">{t.excellent}</option>
                <option value="good">{t.good}</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.smell}</label>
              <select className="form-select" value={qualityForm.smell} onChange={(e) => setQualityForm({ ...qualityForm, smell: e.target.value as any })}>
                <option value="fresh">{t.fresh}</option>
                <option value="acceptable">{t.acceptable}</option>
                <option value="off">Off</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.color}</label>
              <select className="form-select" value={qualityForm.color} onChange={(e) => setQualityForm({ ...qualityForm, color: e.target.value as any })}>
                <option value="excellent">{t.excellent}</option>
                <option value="good">{t.good}</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.texture}</label>
              <select className="form-select" value={qualityForm.texture} onChange={(e) => setQualityForm({ ...qualityForm, texture: e.target.value as any })}>
                <option value="firm">{t.firm}</option>
                <option value="acceptable">{t.acceptable}</option>
                <option value="soft">{t.soft}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.result}</label>
              <select className="form-select" value={qualityForm.result} onChange={(e) => setQualityForm({ ...qualityForm, result: e.target.value as any })}>
                <option value="approved">{t.approved}</option>
                <option value="rejected">{t.rejected}</option>
                <option value="retest">{t.retest}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.certificate}</label>
              <input className="form-input" value={qualityForm.certificate} onChange={(e) => setQualityForm({ ...qualityForm, certificate: e.target.value })} />
            </div>
            <div className="form-group form-full">
              <label>{t.notes}</label>
              <textarea className="form-textarea" value={qualityForm.notes} onChange={(e) => setQualityForm({ ...qualityForm, notes: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn btn-primary"><Save /> {t.save}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showModal && modalType === 'shipment'} onClose={closeModal} title={t.newShipment} size="large">
        <form onSubmit={handleShipmentSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t.date}</label>
              <input className="form-input" type="date" value={shipmentForm.date} onChange={(e) => setShipmentForm({ ...shipmentForm, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.destination}</label>
              <input className="form-input" value={shipmentForm.destination} onChange={(e) => setShipmentForm({ ...shipmentForm, destination: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.customer}</label>
              <input className="form-input" value={shipmentForm.customer} onChange={(e) => setShipmentForm({ ...shipmentForm, customer: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.country}</label>
              <input className="form-input" value={shipmentForm.country} onChange={(e) => setShipmentForm({ ...shipmentForm, country: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.port}</label>
              <input className="form-input" value={shipmentForm.port} onChange={(e) => setShipmentForm({ ...shipmentForm, port: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.containerNumber}</label>
              <input className="form-input" value={shipmentForm.containerNumber} onChange={(e) => setShipmentForm({ ...shipmentForm, containerNumber: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.product}</label>
              <input className="form-input" value={shipmentForm.productName} onChange={(e) => setShipmentForm({ ...shipmentForm, productName: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.quantity} (kg)</label>
              <input className="form-input" type="number" value={shipmentForm.productQuantity} onChange={(e) => setShipmentForm({ ...shipmentForm, productQuantity: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.lotNumber}</label>
              <input className="form-input" value={shipmentForm.productLot} onChange={(e) => setShipmentForm({ ...shipmentForm, productLot: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.totalBoxes}</label>
              <input className="form-input" type="number" value={shipmentForm.totalBoxes} onChange={(e) => setShipmentForm({ ...shipmentForm, totalBoxes: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.estimatedArrival}</label>
              <input className="form-input" type="date" value={shipmentForm.estimatedArrival} onChange={(e) => setShipmentForm({ ...shipmentForm, estimatedArrival: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.status}</label>
              <select className="form-select" value={shipmentForm.status} onChange={(e) => setShipmentForm({ ...shipmentForm, status: e.target.value as any })}>
                <option value="preparing">{t.preparing}</option>
                <option value="ready">{t.ready}</option>
                <option value="in-transit">{t.inTransit}</option>
                <option value="delivered">{t.delivered}</option>
              </select>
            </div>
            <div className="form-group form-full">
              <label>{t.notes}</label>
              <textarea className="form-textarea" value={shipmentForm.notes} onChange={(e) => setShipmentForm({ ...shipmentForm, notes: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn btn-primary"><Save /> {t.save}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showModal && modalType === 'customer'} onClose={closeModal} title={t.newCustomer} size="large">
        <form onSubmit={handleCustomerSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t.name}</label>
              <input className="form-input" value={customerForm.name} onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.company}</label>
              <input className="form-input" value={customerForm.company} onChange={(e) => setCustomerForm({ ...customerForm, company: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.country}</label>
              <input className="form-input" value={customerForm.country} onChange={(e) => setCustomerForm({ ...customerForm, country: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.email}</label>
              <input className="form-input" type="email" value={customerForm.email} onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.phone}</label>
              <input className="form-input" value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.taxId}</label>
              <input className="form-input" value={customerForm.taxId} onChange={(e) => setCustomerForm({ ...customerForm, taxId: e.target.value })} />
            </div>
            <div className="form-group form-full">
              <label>{t.address}</label>
              <textarea className="form-textarea" value={customerForm.address} onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })} required />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn btn-primary"><Save /> {t.save}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showModal && modalType === 'salesOrder'} onClose={closeModal} title={t.newOrder} size="large">
        <form onSubmit={handleSalesOrderSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t.date}</label>
              <input className="form-input" type="date" value={salesOrderForm.date} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.customer}</label>
              <select className="form-select" value={salesOrderForm.customer} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, customer: e.target.value })} required>
                <option value="">{t.select}</option>
                {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t.product}</label>
              <input className="form-input" value={salesOrderForm.productName} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, productName: e.target.value })} required />Change={(e) => setSalesOrderForm({ ...salesOrderForm, productName: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.quantity} (kg)</label>
              <input className="form-input" type="number" value={salesOrderForm.quantity} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, quantity: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.price}</label>
              <input className="form-input" type="number" step="0.01" value={salesOrderForm.price} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.deliveryDate}</label>
              <input className="form-input" type="date" value={salesOrderForm.deliveryDate} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, deliveryDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t.paymentStatus}</label>
              <select className="form-select" value={salesOrderForm.paymentStatus} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, paymentStatus: e.target.value as any })}>
                <option value="pending">{t.pending}</option>
                <option value="partial">{t.partial}</option>
                <option value="paid">{t.paid}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.status}</label>
              <select className="form-select" value={salesOrderForm.status} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, status: e.target.value as any })}>
                <option value="new">New</option>
                <option value="processing">{t.processing}</option>
                <option value="completed">{t.completed}</option>
                <option value="cancelled">{t.cancelled}</option>
              </select>
            </div>
            <div className="form-group form-full">
              <label>{t.notes}</label>
              <textarea className="form-textarea" value={salesOrderForm.notes} onChange={(e) => setSalesOrderForm({ ...salesOrderForm, notes: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn btn-primary"><Save /> {t.save}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
