"use client"
import { createClient } from "@/lib/supabase/client"
import DashboardClient from "@/components/dashboard-client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Fetch user profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)
      setIsLoading(false)
    }

    checkAuthAndFetchData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <DashboardClient user={user} profile={profile} />
}
