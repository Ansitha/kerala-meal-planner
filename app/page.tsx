"use client";

import Link from "next/link";

export default function Home() {
  return (
<div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">



      {/* Header */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-extrabold text-green-700">
          Kerala Meal Planner
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Healthy Kerala meals, fitness goals & AI cooking assistant
        </p>
      </div>

      {/* Hero Section */}
      <div className="mt-10 flex justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="Kerala Food Icon"
          className="w-32 h-32 opacity-90"
        />
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-10">
        <Link
  href="/meals/add"
  className="bg-pink-100 p-5 rounded-xl shadow hover:bg-pink-200 transition"
>
  <h2 className="font-semibold text-xl text-pink-800">Add Meals</h2>
  <p className="text-sm text-gray-600">Create new meals</p>
</Link>

        <Link
          href="/planner/daily"
          className="bg-green-100 p-5 rounded-xl shadow hover:bg-green-200 transition"
        >
          <h2 className="font-semibold text-xl text-green-800">Daily Planner</h2>
          <p className="text-sm text-gray-600">Plan today’s meals</p>
        </Link>

        <Link
          href="/planner/weekly"
          className="bg-yellow-100 p-5 rounded-xl shadow hover:bg-yellow-200 transition"
        >
          <h2 className="font-semibold text-xl text-yellow-800">Weekly Planner</h2>
          <p className="text-sm text-gray-600">Plan full week</p>
        </Link>

        <Link
          href="/ingredients"
          className="bg-blue-100 p-5 rounded-xl shadow hover:bg-blue-200 transition"
        >
          <h2 className="font-semibold text-xl text-blue-800">Ingredients</h2>
          <p className="text-sm text-gray-600">Add what you have</p>
        </Link>

        <Link
          href="/recipes"
          className="bg-red-100 p-5 rounded-xl shadow hover:bg-red-200 transition"
        >
          <h2 className="font-semibold text-xl text-red-800">Recipes</h2>
          <p className="text-sm text-gray-600">Kerala + AI recipes</p>
        </Link>

        <Link
          href="/voice"
          className="bg-purple-100 p-5 rounded-xl shadow hover:bg-purple-200 transition col-span-2"
        >
          <h2 className="font-semibold text-xl text-purple-800">Voice Assistant</h2>
          <p className="text-sm text-gray-600">Cook hands-free</p>
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        Made with ❤️ for Kerala food lovers
      </div>
    </div>
  );
}
