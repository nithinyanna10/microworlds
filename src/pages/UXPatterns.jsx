import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import ParticleCanvas from '../components/shared/ParticleCanvas'
import { FaArrowLeft, FaArrowRight, FaCode, FaEye, FaCopy, FaPlay, FaPause } from 'react-icons/fa'
import { uxPatterns } from '../data/patterns'

const UXPatterns = () => {
  const [selectedPattern, setSelectedPattern] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const { playSound } = useAudio()
  const scrollContainerRef = useRef(null)
  const horizontalScrollRef = useRef(null)

  const categories = ['All', 'Navigation', 'Forms', 'Feedback', 'Data Display']

  const filteredPatterns = selectedCategory === 'All' 
    ? uxPatterns 
    : uxPatterns.filter(pattern => pattern.category === selectedCategory)

  useEffect(() => {
    const handleWheel = (e) => {
      if (horizontalScrollRef.current) {
        e.preventDefault()
        horizontalScrollRef.current.scrollLeft += e.deltaY
      }
    }

    const container = horizontalScrollRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern)
    playSound('click')
  }

  const handleCardHover = (patternId) => {
    setHoveredCard(patternId)
    playSound('hover')
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    playSound('click')
  }

  return (
    <div className="cosmic-background min-h-screen relative overflow-hidden">
      {/* Nebula Overlay */}
      <div className="nebula-overlay"></div>
      
      {/* Particle Canvas */}
      <ParticleCanvas 
        particleCount={80} 
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
              UX Patterns Museum
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of interactive design patterns, each with live previews, 
            code snippets, and cosmic particle effects.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-morphism p-2 rounded-2xl flex space-x-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => {
                  setSelectedCategory(category)
                  playSound('click')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative mb-16">
          {/* Scroll Indicators */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <motion.button
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white cosmic-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (horizontalScrollRef.current) {
                  horizontalScrollRef.current.scrollLeft -= 400
                }
                playSound('click')
              }}
            >
              <FaArrowLeft />
            </motion.button>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <motion.button
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white cosmic-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (horizontalScrollRef.current) {
                  horizontalScrollRef.current.scrollLeft += 400
                }
                playSound('click')
              }}
            >
              <FaArrowRight />
            </motion.button>
          </div>

          {/* Horizontal Scroll */}
          <div
            ref={horizontalScrollRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide pb-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredPatterns.map((pattern, patternIndex) => (
              <motion.div
                key={pattern.id}
                className="flex-shrink-0 w-96"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: patternIndex * 0.1 }}
              >
                <div className="glass-morphism p-6 rounded-3xl cosmic-glow h-full">
                  {/* Pattern Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">{pattern.name}</h3>
                    <div className="flex space-x-2">
                      <motion.button
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePatternClick(pattern)}
                      >
                        <FaEye className="text-sm" />
                      </motion.button>
                      <motion.button
                        className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
                      </motion.button>
                    </div>
                  </div>

                  {/* Pattern Preview */}
                  <div 
                    className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-blue-500/30 cursor-pointer"
                    onMouseEnter={() => handleCardHover(pattern.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handlePatternClick(pattern)}
                  >
                    <div className="text-center text-gray-400 mb-2">
                      {pattern.patterns[0]?.name || 'Component Preview'}
                    </div>
                    <div className="h-32 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400">Interactive Preview</span>
                    </div>
                  </div>

                  {/* Pattern Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-blue-400">{pattern.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Patterns:</span>
                      <span className="text-purple-400">{pattern.patterns.length}</span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <AnimatePresence>
                    {hoveredCard === pattern.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pattern Detail Modal */}
        <AnimatePresence>
          {selectedPattern && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPattern(null)}
            >
              <motion.div
                className="glass-morphism p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white">{selectedPattern.name}</h2>
                  <motion.button
                    className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPattern(null)}
                  >
                    ×
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pattern Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Patterns</h3>
                    <div className="space-y-4">
                      {selectedPattern.patterns.map((pattern, index) => (
                        <motion.div
                          key={index}
                          className="p-4 bg-gray-800/50 rounded-lg border border-blue-500/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">{pattern.name}</h4>
                          <p className="text-gray-300 mb-3">{pattern.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {pattern.states.map((state, stateIndex) => (
                              <span
                                key={stateIndex}
                                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm"
                              >
                                {state}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Code Snippet */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">Code Example</h3>
                      <motion.button
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyCode(selectedPattern.patterns[0]?.code || '')}
                      >
                        <FaCopy className="text-sm" />
                        <span>Copy</span>
                      </motion.button>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{selectedPattern.patterns[0]?.code || '// Code example will appear here'}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UXPatterns 