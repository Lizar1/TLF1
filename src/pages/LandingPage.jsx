import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ChartLine,
  Clock,
  Coins,
  CreditCard,
  ExternalLink,
  Repeat,
  Send,
  Star,
  Store,
  Tag,
  Zap,
} from "lucide-react"
import VoxelCoin from "@/components/landing/VoxelCoin"
import { cn } from "@/lib/utils"
import { config } from "@/lib/config"

const { brandName, funpayUrl, wishlistUrl, stats, reviews } = config

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6"
const sectionSpacing = "flex scroll-mt-24 flex-col gap-10 pb-20 sm:pb-28"

const Term = ({ children }) => <span className="font-medium text-foreground">{children}</span>

const economyFlow = [
  {
    icon: Clock,
    title: "Players earn",
    body: "Players earn currency by spending time in the game.",
  },
  {
    icon: Coins,
    title: "Currency",
    body: "The currency works like money. It has value because other players want it.",
  },
  {
    icon: ArrowLeftRight,
    title: "Players trade",
    body: "Buyers and sellers exchange items at a market price. Some buy low and sell high.",
  },
]

const businessFlow = [
  {
    icon: ArrowLeftRight,
    title: "I create the supply",
    body: (
      <>
        I run many <Term>accounts</Term>, which are separate player profiles in the game. They earn
        currency by trading in the game's own market, like buying low and selling high.
      </>
    ),
  },
  {
    icon: Coins,
    title: "I collect the currency",
    body: "The earnings build up over time. I collect them into one stock, ready to sell.",
  },
  {
    icon: CreditCard,
    title: "A buyer pays online",
    body: "Other players want to progress faster. They prefer to pay money instead of spending many hours earning the currency themselves.",
  },
  {
    icon: Send,
    title: "Software delivers instantly",
    body: (
      <>
        <Term>Automated delivery</Term> is software that sends the product to the buyer immediately,
        without me doing it by hand.
      </>
    ),
  },
]

const reasons = [
  {
    icon: Zap,
    title: "Competitive advantage",
    body: "Software delivers the product instantly after payment. Most competitors deliver by hand, so I can keep prices above the lowest in the market and still win orders.",
  },
  {
    icon: Store,
    title: "Sales channel",
    body: "I sell through an online marketplace where thousands of buyers are already looking.",
  },
  {
    icon: Repeat,
    title: "Customer retention",
    body: `${stats.repeatCustomerRate} of customers buy again. A small bonus for leaving a review helps.`,
  },
]

const statItems = [
  { value: stats.rating, label: "Seller rating, out of 5", star: true },
  { value: stats.reviewCount, label: "Customer reviews" },
  { value: stats.ordersCompleted, label: "Completed orders" },
  { value: stats.repeatCustomerRate, label: "Of customers buy again" },
]

const plannedTools = [
  { icon: ChartLine, title: "Revenue", body: "How much money the business earns over time." },
  { icon: Tag, title: "Price per unit", body: "How my prices change compared with the market." },
  { icon: Repeat, title: "Repeat customers", body: "How many customers buy again." },
]

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-primary sm:text-base">{eyebrow}</p>
        <h2 className="font-heading text-h2 leading-[1.08] font-light tracking-tight">{title}</h2>
      </div>
      <p className="text-lg leading-relaxed text-foreground/85">{children}</p>
    </div>
  )
}

function Panel({ className, ...props }) {
  return <Card className={cn("bg-card/90 p-3 backdrop-blur-md sm:p-4", className)} {...props} />
}

function Tile({ className, ...props }) {
  return <Card className={cn("bg-muted/50 p-5 shadow-none", className)} {...props} />
}

function IconBadge({ icon: Icon }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
      <Icon className="h-5 w-5" />
    </span>
  )
}

