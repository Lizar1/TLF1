# Landing Page Plan

## Purpose and audience
The page explains the business to school staff: an economics teacher, an entrepreneurship teacher and a university counsellor. They have never played games like this and do not know gaming or internet slang. They do understand business and economics vocabulary. The page is not a shop: no buy buttons and no prices.

## The business, in business terms
- **Product:** virtual currency for an online game.
- **Supply side:** many accounts earn this currency by trading inside the game's own market, like buying low and selling high.
- **Demand side:** other players want to progress faster and prefer to pay money instead of spending many hours earning the currency themselves.
- **Sales channel:** an online marketplace where thousands of buyers are already looking.
- **Competitive advantage:** software delivers the product instantly after payment. Most competitors deliver by hand, so prices can stay above the lowest in the market and still win orders.
- **Customer retention:** 25% of customers buy again, helped by a small bonus for leaving a review.
- **Results:** 5.0 seller rating, 96 reviews, 190+ completed orders.

## Page structure
1. Hero: "I turn game time into real income", one plain sentence, main button "See how it works", small link "View my FunPay profile"
2. What is an in-game economy? Short explainer and icon row: Players earn, Currency, Players trade
3. What I do: four-step visual flow from supply to delivery
4. Why it works: competitive advantage, sales channel, customer retention
5. Results: four stats, then anonymous review quote cards
6. What's next: Python backend and dashboard to track revenue, prices and repeat customers, as a tool for the seller
7. Footer: educational project disclaimer

Navigation: What I do, Why it works, Results.

## Removed
Price section, per-unit prices, order FAQ, wish list form, buy buttons, and all image placeholders. Cards use icons only.

## Writing rules
- English only. Short sentences that a 14-year-old can follow.
- Forbidden unless explained in plain words right where they appear: server, SMP, wipe, grind, farm, OP, 1kk, "/pay", bot, nickname, account (as in game account).
- Use normal terms: virtual currency, online marketplace, buyers and sellers, supply and demand, price per unit, repeat customers, revenue, competitive advantage, automation.
- Do not name the game server. Say "a popular online multiplayer game".
- Mention Minecraft only once, as an example: "a well-known video game where players build and trade in a shared online world".
- Define these in one sentence the first time they appear:
  - in-game currency: virtual money that exists only inside a game, used to buy items and services
  - marketplace: a website where independent sellers offer products to buyers (like eBay)
  - automated delivery: software that sends the product to the buyer immediately, without me doing it by hand

## Decisions made to follow the rules
- The visible brand is "Virtual Currency", because "SMP" cannot be explained inside the logo. It is set by `brandName` in `src/lib/config.js`.
- The footer says "any online game operator" instead of "any game server", because "server" is on the forbidden list.

## Design
Keep the dark background, gold accent, rounded cards, starfield and the original voxel gold coin. Responsive on phones. No official Minecraft or game server logos.

## Constraints
- Only edit files in `src/` and `specs/`
- Do not change `package.json` or run `npm audit fix`
- No buyer nicknames in the code or specs
- Follow `agent.md`: reuse UI primitives, theme tokens, Lucide icons, lint and build clean
