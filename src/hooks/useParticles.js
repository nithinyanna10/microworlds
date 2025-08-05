import { useState, useEffect, useRef } from 'react'

export const useParticles = (particleCount = 50) => {
  const [particles, setParticles] = useState([])
  const animationRef = useRef()
  const canvasRef = useRef(null)

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
    }))
    setParticles(initialParticles)
  }, [particleCount])

  const animateParticles = () => {
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        let { x, y, vx, vy, size, opacity, color } = particle

        // Update position
        x += vx
        y += vy

        // Bounce off edges
        if (x <= 0 || x >= window.innerWidth) vx *= -1
        if (y <= 0 || y >= window.innerHeight) vy *= -1

        // Keep particles in bounds
        x = Math.max(0, Math.min(window.innerWidth, x))
        y = Math.max(0, Math.min(window.innerHeight, y))

        // Subtle opacity animation
        opacity += (Math.random() - 0.5) * 0.1
        opacity = Math.max(0.2, Math.min(0.8, opacity))

        return { x, y, vx, vy, size, opacity, color }
      })
    )

    animationRef.current = requestAnimationFrame(animateParticles)
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateParticles)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const renderParticles = (canvas) => {
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()
    })
  }

  const createParticleExplosion = (x, y, count = 10) => {
    const explosionParticles = Array.from({ length: count }, () => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 2,
      opacity: 1,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
      life: 60 // frames
    }))

    setParticles(prev => [...prev, ...explosionParticles])
  }

  return {
    particles,
    renderParticles,
    createParticleExplosion,
    canvasRef
  }
} 