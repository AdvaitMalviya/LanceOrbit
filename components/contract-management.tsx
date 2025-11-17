"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react"

interface Contract {
  id: string
  projectTitle: string
  freelancer?: string
  client?: string
  amount: number
  status: "pending" | "active" | "completed" | "disputed"
  startDate: string
  endDate: string
  milestone?: string
  escrowStatus: "held" | "released" | "pending"
}

interface ContractManagementProps {
  userRole: "client" | "freelancer"
}

export default function ContractManagement({ userRole }: ContractManagementProps) {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      projectTitle: "Build AI Chatbot",
      freelancer: "Alex Chen",
      client: "TechCorp Inc",
      amount: 3500,
      status: "active",
      startDate: "2024-10-15",
      endDate: "2024-11-15",
      milestone: "Phase 1: API Integration",
      escrowStatus: "held",
    },
    {
      id: "2",
      projectTitle: "Mobile App Design",
      freelancer: "Sarah Johnson",
      client: "FitLife Co",
      amount: 2500,
      status: "pending",
      startDate: "2024-10-20",
      endDate: "2024-11-20",
      milestone: "Design Mockups",
      escrowStatus: "pending",
    },
    {
      id: "3",
      projectTitle: "Data Analysis Dashboard",
      freelancer: "Mike Rodriguez",
      client: "DataViz Ltd",
      amount: 4200,
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2024-10-01",
      milestone: "Final Delivery",
      escrowStatus: "released",
    },
  ])

  const [selectedContractId, setSelectedContractId] = useState<string | null>(null)

  const statusConfig = {
    pending: { color: "bg-yellow-500/20 text-yellow-400", icon: Clock, label: "Pending" },
    active: { color: "bg-blue-500/20 text-blue-400", icon: AlertCircle, label: "Active" },
    completed: { color: "bg-green-500/20 text-green-400", icon: CheckCircle, label: "Completed" },
    disputed: { color: "bg-red-500/20 text-red-400", icon: AlertCircle, label: "Disputed" },
  }

  const escrowConfig = {
    held: { label: "Funds Held in Escrow", color: "text-yellow-400" },
    pending: { label: "Awaiting Payment", color: "text-muted-foreground" },
    released: { label: "Funds Released", color: "text-green-400" },
  }

  const handleAcceptContract = (contractId: string) => {
    setContracts(contracts.map((c) => (c.id === contractId ? { ...c, status: "active" as const } : c)))
  }

  const handleCompleteContract = (contractId: string) => {
    setContracts(
      contracts.map((c) =>
        c.id === contractId ? { ...c, status: "completed" as const, escrowStatus: "released" as const } : c,
      ),
    )
  }

  const selectedContract = contracts.find((c) => c.id === selectedContractId)

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Contracts List */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Contracts</h2>
        {contracts.map((contract) => {
          const statusConfig_ = statusConfig[contract.status]
          const StatusIcon = statusConfig_.icon

          return (
            <Card
              key={contract.id}
              onClick={() => setSelectedContractId(contract.id)}
              className={`p-6 border-glow bg-card/50 cursor-pointer transition-all hover:border-primary/50 ${
                selectedContractId === contract.id ? "border-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{contract.projectTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {userRole === "client" ? `Freelancer: ${contract.freelancer}` : `Client: ${contract.client}`}
                  </p>
                </div>
                <Badge className={`${statusConfig_.color}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig_.label}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="text-lg font-semibold text-primary">${contract.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                  <p className="text-sm">
                    {contract.startDate} to {contract.endDate}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg mb-4">
                <p className="text-xs text-muted-foreground mb-1">Current Milestone</p>
                <p className="text-sm font-medium">{contract.milestone}</p>
              </div>

              <div className={`text-sm font-medium ${escrowConfig[contract.escrowStatus].color}`}>
                {escrowConfig[contract.escrowStatus].label}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Contract Details Sidebar */}
      <div className="lg:col-span-1">
        {selectedContract ? (
          <Card className="p-6 border-glow bg-card/50 sticky top-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Contract Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Project</p>
                <p className="font-medium">{selectedContract.projectTitle}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-2xl font-bold text-primary">${selectedContract.amount}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Badge className={`${statusConfig[selectedContract.status].color}`}>
                  {statusConfig[selectedContract.status].label}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Escrow Status</p>
                <div className={`text-sm font-medium ${escrowConfig[selectedContract.escrowStatus].color}`}>
                  {escrowConfig[selectedContract.escrowStatus].label}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                <p className="text-sm">
                  {selectedContract.startDate} to {selectedContract.endDate}
                </p>
              </div>

              <div className="pt-4 space-y-2 border-t border-border">
                {selectedContract.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleAcceptContract(selectedContract.id)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Accept Contract
                    </Button>
                    <Button variant="outline" className="w-full border-border hover:border-primary/50 bg-transparent">
                      Decline
                    </Button>
                  </>
                )}

                {selectedContract.status === "active" && (
                  <>
                    <Button
                      onClick={() => handleCompleteContract(selectedContract.id)}
                      className="w-full bg-green-600 text-white hover:bg-green-700"
                    >
                      Mark as Complete
                    </Button>
                    <Button variant="outline" className="w-full border-border hover:border-primary/50 bg-transparent">
                      Raise Dispute
                    </Button>
                  </>
                )}

                {selectedContract.status === "completed" && (
                  <Button variant="outline" className="w-full border-border hover:border-primary/50 bg-transparent">
                    Leave Review
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 border-glow bg-card/50 text-center">
            <p className="text-muted-foreground">Select a contract to view details</p>
          </Card>
        )}
      </div>
    </div>
  )
}
