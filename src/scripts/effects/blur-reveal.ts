import { gsap } from '../gsap-init'

interface BlurRevealOptions {
  readonly blur?: number
  readonly duration?: number
  readonly y?: number
  readonly stagger?: number
  readonly delay?: number
}

export function blurReveal(
  elements: Element | Element[] | NodeListOf<Element>,
  options: BlurRevealOptions = {}
): gsap.core.Tween {
  const {
    blur = 12,
    duration = 0.8,
    y = 20,
    stagger = 0.1,
    delay = 0,
  } = options

  return gsap.from(elements, {
    filter: `blur(${blur}px)`,
    opacity: 0,
    y,
    stagger,
    duration,
    delay,
    ease: 'power2.out',
  })
}
