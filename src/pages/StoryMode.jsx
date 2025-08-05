import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import { FaPlay, FaPause, FaHome, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import CosmicBootup from './CosmicBootup'
import CompanyIdentity from './CompanyIdentity'
import GalaxyOverview from './GalaxyOverview'
import UXArchitecture from './UXArchitecture'
import UXPatterns from './UXPatterns'
import AtomicDesign from './AtomicDesign'
import TokenStudio from './TokenStudio'
import MotionLab from './MotionLab'
import IntelligenceLayer from './IntelligenceLayer'
import ModularSandbox from './ModularSandbox'

const StoryMode = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showProgress, setShowProgress] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const { playSound, playAmbient } = useAudio()

  const sections = [
    { id: 'bootup', title: 'Cosmic Bootup', component: CosmicBootup },
    { id: 'identity', title: 'Company Identity', component: CompanyIdentity },
    { id: 'galaxy', title: 'Galaxy Overview', component: GalaxyOverview },
    { id: 'architecture', title: 'UX Architecture', component: UXArchitecture },
    { id: 'patterns', title: 'UX Patterns', component: UXPatterns },
    { id: 'atomic', title: 'Atomic Design', component: AtomicDesign },
    { id: 'tokens', title: 'Token Studio', component: TokenStudio },
    { id: 'motion', title: 'Motion Lab', component: MotionLab },
    { id: 'intelligence', title: 'Intelligence Layer', component: IntelligenceLayer },
    { id: 'sandbox', title: 'Modular Sandbox', component: ModularSandbox }
  ]

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      if (currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1)
        playSound('transition')
      } else {
        setIsPlaying(false)
      }
    }, 8000) // 8 seconds per section

    return () => clearInterval(interval)
  }, [isPlaying, currentSection, sections.length, playSound])

  // Scroll to section
  const scrollToSection = (index) => {
    setCurrentSection(index)
    playSound('click')
    const section = document.getElementById(`section-${index}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Progress bar animation
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="story-mode-container" ref={containerRef}>
      {/* Cosmic Background */}
      <div className="cosmic-background fixed inset-0 -z-10" />
      <div className="nebula-overlay fixed inset-0 -z-10" />

      {/* Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-md rounded-full p-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-4 top-20 z-40 space-y-4"
      >
        {/* Play/Pause */}
        <motion.button
          onClick={() => {
            setIsPlaying(!isPlaying)
            playSound('click')
          }}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white cosmic-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </motion.button>

        {/* Section Navigation */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-3">
          <div className="space-y-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  currentSection === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section Titles */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40"
      >
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className={`text-sm font-medium transition-all cursor-pointer ${
                  currentSection === index
                    ? 'text-white scale-110'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => scrollToSection(index)}
                whileHover={{ x: 5 }}
              >
                {section.title}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Story Sections */}
      <div className="story-sections">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={`section-${index}`}
            className="story-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-content">
              <section.component />
            </div>
            
            {/* Section Transition */}
            {index < sections.length - 1 && (
              <motion.div
                className="section-transition"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="text-center py-8">
                  <motion.div
                    className="w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-600 mx-auto mb-4"
                    animate={{ scaleY: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-gray-400 text-sm">
                    Continue the journey...
                  </p>
                </div>
              </motion.div>
            )}
          </motion.section>
        ))}
      </div>

      {/* Floating Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-gray-900/50 backdrop-blur-md rounded-full p-2 flex space-x-2">
          <motion.button
            onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="w-10 h-10 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className="w-10 h-10 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowDown />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default StoryMode 