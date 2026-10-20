# 🐟 KING FISH Seafood ERP System

A comprehensive Enterprise Resource Planning (ERP) system specifically designed for seafood processing and export companies.

## ✨ Features

### 8 Operational Departments

1. **Reception & Weighing** - Manage seafood reception from suppliers and vessels
2. **Production & Manufacturing** - Track production processes with automatic lot numbering
3. **Warehouse & Cold Storage** - Monitor inventory and temperature alerts
4. **Quality Control & Food Safety** - Conduct quality inspections with full documentation
5. **Export & Shipping** - Manage international shipments and containers
6. **Sales & Customer Management** - Handle customers and sales orders
7. **Traceability & Recall** - Complete product tracking from reception to export
8. **Account & Permissions Management** - User management with role-based access

### 🌍 Multilingual Support

- **Arabic (RTL)** - العربية
- **English** - Full English translation
- **Italian** - Italiano completo

### 💾 Data Management

- LocalStorage-based data persistence
- Auto-generated reference numbers (KF-XXX-XXXXXX)
- Real-time dashboard statistics
- Complete CRUD operations for all departments
- Sample data initialization

### 🎨 User Interface

- Professional responsive design
- Modal forms for data entry
- Search and filter functionality
- Color-coded status badges
- Mobile-friendly interface
- Dark/Light theme support

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Strict type checking
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Beautiful icons
- **localStorage** - Client-side data persistence

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔐 Default Login

- **Username:** `admin`
- **Password:** `admin123`

## 📁 Project Structure

```
├── app/
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── page.tsx               # Main application
│   ├── layout.tsx             # Root layout with metadata
│   └── globals.css            # Global styles
├── components/
│   └── ui/
│       ├── button.tsx         # Button component
│       ├── badge.tsx          # Status badge component
│       └── modal.tsx          # Modal dialog component
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── translations.ts        # Trilingual translations
│   ├── storage.ts             # localStorage management
│   └── utils.ts               # Utility functions
└── public/
    └── king-fish-logo.png     # Company logo
```

## 🎯 Key Features

### Reception Management
- Add new receptions with supplier and product details
- Track weight, temperature, and quality grade
- Accept/Reject/Quality-hold status management

### Production Tracking
- Automatic lot number generation
- Raw material to final product conversion
- Waste tracking
- Production line management

### Inventory Control
- Real-time stock levels
- Temperature monitoring
- Location and room tracking
- Low stock alerts

### Quality Assurance
- Multi-criteria quality checks (appearance, smell, color, texture)
- Inspector assignment
- Certificate management
- Approval/Rejection workflow

### Export Operations
- Container and shipment tracking
- Customer and destination management
- Multi-product shipments
- Status tracking (Preparing → In Transit → Delivered)

### Sales Management
- Customer database
- Sales order creation
- Payment status tracking
- Delivery date management

### Complete Traceability
- Search by lot number
- Full product history
- From reception to export tracking

## 🌐 Deployment

### Railway Deployment

This project is ready to deploy on Railway:

1. Push to GitHub
2. Connect repository to Railway
3. Railway will automatically detect Next.js
4. Deploy!

### Environment Variables

No environment variables required for basic functionality. All data is stored in browser localStorage.

## 📱 Browser Support

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Mobile browsers

## 🔒 Security Notes

- This is a demo application using localStorage
- For production use, implement:
  - Backend API with database
  - Proper authentication (JWT/OAuth)
  - Role-based access control
  - Data encryption
  - Audit logging

## 📄 License

Proprietary - KING FISH Seafood Company

## 👨‍💻 Developer

Omar Abdeen - Full Stack Developer

## 🙏 Acknowledgments

Built with modern web technologies for efficient seafood business management.

---

**Version:** 1.0.0  
**Last Updated:** October 2026  
**Status:** Production Ready 🚀
