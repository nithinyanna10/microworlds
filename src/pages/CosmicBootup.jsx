import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import ParticleCanvas from '../components/shared/ParticleCanvas'
import { FaRocket, FaAtom, FaGlobe, FaStar } from 'react-icons/fa'
import MicroworldsLogo from '../components/shared/MicroworldsLogo'
import ConstellationDisplay from '../components/shared/ConstellationDisplay'
import { clientConstellations } from '../data/constellations'

const CosmicBootup = () => {
  const [bootupStage, setBootupStage] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const { playSound, playAmbient } = useAudio()

  useEffect(() => {
    // Start cosmic bootup sequence
    const bootupSequence = async () => {
      playSound('cosmic')
      
      // Stage 1: Particle initialization
      await new Promise(resolve => setTimeout(resolve, 1000))
      setBootupStage(1)
      
      // Stage 2: Logo formation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBootupStage(2)
      
      // Stage 3: Brand reveal
      await new Promise(resolve => setTimeout(resolve, 1500))
      setBootupStage(3)
      
      // Stage 4: Content reveal
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShowContent(true)
      playAmbient()
    }

    bootupSequence()
  }, [])

  const handleCanvasClick = (e) => {
    playSound('click')
  }

  return (
    <div className="cosmic-background min-h-screen relative overflow-hidden">
      {/* Nebula Overlay */}
      <div className="nebula-overlay"></div>
      
      {/* Particle Canvas */}
      <ParticleCanvas 
        particleCount={100} 
        onClick={handleCanvasClick}
      />

      {/* Bootup Animation Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AnimatePresence>
          {bootupStage >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-center"
            >
              {/* Logo Animation */}
              <div className="mb-8">
                <MicroworldsLogo 
                  size="text-8xl" 
                  stage={bootupStage === 1 ? 'atom' : bootupStage === 2 ? 'molecule' : bootupStage === 3 ? 'universe' : 'final'}
                />
              </div>

              {/* Brand Text */}
              <motion.h1
                className="text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Microworlds
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Designing the Building Blocks of Experience
              </motion.p>

              {/* Loading Animation */}
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Company Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center max-w-4xl mx-auto px-8">
                {/* Company Pitch */}
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                      We Build Galaxies of Experience
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    From atomic design systems to cosmic user interfaces, 
                    we craft digital universes that transform how people interact with technology.
                  </p>
                </motion.div>

                {/* Cosmic Client Constellations */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {clientConstellations.map((constellation, index) => (
                    <motion.div
                      key={constellation.id}
                      className="glass-morphism p-8 rounded-2xl cosmic-glow text-center"
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      <div className="flex justify-center mb-6">
                        <ConstellationDisplay 
                          constellation={constellation}
                          size="medium"
                          onClick={() => playSound('click')}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{constellation.company}</h3>
                      <p className="text-gray-400 text-sm mb-3">{constellation.name}</p>
                      <p className="text-blue-300 text-xs">{constellation.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  className="mt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full cosmic-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playSound('click')}
                  >
                    Explore Our Universe
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CosmicBootup 