"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
)

const StarIcon = () => (
  <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

interface SearchFeatureProps {
  userRole: string
}

export default function SearchFeature({ userRole }: SearchFeatureProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [minBudget, setMinBudget] = useState("")
  const [maxBudget, setMaxBudget] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  const isFreelancer = userRole === "freelancer"

  // Mock search results
  const mockResults = isFreelancer
    ? [
        {
          id: 1,
          title: "React E-commerce Website",
          client: "TechStartup Inc",
          budget: "$2,500 - $5,000",
          skills: ["React", "Node.js", "MongoDB"],
          rating: 4.8,
          reviews: 24,
          posted: "2 hours ago",
        },
        {
          id: 2,
          title: "Mobile App UI Design",
          client: "Creative Agency",
          budget: "$1,500 - $3,000",
          skills: ["Figma", "UI/UX", "Prototyping"],
          rating: 4.9,
          reviews: 18,
          posted: "5 hours ago",
        },
        {
          id: 3,
          title: "WordPress Blog Setup",
          client: "Content Creator",
          budget: "$500 - $1,000",
          skills: ["WordPress", "SEO", "Content"],
          rating: 4.7,
          reviews: 12,
          posted: "1 day ago",
        },
      ]
    : [
        {
          id: 1,
          name: "Alex Johnson",
          title: "Full Stack Developer",
          hourlyRate: "$50/hr",
          skills: ["React", "Node.js", "PostgreSQL"],
          rating: 4.9,
          reviews: 45,
          completedProjects: 32,
        },
        {
          id: 2,
          name: "Sarah Chen",
          title: "UI/UX Designer",
          hourlyRate: "$45/hr",
          skills: ["Figma", "Prototyping", "User Research"],
          rating: 4.8,
          reviews: 38,
          completedProjects: 28,
        },
        {
          id: 3,
          name: "Mike Rodriguez",
          title: "Digital Marketer",
          hourlyRate: "$40/hr",
          skills: ["SEO", "Content Marketing", "Analytics"],
          rating: 4.7,
          reviews: 22,
          completedProjects: 18,
        },
      ]

  const filteredResults = mockResults.filter((item) => {
    const query = searchQuery.toLowerCase()
    if (isFreelancer) {
      return (
        item.title.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query) ||
        item.skills.some((s) => s.toLowerCase().includes(query))
      )
    } else {
      return (
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.skills.some((s) => s.toLowerCase().includes(query))
      )
    }
  })

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 bg-input border border-border rounded-lg px-4 py-3">
            <SearchIcon />
            <input
              type="text"
              placeholder={isFreelancer ? "Search projects..." : "Search freelancers..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-primary/20 text-primary hover:bg-primary/30 flex items-center gap-2"
          >
            <FilterIcon />
            Filters
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="p-4 border-glow bg-card/50 space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="web">Web Development</option>
                  <option value="design">Design</option>
                  <option value="mobile">Mobile</option>
                  <option value="writing">Writing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Min Budget</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Budget</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="latest">Latest</option>
                  <option value="budget-high">Budget: High to Low</option>
                  <option value="budget-low">Budget: Low to High</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Found {filteredResults.length} {isFreelancer ? "projects" : "freelancers"}
        </p>

        {filteredResults.length > 0 ? (
          <div className="grid gap-4">
            {filteredResults.map((item) => (
              <Card key={item.id} className="p-6 border-glow bg-card/50 hover:bg-card/80 transition-all cursor-pointer">
                {isFreelancer ? (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">by {item.client}</p>
                      </div>
                      <p className="text-xl font-bold text-primary">{item.budget}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                        <span className="text-muted-foreground">
                          {item.rating} ({item.reviews} reviews)
                        </span>
                      </div>
                      <span className="text-muted-foreground">Posted {item.posted}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View & Apply
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                      </div>
                      <p className="text-xl font-bold text-primary">{item.hourlyRate}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                        <span className="text-muted-foreground">
                          {item.rating} ({item.reviews} reviews)
                        </span>
                      </div>
                      <span className="text-muted-foreground">{item.completedProjects} projects completed</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View Profile & Invite
                    </Button>
                  </>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 border-glow bg-card/50 text-center">
            <p className="text-muted-foreground">
              No {isFreelancer ? "projects" : "freelancers"} found. Try adjusting your search filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
