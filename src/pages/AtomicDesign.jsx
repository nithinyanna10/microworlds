import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import ParticleCanvas from '../components/shared/ParticleCanvas'
import { FaSearch, FaSearchMinus, FaSearchPlus, FaCube, FaLayerGroup, FaDesktop, FaCode, FaEye } from 'react-icons/fa'

const AtomicDesign = () => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [activeLayer, setActiveLayer] = useState('molecule')
  const { playSound } = useAudio()
  const microscopeRef = useRef(null)

  const atomicComponents = {
    atoms: [
      { id: 'button', name: 'Button', type: 'atom', color: 'from-blue-400 to-cyan-500' },
      { id: 'input', name: 'Input', type: 'atom', color: 'from-green-400 to-emerald-500' },
      { id: 'label', name: 'Label', type: 'atom', color: 'from-purple-400 to-pink-500' },
      { id: 'icon', name: 'Icon', type: 'atom', color: 'from-yellow-400 to-orange-500' }
    ],
    molecules: [
      { 
        id: 'search-form', 
        name: 'Search Form', 
        type: 'molecule', 
        color: 'from-purple-400 to-pink-500',
        atoms: ['input', 'button', 'icon']
      },
      { 
        id: 'card', 
        name: 'Card', 
        type: 'molecule', 
        color: 'from-blue-400 to-cyan-500',
        atoms: ['label', 'button', 'icon']
      },
      { 
        id: 'navigation', 
        name: 'Navigation', 
        type: 'molecule', 
        color: 'from-green-400 to-emerald-500',
        atoms: ['button', 'label', 'icon']
      }
    ],
    organisms: [
      { 
        id: 'header', 
        name: 'Header', 
        type: 'organism', 
        color: 'from-orange-400 to-red-500',
        molecules: ['navigation', 'search-form'],
        atoms: ['icon', 'label']
      },
      { 
        id: 'sidebar', 
        name: 'Sidebar', 
        type: 'organism', 
        color: 'from-indigo-400 to-purple-500',
        molecules: ['navigation', 'card'],
        atoms: ['icon', 'label']
      }
    ]
  }

  const handleZoomChange = (newZoom) => {
    setZoomLevel(newZoom)
    playSound('hover')
  }

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    playSound('click')
  }

  const renderComponent = (component) => {
    const baseSize = 100
    const size = baseSize * zoomLevel

    return (
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleComponentClick(component)}
      >
        <div 
          className={`w-full h-full rounded-2xl flex items-center justify-center cosmic-glow cursor-pointer`}
          style={{
            background: `linear-gradient(135deg, ${component.color.split(' ')[1]}, ${component.color.split(' ')[3]})`
          }}
        >
          <div className="text-center">
            <FaCube className="text-2xl mx-auto mb-2 text-white" />
            <span className="text-white text-sm font-semibold">{component.name}</span>
          </div>
        </div>

        {/* Component Details on Hover */}
        <AnimatePresence>
          {selectedComponent?.id === component.id && (
            <motion.div
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-lg border border-blue-500/30 min-w-48"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">{component.name}</h4>
                <p className="text-gray-300 text-sm mb-2">Type: {component.type}</p>
                {component.atoms && (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {component.atoms.map((atom, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        {atom}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="cosmic-background min-h-screen relative overflow-hidden">
      {/* Nebula Overlay */}
      <div className="nebula-overlay"></div>
      
      {/* Particle Canvas */}
      <ParticleCanvas 
        particleCount={60} 
        onClick={() => playSound('hover')}
      />

      <div className="relative z-10 container mx-auto px-8 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Atomic Design Microscope
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Zoom into the building blocks of design systems. Watch atoms combine into molecules, 
            and molecules assemble into organisms.
          </p>
        </motion.div>

        {/* Zoom Controls */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-morphism p-4 rounded-2xl flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaSearchMinus className="text-gray-400" />
              <span className="text-gray-300">Zoom</span>
            </div>
            
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">{Math.round(zoomLevel * 100)}%</span>
              <FaSearchPlus className="text-gray-400" />
            </div>
          </div>
        </motion.div>

        {/* Layer Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-morphism p-2 rounded-2xl flex space-x-2">
            {[
              { id: 'atoms', label: 'Atoms', icon: FaCube },
              { id: 'molecules', label: 'Molecules', icon: FaLayerGroup },
              { id: 'organisms', label: 'Organisms', icon: FaDesktop }
            ].map((layer) => (
              <motion.button
                key={layer.id}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all ${
                  activeLayer === layer.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => {
                  setActiveLayer(layer.id)
                  playSound('click')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <layer.icon className="text-lg" />
                <span>{layer.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Microscope View */}
        <div className="relative mb-16">
          <div 
            ref={microscopeRef}
            className="glass-morphism p-12 rounded-3xl cosmic-glow min-h-96"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)} View
              </h2>
              <p className="text-gray-300">
                {activeLayer === 'atoms' && 'Fundamental building blocks'}
                {activeLayer === 'molecules' && 'Simple combinations of atoms'}
                {activeLayer === 'organisms' && 'Complex assemblies of molecules'}
              </p>
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {atomicComponents[activeLayer].map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderComponent(component)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Assembly Animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="glass-morphism p-8 rounded-3xl cosmic-glow">
            <h3 className="text-2xl font-bold text-white mb-6">Live Assembly</h3>
            <div className="flex justify-center items-center space-x-4">
              {atomicComponents.atoms.slice(0, 3).map((atom, index) => (
                <motion.div
                  key={atom.id}
                  className="w-16 h-16 rounded-full flex items-center justify-center cosmic-glow"
                  style={{
                    background: `linear-gradient(135deg, ${atom.color.split(' ')[1]}, ${atom.color.split(' ')[3]})`
                  }}
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <FaCube className="text-white" />
                </motion.div>
              ))}
              <motion.div
                className="text-2xl text-blue-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.div>
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center cosmic-glow"
                style={{
                  background: `linear-gradient(135deg, ${atomicComponents.molecules[0].color.split(' ')[1]}, ${atomicComponents.molecules[0].color.split(' ')[3]})`
                }}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaLayerGroup className="text-white text-xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AtomicDesign 