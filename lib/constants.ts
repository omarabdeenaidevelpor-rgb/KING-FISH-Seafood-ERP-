/**
 * KING FISH ERP - Application Constants
 * Status options, validation rules, and system configuration
 */

// REFERENCE NUMBER PREFIXES
export const REFERENCE_PREFIXES = {
  RECEPTION: 'KF-REC',
  PRODUCTION: 'KF-PRD',
  INVENTORY: 'KF-INV',
  QUALITY: 'KF-QC',
  EXPORT: 'KF-EXP',
  SALES: 'KF-SAL',
  INVOICE: 'KF-INV',
  PAYMENT: 'KF-PAY',
  SUPPLIER: 'KF-SUP',
  CUSTOMER: 'KF-CUS',
  BATCH: 'KF-BAT',
  LOT: 'KF-LOT',
  SHIPMENT: 'KF-SHP',
  CERTIFICATE: 'KF-CERT',
  QUARANTINE: 'KF-QTN',
} as const;

// STATUS OPTIONS
export const RECEPTION_STATUS = [
  { value: 'received', label: { ar: 'مستلم', en: 'Received', it: 'Ricevuto' } },
  { value: 'inspected', label: { ar: 'تم الفحص', en: 'Inspected', it: 'Ispezionato' } },
  { value: 'approved', label: { ar: 'موافق عليه', en: 'Approved', it: 'Approvato' } },
  { value: 'rejected', label: { ar: 'مرفوض', en: 'Rejected', it: 'Rifiutato' } },
] as const;

export const PRODUCTION_STATUS = [
  { value: 'planned', label: { ar: 'مخطط', en: 'Planned', it: 'Pianificato' } },
  { value: 'in-progress', label: { ar: 'قيد التنفيذ', en: 'In Progress', it: 'In corso' } },
  { value: 'completed', label: { ar: 'مكتمل', en: 'Completed', it: 'Completato' } },
  { value: 'on-hold', label: { ar: 'معلق', en: 'On Hold', it: 'In attesa' } },
] as const;

export const INVENTORY_STATUS = [
  { value: 'available', label: { ar: 'متاح', en: 'Available', it: 'Disponibile' } },
  { value: 'reserved', label: { ar: 'محجوز', en: 'Reserved', it: 'Riservato' } },
  { value: 'allocated', label: { ar: 'مخصص', en: 'Allocated', it: 'Assegnato' } },
  { value: 'expired', label: { ar: 'منتهي الصلاحية', en: 'Expired', it: 'Scaduto' } },
  { value: 'damaged', label: { ar: 'تالف', en: 'Damaged', it: 'Danneggiato' } },
] as const;

export const QUALITY_STATUS = [
  { value: 'pending', label: { ar: 'قيد الانتظار', en: 'Pending', it: 'In attesa' } },
  { value: 'in-progress', label: { ar: 'قيد الفحص', en: 'In Progress', it: 'In corso' } },
  { value: 'passed', label: { ar: 'ناجح', en: 'Passed', it: 'Superato' } },
  { value: 'failed', label: { ar: 'راسب', en: 'Failed', it: 'Fallito' } },
  { value: 'conditional', label: { ar: 'مشروط', en: 'Conditional', it: 'Condizionale' } },
] as const;

export const EXPORT_STATUS = [
  { value: 'preparing', label: { ar: 'قيد التحضير', en: 'Preparing', it: 'In preparazione' } },
  { value: 'ready', label: { ar: 'جاهز', en: 'Ready', it: 'Pronto' } },
  { value: 'in-transit', label: { ar: 'في الطريق', en: 'In Transit', it: 'In transito' } },
  { value: 'customs', label: { ar: 'في الجمارك', en: 'At Customs', it: 'In dogana' } },
  { value: 'delivered', label: { ar: 'تم التسليم', en: 'Delivered', it: 'Consegnato' } },
  { value: 'cancelled', label: { ar: 'ملغي', en: 'Cancelled', it: 'Annullato' } },
] as const;

export const SALES_ORDER_STATUS = [
  { value: 'pending', label: { ar: 'قيد الانتظار', en: 'Pending', it: 'In attesa' } },
  { value: 'confirmed', label: { ar: 'مؤكد', en: 'Confirmed', it: 'Confermato' } },
  { value: 'processing', label: { ar: 'قيد التنفيذ', en: 'Processing', it: 'In lavorazione' } },
  { value: 'ready', label: { ar: 'جاهز', en: 'Ready', it: 'Pronto' } },
  { value: 'shipped', label: { ar: 'تم الشحن', en: 'Shipped', it: 'Spedito' } },
  { value: 'delivered', label: { ar: 'تم التسليم', en: 'Delivered', it: 'Consegnato' } },
  { value: 'cancelled', label: { ar: 'ملغي', en: 'Cancelled', it: 'Annullato' } },
] as const;

