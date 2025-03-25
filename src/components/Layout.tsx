import { Outlet } from "react-router-dom"
import Clouds from "./Clouds"
import "../components/Clouds.css"

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-fluffyPink overflow-hidden">
      <Clouds />
      <Outlet />
    </div>
  )
}
