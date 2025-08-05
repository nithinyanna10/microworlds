import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CosmicNavigation from './components/shared/CosmicNavigation'
import CosmicBootup from './pages/CosmicBootup'
import CompanyIdentity from './pages/CompanyIdentity'
import GalaxyOverview from './pages/GalaxyOverview'
import UXArchitecture from './pages/UXArchitecture'
import PatternsCarousel from './pages/PatternsCarousel'
import AtomicDesign from './pages/AtomicDesign'
import TokenStudio from './pages/TokenStudio'
import MotionLab from './pages/MotionLab'
import IntelligenceLayer from './pages/IntelligenceLayer'
import ModularSandbox from './pages/ModularSandbox'
import GameUISimulator from './pages/GameUISimulator'
import EcosystemInterop from './pages/EcosystemInterop'
import DesignOracle from './pages/DesignOracle'
import UniverseBuilder from './pages/UniverseBuilder'
import Finale from './pages/Finale'

function App() {
  return (
    <Router>
      <div className="App">
        <CosmicNavigation />
        <Routes>
          <Route path="/" element={<CosmicBootup />} />
          <Route path="/company" element={<CompanyIdentity />} />
          <Route path="/galaxy" element={<GalaxyOverview />} />
          <Route path="/architecture" element={<UXArchitecture />} />
          <Route path="/patterns" element={<PatternsCarousel />} />
          <Route path="/atomic" element={<AtomicDesign />} />
          <Route path="/tokens" element={<TokenStudio />} />
          <Route path="/motion" element={<MotionLab />} />
          <Route path="/intelligence" element={<IntelligenceLayer />} />
          <Route path="/sandbox" element={<ModularSandbox />} />
          <Route path="/gaming" element={<GameUISimulator />} />
          <Route path="/ecosystem" element={<EcosystemInterop />} />
          <Route path="/oracle" element={<DesignOracle />} />
          <Route path="/universe-builder" element={<UniverseBuilder />} />
          <Route path="/finale" element={<Finale />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 