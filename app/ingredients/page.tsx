"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";

type Ingredient = {
    id: string;
    name: string;
    quantity: number;
};

export default function IngredientsPage() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "ingredients"), (snapshot) => {
            const list = snapshot.docs.map((d) => ({
                id: d.id,
                name: d.data().name,
                quantity: d.data().quantity,
            }));
            setIngredients(list);
        });

        return () => unsub();
    }, []);

    const addIngredient = async () => {
        if (!name || !quantity) return;

        await addDoc(collection(db, "ingredients"), {
            name,
            quantity: Number(quantity),
        });

        setName("");
        setQuantity("");
    };

    const deleteIngredient = async (id: string) => {
        await deleteDoc(doc(db, "ingredients", id));
    };

    return (
   <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">



            <h1 className="text-2xl font-bold text-green-700 mb-4">Ingredients</h1>

            <div className="flex gap-2 mb-4">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingredient name"
                    className="border p-2 rounded w-40"
                />

                <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Qty"
                    className="border p-2 rounded w-20"
                />

                <button
                    onClick={addIngredient}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {ingredients.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border p-2 rounded shadow-sm"
                    >
                        <span className="font-medium">
                            {item.name} — {item.quantity}
                        </span>

                        <button
                            onClick={() => deleteIngredient(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
}
