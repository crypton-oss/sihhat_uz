import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { Dashboard } from '@/pages/Dashboard'
import { Users } from '@/pages/Users'
import { Support } from '@/pages/Support'
import { AppManagement } from '@/pages/AppManagement'
import { ManagerManagement } from '@/pages/ManagerManagement'
import { Settings } from '@/pages/Settings'
import { Login } from '@/pages/Login'
import { Toaster } from '@/components/Toaster'

export type Section = 'dashboard' | 'users' | 'support' | 'app-management' | 'manager-management' | 'settings'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ role: string; name: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('staff_token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (role: string, name: string) => {
    setUser({ role, name })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('staff_token')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="light">
        <Login onLogin={handleLogin} />
      </div>
    )
  }

  const sections: Record<Section, { label: string; component: React.ReactNode }> = {
    dashboard: { label: 'Staff Dashboard', component: <Dashboard /> },
    users: { label: 'Tizim Foydalanuvchilari', component: <Users /> },
    support: { label: 'Yordam va Shikoyatlar', component: <Support /> },
    'app-management': { label: 'Ilovani Boshqarish', component: <AppManagement /> },
    'manager-management': { label: 'Sanatoriya Adminlari', component: <ManagerManagement /> },
    settings: { label: 'Tizim Sozlamalari', component: <Settings /> },
  }

  return (
    <div className="light">
      <Toaster />
      <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            title={sections[activeSection].label}
            isDark={false}
            onThemeToggle={() => {}} // Disabled for now
            userName={user?.name || "Super Admin"}
          />
          <main className="flex-1 overflow-auto bg-slate-50 p-6">
            <div className="max-w-[1600px] mx-auto">
              {sections[activeSection].component}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
