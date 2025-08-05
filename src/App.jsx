import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CosmicNavigation from './components/shared/CosmicNavigation'
import CosmicBootup from './pages/CosmicBootup'
import CompanyIdentity from './pages/CompanyIdentity'
import GalaxyOverview from './pages/GalaxyOverview'
import UXArchitecture from './pages/UXArchitecture'
import UXPatterns from './pages/UXPatterns'
import AtomicDesign from './pages/AtomicDesign'
import TokenStudio from './pages/TokenStudio'

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
          <Route path="/patterns" element={<UXPatterns />} />
          <Route path="/atomic" element={<AtomicDesign />} />
          <Route path="/tokens" element={<TokenStudio />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App