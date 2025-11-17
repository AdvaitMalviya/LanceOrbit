"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, DollarSign, Star, TrendingUp, MessageCircle, FileText } from "lucide-react"
import ProjectBrowser from "./project-browser"
import ChatInterface from "./chat-interface"
import ContractManagement from "./contract-management"
import PaymentFlow from "./payment-flow"

interface FreelancerDashboardProps {
  user: { id: string; name: string; role: "client" | "freelancer" }
}

export default function FreelancerDashboard({ user }: FreelancerDashboardProps) {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Active Contracts", value: "3", icon: Briefcase },
          { label: "Earnings", value: "$8,450", icon: DollarSign },
          { label: "Rating", value: "4.9/5", icon: Star },
          { label: "Completion Rate", value: "98%", icon: TrendingUp },
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-card border-b border-glow">
          <TabsTrigger value="browse">Browse Projects</TabsTrigger>
          <TabsTrigger value="proposals">My Proposals</TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Contracts
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Earnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6">
          <ProjectBrowser />
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          <Card className="p-8 text-center border-glow bg-card/50">
            <p className="text-muted-foreground">Your submitted proposals and their status</p>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <ContractManagement userRole="freelancer" />
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <ChatInterface currentUser={user} />
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <PaymentFlow userRole="freelancer" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
