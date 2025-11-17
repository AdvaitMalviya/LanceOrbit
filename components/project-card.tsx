"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, DollarSign, Tag } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    budget: { min: number; max: number }
    category: string
    status: "open" | "in_progress" | "completed" | "closed"
    proposals: number
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    open: "bg-primary/20 text-primary",
    in_progress: "bg-secondary/20 text-secondary",
    completed: "bg-green-500/20 text-green-400",
    closed: "bg-muted/20 text-muted-foreground",
  }

  return (
    <Card className="p-6 border-glow bg-card/50 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${statusColors[project.status]}`}
        >
          {project.status.replace("_", " ")}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Tag className="w-4 h-4" />
          {project.category}
        </div>
        <div className="flex items-center gap-2 text-primary font-medium">
          <DollarSign className="w-4 h-4" />${project.budget.min.toLocaleString()} - $
          {project.budget.max.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageSquare className="w-4 h-4" />
          {project.proposals} proposals
        </div>
      </div>

      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">View Details</Button>
    </Card>
  )
}
