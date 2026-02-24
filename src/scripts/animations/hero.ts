import { gsap, ScrollTrigger, SplitText } from '../gsap-init'

export function initHeroAnimations(): void {
  const heroTitle = document.querySelector('[data-hero-title]')
  const heroSubtitle = document.querySelector('[data-hero-subtitle]')
  const heroSection = document.querySelector('[data-hero]')

  if (!heroTitle || !heroSection) return

  const split = SplitText.create(heroTitle, { type: 'chars' })

  const tl = gsap.timeline()

  tl.from(split.chars, {
    opacity: 0,
    y: 80,
    rotateX: -90,
    stagger: 0.04,
    duration: 1.2,
    ease: 'power4.out',
  })

  if (heroSubtitle) {
    tl.from(
      heroSubtitle,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
      },
      '-=0.4'
    )
  }

  // Scroll-away fade
  gsap.to(heroSection, {
    opacity: 0,
    scale: 0.95,
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  })
}
