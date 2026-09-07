import WeeklyPlannerClient from "./WeeklyPlannerClient";

export default function Page() {
  console.log(process.env.GROQ_API_KEY);
 
  return <WeeklyPlannerClient />;
}
