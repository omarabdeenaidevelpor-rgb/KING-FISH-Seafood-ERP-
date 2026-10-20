// LocalStorage management for KING FISH ERP

import {
  Reception,
  Production,
  Inventory,
  InventoryMovement,
  QualityCheck,
  Shipment,
  Customer,
  SalesOrder,
  Alert,
  DashboardStats,
} from './types'

// Storage keys
const KEYS = {
  RECEPTIONS: 'kingfish-receptions',
  PRODUCTIONS: 'kingfish-productions',
  INVENTORY: 'kingfish-inventory',
  INVENTORY_MOVEMENTS: 'kingfish-inventory-movements',
  QUALITY_CHECKS: 'kingfish-quality-checks',
  SHIPMENTS: 'kingfish-shipments',
  CUSTOMERS: 'kingfish-customers',
  SALES_ORDERS: 'kingfish-sales-orders',
  ALERTS: 'kingfish-alerts',
}

// Generic storage functions
function getFromStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Storage error:', error)
  }
}

// Generate IDs
export function generateId(prefix: string): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `${prefix}-${timestamp}-${random.toString().padStart(3, '0')}`
}

export function generateLotNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `KF-${year}${month}${day}-${random}`
}

// Reception functions
export function getReceptions(): Reception[] {
  return getFromStorage<Reception>(KEYS.RECEPTIONS)
}

export function addReception(reception: Omit<Reception, 'id'>): Reception {
  const newReception: Reception = {
    ...reception,
    id: generateId('RCP'),
  }
  const receptions = getReceptions()
  receptions.unshift(newReception)
  saveToStorage(KEYS.RECEPTIONS, receptions)
  return newReception
}

export function deleteReception(id: string): void {
  const receptions = getReceptions().filter((r) => r.id !== id)
  saveToStorage(KEYS.RECEPTIONS, receptions)
}

// Production functions
export function getProductions(): Production[] {
  return getFromStorage<Production>(KEYS.PRODUCTIONS)
}

export function addProduction(production: Omit<Production, 'id' | 'lotNumber'>): Production {
  const newProduction: Production = {
    ...production,
    id: generateId('PRD'),
    lotNumber: generateLotNumber(),
  }
  const productions = getProductions()
  productions.unshift(newProduction)
  saveToStorage(KEYS.PRODUCTIONS, productions)
  
  // Update inventory
  if (production.status === 'completed') {
    addToInventory({
      product: production.product,
      quantity: production.finalWeight,
      unit: 'kg',
      location: 'Main Warehouse',
      room: 'Cold Room 1',
      temperature: -18,
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lotNumber: newProduction.lotNumber,
      lastUpdated: new Date().toISOString(),
    })
  }
  
  return newProduction
}

export function deleteProduction(id: string): void {
  const productions = getProductions().filter((p) => p.id !== id)
  saveToStorage(KEYS.PRODUCTIONS, productions)
}

// Inventory functions
export function getInventory(): Inventory[] {
  return getFromStorage<Inventory>(KEYS.INVENTORY)
}

export function addToInventory(item: Omit<Inventory, 'id'>): Inventory {
  const inventory = getInventory()
  const existingIndex = inventory.findIndex(
    (i) => i.product === item.product && i.location === item.location && i.room === item.room
  )
  
  if (existingIndex >= 0) {
    inventory[existingIndex].quantity += item.quantity
    inventory[existingIndex].lastUpdated = new Date().toISOString()
  } else {
    const newItem: Inventory = {
      ...item,
      id: generateId('INV'),
    }
    inventory.push(newItem)
  }
  
  saveToStorage(KEYS.INVENTORY, inventory)
  return inventory[existingIndex >= 0 ? existingIndex : inventory.length - 1]
}

export function updateInventory(id: string, quantity: number): void {
  const inventory = getInventory()
  const index = inventory.findIndex((i) => i.id === id)
  if (index >= 0) {
    inventory[index].quantity = quantity
    inventory[index].lastUpdated = new Date().toISOString()
    saveToStorage(KEYS.INVENTORY, inventory)
  }
}

export function removeFromInventory(product: string, quantity: number): void {
  const inventory = getInventory()
  const item = inventory.find((i) => i.product === product)
  if (item && item.quantity >= quantity) {
    item.quantity -= quantity
    item.lastUpdated = new Date().toISOString()
    saveToStorage(KEYS.INVENTORY, inventory)
  }
}

// Inventory movements
export function getInventoryMovements(): InventoryMovement[] {
  return getFromStorage<InventoryMovement>(KEYS.INVENTORY_MOVEMENTS)
}

export function addInventoryMovement(movement: Omit<InventoryMovement, 'id'>): InventoryMovement {
  const newMovement: InventoryMovement = {
    ...movement,
    id: generateId('MOV'),
  }
  const movements = getInventoryMovements()
  movements.unshift(newMovement)
  saveToStorage(KEYS.INVENTORY_MOVEMENTS, movements)
  return newMovement
}

// Quality checks
export function getQualityChecks(): QualityCheck[] {
  return getFromStorage<QualityCheck>(KEYS.QUALITY_CHECKS)
}

export function addQualityCheck(check: Omit<QualityCheck, 'id'>): QualityCheck {
  const newCheck: QualityCheck = {
    ...check,
    id: generateId('QC'),
  }
  const checks = getQualityChecks()
  checks.unshift(newCheck)
  saveToStorage(KEYS.QUALITY_CHECKS, checks)
  return newCheck
}

