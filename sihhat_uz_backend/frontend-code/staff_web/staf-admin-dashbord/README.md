# Staff Admin Dashboard

🎯 Modern React-based Staff Administration Dashboard built with **shadcn/ui**, **Radix UI**, **Tailwind CSS**, **Lucide React** icons, and **Vercel design system**.

## 📋 Features

- **Dashboard** - Main overview with key metrics and AI insights
- **Users Management** - Manage staff members with CRUD operations
- **Support List** - Handle support tickets with priority levels
- **App Management** - Monitor and manage running applications
- **Manager Management** - Manage team managers and their performance
- **Settings** - Configure system settings, notifications, and security
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Primitive components for accessibility
- **Lucide React** - Beautiful icon library
- **CVA** - Component variant authority for styling

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   └── Badge.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── Support.tsx
│   ├── AppManagement.tsx
│   ├── ManagerManagement.tsx
│   └── Settings.tsx
├── lib/
│   └── utils.ts        # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Design System

- Clean, modern interface following Vercel design principles
- Consistent color palette with support for light/dark themes
- Rounded corners and smooth transitions
- Accessible components from Radix UI
- Responsive grid layouts with Tailwind CSS

## 🔧 Components

- **Sidebar** - Navigation menu with active state highlighting
- **Header** - Page title with date and theme toggle
- **Card** - Container component with variants
- **Button** - Multiple button variants (default, destructive, outline, secondary, ghost, link)
- **Badge** - Status badges with multiple variants (active, inactive, high, medium, low)

## 🎯 Key Features

- ✅ Staff performance metrics
- ✅ Real-time system health monitoring
- ✅ Support ticket management with priority levels
- ✅ Application status tracking
- ✅ Manager performance evaluation
- ✅ Comprehensive settings panel
- ✅ Responsive tables with pagination-ready structure
- ✅ Interactive charts and gauges (SVG-based)

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

## 📝 License

MIT
