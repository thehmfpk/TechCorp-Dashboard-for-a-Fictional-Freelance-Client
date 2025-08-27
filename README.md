# TechCorp Admin Dashboard

A modern, fully responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Features comprehensive project management, real-time analytics, and beautiful data visualizations.

## ✨ Features

### 🎯 Core Functionality
- **Authentication System** - Secure login/signup with client-side validation
- **Dashboard Overview** - Real-time analytics with interactive charts
- **Project Management** - Complete CRUD operations with filtering and search
- **User Profile** - Comprehensive profile management with avatar upload
- **Global Search** - Search across projects and tasks with live results
- **Notifications** - Real-time activity tracking and notifications

### 🎨 Design & UX
- **Mobile-First** - Fully responsive design across all devices
- **Dark Mode** - Toggle between light and dark themes with persistence
- **Animations** - Smooth micro-interactions and transitions
- **Modern UI** - Clean, professional design with gradient themes
- **Accessibility** - Screen reader friendly with keyboard navigation

### 🏗️ Technical Features
- **TypeScript** - Full type safety throughout the application
- **Context API** - State management for auth, UI, and data
- **LocalStorage** - Data persistence for offline functionality
- **Mock Database** - Comprehensive seed data with deterministic generation
- **Modular Architecture** - Clean separation of concerns

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Demo Accounts

The application comes with pre-seeded mock accounts:

```
Email: thehmfpk@gmail.com
Password: password123

Email: huma@gmail.com  
Password: password123

Email: sofia@gmail.com
Password: password123
```

## 📱 Features Overview

### Landing Page
- Hero section with gradient background
- Feature preview cards
- Responsive call-to-action buttons

### Authentication
- Email validation (must be @gmail.com)
- Real-time form validation
- Smooth error animations
- Remember session state

### Dashboard Overview
- Animated summary cards showing key metrics
- Interactive charts using Recharts
- Editable analytics with instant updates
- Recent activity feed with timestamps
- Real-time search functionality

### Projects Management
- Grid layout with project cards
- Advanced filtering by status and tags
- Real-time search across projects and tasks
- Add/Edit/Delete operations with modals
- Progress tracking and status management

### Profile Management
- Avatar upload with instant preview
- Complete profile editing
- Social media link management
- Form validation and error handling
- Instant updates across the app

### Global Features
- Collapsible sidebar with mobile drawer
- Global search with dropdown results
- Notification system with unread indicators
- Dark/light theme toggle with persistence
- Breadcrumb navigation

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components
│   ├── charts/     # Chart components
│   └── layout/     # Layout components
├── contexts/        # Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── router/         # Routing configuration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── main.tsx        # Application entry point
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (from-blue-500 to-blue-600)
- **Secondary**: Purple accent (from-purple-500 to-purple-600)
- **Success**: Green (emerald-500)
- **Warning**: Yellow (yellow-500)
- **Error**: Red (red-500)

### Typography
- **Display**: Inter font family
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale**: 12px to 48px with consistent hierarchy

### Spacing
- **Base Unit**: 8px system
- **Components**: Consistent padding and margins
- **Responsive**: Mobile-first breakpoints

## 🔧 Key Components

### Authentication Context
Manages user authentication state, login/signup operations, and profile updates.

### UI Context
Handles global UI state including dark mode and sidebar visibility.

### Data Context
Manages application data including projects, analytics, and notifications with localStorage persistence.

### Protected Routes
Implements route protection with automatic redirects for authenticated/unauthenticated users.

## 📊 Data Management

- **Mock Database**: Comprehensive user and project data generation
- **Local Storage**: Persistent data across browser sessions  
- **Real-time Updates**: Instant UI updates across all components
- **Data Validation**: Client-side form validation with error handling

## 🌐 Responsive Design

- **Mobile**: < 768px - Stacked layouts, hamburger menu
- **Tablet**: 768px - 1024px - Adapted layouts, collapsible sidebar
- **Desktop**: > 1024px - Full feature set, persistent sidebar

## 🎯 Performance

- **Code Splitting**: Lazy loading for optimal bundle size
- **Optimized Images**: Efficient asset loading
- **Memoization**: React.memo and useMemo for expensive operations
- **Smooth Animations**: Hardware-accelerated CSS transforms

## 🧪 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is part of a portfolio demonstration and is not licensed for commercial use.

---

Built with ❤️ using modern web technologies for an exceptional user experience.