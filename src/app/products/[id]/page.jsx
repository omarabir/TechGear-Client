import axios from "axios";
import Link from "next/link";

export default async function Page({ params }) {
  const id = params.id;
  let p = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    p = res.data;
    console.log(p);
  } catch (error) {
    console.error(error);
    return <div className="p-6">Not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={p.image}
        alt={p.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{p.title}</h1>
      <p className="text-gray-700 mt-2">{p.fullDescription}</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="text-xl font-bold">${p.price}</div>
      </div>
      <div className="mt-6">
        <Link href="/products" className="underline">
          Back to products
        </Link>
      </div>
    </div>
  );
}
