"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import BackButton from "@/app/components/BackButton";

export default function AddMeal() {
  const [name, setName] = useState("");
  const [type, setType] = useState("dinner");
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const [message, setMessage] = useState("");
  const [meals, setMeals] = useState<any[]>([]);
  const [editingMeal, setEditingMeal] = useState<any | null>(null);
  const [aiMeal, setAiMeal] = useState<string | null>(null);
const [aiMealDetails, setAiMealDetails] = useState<any | null>(null);
const [loadingAi, setLoadingAi] = useState(false);


  // Fetch meals live
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "meals"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeals(list);
    });

    return () => unsub();
  }, []);
const handleGenerateAiMeal = async () => {
  try {
    setLoadingAi(true);
    setAiMeal(null); // clear previous result

    const res = await fetch("/api/ai-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();
    setAiMeal(data.recipe);
  } catch (err) {
    console.error("AI Meal Error:", err);
  } finally {
    setLoadingAi(false);
  }
};










  const handleAddMeal = async () => {
    if (!name.trim()) {
      setMessage("Meal name cannot be empty.");
      return;
    }

    await addDoc(collection(db, "meals"), {
      name,
      type,
      category,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    });

    setMessage("Meal added successfully!");
    setName("");
    setCategory("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "meals", id));
  };

  const handleEdit = (meal: any) => {
    setEditingMeal(meal);
    setName(meal.name);
    setType(meal.type);
    setCategory(meal.category || "");
    setCalories(meal.calories || "");
    setProtein(meal.protein || "");
    setCarbs(meal.carbs || "");
    setFat(meal.fat || "");
  };

const handleUpdateMeal = async () => {
  if (!editingMeal) return;

  await updateDoc(doc(db, "meals", editingMeal.id), {
    name,
    type,
    category,
    calories: Number(calories),
    protein: Number(protein),
    carbs: Number(carbs),
    fat: Number(fat),
  });

  setMessage("Meal updated!");
  setEditingMeal(null);

  // Clear form
  setName("");
  setCategory("");
  setCalories("");
  setProtein("");
  setCarbs("");
  setFat("");
};


return (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white p-6">
    <BackButton />

    {/* PAGE TITLE */}
    <h1 className="text-3xl font-extrabold mb-8 text-green-700 dark:text-green-300 text-center">
      {editingMeal ? "Edit Meal" : "Add New Meal"}
    </h1>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT: MANUAL MEAL ENTRY */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
          Manual Meal Entry
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Meal name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snacks">Snacks</option>
            <option value="dinner">Dinner</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />

            <input
              type="number"
              placeholder="Protein (g)"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Carbs (g)"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />

            <input
              type="number"
              placeholder="Fat (g)"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
          </div>

          {editingMeal ? (
            <button
              onClick={handleUpdateMeal}
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Update Meal
            </button>
          ) : (
            <button
              onClick={handleAddMeal}
              className="w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Add Meal
            </button>
          )}

          {message && (
            <p className="text-green-600 dark:text-green-300 text-center">{message}</p>
          )}
        </div>
      </div>

      {/* RIGHT: AI MEAL GENERATOR */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-purple-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          AI Meal Generator
        </h2>

        <button
          onClick={handleGenerateAiMeal}
          disabled={loadingAi}
          className={`w-full py-3 rounded-lg shadow text-white transition 
            ${loadingAi ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {loadingAi ? "Generating..." : "Generate AI Meal"}
        </button>

        {/* Loading Spinner */}
        {loadingAi && (
          <div className="mt-6 flex items-center gap-3 text-purple-600 dark:text-purple-300">
            <div className="animate-spin h-6 w-6 border-4 border-purple-400 border-t-transparent rounded-full"></div>
            <p className="text-lg font-medium">Creating your recipe…</p>
          </div>
        )}

        {/* AI Result */}
        {aiMeal && !loadingAi && (
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900 rounded-xl shadow animate-fadeIn">
            <h3 className="text-xl font-bold mb-2 text-purple-700 dark:text-purple-300">
              AI Generated Recipe
            </h3>

            <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
              {aiMeal}
            </pre>

            <button
              onClick={() => setName(aiMeal.split("\n")[0])}
              className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Use Recipe Name
            </button>
          </div>
        )}
      </div>
    </div>

    {/* MEALS LIST */}
    <h2 className="text-2xl font-bold mt-12 mb-4 text-green-700 dark:text-green-300">
      Meals Added
    </h2>

    {meals.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No meals added yet.</p>
    ) : (
      <ul className="space-y-4">
        {meals.map((meal) => (
          <li
            key={meal.id}
            className="p-4 border rounded-xl bg-gray-100 dark:bg-gray-800 shadow"
          >
            <p className="font-semibold text-lg">{meal.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Type: {meal.type}</p>
            <p className="text-sm">Category: {meal.category}</p>
            <p className="text-sm">Calories: {meal.calories}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(meal)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(meal.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg shadow"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);


}
