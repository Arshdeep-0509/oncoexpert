/**
 * Google reviews of Dr. Sunil Navalgund, shared by every page.
 * Each page lists the review ids it shows, in its own order (reviewsFor). A review can be
 * hidden on a page with excludeOn: ["<page slug>"].
 *
 * SOURCE: EXISTING (quotes from Google: never correct the reviewers' spelling or grammar).
 */
import type { Review } from "@/content/types";

export const googleReviews = [
  {
    id: "muralidharan-chinnusamy",
    author: "Muralidharan Chinnusamy",
    rating: 5,
    paragraphs: [
      "Dr.Sunil Navalgund is a care and compassionate surgeon who performed lump removal for my wife one and half years back and she is doing well. Thanking Dr.Sunil Navalgund and recommend him for Onco surgeries.",
    ],
  },
  {
    id: "veena-iyer",
    author: "Veena Iyer",
    rating: 5,
    paragraphs: [
      "I underwent a surgery with Dr Sunil..Very patient and understanding . Did a very good job . This clinical and post op instructions on follow up was very clear..",
    ],
  },
  {
    id: "shwetha-jayaraj",
    author: "shwetha jayaraj",
    rating: 5,
    paragraphs: [
      "Hi- We visited Sparsh Hospital for my mother's cancer treatment, and our experience was very positive. Dr. Sunil, who treated my mother, was exceptionally professional, knowledgeable, and compassionate. He took the time to explain the diagnosis and treatment plan in detail, ensuring that we understood every step of the process.",
      "What stood out the most was his calm and reassuring approach. Cancer treatment can be overwhelming for both patients and their families, but Dr. Sunil's patience, confidence, and positive attitude helped ease our fears and prevented unnecessary panic. He was always approachable and willing to answer our questions, which gave us great confidence throughout the treatment journey.",
      "We are truly grateful for the care, support, and guidance provided by Dr. Sunil and the team at Sparsh Hospital. Thank you for making a challenging time more manageable for our family.",
    ],
  },
  {
    id: "padmavathi-p",
    author: "padmavathi p",
    rating: 5,
    paragraphs: [
      "One of the finest doctor's i ever met a very good human being more than a doctor and his hands are safe, skilful and he is a very efficient surgeon",
      '" ವೈದ್ಯೋ ನಾರಾಯಣೊ ಹರಿ"',
      "ನಿಮ್ಮ ದಣಿವರಿಯದ ಸೇವೆ, ಸಹಾನುಭೂತಿಯಿಂದ ಇನ್ನಷ್ಟು ಮತ್ತಷ್ಟು ಜನರು ಗುಣಮುಖರಾಗಲೆಂದು ಆಶಿಸುತ್ತ ನಿಮಗೆ ಧನ್ಯವಾದಗಳನ್ನು ಅರ್ಪಿಸುತ್ತೇನೆ",
    ],
  },
  {
    id: "jayashree-ajith",
    author: "Jayashree Ajith",
    rating: 5,
    paragraphs: [
      "Dr.Sunil Navalgund is definitely a good Oncologist,I am absolutely fine now after the surgery, he is guiding me to have post surgery tests like scanning etc.",
    ],
  },
  {
    id: "friendly-work",
    author: "Friendly Work",
    rating: 5,
    paragraphs: ["Highly recommended doctor we are thankfully to you gods gift to cure patients"],
  },
  {
    id: "narasimhamurthy-sm",
    author: "Narasimhamurthy SM",
    rating: 5,
    paragraphs: ["Dr. Sunil Navalgund has provided good service to me."],
  },
  {
    id: "vasudeva-murthy",
    author: "Vasudeva Murthy",
    rating: 4,
    paragraphs: [
      "Review for Dr. Sunil Navalgund. Oncology surgen.",
      "Rating: ★★★★☆",
      "I am a 75-year-old patient who recently underwent surgery performed by Dr. Sunil Navalgund for Stage 3 colon cancer. I am writing this to express my sincere gratitude for his skill and professionalism during a very difficult time in my life.",
      "The surgery was successful, and I am now well on my road to recovery. Dr. Sunil Navalgund is clearly a very talented surgeon who knows his craft. He took the time to explain the procedure to me and my family, which helped ease some of our anxieties. The clinical outcome has been excellent, and for that, I am truly thankful to Dr Sunil Navalgund.",
      "In terms of the actual medical care and the success of the operation itself, I couldn't have asked for a better result.",
      "If you are facing a similar diagnosis, I would certainly recommend Dr. Sunil Navalgund.He is a man of great competence, and I am glad he was the one looking after me and he is epitome of simplicity.",
    ],
  },
  {
    id: "mangala-music",
    author: "mangala music",
    rating: 5,
    paragraphs: [
      "My mother was admitted for a surgery at sparsh hospital RR nagar, she was treated under the guidance of DR sunil Navanlgund and his team, with great care, Dr mrudul and all the medical team took good care of my mother, and she is back home healthy, thanks to the whole team of Dr sunil and sparsh hospital RR nagar",
    ],
  },
] as const satisfies readonly Review[];

export type ReviewId = (typeof googleReviews)[number]["id"];

/** The reviews a page shows, in its order, minus any excluded on that page. */
export function reviewsFor(slug: string, order: readonly ReviewId[]) {
  return order
    .map((id) => googleReviews.find((r) => r.id === id)!)
    .filter((r) => !((r as Review).excludeOn ?? []).includes(slug));
}

/** Average star rating, rounded to one decimal. */
export const averageRating = (reviews: readonly { rating: number }[]) =>
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

// SOURCE: NEW (review card labels, shared by every page)
export const reviewLabels = {
  postedOn: "Posted on Google",
  readMore: "Read more",
  readLess: "Read less",
  summary: (count: number) => `${count} Google reviews`,
  a11y: {
    region: "Patient reviews",
    rating: (n: number) => `Rated ${n} out of 5`,
    average: (avg: number) => `Average rating ${avg} out of 5`,
    previous: "Previous reviews",
    next: "Next reviews",
    goTo: (n: number, total: number) => `Go to review ${n} of ${total}`,
  },
} as const;
