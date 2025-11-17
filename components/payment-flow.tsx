"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DollarSign, CreditCard, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentFlowProps {
  userRole: "client" | "freelancer"
}

export default function PaymentFlow({ userRole }: PaymentFlowProps) {
  const [payments, setPayments] = useState([
    {
      id: "1",
      projectTitle: "Build AI Chatbot",
      amount: 3500,
      status: "escrow" as const,
      date: "2024-10-15",
      description: "Phase 1: API Integration",
    },
    {
      id: "2",
      projectTitle: "Mobile App Design",
      amount: 2500,
      status: "pending" as const,
      date: "2024-10-20",
      description: "Design Mockups",
    },
    {
      id: "3",
      projectTitle: "Data Analysis Dashboard",
      amount: 4200,
      status: "released" as const,
      date: "2024-10-01",
      description: "Final Delivery",
    },
  ])

  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")

  const statusConfig = {
    pending: { label: "Pending Payment", color: "bg-yellow-500/20 text-yellow-400", icon: AlertCircle },
    escrow: { label: "In Escrow", color: "bg-blue-500/20 text-blue-400", icon: CreditCard },
    released: { label: "Released", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
  }

  const totalEscrow = payments.filter((p) => p.status === "escrow").reduce((sum, p) => sum + p.amount, 0)
  const totalReleased = payments.filter((p) => p.status === "released").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 border-glow bg-card/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total in Escrow</p>
              <p className="text-2xl font-bold text-primary mt-2">${totalEscrow}</p>
            </div>
            <CreditCard className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-glow bg-card/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Released</p>
              <p className="text-2xl font-bold text-green-400 mt-2">${totalReleased}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400/50" />
          </div>
        </Card>

        <Card className="p-6 border-glow bg-card/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-400 mt-2">
                ${payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-400/50" />
          </div>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="p-6 border-glow bg-card/50">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="space-y-3">
          {payments.map((payment) => {
            const config = statusConfig[payment.status]
            const Icon = config.icon

            return (
              <div
                key={payment.id}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium">{payment.projectTitle}</p>
                    <p className="text-xs text-muted-foreground">{payment.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">${payment.amount}</p>
                    <div className={`text-xs font-medium flex items-center gap-1 justify-end mt-1 ${config.color}`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{payment.date}</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Payment Method */}
      {userRole === "client" && (
        <Card className="p-6 border-glow bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Add Payment Method
          </h2>

          {!showPaymentForm ? (
            <Button
              onClick={() => setShowPaymentForm(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Payment Method
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" className="bg-input border-border text-foreground" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Expiry Date</label>
                  <Input placeholder="MM/YY" className="bg-input border-border text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">CVV</label>
                  <Input placeholder="123" className="bg-input border-border text-foreground" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Add Card</Button>
                <Button
                  onClick={() => setShowPaymentForm(false)}
                  variant="outline"
                  className="flex-1 border-border hover:border-primary/50 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Withdrawal for Freelancers */}
      {userRole === "freelancer" && (
        <Card className="p-6 border-glow bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Withdraw Earnings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Available Balance</label>
              <p className="text-2xl font-bold text-primary">${totalReleased}</p>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Withdrawal Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Request Withdrawal
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
