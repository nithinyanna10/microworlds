import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import { FaSun, FaMoon, FaPalette, FaDownload, FaTrash, FaCopy, FaPlus } from 'react-icons/fa'

const ModularSandbox = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [components, setComponents] = useState([
    { id: 1, type: 'chart', title: 'Analytics Chart', x: 0, y: 0 },
    { id: 2, type: 'card', title: 'User Stats', x: 320, y: 0 }
  ])
  const [customization, setCustomization] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    backgroundColor: '#1f2937',
    textColor: '#f9fafb'
  })
  const { playSound } = useAudio()

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${components.length + 1}`,
      x: Math.random() * 200,
      y: Math.random() * 200
    }
    setComponents([...components, newComponent])
    playSound('click')
  }

  const removeComponent = (id) => {
    setComponents(components.filter(c => c.id !== id))
    playSound('click')
  }

  const updateCustomization = (key, value) => {
    setCustomization(prev => ({ ...prev, [key]: value }))
    playSound('click')
  }

  const exportConfiguration = () => {
    const config = { theme: isDarkMode ? 'dark' : 'light', customization, components }
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'microworlds-dashboard-config.json'
    link.click()
    URL.revokeObjectURL(url)
    playSound('click')
  }

  const renderComponent = (component) => {
    const baseStyle = {
      position: 'absolute',
      left: component.x,
      top: component.y,
      width: 250,
      height: 150,
      backgroundColor: customization.backgroundColor,
      color: customization.textColor,
      borderRadius: '8px',
      padding: '16px'
    }

    switch (component.type) {
      case 'chart':
        return (
          <motion.div
            key={component.id}
            style={baseStyle}
            className="glass-morphism"
            drag
            onDragEnd={(e, info) => {
              setComponents(prev => prev.map(c => 
                c.id === component.id 
                  ? { ...c, x: info.point.x, y: info.point.y }
                  : c
              ))
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{component.title}</h3>
              <motion.button
                onClick={() => removeComponent(component.id)}
                className="p-1 bg-red-500 rounded text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash size={12} />
              </motion.button>
            </div>
            <div className="flex items-end justify-between h-24">
              {[20, 40, 60, 80, 30, 70].map((height, i) => (
                <motion.div
                  key={i}
                  className="bg-blue-500 rounded-t"
                  style={{ width: '12px', height: `${height}%` }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )

      case 'card':
        return (
          <motion.div
            key={component.id}
            style={baseStyle}
            className="glass-morphism"
            drag
            onDragEnd={(e, info) => {
              setComponents(prev => prev.map(c => 
                c.id === component.id 
                  ? { ...c, x: info.point.x, y: info.point.y }
                  : c
              ))
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{component.title}</h3>
              <motion.button
                onClick={() => removeComponent(component.id)}
                className="p-1 bg-red-500 rounded text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash size={12} />
              </motion.button>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1,234</div>
              <div className="text-sm text-gray-400">Total Users</div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 p-6"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Modular Sandbox
          </span>
        </h1>
        <p className="text-gray-300 text-lg">
          Phase 3C: Drag & Drop Dashboard Builder
        </p>
      </motion.div>

      <div className="flex h-screen">
        {/* Left Panel - Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 p-6 space-y-6 overflow-y-auto"
        >
          {/* Theme Toggle */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaPalette className="mr-2" />
              Theme
            </h3>
            <motion.button
              onClick={() => {
                setIsDarkMode(!isDarkMode)
                playSound('click')
              }}
              className={`w-full p-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-yellow-500 text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isDarkMode ? <FaMoon /> : <FaSun />}
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </motion.button>
          </div>

          {/* Live Customization */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Live Customization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => updateCustomization('primaryColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <input
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => updateCustomization('secondaryColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Component Library */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Components</h3>
            <div className="space-y-2">
              {['chart', 'card'].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => addComponent(type)}
                  className="w-full p-3 bg-gray-800 rounded-lg text-left flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlus />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Export Controls */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Export</h3>
            <motion.button
              onClick={exportConfiguration}
              className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload />
              <span>Download Config</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Panel - Canvas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6"
        >
          <div 
            className="relative w-full h-full bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-600 overflow-hidden"
            style={{ backgroundColor: customization.backgroundColor }}
          >
            {components.map(renderComponent)}
            
            {/* Empty State */}
            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FaPlus className="text-4xl mx-auto mb-4" />
                  <p>Add components from the library to start building</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ModularSandbox 