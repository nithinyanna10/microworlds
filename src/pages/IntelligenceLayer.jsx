import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import { FaBrain, FaChartLine, FaLightbulb, FaMagic, FaEye, FaEyeSlash, FaDownload, FaShare } from 'react-icons/fa'

const IntelligenceLayer = () => {
  const [activeTab, setActiveTab] = useState('predictive')
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [aiInsights, setAiInsights] = useState([])
  const [userPath, setUserPath] = useState([])
  const { playSound } = useAudio()

  // Simulated AI insights
  useEffect(() => {
    const insights = [
      { id: 1, type: 'optimization', message: 'Button placement optimized for 23% higher CTR', confidence: 0.89 },
      { id: 2, type: 'pattern', message: 'Users prefer card layouts over lists', confidence: 0.76 },
      { id: 3, type: 'friction', message: 'Form completion rate drops at step 3', confidence: 0.92 },
      { id: 4, type: 'suggestion', message: 'Consider adding progress indicators', confidence: 0.81 }
    ]
    setAiInsights(insights)
  }, [])

  // Simulated user path
  useEffect(() => {
    const path = [
      { x: 20, y: 30, time: 0, action: 'land' },
      { x: 45, y: 35, time: 2, action: 'hover' },
      { x: 70, y: 40, time: 4, action: 'click' },
      { x: 85, y: 60, time: 6, action: 'scroll' },
      { x: 60, y: 80, time: 8, action: 'focus' }
    ]
    setUserPath(path)
  }, [])

  const tabs = [
    { id: 'predictive', label: 'Predictive UX', icon: FaChartLine },
    { id: 'ai-decisions', label: 'AI Decisions', icon: FaBrain },
    { id: 'frictionless', label: 'Frictionless UX', icon: FaMagic },
    { id: 'suggestions', label: 'Smart Suggestions', icon: FaLightbulb }
  ]

  const PredictiveUX = () => (
    <div className="space-y-6">
      {/* Heatmap */}
      <div className="glass-morphism p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">User Interaction Heatmap</h3>
          <motion.button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="p-2 bg-gray-800 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showHeatmap ? <FaEyeSlash /> : <FaEye />}
          </motion.button>
        </div>
        
        <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
          {/* Heatmap Grid */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 gap-1 p-2">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-red-500/20 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: showHeatmap ? 1 : 0 }}
                transition={{ delay: i * 0.01 }}
                style={{
                  backgroundColor: `rgba(239, 68, 68, ${Math.random() * 0.8 + 0.2})`
                }}
              />
            ))}
          </div>
          
          {/* User Path */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d={`M ${userPath.map(p => `${p.x * 5} ${p.y * 4}`).join(' L ')}`}
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {userPath.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x * 5}
                cy={point.y * 4}
                r="3"
                fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.5 }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Engagement Rate', value: '87%', trend: '+12%' },
          { label: 'Conversion Rate', value: '23%', trend: '+5%' },
          { label: 'Bounce Rate', value: '34%', trend: '-8%' }
        ].map((metric, i) => (
          <motion.div
            key={i}
            className="glass-morphism p-4 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-gray-400 text-sm">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-green-400 text-sm">{metric.trend}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const AIDecisions = () => (
    <div className="space-y-6">
      {/* AI Insights */}
      <div className="glass-morphism p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">AI-Powered Design Decisions</h3>
        <div className="space-y-4">
          {aiInsights.map((insight, i) => (
            <motion.div
              key={insight.id}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex-1">
                <p className="text-gray-300">{insight.message}</p>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-2 mr-3">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${insight.confidence * 100}%` }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
              <motion.button
                className="ml-4 p-2 bg-blue-500 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMagic />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Visualization */}
      <div className="glass-morphism p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'User Satisfaction', value: 4.8, max: 5 },
            { label: 'Task Completion', value: 92, max: 100 },
            { label: 'Error Rate', value: 3, max: 100 },
            { label: 'Response Time', value: 1.2, max: 5 }
          ].map((metric, i) => (
            <div key={i} className="text-center">
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#374151"
                    strokeWidth="4"
                    fill="none"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - metric.value / metric.max)}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - metric.value / metric.max) }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{metric.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const FrictionlessUX = () => (
    <div className="space-y-6">
      {/* Before/After Comparison */}
      <div className="glass-morphism p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Frictionless Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-red-400">Before</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300">❌ 5-step registration process</p>
              </div>
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300">❌ Hidden navigation menus</p>
              </div>
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300">❌ No progress indicators</p>
              </div>
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300">❌ Complex form validation</p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-green-400">After</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300">✅ One-click registration</p>
              </div>
              <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300">✅ Intuitive navigation</p>
              </div>
              <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300">✅ Clear progress tracking</p>
              </div>
              <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300">✅ Smart form assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Time to Complete', before: '3.2 min', after: '45 sec', improvement: '76%' },
          { label: 'Error Rate', before: '23%', after: '4%', improvement: '83%' },
          { label: 'User Satisfaction', before: '2.8/5', after: '4.7/5', improvement: '68%' }
        ].map((metric, i) => (
          <motion.div
            key={i}
            className="glass-morphism p-4 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
            <div className="space-y-1">
              <p className="text-red-400 text-sm">{metric.before}</p>
              <p className="text-green-400 text-lg font-bold">{metric.after}</p>
              <p className="text-blue-400 text-sm">+{metric.improvement}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const SmartSuggestions = () => (
    <div className="space-y-6">
      {/* Context-Aware Recommendations */}
      <div className="glass-morphism p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Smart Component Suggestions</h3>
        <div className="space-y-4">
          {[
            {
              context: 'User browsing products',
              suggestion: 'Add "Recently Viewed" carousel',
              impact: 'High',
              confidence: 0.94
            },
            {
              context: 'Form completion drop-off',
              suggestion: 'Implement auto-save functionality',
              impact: 'Medium',
              confidence: 0.87
            },
            {
              context: 'Mobile navigation patterns',
              suggestion: 'Consider bottom navigation bar',
              impact: 'High',
              confidence: 0.91
            },
            {
              context: 'Loading states',
              suggestion: 'Add skeleton loading screens',
              impact: 'Medium',
              confidence: 0.82
            }
          ].map((suggestion, i) => (
            <motion.div
              key={i}
              className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">{suggestion.context}</p>
                  <p className="text-gray-200 font-medium">{suggestion.suggestion}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      suggestion.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {suggestion.impact} Impact
                    </span>
                    <span className="text-xs text-gray-400">
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    className="p-2 bg-green-500 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✓
                  </motion.button>
                  <motion.button
                    className="p-2 bg-gray-600 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Implementation Preview */}
      <div className="glass-morphism p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Implementation Preview</h3>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">Recently Viewed Products</h4>
            <span className="text-sm text-gray-400">Auto-generated</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-gray-700 rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gray-600 rounded mx-auto mb-2" />
                <p className="text-sm text-gray-300">Product {i}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'predictive':
        return <PredictiveUX />
      case 'ai-decisions':
        return <AIDecisions />
      case 'frictionless':
        return <FrictionlessUX />
      case 'suggestions':
        return <SmartSuggestions />
      default:
        return <PredictiveUX />
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
            Intelligence Layer
          </span>
        </h1>
        <p className="text-gray-300 text-lg">
          Phase 3B: Smart UX with AI-Powered Insights
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="glass-morphism p-2 rounded-2xl mb-8">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                playSound('click')
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default IntelligenceLayer 