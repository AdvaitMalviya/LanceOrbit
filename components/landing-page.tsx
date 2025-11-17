"use client"

import { Button } from "@/components/ui/button"
import { Rocket, Users, Zap, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Static background stars and planets */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Stars */}
        {[
          { x: 10, y: 15, size: 1 },
          { x: 20, y: 25, size: 1.5 },
          { x: 35, y: 10, size: 1 },
          { x: 50, y: 20, size: 1 },
          { x: 65, y: 30, size: 1.5 },
          { x: 80, y: 15, size: 1 },
          { x: 90, y: 35, size: 1 },
          { x: 15, y: 50, size: 1 },
          { x: 40, y: 60, size: 1.5 },
          { x: 75, y: 55, size: 1 },
          { x: 85, y: 70, size: 1 },
          { x: 25, y: 75, size: 1 },
          { x: 60, y: 80, size: 1.5 },
          { x: 45, y: 90, size: 1 },
          { x: 70, y: 85, size: 1 },
          { x: 30, y: 95, size: 1 },
        ].map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}

        {/* Planets */}
        <div
          className="absolute w-24 h-24 rounded-full border-2 border-primary/30 opacity-20"
          style={{ right: "10%", top: "15%" }}
        />
        <div
          className="absolute w-16 h-16 rounded-full border border-primary/20 opacity-15"
          style={{ left: "5%", bottom: "20%" }}
        />
        <div
          className="absolute w-32 h-32 rounded-full border-2 border-primary/20 opacity-10"
          style={{ right: "5%", bottom: "10%" }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-glow">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-primary">LanceOrbit</span>
        </div>
        <Link href="/auth/login">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center py-20">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/50 bg-primary/10">
            <span className="text-sm text-primary font-semibold">Welcome to the Future of Freelancing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Your Freelance <span className="text-primary">Galaxy</span> Awaits
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Connect with top freelancers and clients across the universe. Secure contracts, instant payments, and
            AI-powered matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Launch Your Career
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/50 hover:border-primary bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 border-t border-glow">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "50K+" },
              { label: "Projects Completed", value: "100K+" },
              { label: "Total Earnings", value: "$50M+" },
              { label: "Countries", value: "150+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-card/50 border-t border-glow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why LanceOrbit?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Instant project matching with AI" },
              { icon: Shield, title: "Secure Escrow", desc: "Protected payments & contracts" },
              { icon: Users, title: "Global Network", desc: "Connect with talent worldwide" },
              { icon: Rocket, title: "Scale Fast", desc: "Grow your freelance business" },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 border border-glow rounded-lg hover:border-primary/80 transition-all hover:bg-card/80"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-6 py-20 border-t border-glow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Create Profile",
                desc: "Set up your profile and showcase your skills or post projects",
              },
              { step: 2, title: "Find Match", desc: "AI matches you with perfect clients or freelancers" },
              {
                step: 3,
                title: "Collaborate & Earn",
                desc: "Work securely with escrow protection and get paid instantly",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20 bg-card/50 border-t border-glow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Freelance Designer",
                text: "LanceOrbit helped me find consistent clients and grow my business 3x in 6 months!",
                rating: 5,
              },
              {
                name: "Marcus Johnson",
                role: "Project Manager",
                text: "The escrow system gives me peace of mind. I can focus on work, not payments.",
                rating: 5,
              },
              {
                name: "Elena Rodriguez",
                role: "Developer",
                text: "The AI matching is incredible. I get projects that are perfect for my skills.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 border border-glow rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-card/50 border-t border-glow">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of freelancers and clients already using LanceOrbit to build amazing things.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-glow text-center text-muted-foreground text-sm">
        <p>© 2025 LanceOrbit. All rights reserved. | Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  )
}
