import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaCircle } from 'react-icons/fa'

const ConstellationDisplay = ({ 
  constellation, 
  isActive = false, 
  onClick = null,
  size = 'medium' // 'small', 'medium', 'large'
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48', 
    large: 'w-64 h-64'
  }

  const starSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  }

  const renderStars = () => {
    return constellation.stars.map((star, index) => (
      <motion.div
        key={index}
        className={`absolute ${starSizes[size]} text-yellow-300`}
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`
        }}
        animate={{
          scale: isActive || isHovered ? [1, 1.3, 1] : 1,
          opacity: isActive || isHovered ? [0.5, 1, 0.8] : 0.7
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.2
        }}
      >
        <FaStar className="drop-shadow-lg" />
      </motion.div>
    ))
  }

  const renderLines = () => {
    return constellation.connections.map((connection, index) => {
      const startStar = constellation.stars[connection[0]]
      const endStar = constellation.stars[connection[1]]
      
      const length = Math.sqrt(
        Math.pow(endStar.x - startStar.x, 2) + 
        Math.pow(endStar.y - startStar.y, 2)
      )
      
      const angle = Math.atan2(endStar.y - startStar.y, endStar.x - startStar.x) * 180 / Math.PI
      
      return (
        <motion.div
          key={index}
          className="absolute bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          style={{
            left: `${startStar.x}%`,
            top: `${startStar.y}%`,
            width: `${length}%`,
            height: '2px',
            transformOrigin: '0 50%',
            transform: `rotate(${angle}deg)`
          }}
          animate={{
            opacity: isActive || isHovered ? [0.3, 0.8, 0.3] : 0.2,
            scaleX: isActive || isHovered ? [0.8, 1.2, 0.8] : 1
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.3
          }}
        />
      )
    })
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Constellation Lines */}
      {renderLines()}
      
      {/* Stars */}
      {renderStars()}
      
      {/* Constellation Name */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        animate={{
          opacity: isActive || isHovered ? 1 : 0.7
        }}
      >
        <h3 className="text-white font-semibold text-sm">{constellation.name}</h3>
        <p className="text-gray-400 text-xs">{constellation.description}</p>
      </motion.div>
    </motion.div>
  )
}

export default ConstellationDisplay 