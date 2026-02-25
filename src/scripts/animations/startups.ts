import { gsap, ScrollTrigger, SplitText } from '../gsap-init'
import { triggerGlitch } from '../effects/glitch'

export function initStartupsIntroAnimation(): void {
  const intro = document.querySelector('[data-startups-intro]')
  if (!intro) return

  const introText = intro.querySelector('[data-intro-text]')
  if (!introText) return

  const split = SplitText.create(introText, { type: 'words' })

  // Gradient-text uses -webkit-text-fill-color: transparent + background-clip: text
  // on the parent <span>. When SplitText wraps words in child divs, opacity on those
  // divs makes the clipped gradient invisible. Fix: move the gradient styling onto
  // each word element directly so each word is self-contained and opacity works.
  // Cache parent styles BEFORE clearing them (avoid reading after mutation).
  const gradientParents = new Map<Element, string>()
  split.words.forEach((word: Element) => {
    const parent = word.parentElement
    if (parent?.classList.contains('gradient-text') && !gradientParents.has(parent)) {
      gradientParents.set(parent, window.getComputedStyle(parent).background)
    }
  })

  split.words.forEach((word: Element) => {
    const el = word as HTMLElement
    const parent = el.parentElement
    if (parent && gradientParents.has(parent)) {
      el.style.background = gradientParents.get(parent)!
      el.style.backgroundClip = 'text'
      el.style.webkitBackgroundClip = 'text'
      el.style.webkitTextFillColor = 'transparent'
    }
  })

  // Clear gradient from parents after all words have been styled
  gradientParents.forEach((_, parent) => {
    const el = parent as HTMLElement
    el.style.background = 'none'
    el.style.webkitTextFillColor = 'inherit'
  })

  gsap.from(split.words, {
    opacity: 0.1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: intro,
      start: 'top 60%',
      end: 'center center',
      scrub: 1,
    },
  })
}

export function initStartupSlideAnimations(): void {
  const slides = document.querySelectorAll('[data-startup-slide]')

  slides.forEach((slide) => {
    const animation = (slide as HTMLElement).dataset.startupAnimation
    const content = slide.querySelector('[data-startup-content]')
    const bg = slide.querySelector('[data-startup-bg]')

    if (!content) return

    // Pin each slide
    ScrollTrigger.create({
      trigger: slide,
      start: 'top top',
      end: '+=100vh',
      pin: true,
      pinSpacing: true,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slide,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onEnter: () => {
          // Glitch on heading entry
          const heading = content.querySelector('h3') as HTMLElement | null
          if (heading) {
            triggerGlitch(heading, 0.4)
          }
        },
      },
    })

    // Background animation
    if (bg) {
      switch (animation) {
        case 'radial-burst':
          tl.fromTo(
            bg,
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(100% at 50% 50%)', duration: 1 }
          )
          break
        case 'split-wipe':
          tl.fromTo(
            bg,
            { clipPath: 'inset(0 50% 0 50%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 1 }
          )
          break
        case 'curtain-reveal':
          tl.fromTo(
            bg,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1 }
          )
          break
      }
    }

    // Content stagger
    const items = content.querySelectorAll('[data-slide-content]')
    tl.from(
      items,
      {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.5,
      },
      0.3
    )
  })
}
