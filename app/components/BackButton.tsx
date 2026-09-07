"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      ← Back
    </button>
  );
}
