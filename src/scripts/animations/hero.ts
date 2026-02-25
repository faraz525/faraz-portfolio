import { gsap, ScrollTrigger, SplitText } from '../gsap-init'
import { scrambleText } from '../effects/text-scramble'

export function initHeroAnimations(): void {
  const heroTitle = document.querySelector('[data-hero-title]') as HTMLElement | null
  const heroSubtitle = document.querySelector('[data-hero-subtitle]')
  const heroSection = document.querySelector('[data-hero]')
  const parallaxLayers = document.querySelectorAll('[data-parallax]')

  if (!heroTitle || !heroSection) return

  // Phase 1: Scramble text (cipher decode effect)
  const originalText = heroTitle.textContent ?? ''
  heroTitle.style.opacity = '1'

  scrambleText(heroTitle, originalText, {
    duration: 1400,
    onComplete: () => {
      // Phase 2: SplitText character reveal
      const split = SplitText.create(heroTitle, { type: 'chars' })

      gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.6,
        ease: 'power4.out',
      })
    },
  })

  // Subtitle fade in
  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 1.6,
    })
  }

  // Parallax scrub for grid layers
  if (parallaxLayers.length > 0) {
    parallaxLayers.forEach((layer, i) => {
      const speed = (i + 1) * 50
      gsap.to(layer, {
        y: -speed,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })
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
