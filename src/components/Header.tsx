import { Heart } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full text-center mb-3 text-fluffyWhite pt-4 mt-2">
      <div className="flex items-center justify-center gap-2">
        <Heart className="w-6 h-6 text-fluffyWhite" />
        <h1 className="text-4xl font-kawaii">Fluffy Flip</h1>
        <Heart className="w-6 h-6 text-fluffyWhite" />
      </div>
      <p className="text-base mt-1">Match the fluffy cuties!</p>
    </header>
  )
}