export function deleteQualityCheck(id: string): void {
  const checks = getQualityChecks().filter((c) => c.id !== id)
  saveToStorage(KEYS.QUALITY_CHECKS, checks)
}

// Shipments
export function getShipments(): Shipment[] {
  return getFromStorage<Shipment>(KEYS.SHIPMENTS)
}

export function addShipment(shipment: Omit<Shipment, 'id'>): Shipment {
  const newShipment: Shipment = {
    ...shipment,
    id: generateId('SHP'),
  }
  const shipments = getShipments()
  shipments.unshift(newShipment)
  saveToStorage(KEYS.SHIPMENTS, shipments)
  return newShipment
}

export function updateShipmentStatus(id: string, status: Shipment['status']): void {
  const shipments = getShipments()
  const index = shipments.findIndex((s) => s.id === id)
  if (index >= 0) {
    shipments[index].status = status
    saveToStorage(KEYS.SHIPMENTS, shipments)
  }
}

export function deleteShipment(id: string): void {
  const shipments = getShipments().filter((s) => s.id !== id)
  saveToStorage(KEYS.SHIPMENTS, shipments)
}

// Customers
export function getCustomers(): Customer[] {
  return getFromStorage<Customer>(KEYS.CUSTOMERS)
}

export function addCustomer(customer: Omit<Customer, 'id'>): Customer {
  const newCustomer: Customer = {
    ...customer,
    id: generateId('CUS'),
  }
  const customers = getCustomers()
  customers.push(newCustomer)
  saveToStorage(KEYS.CUSTOMERS, customers)
  return newCustomer
}

export function deleteCustomer(id: string): void {
  const customers = getCustomers().filter((c) => c.id !== id)
  saveToStorage(KEYS.CUSTOMERS, customers)
}

// Sales orders
export function getSalesOrders(): SalesOrder[] {
  return getFromStorage<SalesOrder>(KEYS.SALES_ORDERS)
}

export function addSalesOrder(order: Omit<SalesOrder, 'id'>): SalesOrder {
  const newOrder: SalesOrder = {
    ...order,
    id: generateId('SO'),
  }
  const orders = getSalesOrders()
  orders.unshift(newOrder)
  saveToStorage(KEYS.SALES_ORDERS, orders)
  return newOrder
}

export function updateOrderStatus(id: string, status: SalesOrder['status']): void {
  const orders = getSalesOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index >= 0) {
    orders[index].status = status
    saveToStorage(KEYS.SALES_ORDERS, orders)
  }
}

export function deleteOrder(id: string): void {
  const orders = getSalesOrders().filter((o) => o.id !== id)
  saveToStorage(KEYS.SALES_ORDERS, orders)
}

// Alerts
export function getAlerts(): Alert[] {
  return getFromStorage<Alert>(KEYS.ALERTS)
}

export function addAlert(alert: Omit<Alert, 'id'>): Alert {
  const newAlert: Alert = {
    ...alert,
    id: generateId('ALT'),
  }
  const alerts = getAlerts()
  alerts.unshift(newAlert)
  saveToStorage(KEYS.ALERTS, alerts)
  return newAlert
}

export function markAlertRead(id: string): void {
  const alerts = getAlerts()
  const index = alerts.findIndex((a) => a.id === id)
  if (index >= 0) {
    alerts[index].read = true
    saveToStorage(KEYS.ALERTS, alerts)
  }
}

// Dashboard stats
export function getDashboardStats(): DashboardStats {
  const today = new Date().toISOString().split('T')[0]
  const receptions = getReceptions()
  const productions = getProductions()
  const inventory = getInventory()
  const shipments = getShipments()
  
  return {
    todayReceptions: receptions.filter((r) => r.date === today).length,
    activeProductions: productions.filter((p) => p.status === 'in-progress').length,
    currentInventory: inventory.reduce((sum, item) => sum + item.quantity, 0),
    activeShipments: shipments.filter((s) => s.status === 'in-transit' || s.status === 'ready').length,
    lowStockItems: inventory.filter((item) => item.quantity < 100).length,
    temperatureAlerts: inventory.filter((item) => item.temperature > -15).length,
  }
}

// Initialize with sample data
export function initializeSampleData(): void {
  if (typeof window === 'undefined') return
  
  // Check if already initialized
  if (localStorage.getItem('kingfish-initialized')) return
  
  // Sample receptions
  const sampleReceptions: Reception[] = [
    {
      id: 'RCP-001',
      date: new Date().toISOString().split('T')[0],
      supplier: 'مركب النورس 07',
      product: 'جمبري أحمر HOSO 16/20',
      weight: 2480,
      quality: 'excellent',
      status: 'accepted',
      temperature: 2,
      notes: 'جودة ممتازة، تم الاستلام في الموعد',
    },
  ]
  
  // Sample inventory
  const sampleInventory: Inventory[] = [
    {
      id: 'INV-001',
      product: 'جمبري أحمر HOSO 16/20',
      quantity: 2480,
      unit: 'kg',
      location: 'المخزن الرئيسي',
      room: 'غرفة التجميد 1',
      temperature: -18,
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lotNumber: 'KF-261020-001',
      lastUpdated: new Date().toISOString(),
    },
  ]
  
  saveToStorage(KEYS.RECEPTIONS, sampleReceptions)
  saveToStorage(KEYS.INVENTORY, sampleInventory)
  
  localStorage.setItem('kingfish-initialized', 'true')
}
