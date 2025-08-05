import React, { useEffect, useRef } from 'react'
import { useParticles } from '../../hooks/useParticles'

const ParticleCanvas = ({ particleCount = 50, onClick }) => {
  const canvasRef = useRef(null)
  const { particles, renderParticles, createParticleExplosion } = useParticles(particleCount)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      renderParticles(canvas)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particles, renderParticles])

  const handleClick = (e) => {
    if (!onClick) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    createParticleExplosion(x, y, 15)
    onClick(e)
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-pointer"
      onClick={handleClick}
    />
  )
}

export default ParticleCanvas 