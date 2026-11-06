import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, LayoutDashboard, Layers } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="w-full max-w-xl flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-3">
        <Badge variant="secondary">
          Technology Leaders of the Future
        </Badge>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Shape the Future of Technology
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
          Welcome to the Technology Leaders of the Future platform. Discover interactive dashboards, modular UI components, and modern workflows built to accelerate your engineering journey.
        </p>
      </div>

      {/* Workspace Banner Image from public/images/ */}
      <div className="overflow-hidden rounded-xl border border-border bg-card/60 shadow-sm p-2">
        <img
          src="/images/workspace-banner.svg"
          alt="Technology Leaders of the Future workspace banner"
          className="w-full h-auto rounded-lg object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild size="lg" className="gap-2 shadow-sm">
          <Link to="/app/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            <span>Open Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2 shadow-sm">
          <Link to="/app/components">
            <Layers className="h-4 w-4" />
            <span>Explore Components</span>
          </Link>
        </Button>
      </div>

      <footer className="text-center text-xs text-muted-foreground">
        Built with React 19, Tailwind CSS v4, and modern shadcn components.
      </footer>
    </div>
  )
}