function InfoTile({ item, label }) {
  return (
    <Tile className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <IconBadge icon={item.icon} />
        {label && <span className="font-heading text-sm text-muted-foreground">{label}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-medium">{item.title}</h3>
        <p className="leading-relaxed text-muted-foreground">{item.body}</p>
      </div>
    </Tile>
  )
}

function Flow({ items, columns, numbered = false }) {
  return (
    <Panel>
      <ol className={cn("grid gap-4", columns)}>
        {items.map((item, index) => (
          <li key={item.title} className="relative">
            <InfoTile item={item} label={numbered ? `Step ${index + 1}` : undefined} />
            {index < items.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-6 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-primary lg:top-1/2 lg:-right-6 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2"
              >
                <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </Panel>
  )
}

function BlurredBlocks({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute grid grid-cols-3 gap-3 opacity-25 blur-2xl", className)}
    >
      <span className="col-start-2 h-24 w-24 bg-foreground" />
      <span className="col-start-1 row-start-2 h-24 w-24 bg-foreground" />
      <span className="col-start-2 row-start-2 h-24 w-24 bg-foreground" />
      <span className="col-start-3 row-start-2 h-24 w-24 bg-foreground" />
    </div>
  )
}

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 glow-gold" />
      <BlurredBlocks className="-bottom-16 left-[8%] hidden sm:grid" />
      <BlurredBlocks className="top-20 -right-16 hidden lg:grid" />
      <VoxelCoin
        dimOnScroll
        className="absolute top-1/2 right-[-8vw] hidden w-[min(62vw,104vh)] max-w-none -translate-y-1/2 lg:block"
      />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative">
      <div
        className={cn(
          container,
          "grid items-center gap-6 py-14 sm:py-20 lg:min-h-[min(calc(100svh-4.25rem),52rem)] lg:grid-cols-2 lg:py-10"
        )}
      >
        <div className="flex flex-col items-start gap-6 duration-700 animate-in fade-in slide-in-from-bottom-3 motion-reduce:animate-none">
          <p className="text-sm font-medium text-primary sm:text-base">
            An online business, explained in two minutes
          </p>
          <h1 className="font-heading text-hero leading-[1.03] font-light tracking-tight">
            I turn game time into <span className="text-primary">real income.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
            I sell virtual currency for a popular online multiplayer game to players who would
            rather pay than spend many hours earning it.
          </p>
          <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
            <a href="#economy">
              See how it works
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <div className="flex flex-col items-start gap-1">
            <Button asChild variant="link" className="h-auto px-0">
              <a href={funpayUrl} target="_blank" rel="noopener noreferrer">
                View my FunPay profile
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              FunPay is a <Term>marketplace</Term>, a website where independent sellers offer
              products to buyers, like eBay.
            </p>
          </div>
        </div>

        <VoxelCoin className="mx-auto max-w-sm lg:hidden" />

        <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-sm text-muted-foreground lg:block">
          Scroll to turn the coin
        </p>
      </div>
    </section>
  )
}

function Economy() {
  return (
    <section id="economy" className={cn(container, sectionSpacing)}>
      <SectionHeading eyebrow="The basics" title="What is an in-game economy?">
        <Term>In-game currency</Term> is virtual money that exists only inside a game, used to buy
        items and services. Many online games have a full economy around it, with buyers, sellers
        and prices set by supply and demand. One example is Minecraft, a well-known video game where
        players build and trade in a shared online world.
      </SectionHeading>
      <Flow items={economyFlow} columns="lg:grid-cols-3" />
    </section>
  )
}

function WhatIDo() {
  return (
    <section id="what-i-do" className={cn(container, sectionSpacing)}>
      <SectionHeading eyebrow="What I do" title="Four steps, from supply to sale.">
        My product is virtual currency for an online game. I produce the supply, reach the buyers
        and deliver the product.
      </SectionHeading>
      <Flow items={businessFlow} columns="lg:grid-cols-4" numbered />
    </section>
  )
}

function WhyItWorks() {
  return (
    <section id="why-it-works" className={cn(container, sectionSpacing)}>
      <SectionHeading eyebrow="Why it works" title="Strong demand and a clear advantage.">
        Demand comes from players who value their time. Automation lets me serve them faster than
        most other sellers.
      </SectionHeading>
      <Panel className="grid gap-3 md:grid-cols-3">
        {reasons.map((reason) => (
          <InfoTile key={reason.title} item={reason} />
        ))}
      </Panel>
    </section>
  )
}

function Results() {
  return (
    <section id="results" className={cn(container, sectionSpacing)}>
      <SectionHeading eyebrow="Results" title="Real customers, real results.">
        These numbers come from my seller profile on the marketplace. The reviews are real. They are
        translated into English, and names are removed.
      </SectionHeading>

      <Card className="grid grid-cols-2 gap-px overflow-hidden bg-border lg:grid-cols-4">
        {statItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 bg-card p-5 sm:p-7">
            <p className="flex items-center gap-2 font-heading text-4xl font-medium text-primary sm:text-5xl">
              {item.value}
              {item.star && <Star className="h-6 w-6 fill-primary" aria-hidden="true" />}
            </p>
            <p className="text-sm text-muted-foreground sm:text-base">{item.label}</p>
          </div>
        ))}
      </Card>

      <Panel className="flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((quote) => (
            <Tile key={quote} className="flex flex-col gap-4">
              <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="font-heading text-lg leading-snug">“{quote}”</blockquote>
            </Tile>
          ))}
        </div>
        <p className="px-2 pb-1 text-sm text-muted-foreground">
          In these reviews, “money” means the virtual currency.
        </p>
      </Panel>
    </section>
  )
}

function WhatsNext() {
  return (
    <section className={cn(container, sectionSpacing)}>
      <SectionHeading eyebrow="What's next" title="Building my own business tools.">
        I am building software in Python, a programming language, to track my sales, prices and
        repeat customers. It has a backend, the part that stores and handles data. It also has a
        dashboard, a screen that shows the key numbers in one place. It is a tool for me, the seller.
      </SectionHeading>
      <Panel className="grid gap-3 border-primary/40 sm:grid-cols-3">
        {plannedTools.map((tool) => (
          <InfoTile key={tool.title} item={tool} />
        ))}
      </Panel>
    </section>
  )
}

const wishlistMessages = {
  success: "Thank you. You are on the list.",
  error: "Something went wrong. Please try again later.",
}

function StayUpdated() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch(wishlistUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setEmail("")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className={cn(container, "pb-20 sm:pb-28")}>
      <Panel className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-medium sm:text-3xl">Stay updated</h2>
          <p className="text-muted-foreground">Leave your email to hear how the project grows.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="wishlist-email" className="sr-only">
              Email address
            </label>
            <Input
              id="wishlist-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-full bg-background/60 px-5"
            />
            <Button type="submit" variant="gold" size="xl" disabled={status === "sending"}>
              {status === "sending" ? "Joining..." : "Join the list"}
            </Button>
          </div>
          <p
            role="status"
            className={cn("min-h-5 px-1 text-sm", status === "error" ? "text-destructive" : "text-primary")}
          >
            {wishlistMessages[status]}
          </p>
        </form>
      </Panel>
    </section>
  )
}

export default function LandingPage() {
  useEffect(() => {
    document.title = `${brandName} | How My Online Business Works`
  }, [])

  return (
    <>
      <Backdrop />
      <div className="relative z-10">
        <Hero />
        <Economy />
        <WhatIDo />
        <WhyItWorks />
        <Results />
        <WhatsNext />
        <StayUpdated />
      </div>
    </>
  )
}
