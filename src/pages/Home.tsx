import { useNavigate } from "react-router-dom"
import { Gamepad2, Users, Sparkles, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"
import { toggleMute, isMuted, playButton } from "../lib/sounds"

export default function Home() {
  const navigate = useNavigate()
  const [soundOn, setSoundOn] = useState(!isMuted())

  const handleClick = (path: string) => {
    playButton()
    navigate(path)
  }

  return (
    <main className="relative min-h-screen  text-fluffyWhite font-kawaii flex flex-col items-center justify-center p-6 gap-6">

      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            toggleMute()
            playButton()
            setSoundOn(!soundOn)
          }}
          className="bg-white text-fluffyDark p-2 rounded-md shadow hover:scale-110 transition"
          aria-label="Toggle Sound"
        >
          {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-7 h-7 animate-ping-slow text-fluffyWhite" />
        <h1 className="text-5xl">Fluffy Flip</h1>
        <Sparkles className="w-7 h-7 animate-ping-slow text-fluffyWhite" />
      </div>

      <p className="text-lg mb-6 text-center">Choose your mode!</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => handleClick("/solo")}
          className="flex items-center justify-center gap-2 bg-fluffyAccent text-white py-3 px-6 rounded-xl text-xl shadow-md hover:scale-105 transition-transform"
        >
          <Gamepad2 className="w-5 h-5" />
          Solo Mode
        </button>

        <button
          onClick={() => handleClick("/multiplayer")}
          className="flex items-center justify-center gap-2 bg-fluffyDark text-white py-3 px-6 rounded-xl text-xl shadow-md hover:scale-105 transition-transform"
        >
          <Users className="w-5 h-5" />
          Multiplayer Mode
        </button>
      </div>

      {/* Tierchen unten */}
      <img
        src="/assets/pig.png"
        className="w-16 h-16 absolute bottom-6 left-6 animate-bounce z-10 pointer-events-none"
        />
        <img
        src="/assets/panda2.png"
        className="w-16 h-16 absolute bottom-6 right-6 animate-bounce z-10 pointer-events-none"
        />
    </main>
  )
}
