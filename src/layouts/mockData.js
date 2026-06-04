export const MOCK_CATEGORIES = [
  { id: 1, name: "T-Shirts", description: "Premium cotton tees with minimalist cuts" },
  { id: 2, name: "Shirts", description: "Classic Oxford and casual linen shirts" },
  { id: 3, name: "Hoodies", description: "Cozy fleece and streetwear hoodies" },
  { id: 4, name: "Jackets", description: "All-weather jackets and tailored coats" },
  { id: 5, name: "Pants", description: "Everyday chinos, joggers, and tailored trousers" },
  { id: 6, name: "Shorts", description: "Relaxed fit and active lifestyle shorts" },
  { id: 7, name: "Accessories", description: "Caps, leather bags, and daily essentials" }
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Classic White Crewneck Tee",
    price: 29.00,
    description: "Crafted from 100% long-staple Supima cotton. Offers an exceptionally soft feel, durable structure, and clean look. Perfect for layering or wearing on its own.",
    stockQuantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 1
  },
  {
    id: 2,
    name: "Minimalist Charcoal Tee",
    price: 29.00,
    description: "Slightly relaxed fit tee made from premium mid-weight French cotton. Breathable, comfortable, and retains color after multiple washes.",
    stockQuantity: 18,
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 1
  },
  {
    id: 3,
    name: "Oxford Button-Down Shirt",
    price: 59.00,
    description: "The quintessential casual shirt. Made from a durable, thick Oxford cotton weave with an elegant button-down collar and tailored comfortable chest fit.",
    stockQuantity: 32,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 2
  },
  {
    id: 4,
    name: "Linen Casual Summer Shirt",
    price: 65.00,
    description: "Lightweight and moisture-wicking premium dynamic linen blend. Relaxed fit, long-sleeve, roll-up tabs. Perfect for warm sunny getaways.",
    stockQuantity: 12,
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 2
  },
  {
    id: 5,
    name: "Heavyweight Fleece Hoodie",
    price: 79.00,
    description: "Indulge in absolute warmth with our signature double-lined heavyweight hoodie. Subtle dropped shoulders, knit rib cuffs, and roomy kangaroo pockets.",
    stockQuantity: 25,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 3
  },
  {
    id: 6,
    name: "Premium Denim Utility Jacket",
    price: 99.00,
    description: "Rugged yet modern. Handcrafted from raw selvedge denim that breaks in over time to create a unique personalized patina. Fitted with dual chest pockets.",
    stockQuantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 4
  },
  {
    id: 7,
    name: "Classic Beige Tailored Chinos",
    price: 69.00,
    description: "Stretch-engineered cotton twill trousers. A slim, modern taper that goes perfectly from desk to casual dinner dates. Water-resistant finish.",
    stockQuantity: 28,
    imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 5
  },
  {
    id: 8,
    name: "Everyday Cotton Lounge Shorts",
    price: 39.00,
    description: "Super soft terry lined drawcord shorts. Perfect length hitting just above the knees with dual side zip pockets and a rear secure card slip.",
    stockQuantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 6
  },
  {
    id: 9,
    name: "Waxed Canvas Tote Bag",
    price: 89.00,
    description: "Extremely durable, water-resistant heavy-duty waxed canvas paired with oil-tanned leather straps. Internal laptop compartment fits up to 16 in laptop.",
    stockQuantity: 10,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 7
  },
  {
    id: 10,
    name: "Classic unstructured Cotton Cap",
    price: 25.00,
    description: "Soft feel cotton twill with an adjustable silver-tone buckle clasp. Unstructured 6-panel design with a pre-curved visor for effortless weekend styling.",
    stockQuantity: 50,
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
    categoryProductId: 7
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Minimalist Dressing",
    content: "In a world of fast fashion and endless choices, building a minimalist capsule wardrobe can bring clarity and order. Discover the essential high-quality basics you need to own. By selecting timeless cuts, monochromatic color schemes (whites, grays, black, navy, beige), and focusing on high-quality natural textile blends like organic cotton and merino wool, you can build a highly versatile lineup that is both effortless and stylish.",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?max&w=1200",
    createdDate: "2026-05-15T09:00:00Z",
    categoryName: "Fashion Guide"
  },
  {
    id: 2,
    title: "Sustainable Fashion: Why Quality Matters",
    content: "Why investing in better, long-lasting fabrics pays off for both your wallet and the planet. We explore the lifecycle of Supima cotton and selvedge denim. Cheap, fast-fashion alternatives wear out after just a few wash cycles, forcing you to buy repeatedly. High-quality garments withstand years of use, maintaining their shape, fit, and color, resulting in a lower lifetime cost and a healthier environmental footprint.",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?max&w=1200",
    createdDate: "2026-05-28T14:30:00Z",
    categoryName: "Sustainability"
  },
  {
    id: 3,
    title: "How to Style Linen in Any Season",
    content: "Linen is often pigeonholed as a summer-only fabric. Here are three creative ways to wear linen button-downs paired with sweaters and light outerwear when transition season arrives. Layering a linen shirt under a knit merino wool sweater adds textured contrast, whereas teaming linen pants with a premium tailored wool coat strikes the perfect balance between smart-casual and elevated weekend luxury.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?max&w=1200",
    createdDate: "2026-06-02T08:15:00Z",
    categoryName: "Fashion Guide"
  }
];

export const MOCK_BLOG_CATEGORIES = [
  { id: 1, name: "Fashion Guide", description: "Styling advice and capsule wardrobe configurations" },
  { id: 2, name: "Sustainability", description: "Eco-friendly fabrics and mindful consumption guidelines" }
];
