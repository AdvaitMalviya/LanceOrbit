import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function ErrorPage() {
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
        <Card className="p-8 border-glow bg-card/80 backdrop-blur text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Authentication Error</h1>
          <p className="text-muted-foreground mb-8">
            Something went wrong during authentication. Please try again or contact support.
          </p>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                Go Home
              </Button>
            </Link>
            <Link href="/auth/login" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Try Again</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
