"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function DateBadge() {
  const date = useSyncExternalStore(
    () => () => {},
    getBanglaDate, // browser e
    () => ""       // server e (khali thake)
  );

  return (
    <span className="inline-block text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5 mb-3 min-h-5 min-w-32">
      {date}
    </span>
  );
}