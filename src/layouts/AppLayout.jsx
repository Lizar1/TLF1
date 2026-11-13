import { Link, NavLink, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Coins, LayoutDashboard, Layers, ExternalLink, ArrowLeft } from "lucide-react"
import { config } from "@/lib/config"

export default function AppLayout() {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* App Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-8">
            <Link
              to="/app/dashboard"
              className="flex items-center gap-2.5 font-bold tracking-tight text-lg hover:opacity-90 transition-opacity"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shadow-xs">
                <Coins className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-foreground text-base leading-tight">
                  {config.brandName}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Dashboard
                </span>
              </div>
            </Link>

            {/* Top Navigation Menu */}
            <nav className="flex items-center gap-1.5">
              <NavLink to="/app/dashboard" className={navLinkClass}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/app/components" className={navLinkClass}>
                <Layers className="h-4 w-4" />
                <span>Components</span>
              </NavLink>
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to="/">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Landing Page</span>
              </Link>
            </Button>

            <Button asChild size="sm" className="gap-1.5 font-semibold shadow-sm">
              <a href={config.funpayUrl} target="_blank" rel="noopener noreferrer">
                <span>Buy now</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main App Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {config.brandName}. All rights reserved.</p>
      </footer>
    </div>
  )
}