export const PAYMENT_STATUS = [
  { value: 'pending', label: { ar: 'قيد الانتظار', en: 'Pending', it: 'In attesa' } },
  { value: 'partial', label: { ar: 'دفع جزئي', en: 'Partial', it: 'Parziale' } },
  { value: 'paid', label: { ar: 'مدفوع', en: 'Paid', it: 'Pagato' } },
  { value: 'overdue', label: { ar: 'متأخر', en: 'Overdue', it: 'Scaduto' } },
] as const;

// FISH TYPES
export const FISH_TYPES = [
  { value: 'tuna', label: { ar: 'تونة', en: 'Tuna', it: 'Tonno' } },
  { value: 'sardine', label: { ar: 'سردين', en: 'Sardine', it: 'Sardina' } },
  { value: 'mackerel', label: { ar: 'ماكريل', en: 'Mackerel', it: 'Sgombro' } },
  { value: 'seabass', label: { ar: 'قاروص', en: 'Sea Bass', it: 'Branzino' } },
  { value: 'seabream', label: { ar: 'دنيس', en: 'Sea Bream', it: 'Orata' } },
  { value: 'swordfish', label: { ar: 'سيف', en: 'Swordfish', it: 'Pesce spada' } },
  { value: 'grouper', label: { ar: 'هامور', en: 'Grouper', it: 'Cernia' } },
  { value: 'shrimp', label: { ar: 'جمبري', en: 'Shrimp', it: 'Gambero' } },
  { value: 'squid', label: { ar: 'حبار', en: 'Squid', it: 'Calamaro' } },
  { value: 'octopus', label: { ar: 'أخطبوط', en: 'Octopus', it: 'Polpo' } },
] as const;

// PRODUCT TYPES
export const PRODUCT_TYPES = [
  { value: 'fresh', label: { ar: 'طازج', en: 'Fresh', it: 'Fresco' } },
  { value: 'frozen', label: { ar: 'مجمد', en: 'Frozen', it: 'Congelato' } },
  { value: 'processed', label: { ar: 'معالج', en: 'Processed', it: 'Lavorato' } },
  { value: 'filleted', label: { ar: 'شرائح', en: 'Filleted', it: 'Filettato' } },
  { value: 'whole', label: { ar: 'كامل', en: 'Whole', it: 'Intero' } },
] as const;

// PROCESS TYPES
export const PROCESS_TYPES = [
  { value: 'cleaning', label: { ar: 'تنظيف', en: 'Cleaning', it: 'Pulizia' } },
  { value: 'cutting', label: { ar: 'تقطيع', en: 'Cutting', it: 'Taglio' } },
  { value: 'filleting', label: { ar: 'تشريح', en: 'Filleting', it: 'Sfilettatura' } },
  { value: 'packaging', label: { ar: 'تغليف', en: 'Packaging', it: 'Confezionamento' } },
  { value: 'freezing', label: { ar: 'تجميد', en: 'Freezing', it: 'Congelamento' } },
] as const;

// QUALITY GRADES
export const QUALITY_GRADES = [
  { value: 'A', label: { ar: 'درجة أولى', en: 'Grade A', it: 'Grado A' } },
  { value: 'B', label: { ar: 'درجة ثانية', en: 'Grade B', it: 'Grado B' } },
  { value: 'C', label: { ar: 'درجة ثالثة', en: 'Grade C', it: 'Grado C' } },
] as const;

// STORAGE ZONES
export const STORAGE_ZONES = [
  { value: 'cold-storage', label: { ar: 'تخزين بارد', en: 'Cold Storage', it: 'Conservazione frigorifera' } },
  { value: 'freezer', label: { ar: 'مجمد', en: 'Freezer', it: 'Congelatore' } },
  { value: 'dry-storage', label: { ar: 'تخزين جاف', en: 'Dry Storage', it: 'Deposito secco' } },
  { value: 'processing', label: { ar: 'التصنيع', en: 'Processing', it: 'Lavorazione' } },
  { value: 'shipping', label: { ar: 'الشحن', en: 'Shipping', it: 'Spedizione' } },
] as const;

// INSPECTION TYPES
export const INSPECTION_TYPES = [
  { value: 'reception', label: { ar: 'استلام', en: 'Reception', it: 'Ricevimento' } },
  { value: 'production', label: { ar: 'إنتاج', en: 'Production', it: 'Produzione' } },
  { value: 'pre-shipment', label: { ar: 'ما قبل الشحن', en: 'Pre-Shipment', it: 'Pre-spedizione' } },
  { value: 'periodic', label: { ar: 'دوري', en: 'Periodic', it: 'Periodico' } },
  { value: 'complaint', label: { ar: 'شكوى', en: 'Complaint', it: 'Reclamo' } },
] as const;

