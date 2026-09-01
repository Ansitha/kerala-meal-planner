"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import BackButton from "@/app/components/BackButton";

export default function AddMeal() {
  const [name, setName] = useState("");
  const [type, setType] = useState("breakfast");
  const [message, setMessage] = useState("");

  const handleAddMeal = async () => {
    if (!name.trim()) {
      setMessage("Meal name cannot be empty.");
      return;
    }

    await addDoc(collection(db, "meals"), {
      name,
      type,
    });

    setMessage("Meal added successfully!");
    setName("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">
      <BackButton />

      <h1 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">
        Add New Meal
      </h1>

      <div className="space-y-4 max-w-md">
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

        <button
          onClick={handleAddMeal}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Add Meal
        </button>

        {message && (
          <p className="text-green-500 dark:text-green-300">{message}</p>
        )}
      </div>
    </div>
  );
}
