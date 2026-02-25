import { gsap, ScrollTrigger } from '../gsap-init'
import { animateCounter } from '../effects/number-counter'
import { triggerGlitch } from '../effects/glitch'

export function initStatsAnimations(): void {
  const statsSection = document.querySelector('[data-stats]')
  const statSlides = document.querySelectorAll('[data-stat-slide]')

  if (!statsSection || statSlides.length === 0) return

  const totalSlides = statSlides.length
  let currentIndex = 0
  let isTransitioning = false
  let isExiting = false
  let isPinned = false
  const hasAnimated = new Set<number>()

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

  function animateSlideIn(slide: Element, index: number): void {
    const el = slide as HTMLElement
    const bg = el.querySelector('[data-stat-bg]') as HTMLElement | null
    const value = el.querySelector('[data-stat-value]') as HTMLElement | null
    const label = el.querySelector('[data-stat-label]')
    const sublabel = el.querySelector('[data-stat-sublabel]')
    const progress = el.querySelector('[data-stat-progress]') as HTMLElement | null

    el.style.display = 'flex'

    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 })

    if (bg) {
      gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    }

    if (value) {
      gsap.fromTo(value, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' })

      // Counter animation (only first time)
      if (!hasAnimated.has(index)) {
        const countTo = Number(value.dataset.countTo ?? 0)
        const prefix = value.dataset.prefix ?? ''
        const suffix = value.dataset.suffix ?? ''

        animateCounter(value, countTo, {
          prefix,
          suffix,
          duration: 2,
          onUpdate: () => {
            if (progress) {
              const fraction = parseFloat(progress.style.width) || 0
              if (fraction < 100) {
                progress.style.width = `${Math.min(fraction + 2, 100)}%`
              }
            }
          },
        })

        // Glitch burst on value
        triggerGlitch(value, 0.3)
        hasAnimated.add(index)
      }

      // Fill progress bar
      if (progress) {
        gsap.to(progress, { width: '100%', duration: 2, ease: 'power2.out', delay: 0.2 })
      }
    }

    if (label) {
      gsap.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 })
    }
    if (sublabel) {
      gsap.fromTo(sublabel, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.15 })
    }
  }

  function animateSlideOut(slide: Element): void {
    const el = slide as HTMLElement
    const bg = el.querySelector('[data-stat-bg]') as HTMLElement | null
    const progressBar = el.querySelector('[data-stat-progress]') as HTMLElement | null

    gsap.to(el, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        el.style.display = 'none'
      },
    })

    if (bg) {
      gsap.to(bg, { opacity: 0, duration: 0.2 })
    }

    if (progressBar) {
      progressBar.style.width = '0'
    }
  }

  // Animate first slide on entry
  ScrollTrigger.create({
    trigger: statsSection,
    start: 'top 60%',
    once: true,
    onEnter: () => {
      animateSlideIn(statSlides[0], 0)
      hasAnimated.add(0)
    },
  })

  // Pin the section — wheel events control slide transitions, not scroll progress.
  // The pin distance just keeps the section on screen; we intercept wheel events
  // so the scroll position barely moves while the user is cycling through slides.
  ScrollTrigger.create({
    trigger: statsSection,
    start: 'top top',
    end: () => `+=${totalSlides * 100}vh`,
    pin: true,
    pinSpacing: true,
    onToggle: (self) => {
      isPinned = self.isActive
      if (self.isActive) {
        isExiting = false
      }
    },
  })

  // Wheel handler — one slide per gesture with cooldown.
  // Uses capture phase to intercept before Lenis processes the event.
  function handleWheel(e: WheelEvent): void {
    if (!isPinned || isTransitioning || isExiting) return

    const direction = e.deltaY > 0 ? 1 : -1
    const nextIndex = currentIndex + direction

    // At boundaries, stop intercepting so Lenis can scroll past the section
    if (nextIndex < 0 || nextIndex >= totalSlides) {
      isExiting = true
      return
    }

    // Prevent Lenis from adding momentum
    e.preventDefault()
    e.stopImmediatePropagation()

    isTransitioning = true
    animateSlideOut(statSlides[currentIndex])

    gsap.delayedCall(0.25, () => {
      currentIndex = nextIndex
      animateSlideIn(statSlides[currentIndex], currentIndex)

      gsap.delayedCall(0.7, () => {
        isTransitioning = false
      })
    })
  }

  document.addEventListener('wheel', handleWheel, { capture: true, passive: false })

  // Touch support — one slide per swipe
  let touchStartY = 0

  function handleTouchStart(e: TouchEvent): void {
    if (!isPinned || isExiting) return
    touchStartY = e.touches[0].clientY
  }

  function handleTouchMove(e: TouchEvent): void {
    if (!isPinned || isTransitioning || isExiting) return

    const deltaY = touchStartY - e.touches[0].clientY
    if (Math.abs(deltaY) < 40) return

    const direction = deltaY > 0 ? 1 : -1
    const nextIndex = currentIndex + direction

    if (nextIndex < 0 || nextIndex >= totalSlides) {
      isExiting = true
      return
    }

    e.preventDefault()
    e.stopImmediatePropagation()
    touchStartY = e.touches[0].clientY

    isTransitioning = true
    animateSlideOut(statSlides[currentIndex])

    gsap.delayedCall(0.25, () => {
      currentIndex = nextIndex
      animateSlideIn(statSlides[currentIndex], currentIndex)

      gsap.delayedCall(0.7, () => {
        isTransitioning = false
      })
    })
  }

  document.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true })
  document.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false })
}
