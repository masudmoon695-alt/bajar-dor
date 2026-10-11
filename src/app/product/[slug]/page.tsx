import { formatPrice, toBengaliNumber, getUnitBn, type Product } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(slug: string): Promise<Product | null> {
  
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  
  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const minMarket = product.markets.find((m) => m.min === minPrice)?.market;
  const maxMarket = product.markets.find((m) => m.max === maxPrice)?.market;
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const fmt = (n: number) =>
    Number.isInteger(n) ? formatPrice(n) : toBengaliNumber(n.toFixed(2));

  const { dir, pct } = product.change;
  const diff = Math.abs(product.today - product.yesterday);
  const dirText = dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত আছে";
  const dirColor = dir === "up" ? "text-red-600" : "text-green-600";

  const cards = [
    { label: "সর্বনিম্ন দাম", value: minPrice, note: minMarket, color: "text-green-600" },
    { label: "সর্বোচ্চ দাম", value: maxPrice, note: maxMarket, color: "text-red-600" },
    { label: "গড় দাম", value: avgPrice, note: `${getUnitBn(product.unit)}-এর হিসাবে`, color: "text-green-600" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
     
      <div className="breadcrumbs text-xs text-gray-500 mb-3">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="text-gray-700">{product.nameBn}</li>
        </ul>
      </div>

     
      <div className="bg-white border rounded-xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="w-16 h-16 rounded-xl bg-gray-50 border flex items-center justify-center text-4xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.nameBn}</h1>
            <p className="text-xs text-gray-500">
              {getUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              গতকালের তুলনায় আজ দাম <b>{dirText}</b>
              {dir !== "flat" && <> · {toBengaliNumber(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg px-6 py-3 text-center">
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-800">{formatPrice(product.today)}</p>
          <p className="text-[11px] text-gray-500">
            টাকা / {getUnitBn(product.unit).replace("প্রতি ", "")}
          </p>
          <p className={`text-xs font-semibold mt-1 ${dirColor}`}>
            {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} {toBengaliNumber(Math.abs(pct).toFixed(1))}%
          </p>
        </div>
      </div>

  
      <div className="bg-white border rounded-xl p-5">
        <h2 className="font-bold text-gray-800 mb-3">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {cards.map((c) => (
            <div key={c.label} className="border rounded-lg p-4">
              <p className="text-[11px] text-gray-500">{c.label}</p>
              <p className={`text-2xl font-bold ${c.color}`}>
                {formatPrice(c.value)} <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-1">{c.note}</p>
            </div>
          ))}
        </div>

     
        <h3 className="font-bold text-gray-800 mb-3">বাজারভিত্তিক আজকের দাম</h3>
        <div className="border rounded-lg overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={m.market}>
                  <td>{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{fmt(m.min)} টাকা</td>
                  <td className="text-right">{fmt(m.max)} টাকা</td>
                  <td className="text-right font-semibold">{fmt((m.min + m.max) / 2)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}