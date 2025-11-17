"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface AuthPageProps {
  onLogin: (user: { id: string; name: string; role: "client" | "freelancer" }) => void
  onBack: () => void
}

export default function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<"client" | "freelancer">("freelancer")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && password) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name,
        role,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {/* Static stars with fixed positions */}
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" style={{ left: "10%", top: "15%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40" style={{ left: "20%", top: "25%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{ left: "30%", top: "10%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-50" style={{ left: "40%", top: "30%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" style={{ left: "50%", top: "20%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-45" style={{ left: "60%", top: "35%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-65" style={{ left: "70%", top: "15%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-55" style={{ left: "80%", top: "28%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{ left: "90%", top: "18%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-50" style={{ left: "15%", top: "60%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" style={{ left: "35%", top: "70%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-45" style={{ left: "55%", top: "75%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-65" style={{ left: "75%", top: "65%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-55" style={{ left: "85%", top: "80%" }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{ left: "25%", top: "85%" }} />
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-50" style={{ left: "65%", top: "90%" }} />

        {/* Decorative planets */}
        <div
          className="absolute rounded-full border border-cyan-400/30 opacity-40"
          style={{ left: "5%", top: "40%", width: "60px", height: "60px" }}
        />
        <div
          className="absolute rounded-full border-2 border-yellow-400/20 opacity-30"
          style={{ right: "8%", top: "50%", width: "80px", height: "80px" }}
        />
        <div
          className="absolute rounded-full border border-cyan-300/25 opacity-35"
          style={{ left: "12%", top: "75%", width: "40px", height: "40px" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <Card className="p-8 border-glow bg-card/80 backdrop-blur">
          <h1 className="text-3xl font-bold mb-2 text-center">{isLogin ? "Welcome Back" : "Join LanceOrbit"}</h1>
          <p className="text-center text-muted-foreground mb-8">
            {isLogin ? "Sign in to your account" : "Create your freelance profile"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">I am a:</label>
                <div className="flex gap-4">
                  {(["freelancer", "client"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        role === r
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-sm font-medium block mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium block mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setName("")
                  setEmail("")
                  setPassword("")
                }}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
