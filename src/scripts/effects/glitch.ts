import { gsap } from '../gsap-init'

export function triggerGlitch(element: HTMLElement, duration = 0.3): void {
  const rect = element.getBoundingClientRect()
  const layer = document.createElement('div')

  layer.className = 'glitch-layer'
  layer.style.position = 'fixed'
  layer.style.left = `${rect.left}px`
  layer.style.top = `${rect.top}px`
  layer.style.width = `${rect.width}px`
  layer.style.height = `${rect.height}px`
  layer.style.zIndex = '100'
  layer.style.pointerEvents = 'none'
  layer.style.background = `linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 107, 43, 0.1) 20%,
    transparent 40%,
    rgba(74, 127, 165, 0.08) 60%,
    transparent 80%
  )`
  layer.style.mixBlendMode = 'screen'

  document.body.appendChild(layer)

  gsap.fromTo(
    layer,
    {
      opacity: 0,
      x: -4,
      scaleX: 1.02,
    },
    {
      opacity: 1,
      x: 4,
      scaleX: 0.98,
      duration: duration * 0.3,
      yoyo: true,
      repeat: 3,
      ease: 'steps(2)',
      onComplete: () => {
        layer.remove()
      },
    }
  )
}
