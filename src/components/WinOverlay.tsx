import { useNavigate } from "react-router-dom"
import { playButton } from "../lib/sounds"
import { Repeat, Home } from "lucide-react"

interface WinOverlayProps {
  onReset: () => void
  moves: number
  time: number
}

export default function WinOverlay({ onReset, moves, time }: WinOverlayProps) {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white font-kawaii text-center p-6">
      <div className="text-5xl mb-2 animate-bounce">🎉 You won! 🎉</div>
      <p className="text-xl mb-1">You did it in</p>
      <p className="text-3xl font-bold mb-2">{moves} moves</p>
      <p className="text-lg mb-6">Time: {time}s</p>

      <div className="flex gap-4">
        <button
          onClick={() => {
            playButton()
            onReset()
          }}
          className="flex items-center gap-2 bg-fluffyAccent text-white py-2 px-6 rounded-xl text-lg shadow-md hover:scale-105 transition-transform"
        >
          <Repeat className="w-5 h-5" />
          Play Again
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
