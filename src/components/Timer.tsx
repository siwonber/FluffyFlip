import { useEffect, useState } from "react"

interface TimerProps {
  isActive: boolean
  resetTrigger: number
}

export function useTimer(isActive: boolean, resetTrigger: number) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setSeconds(0)
  }, [resetTrigger])

  useEffect(() => {
    if (!isActive) return
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive])

  return seconds
}

export default function Timer({ isActive, resetTrigger }: TimerProps) {
  const seconds = useTimer(isActive, resetTrigger)

  return <p className="text-white text-lg">Time: {seconds}s</p>
}
