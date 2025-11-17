"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

const CreditCardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V5a3 3 0 00-3-3H5a3 3 0 00-3 3v11a3 3 0 003 3z"
    />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

interface BillingPageProps {
  userRole: string
  onClose: () => void
}

export default function BillingPage({ userRole, onClose }: BillingPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "invoices">("overview")
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  const isFreelancer = userRole === "freelancer"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-glow bg-card">
        <div className="sticky top-0 bg-card border-b border-glow p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Billing & Payments</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-glow flex">
          {["overview", "transactions", "invoices"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {isFreelancer ? (
                <>
                  {/* Freelancer Overview */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 border-glow bg-background/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Total Earnings</p>
                          <p className="text-3xl font-bold">$12,450</p>
                        </div>
                        <DollarSignIcon className="text-green-400" />
                      </div>
                    </Card>
                    <Card className="p-6 border-glow bg-background/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Available Balance</p>
                          <p className="text-3xl font-bold">$3,200</p>
                        </div>
                        <DollarSignIcon className="text-cyan-400" />
                      </div>
                    </Card>
                    <Card className="p-6 border-glow bg-background/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Pending</p>
                          <p className="text-3xl font-bold">$2,100</p>
                        </div>
                        <DollarSignIcon className="text-yellow-400" />
                      </div>
                    </Card>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowWithdraw(true)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Withdraw Funds
                    </Button>
                  </div>

                  {/* Recent Transactions */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      {[
                        { project: "Website Redesign", amount: "$1,200", status: "Released", date: "Mar 20" },
                        { project: "Logo Design", amount: "$400", status: "In Escrow", date: "Mar 18" },
                        { project: "Mobile App", amount: "$2,500", status: "Released", date: "Mar 15" },
                      ].map((tx, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                        >
                          <div>
                            <p className="font-medium">{tx.project}</p>
                            <p className="text-sm text-muted-foreground">{tx.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-400">{tx.amount}</p>
                            <p className={`text-xs ${tx.status === "Released" ? "text-green-400" : "text-yellow-400"}`}>
                              {tx.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Client Overview */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 border-glow bg-background/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Wallet Balance</p>
                          <p className="text-3xl font-bold">$5,000</p>
                        </div>
                        <DollarSignIcon className="text-cyan-400" />
                      </div>
                    </Card>
                    <Card className="p-6 border-glow bg-background/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Held in Escrow</p>
                          <p className="text-3xl font-bold">$8,500</p>
                        </div>
                        <DollarSignIcon className="text-yellow-400" />
                      </div>
                    </Card>
                    <Card className="p-6 border-glow bg-background/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Pending Refunds</p>
                          <p className="text-3xl font-bold">$0</p>
                        </div>
                        <DollarSignIcon className="text-red-400" />
                      </div>
                    </Card>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowAddFunds(true)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Add Funds
                    </Button>
                  </div>

                  {/* Active Contracts */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Active Contracts</h3>
                    <div className="space-y-3">
                      {[
                        {
                          project: "E-commerce Website",
                          freelancer: "John Developer",
                          amount: "$3,000",
                          escrow: "$3,000",
                        },
                        {
                          project: "Mobile App Design",
                          freelancer: "Sarah Designer",
                          amount: "$2,500",
                          escrow: "$2,500",
                        },
                      ].map((contract, i) => (
                        <div key={i} className="p-4 bg-background/50 rounded-lg border border-border space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold">{contract.project}</p>
                              <p className="text-sm text-muted-foreground">with {contract.freelancer}</p>
                            </div>
                            <p className="font-bold text-primary">{contract.amount}</p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">In Escrow: {contract.escrow}</span>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                Release Payment
                              </Button>
                              <Button size="sm" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                                Request Revision
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Mar 20, 2025", type: "Payment Release", amount: "$1,200", status: "Completed" },
                      { date: "Mar 18, 2025", type: "Deposit", amount: "$5,000", status: "Completed" },
                      { date: "Mar 15, 2025", type: "Payment Release", amount: "$2,500", status: "Completed" },
                      { date: "Mar 12, 2025", type: "Withdrawal", amount: "$3,000", status: "Completed" },
                    ].map((tx, i) => (
                      <tr key={i} className="border-b border-border hover:bg-background/50">
                        <td className="py-3 px-4">{tx.date}</td>
                        <td className="py-3 px-4">{tx.type}</td>
                        <td className="py-3 px-4 font-bold">{tx.amount}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Invoices & Receipts</h3>
              <div className="space-y-3">
                {[
                  { id: "INV-001", project: "Website Redesign", amount: "$1,200", date: "Mar 20" },
                  { id: "INV-002", project: "Logo Design", amount: "$400", date: "Mar 18" },
                  { id: "INV-003", project: "Mobile App", amount: "$2,500", date: "Mar 15" },
                ].map((invoice, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                  >
                    <div>
                      <p className="font-bold">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.project}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">{invoice.amount}</p>
                      <Button
                        size="sm"
                        className="bg-primary/20 text-primary hover:bg-primary/30 flex items-center gap-2"
                      >
                        <DownloadIcon />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 border-glow bg-card">
            <h3 className="text-xl font-bold mb-4">Add Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
                  <option>Credit/Debit Card</option>
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Proceed to Payment
                </Button>
                <Button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 bg-background border border-border text-foreground hover:bg-card"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 border-glow bg-card">
            <h3 className="text-xl font-bold mb-4">Withdraw Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Withdrawal Method</label>
                <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
                  <option>Bank Account</option>
                  <option>PayPal</option>
                  <option>Crypto Wallet</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Withdraw</Button>
                <Button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 bg-background border border-border text-foreground hover:bg-card"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