// QUALITY CRITERIA CATEGORIES
export const CRITERIA_CATEGORIES = [
  { value: 'appearance', label: { ar: 'المظهر', en: 'Appearance', it: 'Aspetto' } },
  { value: 'smell', label: { ar: 'الرائحة', en: 'Smell', it: 'Odore' } },
  { value: 'texture', label: { ar: 'القوام', en: 'Texture', it: 'Consistenza' } },
  { value: 'temperature', label: { ar: 'الحرارة', en: 'Temperature', it: 'Temperatura' } },
  { value: 'packaging', label: { ar: 'التغليف', en: 'Packaging', it: 'Confezionamento' } },
  { value: 'documentation', label: { ar: 'التوثيق', en: 'Documentation', it: 'Documentazione' } },
] as const;

// CERTIFICATE TYPES
export const CERTIFICATE_TYPES = [
  { value: 'health', label: { ar: 'صحي', en: 'Health', it: 'Sanitario' } },
  { value: 'origin', label: { ar: 'منشأ', en: 'Origin', it: 'Origine' } },
  { value: 'quality', label: { ar: 'جودة', en: 'Quality', it: 'Qualità' } },
  { value: 'halal', label: { ar: 'حلال', en: 'Halal', it: 'Halal' } },
  { value: 'organic', label: { ar: 'عضوي', en: 'Organic', it: 'Biologico' } },
  { value: 'export', label: { ar: 'تصدير', en: 'Export', it: 'Esportazione' } },
] as const;

// CONTAINER TYPES
export const CONTAINER_TYPES = [
  { value: '20ft', label: { ar: '20 قدم', en: '20ft', it: '20ft' } },
  { value: '40ft', label: { ar: '40 قدم', en: '40ft', it: '40ft' } },
  { value: '40ft-hc', label: { ar: '40 قدم عالي', en: '40ft HC', it: '40ft HC' } },
  { value: 'reefer', label: { ar: 'مبرد', en: 'Reefer', it: 'Refrigerato' } },
] as const;

// INCOTERMS
export const INCOTERMS = [
  { value: 'FOB', label: 'FOB - Free On Board' },
  { value: 'CIF', label: 'CIF - Cost, Insurance & Freight' },
  { value: 'CFR', label: 'CFR - Cost and Freight' },
  { value: 'EXW', label: 'EXW - Ex Works' },
  { value: 'DDP', label: 'DDP - Delivered Duty Paid' },
  { value: 'DAP', label: 'DAP - Delivered At Place' },
] as const;

// PAYMENT METHODS
export const PAYMENT_METHODS = [
  { value: 'cash', label: { ar: 'نقدي', en: 'Cash', it: 'Contanti' } },
  { value: 'credit', label: { ar: 'آجل', en: 'Credit', it: 'Credito' } },
  { value: 'bank-transfer', label: { ar: 'تحويل بنكي', en: 'Bank Transfer', it: 'Bonifico' } },
  { value: 'letter-of-credit', label: { ar: 'اعتماد مستندي', en: 'Letter of Credit', it: 'Lettera di credito' } },
  { value: 'check', label: { ar: 'شيك', en: 'Check', it: 'Assegno' } },
  { value: 'credit-card', label: { ar: 'بطاقة ائتمان', en: 'Credit Card', it: 'Carta di credito' } },
] as const;

// CUSTOMER TYPES
export const CUSTOMER_TYPES = [
  { value: 'wholesale', label: { ar: 'جملة', en: 'Wholesale', it: 'All\'ingrosso' } },
  { value: 'retail', label: { ar: 'تجزئة', en: 'Retail', it: 'Dettaglio' } },
  { value: 'distributor', label: { ar: 'موزع', en: 'Distributor', it: 'Distributore' } },
  { value: 'restaurant', label: { ar: 'مطعم', en: 'Restaurant', it: 'Ristorante' } },
  { value: 'export', label: { ar: 'تصدير', en: 'Export', it: 'Esportazione' } },
] as const;

// CURRENCIES
export const CURRENCIES = [
  { value: 'USD', label: 'USD - US Dollar', symbol: '$' },
  { value: 'EUR', label: 'EUR - Euro', symbol: '€' },
  { value: 'LYD', label: 'LYD - Libyan Dinar', symbol: 'د.ل' },
] as const;

// UNITS
export const UNITS = [
  { value: 'kg', label: { ar: 'كجم', en: 'kg', it: 'kg' } },
  { value: 'ton', label: { ar: 'طن', en: 'ton', it: 'ton' } },
  { value: 'piece', label: { ar: 'قطعة', en: 'piece', it: 'pezzo' } },
  { value: 'box', label: { ar: 'صندوق', en: 'box', it: 'scatola' } },
  { value: 'pallet', label: { ar: 'منصة', en: 'pallet', it: 'pallet' } },
] as const;

