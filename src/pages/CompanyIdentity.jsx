import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import { FaAtom, FaDna, FaGlobe, FaRocket, FaStar, FaPalette, FaLightbulb } from 'react-icons/fa'

const CompanyIdentity = () => {
  const [currentStage, setCurrentStage] = useState(0)
  const { playSound } = useAudio()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % 4)
      playSound('hover')
    }, 3000)

    return () => clearInterval(interval)
  }, [playSound])

  const brandStages = [
    {
      name: 'Atom',
      icon: FaAtom,
      description: 'The fundamental building block',
      color: 'from-blue-400 to-cyan-500',
      size: 'text-6xl'
    },
    {
      name: 'Molecule',
      icon: FaDna,
      description: 'Complex structures emerge',
      color: 'from-purple-400 to-pink-500',
      size: 'text-7xl'
    },
    {
      name: 'Universe',
      icon: FaGlobe,
      description: 'Infinite possibilities',
      color: 'from-green-400 to-emerald-500',
      size: 'text-8xl'
    },
    {
      name: 'Microworlds',
      icon: FaRocket,
      description: 'Designing digital galaxies',
      color: 'from-orange-400 to-red-500',
      size: 'text-6xl'
    }
  ]

  const values = [
    {
      icon: FaPalette,
      title: 'Creative Innovation',
      description: 'Pushing boundaries of digital design',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: FaLightbulb,
      title: 'Intelligent Solutions',
      description: 'AI-powered design systems',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: FaStar,
      title: 'Excellence',
      description: 'Crafting perfect user experiences',
      color: 'from-yellow-400 to-orange-500'
    }
  ]

  const renderIcon = (icon, color, size = 'text-6xl') => {
    const IconComponent = icon
    return (
      <IconComponent 
        className={`${size} bg-gradient-to-r ${color} bg-clip-text text-transparent cosmic-glow`} 
      />
    )
  }

  return (
    <div className="cosmic-background min-h-screen relative overflow-hidden">
      {/* Nebula Overlay */}
      <div className="nebula-overlay"></div>
      
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
              Our Identity
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From atomic design principles to cosmic user experiences, 
            we evolve with every interaction.
          </p>
        </motion.div>

        {/* Brand Evolution Animation */}
        <div className="mb-20">
          <motion.div
            className="text-center"
            key={currentStage}
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.div
                className={`mx-auto mb-6 ${brandStages[currentStage].size}`}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {renderIcon(
                  brandStages[currentStage].icon,
                  brandStages[currentStage].color,
                  brandStages[currentStage].size
                )}
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-4 text-white">
                {brandStages[currentStage].name}
              </h2>
              <p className="text-xl text-gray-300">
                {brandStages[currentStage].description}
              </p>
            </div>
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-4">
            {brandStages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStage ? 'bg-blue-400' : 'bg-gray-600'
                }`}
                animate={{
                  scale: index === currentStage ? [1, 1.5, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: index === currentStage ? Infinity : 0
                }}
              />
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="glass-morphism p-8 rounded-2xl text-center cosmic-glow"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {renderIcon(value.icon, value.color, 'text-5xl')}
              <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="glass-morphism p-12 rounded-3xl cosmic-glow">
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              To create digital experiences that feel as natural and infinite as the cosmos itself. 
              We believe every interaction should be a journey through a carefully crafted universe 
              of possibilities.
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-gray-400">Projects Launched</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400">Galaxies Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
                <div className="text-gray-400">Possibilities</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CompanyIdentity 