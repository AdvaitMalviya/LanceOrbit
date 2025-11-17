"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MapPin, Clock, DollarSign, Users, Star, CheckCircle } from "lucide-react"

interface ProjectDetailsModalProps {
  project: {
    id: string
    title: string
    description: string
    fullDescription?: string
    budget: number
    timeline: string
    location?: string
    skills: string[]
    proposals?: number
    rating?: number
    clientName?: string
    status?: string
  }
  onClose: () => void
  onSubmitProposal: () => void
}

export default function ProjectDetailsModal({ project, onClose, onSubmitProposal }: ProjectDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-glow bg-card max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-glow bg-card/95 backdrop-blur">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-bold text-primary">${project.budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-muted-foreground">Timeline</p>
                <p className="font-bold">{project.timeline}</p>
              </div>
            </div>
            {project.location && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-bold">{project.location}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Proposals</p>
                <p className="font-bold">{project.proposals || 0}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold mb-3">Project Description</h3>
            <p className="text-muted-foreground leading-relaxed">{project.fullDescription || project.description}</p>
          </div>

          {/* Skills Required */}
          <div>
            <h3 className="text-lg font-bold mb-3">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Client Info */}
          <div className="p-4 rounded-lg bg-background/50 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                {project.clientName?.charAt(0) || "C"}
              </div>
              <div>
                <p className="font-bold">{project.clientName || "Anonymous Client"}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">{project.rating || 4.8} rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Status */}
          {project.status && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-400">Project Status: {project.status}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 p-6 border-t border-glow bg-card/95 backdrop-blur">
          <Button onClick={onClose} variant="outline" className="flex-1 border-border hover:bg-muted bg-transparent">
            Close
          </Button>
          <Button onClick={onSubmitProposal} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Proposal
          </Button>
        </div>
      </Card>
    </div>
  )
}
