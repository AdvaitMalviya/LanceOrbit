"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

interface SettingsPageProps {
  user: any
  profile: any
  userRole: string
  onClose: () => void
}

export default function SettingsPage({ user, profile, userRole, onClose }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "account" | "notifications" | "privacy">("profile")

  const [profileData, setProfileData] = useState({
    fullName: profile?.full_name || "",
    tagline: profile?.tagline || "",
    bio: profile?.bio || "",
    skills: profile?.skills || [],
    experience: profile?.experience || "",
    education: profile?.education || "",
    languages: profile?.languages || [],
    hourlyRate: profile?.hourly_rate || "",
    availability: profile?.availability || "Available",
    socialLinks: profile?.social_links || {},
  })

  const [accountData, setAccountData] = useState({
    email: user?.email || "",
    password: "",
    twoFactorEnabled: false,
    paymentMethods: [],
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    proposalAlerts: true,
    paymentAlerts: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    allowMessages: true,
  })

  const [saved, setSaved] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s: string) => s !== skill),
    })
  }

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSaveAccount = () => {
    localStorage.setItem("userAccount", JSON.stringify(accountData))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSaveNotifications = () => {
    localStorage.setItem("userNotifications", JSON.stringify(notifications))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSavePrivacy = () => {
    localStorage.setItem("userPrivacy", JSON.stringify(privacy))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-glow bg-card">
        <div className="sticky top-0 bg-card border-b border-glow p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            ✕
          </button>
        </div>

        <div className="flex">
          {/* Sidebar Tabs */}
          <div className="w-56 border-r border-glow p-4 space-y-2">
            {[
              { id: "profile", label: "Profile Settings", icon: UserIcon },
              { id: "account", label: "Account Settings", icon: SettingsIcon },
              { id: "notifications", label: "Notifications", icon: BellIcon },
              { id: "privacy", label: "Privacy & Security", icon: LockIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <tab.icon />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tagline / Headline</label>
                      <input
                        type="text"
                        placeholder="e.g., Full-Stack Developer"
                        value={profileData.tagline}
                        onChange={(e) => setProfileData({ ...profileData, tagline: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio / Description</label>
                      <textarea
                        placeholder="Tell us about yourself and your expertise..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none h-24"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Skills</label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Add a skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                          className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                        />
                        <Button
                          onClick={handleAddSkill}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill: string) => (
                          <div
                            key={skill}
                            className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center gap-2"
                          >
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="hover:text-primary/70 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {userRole === "freelancer" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Hourly Rate (₹/hr)</label>
                          <input
                            type="number"
                            value={profileData.hourlyRate}
                            onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Availability Status</label>
                          <select
                            value={profileData.availability}
                            onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                          >
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                            <option value="On Vacation">On Vacation</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Experience</label>
                      <textarea
                        placeholder="Describe your work experience..."
                        value={profileData.experience}
                        onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none h-20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Education</label>
                      <textarea
                        placeholder="Your degrees, universities, certifications..."
                        value={profileData.education}
                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none h-20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Profile
                  </Button>
                  {saved && <span className="text-green-400 text-sm flex items-center">✓ Saved</span>}
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        value={accountData.email}
                        disabled
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground opacity-50 cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Change Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={accountData.password}
                        onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={accountData.twoFactorEnabled}
                        onChange={(e) => setAccountData({ ...accountData, twoFactorEnabled: e.target.checked })}
                        className="w-5 h-5 rounded border-border cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Account Type</label>
                      <div className="px-4 py-2 bg-background border border-border rounded-lg text-foreground capitalize">
                        {userRole}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveAccount}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Changes
                  </Button>
                  {saved && <span className="text-green-400 text-sm flex items-center">✓ Saved</span>}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Notifications",
                        description: "Receive email updates about your account",
                      },
                      {
                        key: "projectUpdates",
                        label: "Project Updates",
                        description: "Get notified about project changes and milestones",
                      },
                      {
                        key: "proposalAlerts",
                        label: "Proposal Alerts",
                        description: "Receive alerts when you get new proposals",
                      },
                      {
                        key: "paymentAlerts",
                        label: "Payment Alerts",
                        description: "Get notified about payment transactions",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                      >
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="w-5 h-5 rounded border-border cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveNotifications}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Preferences
                  </Button>
                  {saved && <span className="text-green-400 text-sm flex items-center">✓ Saved</span>}
                </div>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Privacy & Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="connections">Connections Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Show Email Address</p>
                        <p className="text-sm text-muted-foreground">Allow others to see your email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.showEmail}
                        onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                        className="w-5 h-5 rounded border-border cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Allow Direct Messages</p>
                        <p className="text-sm text-muted-foreground">Let others send you messages</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.allowMessages}
                        onChange={(e) => setPrivacy({ ...privacy, allowMessages: e.target.checked })}
                        className="w-5 h-5 rounded border-border cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSavePrivacy}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Settings
                  </Button>
                  {saved && <span className="text-green-400 text-sm flex items-center">✓ Saved</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
