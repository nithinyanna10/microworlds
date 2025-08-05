export const animationConfig = {
  cosmic: {
    bootup: {
      duration: 3000,
      easing: 'ease-out',
      stages: [
        { time: 0, opacity: 0, scale: 0 },
        { time: 500, opacity: 0.5, scale: 0.5 },
        { time: 1500, opacity: 1, scale: 1.2 },
        { time: 3000, opacity: 1, scale: 1 }
      ]
    },
    particle: {
      duration: 6000,
      easing: 'ease-in-out',
      properties: ['opacity', 'transform', 'filter']
    },
    orbit: {
      duration: 20000,
      easing: 'linear',
      rotation: 360
    }
  },
  transitions: {
    page: {
      duration: 800,
      easing: 'ease-in-out'
    },
    component: {
      duration: 300,
      easing: 'ease-out'
    },
    micro: {
      duration: 150,
      easing: 'ease-out'
    }
  },
  effects: {
    hover: {
      scale: 1.05,
      duration: 200,
      easing: 'ease-out'
    },
    click: {
      scale: 0.95,
      duration: 100,
      easing: 'ease-in'
    },
    glow: {
      intensity: 0.3,
      duration: 2000,
      easing: 'ease-in-out'
    }
  }
}

export const particleConfig = {
  starField: {
    count: 100,
    size: { min: 0.5, max: 2 },
    opacity: { min: 0.2, max: 0.8 },
    color: '#ffffff'
  },
  nebula: {
    count: 30,
    size: { min: 3, max: 8 },
    opacity: { min: 0.1, max: 0.4 },
    color: 'hsl(250, 60%, 70%)'
  },
  cosmic: {
    count: 50,
    size: { min: 1, max: 3 },
    opacity: { min: 0.3, max: 0.8 },
    color: 'hsl(200, 70%, 60%)'
  }
}

export const scrollConfig = {
  zones: 15,
  snapPoints: [
    0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400
  ],
  thresholds: {
    enter: 0.1,
    exit: 0.9
  }
} 