// TEMPERATURE THRESHOLDS
export const TEMPERATURE_THRESHOLDS = {
  FRESH_FISH: {
    MIN: -2,
    MAX: 4,
    OPTIMAL: 0,
    CRITICAL_LOW: -5,
    CRITICAL_HIGH: 8,
  },
  FROZEN_FISH: {
    MIN: -25,
    MAX: -18,
    OPTIMAL: -20,
    CRITICAL_LOW: -30,
    CRITICAL_HIGH: -15,
  },
  COLD_STORAGE: {
    MIN: 0,
    MAX: 6,
    OPTIMAL: 2,
    CRITICAL_LOW: -3,
    CRITICAL_HIGH: 10,
  },
  PROCESSING_AREA: {
    MIN: 10,
    MAX: 18,
    OPTIMAL: 15,
    CRITICAL_LOW: 5,
    CRITICAL_HIGH: 22,
  },
} as const;

// VALIDATION RULES
export const VALIDATION_RULES = {
  REFERENCE_NUMBER_LENGTH: 10,
  MIN_WEIGHT: 0.1,
  MAX_WEIGHT: 50000,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 1000000,
  MIN_TEMPERATURE: -50,
  MAX_TEMPERATURE: 50,
  MIN_QUALITY_SCORE: 0,
  MAX_QUALITY_SCORE: 100,
  PHONE_PATTERN: /^[\d\s\+\-\(\)]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  TAX_ID_LENGTH: { MIN: 5, MAX: 20 },
  BATCH_NUMBER_PATTERN: /^KF-BAT-\d{6}$/,
  LOT_NUMBER_PATTERN: /^KF-LOT-\d{6}$/,
} as const;

// DATE FORMATS
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss',
  TIME_ONLY: 'HH:mm',
} as const;

// WASTE TYPES
export const WASTE_TYPES = [
  { value: 'heads', label: { ar: 'رؤوس', en: 'Heads', it: 'Teste' } },
  { value: 'bones', label: { ar: 'عظام', en: 'Bones', it: 'Ossa' } },
  { value: 'skin', label: { ar: 'جلد', en: 'Skin', it: 'Pelle' } },
  { value: 'viscera', label: { ar: 'أحشاء', en: 'Viscera', it: 'Viscere' } },
  { value: 'other', label: { ar: 'أخرى', en: 'Other', it: 'Altro' } },
] as const;

// DISPOSAL METHODS
export const DISPOSAL_METHODS = [
  { value: 'landfill', label: { ar: 'طمر', en: 'Landfill', it: 'Discarica' } },
  { value: 'recycling', label: { ar: 'إعادة تدوير', en: 'Recycling', it: 'Riciclaggio' } },
  { value: 'animal-feed', label: { ar: 'علف حيواني', en: 'Animal Feed', it: 'Mangime animale' } },
  { value: 'composting', label: { ar: 'تسميد', en: 'Composting', it: 'Compostaggio' } },
] as const;

// MOVEMENT TYPES
export const MOVEMENT_TYPES = [
  { value: 'receipt', label: { ar: 'استلام', en: 'Receipt', it: 'Ricevuta' } },
  { value: 'production', label: { ar: 'إنتاج', en: 'Production', it: 'Produzione' } },
  { value: 'sale', label: { ar: 'بيع', en: 'Sale', it: 'Vendita' } },
  { value: 'transfer', label: { ar: 'نقل', en: 'Transfer', it: 'Trasferimento' } },
  { value: 'adjustment', label: { ar: 'تعديل', en: 'Adjustment', it: 'Aggiustamento' } },
  { value: 'waste', label: { ar: 'نفايات', en: 'Waste', it: 'Scarto' } },
  { value: 'return', label: { ar: 'إرجاع', en: 'Return', it: 'Reso' } },
] as const;

// DEFECT TYPES
export const DEFECT_TYPES = [
  { value: 'minor', label: { ar: 'بسيط', en: 'Minor', it: 'Minore' }, severity: 1 },
  { value: 'major', label: { ar: 'كبير', en: 'Major', it: 'Maggiore' }, severity: 2 },
  { value: 'critical', label: { ar: 'حرج', en: 'Critical', it: 'Critico' }, severity: 3 },
] as const;

// LAB TEST TYPES
export const LAB_TEST_TYPES = [
  { value: 'microbial', label: { ar: 'ميكروبيولوجي', en: 'Microbial', it: 'Microbico' } },
  { value: 'chemical', label: { ar: 'كيميائي', en: 'Chemical', it: 'Chimico' } },
  { value: 'physical', label: { ar: 'فيزيائي', en: 'Physical', it: 'Fisico' } },
  { value: 'sensory', label: { ar: 'حسي', en: 'Sensory', it: 'Sensoriale' } },
] as const;