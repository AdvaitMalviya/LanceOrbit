"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, DollarSign, Tag, MessageSquare, Clock, User } from "lucide-react"

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
  isClient?: boolean
}

export default function ProjectDetails({ projectId, onBack, isClient = false }: ProjectDetailsProps) {
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [proposals, setProposals] = useState([
    {
      id: "1",
      freelancer: "Alex Chen",
      rating: 4.9,
      bid: 3500,
      coverLetter: "I have 5 years of experience building AI chatbots...",
      submitted: "2 days ago",
    },
    {
      id: "2",
      freelancer: "Sarah Johnson",
      rating: 4.7,
      bid: 4200,
      coverLetter: "Specialized in OpenAI integrations and NLP...",
      submitted: "1 day ago",
    },
  ])

  // Mock project data
  const project = {
    id: projectId,
    title: "Build AI Chatbot",
    description:
      "Create an intelligent chatbot for customer support using OpenAI API. The chatbot should handle common customer inquiries, escalate complex issues, and integrate with our existing CRM system.",
    budget: { min: 2000, max: 5000 },
    category: "AI/ML",
    client: "TechCorp Inc",
    timeline: "2-3 weeks",
    level: "Intermediate",
    proposals: proposals.length,
    status: "open",
    requirements: [
      "Experience with OpenAI API",
      "Node.js or Python backend",
      "REST API design",
      "Database integration",
      "Testing and documentation",
    ],
  }

  const handleSubmitProposal = () => {
    if (bidAmount && coverLetter) {
      const newProposal = {
        id: Math.random().toString(36).substr(2, 9),
        freelancer: "You",
        rating: 0,
        bid: Number.parseFloat(bidAmount),
        coverLetter,
        submitted: "just now",
      }
      setProposals([newProposal, ...proposals])
      setShowProposalForm(false)
      setBidAmount("")
      setCoverLetter("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold">{project.title}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card className="p-6 border-glow bg-card/50">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-muted-foreground mb-6">{project.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-medium">{project.timeline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="font-medium">{project.level}</p>
                </div>
              </div>
            </div>

            <h3 className="font-semibold mb-3">Requirements</h3>
            <ul className="space-y-2">
              {project.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {req}
                </li>
              ))}
            </ul>
          </Card>

          {/* Proposals Section */}
          {isClient ? (
            <Card className="p-6 border-glow bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Proposals ({proposals.length})</h2>
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{proposal.freelancer}</p>
                        <p className="text-sm text-muted-foreground">Rating: {proposal.rating}/5</p>
                      </div>
                      <p className="text-lg font-semibold text-primary">${proposal.bid}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{proposal.coverLetter}</p>
                    <p className="text-xs text-muted-foreground">Submitted {proposal.submitted}</p>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <>
              {/* Proposal Form */}
              {!showProposalForm ? (
                <Button
                  onClick={() => setShowProposalForm(true)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                >
                  Submit Your Proposal
                </Button>
              ) : (
                <Card className="p-6 border-glow bg-card/50">
                  <h2 className="text-xl font-semibold mb-4">Submit Your Proposal</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Your Bid Amount</label>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Enter your bid"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Budget range: ${project.budget.min} - ${project.budget.max}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">Cover Letter</label>
                      <textarea
                        placeholder="Tell the client why you're the best fit for this project..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        rows={5}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmitProposal}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Submit Proposal
                      </Button>
                      <Button
                        onClick={() => setShowProposalForm(false)}
                        variant="outline"
                        className="flex-1 border-border hover:border-primary/50 bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Proposals List */}
              {proposals.length > 0 && (
                <Card className="p-6 border-glow bg-card/50">
                  <h2 className="text-xl font-semibold mb-4">Other Proposals ({proposals.length})</h2>
                  <div className="space-y-3">
                    {proposals.map((proposal) => (
                      <div key={proposal.id} className="p-3 border border-border rounded-lg text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{proposal.freelancer}</span>
                          <span className="text-primary font-semibold">${proposal.bid}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Budget Card */}
          <Card className="p-6 border-glow bg-card/50">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Budget</h3>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">
              ${project.budget.min} - ${project.budget.max}
            </p>
            <p className="text-sm text-muted-foreground">Fixed price</p>
          </Card>

          {/* Client Info */}
          <Card className="p-6 border-glow bg-card/50">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Client</h3>
            </div>
            <p className="font-medium mb-2">{project.client}</p>
            <p className="text-sm text-muted-foreground mb-4">Member since 2022</p>
            <Button variant="outline" className="w-full border-border hover:border-primary/50 bg-transparent">
              View Profile
            </Button>
          </Card>

          {/* Proposals Count */}
          <Card className="p-6 border-glow bg-card/50">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Proposals</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{project.proposals}</p>
            <p className="text-sm text-muted-foreground">submitted</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
