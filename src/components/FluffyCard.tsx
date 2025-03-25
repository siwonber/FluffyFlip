import clsx from "clsx"
import { Heart } from "lucide-react" 

interface FluffyCardProps {
  flipped: boolean
  image: string
  onClick: () => void
}

const FluffyCard = ({ flipped, image, onClick }: FluffyCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-24 h-24 sm:w-28 sm:h-28 cursor-pointer perspective"
    >
      <div
        className={clsx(
          "relative w-full h-full duration-500 transform-style preserve-3d transition-transform",
          flipped ? "rotate-y-180" : ""
        )}
      >
        {/* Rückseite */}
        <div className="absolute w-full h-full bg-fluffyAccent text-fluffyWhite rounded-2xl flex items-center justify-center backface-hidden shadow-lg hover:brightness-105 transition">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
        </div>

        {/* Vorderseite (Tierbild) */}
        <div className="absolute w-full h-full bg-white rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden overflow-hidden shadow-xl">
        <img
            src={image}
            alt="fluffy animal"
            className="w-5/6 h-5/6 object-contain"
            />
        </div>
      </div>
    </div>
  )
}

export default FluffyCard
