import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import { FaDownload, FaPalette, FaFont, FaRuler, FaEyeDropper, FaCopy, FaUndo, FaRedo } from 'react-icons/fa'
import { designTokens, themePresets } from '../data/tokens'

const TokenStudio = () => {
  const [activeTheme, setActiveTheme] = useState('corporate')
  const [customTokens, setCustomTokens] = useState(designTokens)
  const [history, setHistory] = useState([designTokens])
  const [historyIndex, setHistoryIndex] = useState(0)
  const { playSound } = useAudio()

  // Live preview components
  const [previewComponents, setPreviewComponents] = useState({
    button: true,
    card: true,
    input: true,
    typography: true
  })

  const handleTokenChange = (category, key, value) => {
    playSound('click')
    
    const newTokens = {
      ...customTokens,
      [category]: {
        ...customTokens[category],
        [key]: value
      }
    }
    
    setCustomTokens(newTokens)
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newTokens)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const applyThemePreset = (presetName) => {
    playSound('click')
    const preset = themePresets[presetName]
    setActiveTheme(presetName)
    setCustomTokens(preset)
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(preset)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      playSound('click')
      setHistoryIndex(historyIndex - 1)
      setCustomTokens(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      playSound('click')
      setHistoryIndex(historyIndex + 1)
      setCustomTokens(history[historyIndex + 1])
    }
  }

  const exportJSON = () => {
    playSound('click')
    const dataStr = JSON.stringify(customTokens, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `microworlds-design-system-${activeTheme}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    playSound('click')
    const dataStr = JSON.stringify(customTokens, null, 2)
    navigator.clipboard.writeText(dataStr)
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
            Token Studio
          </span>
        </h1>
        <p className="text-gray-300 text-lg">
          Live Design System Playground
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Token Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Theme Presets */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaPalette className="mr-2" />
              Theme Presets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(themePresets).map((preset) => (
                <motion.button
                  key={preset}
                  onClick={() => applyThemePreset(preset)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    activeTheme === preset
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* History Controls */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">History</h3>
            <div className="flex space-x-3">
              <motion.button
                onClick={undo}
                disabled={historyIndex === 0}
                className="flex-1 p-3 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUndo className="mx-auto" />
              </motion.button>
              <motion.button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className="flex-1 p-3 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaRedo className="mx-auto" />
              </motion.button>
            </div>
          </div>

          {/* Export Controls */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Export</h3>
            <div className="space-y-3">
              <motion.button
                onClick={exportJSON}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDownload className="mr-2" />
                Download JSON
              </motion.button>
              <motion.button
                onClick={copyToClipboard}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCopy className="mr-2" />
                Copy to Clipboard
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Center Panel - Token Sliders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Colors */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaEyeDropper className="mr-2" />
              Colors
            </h3>
            <div className="space-y-4">
              {Object.entries(customTokens.colors).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 capitalize">{key}</span>
                    <span className="text-gray-400 font-mono text-sm">{value}</span>
                  </div>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleTokenChange('colors', key, e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaFont className="mr-2" />
              Typography
            </h3>
            <div className="space-y-4">
              {Object.entries(customTokens.typography).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 capitalize">{key}</span>
                    <span className="text-gray-400 font-mono text-sm">{value}</span>
                  </div>
                  <input
                    type="range"
                    min={key.includes('size') ? 12 : 100}
                    max={key.includes('size') ? 72 : 900}
                    step={key.includes('size') ? 1 : 100}
                    value={parseInt(value)}
                    onChange={(e) => handleTokenChange('typography', key, e.target.value + (key.includes('size') ? 'px' : ''))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaRuler className="mr-2" />
              Spacing
            </h3>
            <div className="space-y-4">
              {Object.entries(customTokens.spacing).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 capitalize">{key}</span>
                    <span className="text-gray-400 font-mono text-sm">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="64"
                    step="1"
                    value={parseInt(value)}
                    onChange={(e) => handleTokenChange('spacing', key, e.target.value + 'px')}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-morphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
            
            {/* Preview Controls */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {Object.entries(previewComponents).map(([component, isVisible]) => (
                <motion.button
                  key={component}
                  onClick={() => setPreviewComponents(prev => ({ ...prev, [component]: !isVisible }))}
                  className={`p-2 rounded-lg text-sm font-medium ${
                    isVisible
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {component.charAt(0).toUpperCase() + component.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Live Components */}
            <div className="space-y-4">
              <AnimatePresence>
                {previewComponents.button && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-4 rounded-lg border border-gray-700"
                  >
                    <h4 className="text-sm font-medium mb-2 text-gray-400">Button</h4>
                    <button
                      className="px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        backgroundColor: customTokens.colors.primary,
                        color: customTokens.colors.white,
                        fontSize: customTokens.typography.buttonSize,
                        padding: `${customTokens.spacing.sm} ${customTokens.spacing.md}`,
                        borderRadius: customTokens.borderRadius.md
                      }}
                    >
                      Primary Button
                    </button>
                  </motion.div>
                )}

                {previewComponents.card && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-4 rounded-lg border border-gray-700"
                  >
                    <h4 className="text-sm font-medium mb-2 text-gray-400">Card</h4>
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: customTokens.colors.surface,
                        color: customTokens.colors.text,
                        fontSize: customTokens.typography.bodySize,
                        padding: customTokens.spacing.md,
                        borderRadius: customTokens.borderRadius.lg,
                        boxShadow: customTokens.shadows.md
                      }}
                    >
                      <h5 className="font-semibold mb-2" style={{ fontSize: customTokens.typography.headingSize }}>
                        Card Title
                      </h5>
                      <p>This is a preview card with live token updates.</p>
                    </div>
                  </motion.div>
                )}

                {previewComponents.input && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-4 rounded-lg border border-gray-700"
                  >
                    <h4 className="text-sm font-medium mb-2 text-gray-400">Input</h4>
                    <input
                      type="text"
                      placeholder="Enter text..."
                      className="w-full px-3 py-2 rounded-lg border transition-all"
                      style={{
                        backgroundColor: customTokens.colors.surface,
                        color: customTokens.colors.text,
                        fontSize: customTokens.typography.bodySize,
                        padding: `${customTokens.spacing.sm} ${customTokens.spacing.md}`,
                        borderRadius: customTokens.borderRadius.md,
                        borderColor: customTokens.colors.border
                      }}
                    />
                  </motion.div>
                )}

                {previewComponents.typography && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-4 rounded-lg border border-gray-700"
                  >
                    <h4 className="text-sm font-medium mb-2 text-gray-400">Typography</h4>
                    <div className="space-y-2">
                      <h1 style={{ fontSize: customTokens.typography.headingSize, color: customTokens.colors.text }}>
                        Heading 1
                      </h1>
                      <h2 style={{ fontSize: customTokens.typography.subheadingSize, color: customTokens.colors.text }}>
                        Heading 2
                      </h2>
                      <p style={{ fontSize: customTokens.typography.bodySize, color: customTokens.colors.text }}>
                        Body text with custom styling
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TokenStudio 