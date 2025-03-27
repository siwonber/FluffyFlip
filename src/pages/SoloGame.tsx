import { useEffect, useState } from "react"
import FluffyCard from "../components/FluffyCard"
import Header from "../components/Header"
import WinOverlay from "../components/WinOverlay"
import Timer, { useTimer } from "../components/Timer"
import { useNavigate } from "react-router-dom"
import GameControls from "../components/GameControls"
import { playFlip, playButton, playWin, playMatch } from "../lib/sounds"
import { MousePointerClick, Timer as TimerIcon } from "lucide-react"

const allImages = [
  "/assets/ape.png", "/assets/bear.png", "/assets/cat1.png", "/assets/cat2.png", "/assets/cat3.png", "/assets/cat4.png",
  "/assets/cow.png", "/assets/cow2.png", "/assets/elefant.png", "/assets/HelloKitty.png", "/assets/koala.png",
  "/assets/panda.png", "/assets/panda2.png", "/assets/pig.png", "/assets/pingu.png", "/assets/racoon.png",
]

function getRandomImages(count: number): string[] {
  const shuffled = [...allImages].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, count)
  return [...selected, ...selected].sort(() => 0.5 - Math.random())
}

export default function SoloGame() {
  const [deck, setDeck] = useState<string[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [lockBoard, setLockBoard] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [pairCount, setPairCount] = useState(6)
  const [gridDimensions, setGridDimensions] = useState({ cols: 3, rows: 4 })

  const navigate = useNavigate()
  const time = useTimer(hasStarted && !gameWon, resetKey)

  const updateLayout = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    let cols = 3
    let rows = 4

    if (width >= 1024 && height >= 700) {
      cols = 5
      rows = 4
    } else if (width >= 768 && height >= 650) {
      cols = 4
      rows = 4
    }

    const totalCards = cols * rows
    const pairs = totalCards / 2

    setPairCount(pairs)
    setGridDimensions({ cols, rows })
  }

  useEffect(() => {
    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [])

  useEffect(() => {
    const newDeck = getRandomImages(pairCount)
    setDeck(newDeck)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameWon(false)
    setHasStarted(false)
  }, [resetKey, pairCount])

  useEffect(() => {
    if (matchedCards.length === deck.length && deck.length > 0) {
      setTimeout(() => {
        playWin()
        setGameWon(true)
      }, 600)
    }
  }, [matchedCards, deck])

  const handleCardClick = (index: number) => {
    if (!hasStarted) setHasStarted(true)
    if (lockBoard || flippedCards.includes(index) || matchedCards.includes(index)) return

    playFlip()

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)
      setLockBoard(true)

      const [first, second] = newFlipped
      if (deck[first] === deck[second]) {
        playMatch()
        setMatchedCards((prev) => [...prev, first, second])
        setTimeout(() => {
          setFlippedCards([])
          setLockBoard(false)
        }, 800)
      } else {
        setTimeout(() => {
          setFlippedCards([])
          setLockBoard(false)
        }, 800)
      }
    }
  }

  const { cols, rows } = gridDimensions
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "0.5rem",
    width: "100%",
    maxWidth: `${cols * 120}px`,
    maxHeight: `${rows * 120}px`
  }

  return (
    <main className="relative h-screen overflow-hidden text-white font-kawaii flex flex-col items-center p-4">
      <GameControls
        onReset={() => {
          playButton()
          setResetKey((k) => k + 1)
        }}
      />
      <Header />

      <div className="flex-1 flex items-center justify-center w-full px-2">
        <div style={gridStyle}>
          {deck.map((img, index) => (
            <div key={index} className="aspect-square min-w-[110px]">
              <FluffyCard
                image={img}
                flipped={flippedCards.includes(index) || matchedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="w-full max-w-md mt-2 flex items-center justify-center gap-6 text-white text-base">
        <div className="flex items-center gap-2">
          <MousePointerClick className="w-5 h-5" />
          <span>{moves} Moves</span>
        </div>
        <div className="flex items-center gap-2">
          <TimerIcon className="w-5 h-5" />
          <Timer isActive={hasStarted && !gameWon} resetTrigger={resetKey} />
        </div>
      </footer>

      {gameWon && (
        <WinOverlay
          onReset={() => {
            playButton()
            setResetKey((k) => k + 1)
          }}
          moves={moves}
          time={time}
        />
      )}
    </main>
  )
}
