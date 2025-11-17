"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import SettingsPage from "./settings-page"
import BillingPage from "./billing-page"
import SearchFeature from "./search-feature"

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

const LayoutDashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
    />
  </svg>
)

const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const MessageSquareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const DollarSignIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

interface DashboardClientProps {
  user: any
  profile: any
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "proposals" | "contracts" | "messages" | "search"
  >("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [userRole, setUserRole] = useState<"client" | "freelancer">(profile?.role || "freelancer")
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole")
    if (savedRole) {
      setUserRole(savedRole as "client" | "freelancer")
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleLogoClick = () => {
    router.push("/dashboard")
  }

  const handlePostProject = () => {
    alert("Post Project feature coming soon!")
  }

  const handleSaveSettings = () => {
    localStorage.setItem("userRole", userRole)
    setShowSettings(false)
  }

  const isFreelancer = userRole === "freelancer"

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-glow bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <RocketIcon />
              <span className="text-xl font-bold text-primary">LanceOrbit</span>
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-input border border-border rounded-lg px-4 py-2 w-64">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-card rounded-lg transition-colors"
              >
                <BellIcon />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-glow rounded-lg shadow-lg p-4 z-50">
                  <h3 className="font-bold mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-background/50 rounded border border-border">
                      <p className="text-sm font-medium">New proposal received</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded border border-border">
                      <p className="text-sm font-medium">Contract completed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded border border-border">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-3 pl-4 border-l border-border hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <p className="text-sm font-medium">{fullName || "User"}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserIcon />
                </div>
                <ChevronDownIcon />
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-glow rounded-lg shadow-lg p-2 z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-background/50 rounded transition-colors text-sm">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-background/50 rounded transition-colors text-sm">
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowBilling(true)
                      setShowAccountMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-background/50 rounded transition-colors text-sm"
                  >
                    Billing
                  </button>
                  <button
                    onClick={() => {
                      setShowSettings(true)
                      setShowAccountMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-background/50 rounded transition-colors text-sm flex items-center gap-2"
                  >
                    <SettingsIcon />
                    Settings
                  </button>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-background/50 rounded transition-colors text-sm text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-glow bg-card/30 min-h-[calc(100vh-80px)] p-6">
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboardIcon },
              { id: "search", label: isFreelancer ? "Find Projects" : "Find Freelancers", icon: SearchIcon },
              { id: "projects", label: isFreelancer ? "Browse Projects" : "My Projects", icon: FileTextIcon },
              { id: "proposals", label: "Proposals", icon: RocketIcon },
              { id: "contracts", label: "Contracts", icon: DollarSignIcon },
              { id: "messages", label: "Messages", icon: MessageSquareIcon },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <item.icon />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {fullName?.split(" ")[0]}!</h1>
                <p className="text-muted-foreground">Here's what's happening with your account today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: "Active Projects", value: "3", icon: RocketIcon, color: "text-blue-400" },
                  { label: "Pending Proposals", value: "5", icon: FileTextIcon, color: "text-cyan-400" },
                  { label: "Active Contracts", value: "2", icon: DollarSignIcon, color: "text-yellow-400" },
                  { label: "Total Earnings", value: "$2,450", icon: TrendingUpIcon, color: "text-green-400" },
                ].map((stat, i) => (
                  <Card key={i} className="p-6 border-glow bg-card/50 hover:bg-card/80 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`${stat.color}`} />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <Card className="p-6 border-glow bg-card/50">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: "New proposal received", time: "2 hours ago", status: "pending" },
                    { action: "Contract completed", time: "1 day ago", status: "completed" },
                    { action: "Payment received", time: "3 days ago", status: "completed" },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border"
                    >
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activity.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{isFreelancer ? "Browse Projects" : "My Projects"}</h1>
                {!isFreelancer && (
                  <Button
                    onClick={handlePostProject}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                  >
                    <PlusIcon />
                    Post Project
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "E-commerce Website Redesign",
                    budget: "$2,500",
                    timeline: "2 weeks",
                    skills: ["React", "Tailwind CSS"],
                  },
                  {
                    title: "Mobile App Development",
                    budget: "$5,000",
                    timeline: "1 month",
                    skills: ["React Native", "Firebase"],
                  },
                ].map((project, i) => (
                  <Card key={i} className="p-6 border-glow bg-card/50 hover:bg-card/80 transition-all cursor-pointer">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Budget: <span className="text-primary font-semibold">{project.budget}</span> • Timeline:{" "}
                      <span className="text-primary font-semibold">{project.timeline}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Proposals Tab */}
          {activeTab === "proposals" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Proposals</h1>
              <Card className="p-6 border-glow bg-card/50 text-center py-12">
                <p className="text-muted-foreground">
                  No proposals yet. Start browsing projects to submit your first proposal!
                </p>
              </Card>
            </div>
          )}

          {/* Contracts Tab */}
          {activeTab === "contracts" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Contracts</h1>
              <Card className="p-6 border-glow bg-card/50 text-center py-12">
                <p className="text-muted-foreground">No active contracts. Accept a proposal to start a contract!</p>
              </Card>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Messages</h1>
              <Card className="p-6 border-glow bg-card/50 text-center py-12">
                <p className="text-muted-foreground">No messages yet. Start collaborating to see conversations here!</p>
              </Card>
            </div>
          )}

          {/* Search Tab */}
          {activeTab === "search" && <SearchFeature userRole={userRole} />}
        </main>
      </div>

      {showSettings && (
        <SettingsPage user={user} profile={profile} userRole={userRole} onClose={() => setShowSettings(false)} />
      )}

      {showBilling && <BillingPage userRole={userRole} onClose={() => setShowBilling(false)} />}
    </div>
  )
}
