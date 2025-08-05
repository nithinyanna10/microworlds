import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

export const useAudio = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const audioRefs = useRef({})

  const sounds = {
    hover: new Howl({ src: ['/audio/hover-click.mp3'], volume: 0.3, onloaderror: () => console.log('Audio file not found') }),
    click: new Howl({ src: ['/audio/hover-click.mp3'], volume: 0.5, onloaderror: () => console.log('Audio file not found') }),
    transition: new Howl({ src: ['/audio/section-transition.mp3'], volume: 0.4, onloaderror: () => console.log('Audio file not found') }),
    ambient: new Howl({ 
      src: ['/audio/ambient-space.mp3'], 
      volume: 0.2,
      loop: true,
      fade: true,
      onloaderror: () => console.log('Audio file not found')
    }),
    cosmic: new Howl({ src: ['/audio/cosmic-bootup.mp3'], volume: 0.6, onloaderror: () => console.log('Audio file not found') })
  }

  useEffect(() => {
    // Initialize audio refs
    Object.keys(sounds).forEach(key => {
      audioRefs.current[key] = sounds[key]
    })

    return () => {
      // Cleanup sounds on unmount
      Object.values(audioRefs.current).forEach(sound => {
        if (sound && sound.playing && sound.playing()) {
          sound.stop()
        }
      })
    }
  }, [])

  const playSound = (soundName) => {
    if (!isAudioEnabled) return
    
    const sound = audioRefs.current[soundName]
    if (sound && sound.play) {
      try {
        sound.volume(volume)
        sound.play()
      } catch (error) {
        console.log('Audio playback failed:', error)
      }
    }
  }

  const playAmbient = () => {
    if (!isAudioEnabled) return
    
    const ambient = audioRefs.current.ambient
    if (ambient && !ambient.playing()) {
      ambient.fade(0, volume, 2000)
      ambient.play()
    }
  }

  const stopAmbient = () => {
    const ambient = audioRefs.current.ambient
    if (ambient && ambient.playing()) {
      ambient.fade(volume, 0, 2000)
      setTimeout(() => ambient.stop(), 2000)
    }
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
    if (isAudioEnabled) {
      stopAmbient()
    } else {
      playAmbient()
    }
  }

  const updateVolume = (newVolume) => {
    setVolume(newVolume)
    Object.values(audioRefs.current).forEach(sound => {
      sound.volume(newVolume)
    })
  }

  return {
    isAudioEnabled,
    volume,
    playSound,
    playAmbient,
    stopAmbient,
    toggleAudio,
    updateVolume
  }
} 