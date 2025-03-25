import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/Home'
import SoloGame from './pages/SoloGame'
import MultiGame from './pages/MultiGame'

import Clouds from './components/Clouds'
import BackgroundMusic from './components/BackgroundMusic'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Globale Hintergrund-Komponenten */}
      <Clouds />
      <BackgroundMusic />

      {/* Seiten */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solo" element={<SoloGame />} />
        <Route path="/multiplayer" element={<MultiGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
