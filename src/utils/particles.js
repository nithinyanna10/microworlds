// Particle system utilities for Microworlds

export const createParticle = (x, y, options = {}) => {
  return {
    x: x || Math.random() * window.innerWidth,
    y: y || Math.random() * window.innerHeight,
    vx: options.vx || (Math.random() - 0.5) * 2,
    vy: options.vy || (Math.random() - 0.5) * 2,
    size: options.size || Math.random() * 3 + 1,
    opacity: options.opacity || Math.random() * 0.5 + 0.3,
    color: options.color || `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
    life: options.life || Infinity,
    type: options.type || 'cosmic'
  }
}

export const updateParticle = (particle, deltaTime = 1) => {
  const updated = { ...particle }
  
  // Update position
  updated.x += updated.vx * deltaTime
  updated.y += updated.vy * deltaTime
  
  // Update life
  if (updated.life !== Infinity) {
    updated.life -= deltaTime
    updated.opacity = Math.max(0, updated.life / 60)
  }
  
  // Bounce off edges
  if (updated.x <= 0 || updated.x >= window.innerWidth) {
    updated.vx *= -1
    updated.x = Math.max(0, Math.min(window.innerWidth, updated.x))
  }
  
  if (updated.y <= 0 || updated.y >= window.innerHeight) {
    updated.vy *= -1
    updated.y = Math.max(0, Math.min(window.innerHeight, updated.y))
  }
  
  return updated
}

export const createParticleExplosion = (x, y, count = 20, options = {}) => {
  return Array.from({ length: count }, () => createParticle(x, y, {
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    size: Math.random() * 4 + 2,
    opacity: 1,
    life: 60,
    color: options.color || `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
    type: 'explosion'
  }))
}

export const createStarField = (count = 100) => {
  return Array.from({ length: count }, () => createParticle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    {
      vx: 0,
      vy: 0,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      color: '#ffffff',
      type: 'star'
    }
  ))
}

export const createNebulaParticles = (count = 30) => {
  return Array.from({ length: count }, () => createParticle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    {
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 5 + 3,
      opacity: Math.random() * 0.3 + 0.1,
      color: `hsl(${Math.random() * 60 + 250}, 60%, 70%)`,
      type: 'nebula'
    }
  ))
} 