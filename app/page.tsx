"use client";

import Link from "next/link";

type Tone = "pink" | "green" | "yellow" | "blue" | "red" | "purple";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative overflow-hidden">
      {/* 🌿 Meal-planner background (app-like) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950" />

        {/* Soft blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-400/20" />
        <div className="absolute top-16 -right-28 w-80 h-80 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-400/15" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-yellow-100/30 blur-3xl dark:bg-yellow-400/10" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.25)_1px,transparent_1px)]" />

        {/* Bottom “food planner” wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </div>

      {/* 🧩 Main container */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <header className="text-center mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-2 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/50">
            <span aria-hidden="true">🥗</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Healthy Kerala meals • Fitness-friendly planning
            </span>
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-green-700 dark:text-green-400">
            Kerala Meal Planner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Plan meals by day or week, track ingredients, and cook with help from AI.
          </p>
        </header>

        {/* Hero: “planner card” */}
        <section className="mt-10 flex justify-center">
          <div className="relative w-full max-w-xl rounded-3xl border border-gray-200/70 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/40">
            <div className="flex items-center gap-4">
              

              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Your plan, your pace ✅
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Add meals → choose daily/weekly planner → cook with confidence.
                </p>
              </div>
            </div>

            {/* Mini “status chips” */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Chip tone="emerald">🍛 Kerala meals</Chip>
              <Chip tone="fuchsia">🤖 AI recipes</Chip>
             
            </div>
          </div>
        </section>

        {/* Action cards */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NavCard href="/meals/add" tone="pink" title="Add Meals" desc="Create new meals" />
          <NavCard href="/planner/daily" tone="green" title="Daily Planner" desc="Plan today’s meals" />
          <NavCard href="/planner/weekly" tone="yellow" title="Weekly Planner" desc="Plan your full week" />
          <NavCard href="/ingredients" tone="blue" title="Ingredients" desc="Add what you have" />
          <NavCard href="/recipes" tone="red" title="Recipes" desc="Kerala + AI recipes" />
          <NavCard
            href="/voice"
            tone="purple"
            title="Voice Assistant"
            desc="Cook hands-free"
            className="sm:col-span-2"
          />
        </section>

        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          Made with ❤️ for Kerala food lovers
        </footer>
      </main>
    </div>
  );
}

function Chip({ tone, children }: { tone: "emerald" | "fuchsia" | "amber"; children: React.ReactNode }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    fuchsia: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

function NavCard({
  href,
  tone,
  title,
  desc,
  className = "",
}: {
  href: string;
  tone: Tone;
  title: string;
  desc: string;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    pink: "bg-pink-100/70 hover:bg-pink-200/70 text-pink-900 dark:bg-pink-500/15 dark:hover:bg-pink-500/25 dark:text-pink-200",
    green: "bg-emerald-100/70 hover:bg-emerald-200/70 text-emerald-900 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 dark:text-emerald-200",
    yellow: "bg-yellow-100/70 hover:bg-yellow-200/70 text-yellow-900 dark:bg-yellow-500/15 dark:hover:bg-yellow-500/25 dark:text-yellow-200",
    blue: "bg-blue-100/70 hover:bg-blue-200/70 text-blue-900 dark:bg-blue-500/15 dark:hover:bg-blue-500/25 dark:text-blue-200",
    red: "bg-red-100/70 hover:bg-red-200/70 text-red-900 dark:bg-red-500/15 dark:hover:bg-red-500/25 dark:text-red-200",
    purple: "bg-purple-100/70 hover:bg-purple-200/70 text-purple-900 dark:bg-purple-500/15 dark:hover:bg-purple-500/25 dark:text-purple-200",
  };

  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/60 p-5 shadow-sm backdrop-blur",
        tones[tone],
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        "focus:outline-none focus:ring-4 focus:ring-gray-300/50 dark:border-gray-700/60 dark:bg-gray-900/30",
        className,
      ].join(" ")}
    >
      {/* subtle highlight */}
      <span
        aria-hidden="true"
        className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-white/40 opacity-0 transition-opacity group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-lg sm:text-xl">{title}</h2>
          <p className="mt-1 text-sm text-gray-700/90 dark:text-gray-200/80">{desc}</p>
        </div>

        <span className="text-lg opacity-70 transition group-hover:opacity-100" aria-hidden="true">
          →
        </span>
      </div>

      <div className="mt-4 h-1.5 w-20 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div className="h-full w-10 rounded-full bg-current opacity-70 group-hover:w-20 transition-all" />
      </div>
    </Link>
  );
}