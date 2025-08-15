import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600">🍳 Recipe Sharing Platform</h1>
        <p className="text-gray-600 mt-2">Vite + React + Tailwind is set up correctly.</p>
      </header>

      <main className="max-w-3xl mx-auto mt-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="mb-4">Tailwind demo button:</p>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => setCount(c => c + 1)}
          >
            Count: {count}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
