import BackButton from "@/app/components/BackButton";

export default function WeeklyPlanner() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
 <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">

 <BackButton />

      <h1 className="text-2xl font-bold text-green-700">Weekly Planner</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {days.map((day) => (
          <div key={day} className="border p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold text-lg">{day}</h2>
            <p className="text-gray-500 text-sm">Plan meals for this day</p>

            <button className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded">
              Plan Meals
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
