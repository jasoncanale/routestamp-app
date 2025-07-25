import { Sidebar } from "@/components/sidebar"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
      <KeyboardShortcuts />
    </div>
  )
} 