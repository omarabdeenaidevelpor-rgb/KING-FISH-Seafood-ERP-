// TypeScript types for KING FISH ERP System

export type Language = 'ar' | 'en' | 'it'

export interface User {
  username: string
  name: string
  role: string
}

export interface Reception {
  id: string
  date: string
  supplier: string
  product: string
  weight: number
  quality: 'excellent' | 'good' | 'acceptable' | 'rejected'
  status: 'accepted' | 'rejected' | 'quality-hold'
  temperature: number
  notes: string
}

export interface Production {
  id: string
  date: string
  lotNumber: string
  rawMaterial: string
  rawWeight: number
  product: string
  finalWeight: number
  waste: number
  status: 'in-progress' | 'completed' | 'on-hold'
  productionLine: string
  notes: string
}

export interface Inventory {
  id: string
  product: string
  quantity: number
  unit: string
  location: string
  room: string
  temperature: number
  expiryDate: string
  lotNumber: string
  lastUpdated: string
}

export interface InventoryMovement {
  id: string
  date: string
  type: 'in' | 'out'
  product: string
  quantity: number
  from: string
  to: string
  reason: string
  reference: string
}

export interface QualityCheck {
  id: string
  date: string
  product: string
  lotNumber: string
  inspector: string
  appearance: 'excellent' | 'good' | 'fair' | 'poor'
  smell: 'fresh' | 'acceptable' | 'off'
  color: 'excellent' | 'good' | 'fair' | 'poor'
  texture: 'firm' | 'acceptable' | 'soft'
  result: 'approved' | 'rejected' | 'retest'
  certificate: string
  notes: string
}

export interface Shipment {
  id: string
  date: string
  destination: string
  customer: string
  country: string
  port: string
  containerNumber: string
  products: Array<{
    product: string
    quantity: number
    lotNumber: string
  }>
  totalBoxes: number
  status: 'preparing' | 'ready' | 'in-transit' | 'delivered' | 'issue'
  estimatedArrival: string
  documents: string[]
  notes: string
}

export interface Customer {
  id: string
  name: string
  company: string
  country: string
  email: string
  phone: string
  address: string
  taxId: string
}

export interface SalesOrder {
  id: string
  date: string
  customer: string
  products: Array<{
    product: string
    quantity: number
    price: number
  }>
  total: number
  status: 'new' | 'processing' | 'completed' | 'cancelled'
  deliveryDate: string
  paymentStatus: 'pending' | 'partial' | 'paid'
  notes: string
}

export interface TraceabilityRecord {
  lotNumber: string
  product: string
  reception: Reception
  production: Production
  quality: QualityCheck[]
  inventory: InventoryMovement[]
  shipment?: Shipment
  status: 'active' | 'recalled' | 'completed'
}

export interface Alert {
  id: string
  type: 'danger' | 'warning' | 'info'
  title: string
  message: string
  date: string
  read: boolean
}

export interface DashboardStats {
  todayReceptions: number
  activeProductions: number
  currentInventory: number
  activeShipments: number
  lowStockItems: number
  temperatureAlerts: number
}
