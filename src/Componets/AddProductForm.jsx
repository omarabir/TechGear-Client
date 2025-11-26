"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProductForm() {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    priority: "normal",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          ...form,
          price: parseFloat(form.price || 0),
        }
      );
      console.log("API URL:", `${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      setMsg({ type: "success", text: "Product added" });
      setForm({
        title: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        priority: "normal",
        image: "",
      });
    } catch (err) {
      setMsg({ type: "error", text: err?.response?.data?.message || "Failed" });
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 3000);
    }
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <input
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <input
        required
        value={form.shortDescription}
        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
        placeholder="Short description"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={form.fullDescription}
        onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
        placeholder="Full description"
        className="w-full border p-2 rounded"
      />
      <input
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
        className="w-full border p-2 rounded"
      />
      <input
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="Image URL (optional)"
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2">
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>
      {msg && (
        <div
          className={`p-2 rounded ${
            msg.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {msg.text}
        </div>
      )}
    </form>
  );
}
