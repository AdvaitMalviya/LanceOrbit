"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, DollarSign, Tag, Send } from "lucide-react"
import ProjectDetails from "./project-details"

export default function ProjectBrowser() {
  const [projects] = useState([
    {
      id: "1",
      title: "Build AI Chatbot",
      description: "Create an intelligent chatbot for customer support using OpenAI API",
      budget: { min: 2000, max: 5000 },
      category: "AI/ML",
      client: "TechCorp Inc",
      proposals: 12,
    },
    {
      id: "2",
      title: "Mobile App Design",
      description: "Design a modern mobile app UI/UX for fitness tracking",
      budget: { min: 1500, max: 3000 },
      category: "Design",
      client: "FitLife Co",
      proposals: 8,
    },
    {
      id: "3",
      title: "Data Analysis Dashboard",
      description: "Build a real-time analytics dashboard with D3.js",
      budget: { min: 3000, max: 6000 },
      category: "Web Development",
      client: "DataViz Ltd",
      proposals: 5,
    },
  ])

  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [coverLetter, setCoverLetter] = useState("")

  if (viewingProjectId) {
    return <ProjectDetails projectId={viewingProjectId} onBack={() => setViewingProjectId(null)} isClient={false} />
  }

  const handleSubmitProposal = () => {
    if (bidAmount && coverLetter) {
      alert("Proposal submitted successfully!")
      setSelectedProject(null)
      setBidAmount("")
      setCoverLetter("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input placeholder="Search projects..." className="flex-1 bg-input border-border text-foreground" />
        <select className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
          <option>All Categories</option>
          <option>Web Development</option>
          <option>Design</option>
          <option>AI/ML</option>
        </select>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 border-glow bg-card/50 hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <p className="text-xs text-muted-foreground">Posted by {project.client}</p>
              </div>
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

            {selectedProject === project.id ? (
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <label className="text-sm font-medium block mb-2">Your Bid Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter your bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Cover Letter</label>
                  <textarea
                    placeholder="Tell the client why you're the best fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitProposal}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Proposal
                  </Button>
                  <Button
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="flex-1 border-border hover:border-primary/50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewingProjectId(project.id)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => setSelectedProject(project.id)}
                  variant="outline"
                  className="flex-1 border-border hover:border-primary/50 bg-transparent"
                >
                  Quick Bid
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
