// PLACEHOLDER — replace with real customer reviews before launch.
// While REVIEWS_ARE_SAMPLES is true the site shows a "sample reviews" note and
// no rating markup is emitted to search engines (see src/lib/schema.ts).
// Once real reviews are wired in (Judge.me / Trustpilot / Shopify), set it to false.
export const REVIEWS_ARE_SAMPLES = true

export interface Review {
  id: string
  handle: string
  rating: 1 | 2 | 3 | 4 | 5
  title: string
  body: string
  author: string
  city: string
  date: string
  verified: boolean
}

export const reviews: Review[] = [
  {
    id: "r1",
    handle: "dates-honey-pm-essence",
    rating: 5,
    title: "My skin finally stopped feeling tight after AC all day",
    body: "Office AC wrecks my skin by evening. Two weeks of the PM essence and I wake up with skin that feels calm and plump. One step instead of four is a bonus.",
    author: "Sample customer",
    city: "Abu Dhabi",
    date: "2026-09-02",
    verified: false,
  },
  {
    id: "r2",
    handle: "dates-coffee-am-essence",
    rating: 5,
    title: "Doesn't pill under sunscreen, even in August",
    body: "Light, absorbs in a minute, and my sunscreen sits on top without sliding off when I step outside. It replaced my serum and moisturiser in the morning.",
    author: "Sample customer",
    city: "Dubai",
    date: "2026-08-21",
    verified: false,
  },
  {
    id: "r3",
    handle: "am-to-pm-combo",
    rating: 5,
    title: "The easiest routine I've had",
    body: "Sunrise in the morning, Sunset at night, done. Delivery came the next day to Sharjah.",
    author: "Sample customer",
    city: "Sharjah",
    date: "2026-08-14",
    verified: false,
  },
  {
    id: "r4",
    handle: "dates-honey-pm-essence",
    rating: 4,
    title: "Gentle on sensitive skin",
    body: "I react to almost everything. No redness at all with this one. Would love a bigger bottle.",
    author: "Sample customer",
    city: "Al Ain",
    date: "2026-07-30",
    verified: false,
  },
  {
    id: "r5",
    handle: "skinsip-quencher",
    rating: 5,
    title: "Ice still there at the end of the day",
    body: "Left it in the car at the beach and the water was still cold hours later. Fits the cup holder too.",
    author: "Sample customer",
    city: "Dubai",
    date: "2026-07-18",
    verified: false,
  },
  {
    id: "r6",
    handle: "sip-and-glow-combo",
    rating: 5,
    title: "Good gift",
    body: "Bought it for my sister who just moved here. She uses both daily.",
    author: "Sample customer",
    city: "Ras Al Khaimah",
    date: "2026-07-05",
    verified: false,
  },
]

export const reviewsFor = (handle?: string) => (handle ? reviews.filter((r) => r.handle === handle) : reviews)

export const ratingSummary = (list: Review[]) => {
  const count = list.length
  const average = count ? list.reduce((n, r) => n + r.rating, 0) / count : 0
  const distribution = ([5, 4, 3, 2, 1] as const).map((star) => ({ star, count: list.filter((r) => r.rating === star).length }))
  return { count, average, distribution }
}
