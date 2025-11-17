"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ProjectFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    budget_min: "",
    budget_max: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      budget: {
        min: Number.parseInt(formData.budget_min),
        max: Number.parseInt(formData.budget_max),
      },
    })
  }

  return (
    <Card className="p-6 border-glow bg-card/50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">Project Title</label>
          <Input
            placeholder="e.g., Build a React Dashboard"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-input border-border text-foreground"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Description</label>
          <textarea
            placeholder="Describe your project in detail..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            rows={4}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
            >
              {["Web Development", "Mobile App", "Design", "AI/ML", "Data Science", "Writing"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Budget Range</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={formData.budget_min}
                onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
              <Input
                type="number"
                placeholder="Max"
                value={formData.budget_max}
                onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Post Project
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-border hover:border-primary/50 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
