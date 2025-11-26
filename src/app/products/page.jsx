"use client";
import ProductCard from "@/Componets/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState(""); // search query
  const [sort, setSort] = useState(""); // price sort

  // fetch products from backend with search & sort
  async function fetchProducts() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          params: {
            search: q,
            sort: sort,
          },
        }
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  }

  // refetch whenever search query or sort changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 400); // debounce 400ms

    return () => clearTimeout(timer);
  }, [q, sort]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="text-gray-600">Browse and explore our products.</p>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />

        {/* Price Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.length > 0 ? (
          products.map((p) => <ProductCard key={p._id} product={p} />)
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
