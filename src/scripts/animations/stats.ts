import { gsap, ScrollTrigger } from '../gsap-init'

export function initStatsAnimations(): void {
  const statsSection = document.querySelector('[data-stats]')
  const statSlides = document.querySelectorAll('[data-stat-slide]')

  if (!statsSection || statSlides.length === 0) return

  const totalSlides = statSlides.length
  let currentIndex = 0

  // Set initial state: first slide visible, rest hidden
  statSlides.forEach((slide, i) => {
    const el = slide as HTMLElement
    if (i === 0) {
      el.style.display = 'flex'
      el.style.opacity = '1'
    } else {
      el.style.display = 'none'
      el.style.opacity = '0'
    }
  })

  // Pin the section and cycle slides
  ScrollTrigger.create({
    trigger: statsSection,
    start: 'top top',
    end: () => `+=${totalSlides * 100}vh`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const progress = self.progress
      const newIndex = Math.min(
        Math.floor(progress * totalSlides),
        totalSlides - 1
      )

      if (newIndex !== currentIndex) {
        // Hide current slide
        const currentSlide = statSlides[currentIndex] as HTMLElement
        const currentBg = currentSlide.querySelector('[data-stat-bg]') as HTMLElement
        currentSlide.style.opacity = '0'
        currentSlide.style.display = 'none'
        if (currentBg) currentBg.style.opacity = '0'

        // Show new slide with animation
        const newSlide = statSlides[newIndex] as HTMLElement
        const newBg = newSlide.querySelector('[data-stat-bg]') as HTMLElement
        const newValue = newSlide.querySelector('[data-stat-value]')
        const newLabel = newSlide.querySelector('[data-stat-label]')
        const newSublabel = newSlide.querySelector('[data-stat-sublabel]')

        newSlide.style.display = 'flex'

        gsap.fromTo(newSlide, { opacity: 0 }, { opacity: 1, duration: 0.4 })

        if (newBg) {
          gsap.fromTo(newBg, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        }
        if (newValue) {
          gsap.fromTo(newValue, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' })
        }
        if (newLabel) {
          gsap.fromTo(newLabel, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 })
        }
        if (newSublabel) {
          gsap.fromTo(newSublabel, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.15 })
        }

        currentIndex = newIndex
      }
    },
  })
}
