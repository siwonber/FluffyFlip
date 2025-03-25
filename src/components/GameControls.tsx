import { useNavigate } from "react-router-dom"
import { RefreshCw, Home, Volume2, VolumeX } from "lucide-react"
import { toggleMute, isMuted, playButton } from "../lib/sounds"
import { useState } from "react"

export default function GameControls({ onReset }: { onReset: () => void }) {
  const navigate = useNavigate()
  const [soundOn, setSoundOn] = useState(!isMuted())

  return (
    <div className="w-full max-w-md flex justify-end gap-2 mb-4 mt-2 pr-2">
      <button
        onClick={() => {
          toggleMute()
          playButton()
          setSoundOn(!soundOn)
        }}
        className="bg-fluffyWhite text-fluffyDark p-2 rounded-md shadow hover:scale-110 transition"
        aria-label="Toggle Sound"
      >
        {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      <button
        onClick={() => {
          playButton()
          onReset()
        }}
        className="bg-fluffyWhite text-fluffyDark p-2 rounded-md shadow hover:scale-110 transition"
        aria-label="Reset Game"
      >
        <RefreshCw className="w-4 h-4" />
      </button>

      <button
        onClick={() => {
          playButton()
          navigate("/")
        }}
        className="bg-fluffyWhite text-fluffyDark p-2 rounded-md shadow hover:scale-110 transition"
        aria-label="Back to Home"
      >
        <Home className="w-4 h-4" />
      </button>
    </div>
  )
}
