import { getBanglaDate } from "@/lib/utils";
import Image from "next/image";

export default function Hero() {
  const banglaDate = getBanglaDate();

  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-white border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <span className="inline-block text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5 mb-3">
            {banglaDate}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h2>
          <p className="text-sm text-gray-600 mb-5 max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-success btn-sm text-white">
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div className="flex-1 flex justify-center">
  <Image
    src="/bazar-hero.png"
    alt="বাজারের ঝুড়ি"
    width={320}
    height={240}
    priority
    className="w-48 md:w-72 h-auto"
  />
</div>
        </div>
      </div>
    </section>
  );
}