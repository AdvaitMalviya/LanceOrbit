"use client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import ClientDashboard from "./client-dashboard"
import FreelancerDashboard from "./freelancer-dashboard"

interface DashboardProps {
  user: { id: string; name: string; role: "client" | "freelancer" }
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-glow bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">LanceOrbit</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-border hover:border-primary/50 hover:text-primary bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {user.role === "client" ? <ClientDashboard user={user} /> : <FreelancerDashboard user={user} />}
      </main>
    </div>
  )
}
