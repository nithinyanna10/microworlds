export const clientConstellations = [
  {
    id: 'novabank',
    name: 'The Bull',
    company: 'NovaBank',
    description: 'Financial Strength',
    color: 'from-green-400 to-emerald-500',
    stars: [
      { x: 20, y: 30 },  // Head
      { x: 35, y: 45 },  // Eye
      { x: 50, y: 60 },  // Body
      { x: 65, y: 45 },  // Back
      { x: 80, y: 30 },  // Tail
      { x: 30, y: 70 },  // Front leg
      { x: 60, y: 75 },  // Back leg
      { x: 45, y: 20 }   // Horn
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], // Main body
      [2, 5], [2, 6], // Legs
      [0, 7], [1, 7]  // Horns
    ],
    meaning: 'Taurus represents stability, strength, and financial prosperity. Perfect for a banking institution.'
  },
  {
    id: 'synthmed',
    name: 'The Twins',
    company: 'SynthMed',
    description: 'Medical Innovation',
    color: 'from-purple-400 to-pink-500',
    stars: [
      { x: 25, y: 25 },  // Twin 1 head
      { x: 75, y: 25 },  // Twin 2 head
      { x: 25, y: 45 },  // Twin 1 body
      { x: 75, y: 45 },  // Twin 2 body
      { x: 25, y: 65 },  // Twin 1 leg
      { x: 75, y: 65 },  // Twin 2 leg
      { x: 50, y: 35 },  // Connection point
      { x: 50, y: 55 }   // Connection point
    ],
    connections: [
      [0, 2], [2, 4], // Twin 1
      [1, 3], [3, 5], // Twin 2
      [2, 6], [3, 6], // Connection
      [2, 7], [3, 7]  // Connection
    ],
    meaning: 'Gemini represents duality, communication, and innovation. Ideal for medical technology that bridges human and machine.'
  },
  {
    id: 'quantumcorp',
    name: 'The Archer',
    company: 'QuantumCorp',
    description: 'Precision & Power',
    color: 'from-blue-400 to-cyan-500',
    stars: [
      { x: 50, y: 20 },  // Bow center
      { x: 30, y: 30 },  // Bow left
      { x: 70, y: 30 },  // Bow right
      { x: 50, y: 50 },  // Archer body
      { x: 50, y: 70 },  // Archer legs
      { x: 35, y: 60 },  // Left arm
      { x: 65, y: 60 },  // Right arm
      { x: 80, y: 40 },  // Arrow tip
      { x: 60, y: 45 }   // Arrow shaft
    ],
    connections: [
      [0, 1], [0, 2], // Bow
      [0, 3], [3, 4], // Body
      [3, 5], [3, 6], // Arms
      [7, 8], [8, 3]  // Arrow
    ],
    meaning: 'Sagittarius represents precision, power, and forward momentum. Perfect for quantum computing and advanced technology.'
  },
  {
    id: 'cybertech',
    name: 'The Phoenix',
    company: 'CyberTech',
    description: 'Rising Innovation',
    color: 'from-orange-400 to-red-500',
    stars: [
      { x: 50, y: 30 },  // Head
      { x: 40, y: 45 },  // Left wing
      { x: 60, y: 45 },  // Right wing
      { x: 50, y: 60 },  // Body
      { x: 45, y: 75 },  // Left tail
      { x: 55, y: 75 },  // Right tail
      { x: 35, y: 35 },  // Left wing tip
      { x: 65, y: 35 },  // Right wing tip
      { x: 50, y: 80 }   // Tail tip
    ],
    connections: [
      [0, 1], [0, 2], // Wings from head
      [1, 6], [2, 7], // Wing tips
      [0, 3], [3, 4], [3, 5], // Body and tails
      [4, 8], [5, 8]  // Tail tips
    ],
    meaning: 'The Phoenix represents rebirth, innovation, and rising from challenges. Ideal for cutting-edge cyber technology.'
  }
]

export const getConstellationById = (id) => {
  return clientConstellations.find(constellation => constellation.id === id)
}

export const getAllConstellations = () => {
  return clientConstellations
} 