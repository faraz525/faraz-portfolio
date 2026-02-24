import { gsap, ScrollTrigger, SplitText } from '../gsap-init'

export function initStartupsIntroAnimation(): void {
  const intro = document.querySelector('[data-startups-intro]')
  if (!intro) return

  const introText = intro.querySelector('[data-intro-text]')
  if (!introText) return

  const split = SplitText.create(introText, { type: 'words' })

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
