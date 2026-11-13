import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { config } from "@/lib/config"

const navLinks = [
  { href: "#what-i-do", label: "What I do" },
  { href: "#why-it-works", label: "Why it works" },
  { href: "#results", label: "Results" },
]

const [brandFirstWord, ...brandOtherWords] = config.brandName.split(" ")

function BrandMark({ compact = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-b from-primary to-primary-deep text-primary-foreground">
        <Coins className="h-5 w-5" />
      </span>
      <span
        className={cn(
          "font-heading text-lg font-medium tracking-tight text-foreground",
          compact && "hidden sm:inline"
        )}
      >
        {brandFirstWord} <span className="text-primary">{brandOtherWords.join(" ")}</span>
      </span>
    </span>
  )
}

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-transparent transition-colors",
          scrolled && "border-border bg-background/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-17 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" aria-label={`${config.brandName} home`} className="transition-opacity hover:opacity-90">
            <BrandMark compact />
          </Link>

          <nav aria-label="Main" className="flex items-center rounded-full bg-card/80 p-1 backdrop-blur-md sm:gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                size="nav"
                className="h-9 rounded-full px-2 text-[13px] text-foreground/85 sm:px-4 sm:text-sm"
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <BrandMark />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Educational project. Not affiliated with Mojang, Microsoft or any online game operator.
          </p>
        </div>
      </footer>
    </div>
  )
}
