"use client";

import { useSession } from "next-auth/react";
import axios from "axios";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageProducts() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    fetchList();
  }, [status, router]);

  async function fetchList() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    );
    setProducts(res.data);
  }

  async function del(id) {
    if (!confirm("Delete?")) return;
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  }

  if (status === "loading") return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <div className="flex gap-4">
              <img src={p.image} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {p.shortDescription}
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href={`/products/${p.id}`} className="underline">
                    View
                  </Link>
                  <button onClick={() => del(p.id)} className="text-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
