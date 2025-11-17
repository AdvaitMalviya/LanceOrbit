"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Users, Star, Eye } from "lucide-react"

interface ProjectCardEnhancedProps {
  id: string
  title: string
  description: string
  budget: number
  timeline: string
  location?: string
  skills: string[]
  proposals?: number
  rating?: number
  clientName?: string
  clientImage?: string
  onViewDetails?: () => void
  onSubmitProposal?: () => void
}

export default function ProjectCardEnhanced({
  id,
  title,
  description,
  budget,
  timeline,
  location,
  skills,
  proposals = 0,
  rating = 4.8,
  clientName = "Anonymous Client",
  onViewDetails,
  onSubmitProposal,
}: ProjectCardEnhancedProps) {
  return (
    <Card className="p-6 border-glow bg-card/50 hover:bg-card/80 transition-all hover:border-primary/80 group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center gap-1 ml-4 flex-shrink-0">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      {/* Budget and Timeline */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="font-semibold text-primary">${budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-sm">{timeline}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Client Info and Stats */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {clientName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{clientName}</p>
            <p className="text-xs text-muted-foreground">Client</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{proposals} proposals</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="flex-1 border-primary/50 text-primary hover:bg-primary/10 flex items-center justify-center gap-2 bg-transparent"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
        <Button onClick={onSubmitProposal} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          Submit Proposal
        </Button>
      </div>
    </Card>
  )
}
