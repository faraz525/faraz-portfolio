import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap-init'

let currentVelocity = 0
let lenisInstance: Lenis | null = null

export function getScrollVelocity(): number {
  return currentVelocity
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function initSmoothScroll(): Lenis {
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.5,
  })

  lenisInstance.on('scroll', (e: { velocity: number }) => {
    currentVelocity = e.velocity
    ScrollTrigger.update()
  })

  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenisInstance
}
