import { gsap, ScrollTrigger } from '../gsap-init'

export function initScrollHue(): void {
  const targets = document.querySelectorAll('[data-gradient-bg]')
  if (targets.length === 0) return

  targets.forEach((target) => {
    gsap.to(target, {
      filter: 'hue-rotate(60deg)',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })
  })
}
