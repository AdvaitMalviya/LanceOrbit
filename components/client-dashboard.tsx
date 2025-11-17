"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Eye, MessageSquare, DollarSign, MessageCircle, FileText } from "lucide-react"
import ProjectForm from "./project-form"
import ProjectCard from "./project-card"
import ProjectDetails from "./project-details"
import ChatInterface from "./chat-interface"
import ContractManagement from "./contract-management"
import PaymentFlow from "./payment-flow"

interface ClientDashboardProps {
  user: { id: string; name: string; role: "client" | "freelancer" }
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null)
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Build AI Chatbot",
      description: "Create an intelligent chatbot for customer support",
      budget: { min: 2000, max: 5000 },
      category: "AI/ML",
      status: "open" as const,
      proposals: 5,
    },
    {
      id: "2",
      title: "Mobile App Design",
      description: "Design a modern mobile app UI/UX",
      budget: { min: 1500, max: 3000 },
      category: "Design",
      status: "in_progress" as const,
      proposals: 3,
    },
  ])

  if (viewingProjectId) {
    return <ProjectDetails projectId={viewingProjectId} onBack={() => setViewingProjectId(null)} isClient={true} />
  }

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      ...projectData,
      status: "open" as const,
      proposals: 0,
    }
    setProjects([newProject, ...projects])
    setShowProjectForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: "2", icon: Eye },
          { label: "Total Proposals", value: "8", icon: MessageSquare },
          { label: "Spent", value: "$12,500", icon: DollarSign },
          { label: "Avg Rating", value: "4.8/5", icon: Plus },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-glow bg-card/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="bg-card border-b border-glow">
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Contracts
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Projects</h2>
            <Button
              onClick={() => setShowProjectForm(!showProjectForm)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {showProjectForm && <ProjectForm onSubmit={handleCreateProject} onCancel={() => setShowProjectForm(false)} />}

          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} onClick={() => setViewingProjectId(project.id)} className="cursor-pointer">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          <Card className="p-8 text-center border-glow bg-card/50">
            <p className="text-muted-foreground">View and manage proposals from freelancers</p>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <ContractManagement userRole="client" />
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <ChatInterface currentUser={user} />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentFlow userRole="client" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
