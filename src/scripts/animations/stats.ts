import { gsap, ScrollTrigger } from '../gsap-init'
import { animateCounter } from '../effects/number-counter'
import { triggerGlitch } from '../effects/glitch'
import { getLenis } from '../lenis-init'

export function initStatsAnimations(): void {
  const statsSection = document.querySelector('[data-stats]')
  const statSlides = document.querySelectorAll('[data-stat-slide]')

  if (!statsSection || statSlides.length === 0) return

  const totalSlides = statSlides.length
  let currentIndex = 0
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

        triggerGlitch(value, 0.3)
        hasAnimated.add(index)
      }

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

  // Switch slide visuals — called from onUpdate when progress crosses a boundary
  function showSlide(index: number): void {
    if (index === currentIndex) return
    const prev = currentIndex
    currentIndex = index
    animateSlideOut(statSlides[prev])
    gsap.delayedCall(0.2, () => {
      animateSlideIn(statSlides[index], index)
    })
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

  // Pin the section — Lenis scrollTo drives the scroll position,
  // onUpdate drives the slide visuals based on progress.
  const pinTrigger = ScrollTrigger.create({
    trigger: statsSection,
    start: 'top top',
    end: () => `+=${totalSlides * 100}vh`,
    pin: true,
    pinSpacing: true,
    onToggle: (self) => {
      isPinned = self.isActive
      if (self.isActive) {
        isExiting = false
        // Kill Lenis momentum so it doesn't carry past the pin
        const lenis = getLenis()
        if (lenis) {
          lenis.stop()
          lenis.start()
        }
      }
    },
    onUpdate: (self) => {
      const slideIndex = Math.min(
        Math.floor(self.progress * totalSlides),
        totalSlides - 1
      )
      showSlide(slideIndex)
    },
  })

  // Smoothly scroll to a slide's snap position via Lenis
  function scrollToSlide(index: number): void {
    const lenis = getLenis()
    if (!lenis) return

    const pinDistance = pinTrigger.end - pinTrigger.start
    const targetScroll = pinTrigger.start + ((index + 0.5) / totalSlides) * pinDistance
    lenis.scrollTo(targetScroll, { duration: 0.8 })
  }

  // Wheel handler — intercepts ALL wheel events while pinned.
  // Drives navigation via lenis.scrollTo to exact snap positions.
  // Time-based cooldown prevents trackpad inertia from skipping slides.
  let lastNavTime = 0
  const NAV_COOLDOWN_MS = 1000

  function handleWheel(e: WheelEvent): void {
    if (!isPinned) return

    // Always block Lenis while pinned — we control scroll via scrollTo
    e.preventDefault()
    e.stopImmediatePropagation()

    if (isExiting) return

    // Ignore rapid events (trackpad inertia) — one transition per gesture
    const now = Date.now()
    if (now - lastNavTime < NAV_COOLDOWN_MS) return

    const direction = e.deltaY > 0 ? 1 : -1
    const nextIndex = currentIndex + direction

    // At boundaries, smoothly scroll past the pin to exit
    if (nextIndex < 0 || nextIndex >= totalSlides) {
      isExiting = true
      lastNavTime = now
      const lenis = getLenis()
      if (lenis) {
        const target = nextIndex >= totalSlides
          ? pinTrigger.end + 1
          : pinTrigger.start - 1
        lenis.scrollTo(target, { duration: 0.8 })
      }
      return
    }

    lastNavTime = now
    scrollToSlide(nextIndex)
  }

  document.addEventListener('wheel', handleWheel, { capture: true, passive: false })

  // Touch support
  let touchStartY = 0

  function handleTouchStart(e: TouchEvent): void {
    if (!isPinned) return
    touchStartY = e.touches[0].clientY
  }

  function handleTouchMove(e: TouchEvent): void {
    if (!isPinned) return

    e.preventDefault()
    e.stopImmediatePropagation()

    if (isExiting) return

    const now = Date.now()
    if (now - lastNavTime < NAV_COOLDOWN_MS) return

    const deltaY = touchStartY - e.touches[0].clientY
    if (Math.abs(deltaY) < 40) return

    const direction = deltaY > 0 ? 1 : -1
    const nextIndex = currentIndex + direction
    touchStartY = e.touches[0].clientY

    if (nextIndex < 0 || nextIndex >= totalSlides) {
      isExiting = true
      lastNavTime = now
      const lenis = getLenis()
      if (lenis) {
        const target = nextIndex >= totalSlides
          ? pinTrigger.end + 1
          : pinTrigger.start - 1
        lenis.scrollTo(target, { duration: 0.8 })
      }
      return
    }

    lastNavTime = now
    scrollToSlide(nextIndex)
  }

  document.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true })
  document.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false })
}
