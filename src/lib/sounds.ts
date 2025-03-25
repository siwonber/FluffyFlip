import { getBackgroundAudio } from "../components/BackgroundMusic"

let muted = false

const flip = new Audio("/sounds/flip.wav")
const match = new Audio("/sounds/match.wav")
const win = new Audio("/sounds/win.wav")
const button = new Audio("/sounds/button.wav")

export const toggleMute = () => {
  muted = !muted

  // Hintergrundmusik auch muten
  const bg = getBackgroundAudio()
  if (bg) {
    bg.volume = muted ? 0 : 0.4
  }
}

export const isMuted = () => muted

const play = (sound: HTMLAudioElement) => {
  if (!muted) {
    sound.currentTime = 0
    sound.play()
  }
}

export const playFlip = () => play(flip)
export const playMatch = () => play(match)
export const playWin = () => play(win)
export const playButton = () => play(button)
