import { useNavigate } from "react-router-dom"
import { playButton } from "../lib/sounds"
import { Repeat, Home, Trophy } from "lucide-react"

interface MultiWinOverlayProps {
  onReset: () => void
  scores: { player1: number; player2: number }
}

export default function MultiWinOverlay({ onReset, scores }: MultiWinOverlayProps) {
  const navigate = useNavigate()

  const winner =
    scores.player1 === scores.player2
      ? "It's a tie!"
      : scores.player1 > scores.player2
      ? "🎉 Player 1 wins!"
      : "🎉 Player 2 wins!"

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white font-kawaii text-center p-6">
      <Trophy className="w-12 h-12 mb-2 text-yellow-400 animate-pulse" />
      <h2 className="text-4xl mb-2">{winner}</h2>

      <p className="text-xl mb-1">Score:</p>
      <p className="text-lg mb-4">
        🧸 Player 1: {scores.player1} | 🐰 Player 2: {scores.player2}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => {
            playButton()
            onReset()
          }}
          className="flex items-center gap-2 bg-fluffyAccent text-white py-2 px-6 rounded-xl text-lg shadow-md hover:scale-105 transition-transform"
        >
          <Repeat className="w-5 h-5" />
          Rematch
        </button>

        <button
          onClick={() => {
            playButton()
            navigate("/")
          }}
          className="flex items-center gap-2 bg-fluffyWhite text-fluffyDark py-2 px-6 rounded-xl text-lg shadow-md hover:scale-105 transition-transform"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </div>
  )
}
