import BackButton from "../components/BackButton";

export default function RecipesPage() {
  return (
  <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">

 <BackButton />

      <h1 className="text-2xl font-bold text-red-700">Recipes</h1>

      <div className="mt-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Generate AI Recipe
        </button>
      </div>

      <p className="text-gray-600 mt-4">
        Your Kerala healthy recipes will appear here.
      </p>
    </div>
  );
}
