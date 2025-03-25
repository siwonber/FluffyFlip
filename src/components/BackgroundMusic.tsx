import { useEffect, useRef } from "react"
import { isMuted } from "../lib/sounds"

let globalAudio: HTMLAudioElement | null = null

const songs = ["/sounds/song2.wav", "/sounds/song1.wav"]
let currentSongIndex = 0

export const getBackgroundAudio = () => globalAudio

const BackgroundMusic = () => {
  const startedRef = useRef(false)

  useEffect(() => {
    if (globalAudio) return 

    const audio = new Audio(songs[currentSongIndex])
    audio.loop = false
    audio.volume = isMuted() ? 0 : 0.4
    globalAudio = audio

    const startMusic = () => {
      if (!startedRef.current && !isMuted()) {
        audio.play()
        fadeIn(audio)
        startedRef.current = true
      }
      document.removeEventListener("click", startMusic)
    }

    audio.addEventListener("ended", playNextSong)
    document.addEventListener("click", startMusic)
  }, [])

  return null
}

const playNextSong = () => {
  if (!globalAudio) return

  currentSongIndex = (currentSongIndex + 1) % songs.length
  globalAudio.src = songs[currentSongIndex]
  globalAudio.currentTime = 0
  if (!isMuted()) {
    globalAudio.volume = 0
    globalAudio.play()
    fadeIn(globalAudio)
  }
}

const fadeIn = (audio: HTMLAudioElement) => {
  let volume = 0
  const interval = setInterval(() => {
    if (volume < 0.4 && !isMuted()) {
      volume += 0.01
      audio.volume = volume
    } else {
      clearInterval(interval)
    }
  }, 100)
}

export default BackgroundMusic
