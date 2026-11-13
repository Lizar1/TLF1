// Business facts shown on the landing page.

export const config = {
  // The first word shows in white and the rest in gold.
  brandName: "Virtual Currency",
  funpayUrl: "https://funpay.com/en/users/4284643/",

  // The "Stay updated" form sends {"email": "..."} here with a POST request.
  wishlistUrl: "http://localhost:8000/api/wishlist",

  stats: {
    rating: "5.0",
    reviewCount: 96,
    ordersCompleted: "190+",
    repeatCustomerRate: "25%",
  },

  // Anonymous quotes from real FunPay reviews, translated into English.
  reviews: [
    "Money arrived instantly, I recommend it to everyone",
    "Did everything fast, recommend",
    "Fast, good price",
    "Very fast, everything is great",
  ],
}
