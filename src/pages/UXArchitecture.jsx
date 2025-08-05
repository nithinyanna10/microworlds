import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import ParticleCanvas from '../components/shared/ParticleCanvas'
import { FaCube, FaLayerGroup, FaTh, FaCode, FaEye, FaEyeSlash, FaRocket, FaServer, FaMobile, FaDesktop } from 'react-icons/fa'

const UXArchitecture = () => {
  const [activeView, setActiveView] = useState('wireframe')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [showBlueprint, setShowBlueprint] = useState(false)
  const { playSound } = useAudio()

  const architectureLayers = [
    {
      id: 'presentation',
      name: 'Presentation Layer',
      icon: FaDesktop,
      color: 'from-blue-400 to-cyan-500',
      components: ['UI Components', 'Responsive Design', 'Animations', 'Theme System'],
      description: 'User-facing interface elements and visual design'
    },
    {
      id: 'business',
      name: 'Business Logic Layer',
      icon: FaServer,
      color: 'from-purple-400 to-pink-500',
      components: ['State Management', 'Data Processing', 'Validation', 'Business Rules'],
      description: 'Core application logic and data handling'
    },
    {
      id: 'data',
      name: 'Data Layer',
      icon: FaCube,
      color: 'from-green-400 to-emerald-500',
      components: ['API Integration', 'Database', 'Caching', 'File Storage'],
      description: 'Data persistence and external service integration'
    }
  ]

  const gridSystems = [
    {
      name: 'CSS Grid',
      description: 'Two-dimensional layout system',
      icon: FaTh,
      color: 'from-blue-400 to-cyan-500',
      example: 'grid-template-columns: repeat(12, 1fr)'
    },
    {
      name: 'Flexbox',
      description: 'One-dimensional layout system',
      icon: FaLayerGroup,
      color: 'from-purple-400 to-pink-500',
      example: 'display: flex; justify-content: space-between'
    },
    {
      name: 'Custom Grid',
      description: 'Tailwind CSS utility classes',
      icon: FaCode,
      color: 'from-green-400 to-emerald-500',
      example: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }
  ]

  const handleViewChange = (view) => {
    setActiveView(view)
    playSound('click')
  }

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    playSound('click')
  }

  return (
    <div className="cosmic-background min-h-screen relative overflow-hidden">
      {/* Nebula Overlay */}
      <div className="nebula-overlay"></div>
      
      {/* Particle Canvas */}
      <ParticleCanvas 
        particleCount={100} 
        onClick={() => playSound('hover')}
      />

      <div className="relative z-10 container mx-auto px-8 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              UX Architecture Spaceport
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the structural foundations of our design systems through interactive 3D wireframes 
            and cosmic grid structures.
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-morphism p-2 rounded-2xl flex space-x-2">
            {[
              { id: 'wireframe', label: '3D Wireframes', icon: FaCube },
              { id: 'blueprint', label: 'Blueprint Mode', icon: FaEye }
            ].map((view) => (
              <motion.button
                key={view.id}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all ${
                  activeView === view.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleViewChange(view.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <view.icon className="text-lg" />
                <span>{view.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 3D Wireframe View */}
        <AnimatePresence mode="wait">
          {activeView === 'wireframe' && (
            <motion.div
              key="wireframe"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {/* Architecture Layers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {architectureLayers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    className="glass-morphism p-8 rounded-3xl cosmic-glow"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}
                         style={{
                           background: `linear-gradient(135deg, ${layer.color.split(' ')[1]}, ${layer.color.split(' ')[3]})`
                         }}>
                      <layer.icon className="text-2xl text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">{layer.name}</h3>
                    <p className="text-gray-300 mb-6 text-center">{layer.description}</p>
                    
                    <div className="space-y-3">
                      {layer.components.map((component, compIndex) => (
                        <motion.div
                          key={compIndex}
                          className="flex items-center p-3 bg-blue-900/20 rounded-lg cursor-pointer hover:bg-blue-900/40 transition-colors"
                          onClick={() => handleComponentClick(component)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaCube className="text-blue-400 mr-3" />
                          <span className="text-gray-300">{component}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Grid System Visualization */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-center mb-12">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Grid System Visualization
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {gridSystems.map((grid, index) => (
                    <motion.div
                      key={grid.name}
                      className="glass-morphism p-6 rounded-2xl cosmic-glow"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto`}
                           style={{
                             background: `linear-gradient(135deg, ${grid.color.split(' ')[1]}, ${grid.color.split(' ')[3]})`
                           }}>
                        <grid.icon className="text-xl text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 text-center">{grid.name}</h3>
                      <p className="text-gray-300 text-sm mb-4 text-center">{grid.description}</p>
                      
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <code className="text-blue-400 text-xs">{grid.example}</code>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Blueprint Mode */}
          {activeView === 'blueprint' && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-morphism p-12 rounded-3xl cosmic-glow">
                <h2 className="text-4xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Interactive Blueprint Mode
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Architecture Diagram */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">System Architecture</h3>
                    <div className="space-y-4">
                      {architectureLayers.map((layer, index) => (
                        <motion.div
                          key={layer.id}
                          className="p-4 border border-blue-400/30 rounded-lg cursor-pointer hover:border-blue-400/60 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleComponentClick(layer)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <layer.icon className={`text-2xl mr-3`}
                                         style={{ color: layer.color.split(' ')[1] }} />
                              <span className="text-white font-semibold">{layer.name}</span>
                            </div>
                            <FaRocket className="text-blue-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Component Tree */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Component Hierarchy</h3>
                    <div className="space-y-3">
                      {['App', 'Layout', 'Navigation', 'Content', 'Footer'].map((component, index) => (
                        <motion.div
                          key={component}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                          <div className="flex-1 h-px bg-blue-400/30"></div>
                          <span className="text-gray-300">{component}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Component Detail Modal */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedComponent(null)}
            >
              <motion.div
                className="glass-morphism p-8 rounded-3xl max-w-2xl w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold text-white mb-4">{selectedComponent.name || selectedComponent}</h2>
                <p className="text-gray-300 mb-6">
                  {selectedComponent.description || 'Detailed information about this component and its role in the architecture.'}
                </p>
                
                <div className="flex justify-end">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedComponent(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UXArchitecture 