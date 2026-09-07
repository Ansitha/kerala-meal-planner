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
  const res = await fetch("/api/ai-meal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });

  const data = await res.json();
  console.log("AI Meal Response:", data);
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
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">
      <BackButton />

      <h1 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">
        {editingMeal ? "Edit Meal" : "Add New Meal"}
      </h1>

      {/* Add/Edit Meal Form */}
      <div className="space-y-4 max-w-md mb-10">
        <input
          type="text"
          placeholder="Meal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </select>

        <input
          type="text"
          placeholder="Category (e.g., Kerala, South Indian)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        />

        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        />

        <input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        />

        <input
          type="number"
          placeholder="Carbs (g)"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        />

        <input
          type="number"
          placeholder="Fat (g)"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800"
        />

        {editingMeal ? (
          <button
            onClick={handleUpdateMeal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Update Meal
          </button>
        ) : (
          <button
            onClick={handleAddMeal}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Add Meal
          </button>
        )}
<button
  onClick={() => handleGenerateAiMeal()}
  className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
>
  Generate AI Meal
</button>

        {message && (
          <p className="text-green-500 dark:text-green-300">{message}</p>
        )}
      </div>

      {/* Display Meals */}
      <h2 className="text-2xl font-bold mb-4">Meals Added</h2>

      {meals.length === 0 ? (
        <p className="text-gray-500">No meals added yet.</p>
      ) : (
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li
              key={meal.id}
              className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <p className="font-semibold">{meal.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type: {meal.type}
              </p>
              <p className="text-sm">Category: {meal.category}</p>
              <p className="text-sm">Calories: {meal.calories}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(meal)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(meal.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {aiMealDetails && (
  <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-800 rounded-lg">
    <h2 className="text-xl font-bold mb-2">AI Generated Meal</h2>

    <p className="font-semibold">{aiMealDetails.name}</p>
    <p className="text-sm">{aiMealDetails.description}</p>

    <div className="mt-3">
      <p>Category: {aiMealDetails.category}</p>
      <p>Calories: {aiMealDetails.calories}</p>
      <p>Protein: {aiMealDetails.protein} g</p>
      <p>Carbs: {aiMealDetails.carbs} g</p>
      <p>Fat: {aiMealDetails.fat} g</p>
    </div>

    <button
      onClick={() =>
        addDoc(collection(db, "meals"), {
          name: aiMealDetails.name,
          type,
          category: aiMealDetails.category,
          calories: aiMealDetails.calories,
          protein: aiMealDetails.protein,
          carbs: aiMealDetails.carbs,
          fat: aiMealDetails.fat,
        })
      }
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
    >
      Save AI Meal
    </button>
  </div>
)}

    </div>
  );
}
