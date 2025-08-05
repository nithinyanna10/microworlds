import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import ParticleCanvas from '../components/shared/ParticleCanvas'
import { FaRocket, FaDesktop, FaMobile, FaServer, FaGlobe, FaStar, FaPlay, FaCode } from 'react-icons/fa'

const GalaxyOverview = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const { playSound } = useAudio()
  const containerRef = useRef(null)

  const products = [
    {
      id: 'orbitos',
      name: 'OrbitOS',
      description: 'Retail Kiosk Operating System',
      category: 'Operating System',
      icon: FaDesktop,
      color: 'from-blue-400 to-cyan-500',
      orbit: { radius: 120, speed: 20, angle: 0 },
      features: ['Touch Interface', 'Payment Integration', 'Inventory Management', 'Analytics Dashboard'],
      position: { x: 20, y: 30 }
    },
    {
      id: 'flowui',
      name: 'FlowUI',
      description: 'Medical App Design System',
      category: 'Design System',
      icon: FaMobile,
      color: 'from-green-400 to-emerald-500',
      orbit: { radius: 150, speed: 25, angle: 90 },
      features: ['Accessibility First', 'HIPAA Compliant', 'Responsive Design', 'Component Library'],
      position: { x: 80, y: 25 }
    },
    {
      id: 'atomcms',
      name: 'AtomCMS',
      description: 'Component-Based Content Manager',
      category: 'Content Management',
      icon: FaServer,
      color: 'from-purple-400 to-pink-500',
      orbit: { radius: 180, speed: 30, angle: 180 },
      features: ['Atomic Design', 'Visual Editor', 'Version Control', 'Multi-tenant'],
      position: { x: 25, y: 75 }
    },
    {
      id: 'nexushub',
      name: 'NexusHub',
      description: 'Cross-Platform Design Bridge',
      category: 'Integration Platform',
      icon: FaGlobe,
      color: 'from-orange-400 to-red-500',
      orbit: { radius: 200, speed: 35, angle: 270 },
      features: ['API Gateway', 'Real-time Sync', 'Multi-platform', 'Scalable Architecture'],
      position: { x: 75, y: 70 }
    }
  ]

  useEffect(() => {
    const animateOrbits = () => {
      products.forEach(product => {
        product.orbit.angle += product.orbit.speed * 0.01
      })
    }

    const interval = setInterval(animateOrbits, 50)
    return () => clearInterval(interval)
  }, [])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    playSound('click')
  }

  const handleCanvasClick = () => {
    playSound('hover')
  }

  return (
    <div className="cosmic-background min-h-screen relative overflow-hidden">
      {/* Nebula Overlay */}
      <div className="nebula-overlay"></div>
      
      {/* Particle Canvas */}
      <ParticleCanvas 
        particleCount={150} 
        onClick={handleCanvasClick}
      />

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
              Galaxy of Products
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our constellation of innovative products, each orbiting in perfect harmony 
            to create seamless digital experiences across the universe.
          </p>
        </motion.div>

        {/* Interactive Galaxy Map */}
        <div className="relative mb-20">
          <div 
            ref={containerRef}
            className="relative w-full h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/30 overflow-hidden"
          >
            {/* Central Hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cosmic-glow">
                <FaStar className="text-3xl text-white" />
              </div>
            </motion.div>

            {/* Product Orbits */}
            {products.map((product, index) => {
              const x = 50 + Math.cos(product.orbit.angle * Math.PI / 180) * product.orbit.radius / 4
              const y = 50 + Math.sin(product.orbit.angle * Math.PI / 180) * product.orbit.radius / 4

              return (
                <motion.div
                  key={product.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredProduct(product)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  onClick={() => handleProductClick(product)}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center cosmic-glow`}
                    style={{
                      background: `linear-gradient(135deg, ${product.color.split(' ')[1]}, ${product.color.split(' ')[3]})`
                    }}
                    animate={{
                      scale: hoveredProduct?.id === product.id ? [1, 1.3, 1] : 1,
                      boxShadow: hoveredProduct?.id === product.id 
                        ? '0 0 30px rgba(59, 130, 246, 0.8)' 
                        : '0 0 20px rgba(59, 130, 246, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <product.icon className="text-2xl text-white" />
                  </motion.div>

                  {/* Orbit Trail */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-full h-full border border-blue-400/20 rounded-full"
                    style={{
                      width: `${product.orbit.radius * 2}px`,
                      height: `${product.orbit.radius * 2}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="glass-morphism p-6 rounded-2xl cosmic-glow cursor-pointer"
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              onClick={() => handleProductClick(product)}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}
                   style={{
                     background: `linear-gradient(135deg, ${product.color.split(' ')[1]}, ${product.color.split(' ')[3]})`
                   }}>
                <product.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">{product.name}</h3>
              <p className="text-gray-300 text-sm mb-3 text-center">{product.description}</p>
              <div className="text-blue-400 text-xs text-center">{product.category}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="glass-morphism p-8 rounded-3xl max-w-2xl w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4`}
                       style={{
                         background: `linear-gradient(135deg, ${selectedProduct.color.split(' ')[1]}, ${selectedProduct.color.split(' ')[3]})`
                       }}>
                    <selectedProduct.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedProduct.name}</h2>
                    <p className="text-gray-300">{selectedProduct.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FaPlay className="text-blue-400 mr-2 text-xs" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <motion.button
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCode className="inline mr-2" />
                    View Demo
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GalaxyOverview 