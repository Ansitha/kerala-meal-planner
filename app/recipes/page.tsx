"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import BackButton from "@/app/components/BackButton";

export default function AiRecipes() {
  const [type, setType] = useState("breakfast");
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    try {
      setLoading(true);
      setRecipe(null);

      const res = await fetch("/api/ai-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      const data = await res.json();
      setRecipe(data.recipe);
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async () => {
    if (!recipe) return;

    const name = recipe.split("\n")[0];

    await addDoc(collection(db, "meals"), {
      name,
      type,
      category: "AI Generated",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white p-6">
      <BackButton />

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-300">
          AI Recipe Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          Smart Kerala-style recipes created instantly with AI
        </p>
      </div>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-green-200 dark:border-gray-700">

        {/* Select Meal Type */}
        <label className="block mb-2 font-semibold text-green-700 dark:text-green-300">
          Choose Meal Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mb-6"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={generateRecipe}
          disabled={loading}
          className={`w-full py-3 rounded-lg shadow text-white transition 
            ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6 flex items-center gap-3 text-green-600 dark:text-green-300">
            <div className="animate-spin h-6 w-6 border-4 border-green-400 border-t-transparent rounded-full"></div>
            <p className="text-lg font-medium">Cooking up your recipe…</p>
          </div>
        )}

        {/* Recipe Card */}
        {recipe && !loading && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-xl shadow animate-fadeIn">
            <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-300">
              AI Generated Recipe
            </h3>

            <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
              {recipe}
            </pre>

            <button
              onClick={saveRecipe}
              className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Save to Meals
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
