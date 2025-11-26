// client/src/app/page.js
import Link from "next/link";
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  Users,
  BarChart3,
  Mail,
  MapPin,
} from "lucide-react";
import ProductCard from "@/Componets/ProductCard";

// এই পেজটি একটি সার্ভার কম্পোনেন্ট (কোনো "use client" নেই)

const features = [
  {
    icon: Zap,
    title: "Lightning Speed",
    description:
      "Experience instant performance with our optimized technology.",
  },
  {
    icon: ShieldCheck,
    title: "Secured Transactions",
    description:
      "Your payment details are always safe with our robust encryption.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Get your gears delivered to your doorstep in record time.",
  },
];

const statsData = [
  { value: "50K+", title: "Happy Customers" },
  { value: "99%", title: "Satisfaction Rate" },
  { value: "4.9", title: "Average Rating" },
];

const testimonials = [
  {
    name: "Rafiq A.",
    quote:
      "The build quality of their latest laptop is exceptional. Great value for money!",
    avatar: "https://i.pravatar.cc/150?u=rafiq",
  },
  {
    name: "Sumi K.",
    quote:
      "Fast delivery and responsive customer service. My go-to place for electronics now.",
    avatar: "https://i.pravatar.cc/150?u=sumi",
  },
  {
    name: "Tarik H.",
    quote:
      "The dashboard is so easy to use! Managing my product list is a breeze.",
    avatar: "https://i.pravatar.cc/150?u=tarik",
  },
];

import axios from "axios";

async function fetchProducts() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return res.data;
  } catch (err) {
    console.error("Failed to load products:", err);
    return [];
  }
}

const HomePage = async () => {
  let featuredProducts = [];

  try {
    const products = await fetchProducts();
    featuredProducts = products.slice(0, 6); // first 3 products
  } catch (error) {
    console.error("Could not load products for home page:", error.message);
  }
  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION (Unique Full-Width Banner) */}
      <section className="hero min-h-[80vh] bg-neutral text-white relative">
        <div className="hero-content text-center max-w-5xl z-10">
          <div className="px-4 py-16">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4 animate-fadeIn">
              Future <span className="text-secondary">Tech</span>, Today's
              Hands.
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light text-neutral-content/80 max-w-2xl mx-auto">
              The ultimate destination for next-generation gadgets and
              electronics managed seamlessly.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/products"
                className="btn btn-primary btn-lg shadow-xl shadow-primary/30 transform hover:scale-105 transition-transform font-bold"
              >
                <ShoppingCart /> Explore Products
              </Link>
              <Link
                href="/about"
                className="btn btn-outline btn-lg text-neutral-content border-neutral-content/50 hover:bg-neutral-content/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent opacity-80 z-0"></div>
      </section>

      {/* 2. CORE FEATURES/SERVICES */}
      <section className="py-24 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-secondary">
            Our Core Commitments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 p-8 shadow-xl transition-transform duration-300 hover:scale-[1.05] border-t-4 border-primary"
              >
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Placeholder Grid) */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Handpicked For You
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Check out the top-rated items in our store.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p className="col-span-3 text-center text-red-500">
              Could not load featured products at the moment.
            </p>
          )}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn btn-outline btn-secondary font-semibold"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* 4. STATS / ACHIEVEMENTS */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            By The Numbers
          </h2>
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-white border border-primary/20">
            {statsData.map((stat, index) => (
              <div key={index} className="stat p-8">
                <div className="stat-figure text-primary">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-value text-secondary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS/REVIEWS */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
          Trusted by thousands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-info"
            >
              <p className="italic text-gray-600 mb-4">"{review.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={review.avatar} alt={review.name} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-primary">{review.name}</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (Large & Bold) */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-extrabold mb-4">
            Ready to find your next Tech Gear?
          </h3>
          <p className="text-xl mb-6 font-light">
            Join the revolution and experience seamless technology management.
          </p>
          <Link
            href="/login"
            className="btn btn-warning btn-lg shadow-lg shadow-warning/50"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* 7. CONTACT INFO / LOCATION MAP (Simple Footer Section) */}
      <section className="py-16 bg-base-300">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold">Email Us</h4>
            <p className="text-gray-600">support@techgear.com</p>
          </div>
          <div>
            <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold">Visit Our Hub</h4>
            <p className="text-gray-600">Dhaka, Bangladesh</p>
          </div>
          <div>
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold">Follow Us</h4>
            <p className="text-gray-600">@TechGearHub (See Footer)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
