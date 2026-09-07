import BackButton from "../components/BackButton";

export default function VoiceAssistant() {
  return (
  <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-6">

 <BackButton />

      <h1 className="text-2xl font-bold text-purple-700">Voice Assistant</h1>

      <p className="text-gray-600 mt-2">
        Cook hands-free with voice commands
      </p>

      <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full text-lg shadow">
        🎤 Start Cooking
      </button>

      <div className="mt-6 text-left">
        <h2 className="font-semibold text-lg">Commands</h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Next step</li>
          <li>Repeat step</li>
          <li>How much oil?</li>
          <li>Is this good for weight loss?</li>
        </ul>
      </div>
    </div>
  );
}
