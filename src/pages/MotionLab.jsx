import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import { FaPlay, FaPause, FaExpand, FaCompress, FaHeart, FaBrain, FaAtom } from 'react-icons/fa'

const MotionLab = () => {
  const [activeDemo, setActiveDemo] = useState('shockwave')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [ripples, setRipples] = useState([])
  const { playSound } = useAudio()

  // Haptic Shockwave Effect
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: 0
    }
    
    setRipples(prev => [...prev, newRipple])
    playSound('click')
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
  }

  // Breathing Modal Animation
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    }
  }

  // Personality Loaders
  const loaders = {
    bouncing: {
      component: (
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      )
    },
    dna: {
      component: (
        <div className="relative w-16 h-16">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full"
              style={{
                left: `${50 + Math.sin(i * 0.5) * 20}%`,
                top: `${(i * 12.5)}%`
              }}
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )
    },
    particle: {
      component: (
        <div className="relative w-16 h-16">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-500 rounded-full"
              style={{
                left: '50%',
                top: '50%'
              }}
              animate={{
                x: [0, Math.cos(i * 30) * 30],
                y: [0, Math.sin(i * 30) * 30],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 cosmic-background p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Motion Lab
          </span>
        </h1>
        <p className="text-gray-300 text-lg">
          Phase 3A: Haptic Feedback & Microinteractions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Demos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Haptic Shockwave */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Haptic Shockwave Effects</h3>
            <div 
              className="relative w-full h-32 bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
              onClick={createRipple}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Click anywhere to create ripples
              </div>
              {ripples.map((ripple) => (
                <motion.div
                  key={ripple.id}
                  className="absolute w-4 h-4 bg-blue-500 rounded-full pointer-events-none"
                  style={{
                    left: ripple.x - 8,
                    top: ripple.y - 8
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 20, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>

          {/* Breathing Modal */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Breathing Modals</h3>
            <motion.button
              onClick={() => setShowModal(true)}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Breathing Modal
            </motion.button>
          </div>

          {/* Personality Loaders */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Personality Loaders</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="mb-2">
                  {loaders.bouncing.component}
                </div>
                <p className="text-sm text-gray-400">Bouncing Ball</p>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  {loaders.dna.component}
                </div>
                <p className="text-sm text-gray-400">DNA Helix</p>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  {loaders.particle.component}
                </div>
                <p className="text-sm text-gray-400">Particle Swarm</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Microinteractions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Microinteraction Showcase</h3>
            
            {/* Hover States */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-300">Hover States</h4>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  className="p-3 bg-gray-800 rounded-lg text-gray-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#3b82f6",
                    color: "white"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hover Me
                </motion.button>
                
                <motion.div
                  className="p-3 bg-gray-800 rounded-lg cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                >
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Focus Rings */}
            <div className="space-y-4 mt-6">
              <h4 className="text-lg font-medium text-gray-300">Focus Rings</h4>
              <div className="space-y-3">
                <motion.input
                  type="text"
                  placeholder="Focus me..."
                  className="w-full p-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 focus:outline-none"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)"
                  }}
                />
                
                <motion.button
                  className="w-full p-3 bg-gray-800 rounded-lg text-gray-300"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.3)"
                  }}
                >
                  Focus Button
                </motion.button>
              </div>
            </div>

            {/* Transitions */}
            <div className="space-y-4 mt-6">
              <h4 className="text-lg font-medium text-gray-300">Smooth Transitions</h4>
              <div className="grid grid-cols-3 gap-3">
                {['Fast', 'Normal', 'Slow'].map((speed) => (
                  <motion.button
                    key={speed}
                    className="p-3 bg-gray-800 rounded-lg text-gray-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                    transition={{ 
                      duration: speed === 'Fast' ? 0.1 : speed === 'Normal' ? 0.3 : 0.6 
                    }}
                  >
                    {speed}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Breathing Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="glass-morphism p-8 rounded-2xl max-w-md w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Breathing Modal</h3>
                <p className="text-gray-400 mb-4">
                  This modal breathes with organic animations
                </p>
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MotionLab 