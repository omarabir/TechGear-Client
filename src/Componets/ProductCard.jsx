import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
        className="h-44 w-full object-cover rounded"
        src={product.image}
        alt={product.title}
      />
      <h3 className="mt-3 font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-lg font-bold">${product.price}</div>
        <Link href={`/products/${product._id}`} className="text-sm underline">
          Details
        </Link>
      </div>
    </div>
  );
}
