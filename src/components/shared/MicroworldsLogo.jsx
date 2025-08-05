import React from 'react'
import { motion } from 'framer-motion'
import { FaAtom, FaDna, FaGlobe, FaRocket } from 'react-icons/fa'

const MicroworldsLogo = ({ 
  size = 'text-6xl', 
  animated = true, 
  stage = 'final', // 'atom', 'molecule', 'universe', 'final'
  className = '' 
}) => {
  const getIcon = () => {
    switch (stage) {
      case 'atom':
        return FaAtom
      case 'molecule':
        return FaDna
      case 'universe':
        return FaGlobe
      case 'final':
      default:
        return FaRocket
    }
  }

  const getColor = () => {
    switch (stage) {
      case 'atom':
        return 'from-blue-400 to-cyan-500'
      case 'molecule':
        return 'from-purple-400 to-pink-500'
      case 'universe':
        return 'from-green-400 to-emerald-500'
      case 'final':
      default:
        return 'from-orange-400 to-red-500'
    }
  }

  const Icon = getIcon()
  const colorClass = getColor()

  if (animated) {
    return (
      <motion.div
        className={`${size} ${className}`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon className={`bg-gradient-to-r ${colorClass} bg-clip-text text-transparent cosmic-glow`} />
      </motion.div>
    )
  }

  return (
    <div className={`${size} ${className}`}>
      <Icon className={`bg-gradient-to-r ${colorClass} bg-clip-text text-transparent cosmic-glow`} />
    </div>
  )
}

export default MicroworldsLogo 