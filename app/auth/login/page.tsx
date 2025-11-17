"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {/* Static stars */}
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
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <Card className="p-8 border-glow bg-card/80 backdrop-blur">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-8">Sign in to your LanceOrbit account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground"
                required
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
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
