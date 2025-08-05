import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAudio } from '../../hooks/useAudio'
import { FaHome, FaBuilding, FaGlobe, FaCube, FaStar, FaCode, FaEye, FaPalette } from 'react-icons/fa'
import { AnimatePresence } from 'framer-motion'

const CosmicNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { playSound } = useAudio()

  const navItems = [
    { path: '/', label: 'Cosmic Bootup', icon: FaHome },
    { path: '/company', label: 'Company Identity', icon: FaBuilding },
    { path: '/galaxy', label: 'Galaxy Overview', icon: FaGlobe },
    { path: '/architecture', label: 'UX Architecture', icon: FaCube },
    { path: '/patterns', label: 'UX Patterns', icon: FaCode },
    { path: '/atomic', label: 'Atomic Design', icon: FaEye },
    { path: '/tokens', label: 'Token Studio', icon: FaPalette }
  ]

  const handleNavClick = () => {
    playSound('click')
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <motion.button
        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white cosmic-glow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaStar className="text-xl" />
      </motion.button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 glass-morphism p-4 rounded-2xl min-w-48"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-blue-900/20'
                  }`}
                >
                  {(() => {
                    const IconComponent = item.icon
                    return <IconComponent className="text-lg" />
                  })()}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CosmicNavigation 