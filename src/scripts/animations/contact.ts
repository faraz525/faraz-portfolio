import { gsap, SplitText } from '../gsap-init'
import { blurReveal } from '../effects/blur-reveal'
import { initMagneticHover } from '../effects/cursor-effects'

export function initContactAnimations(): void {
  const section = document.querySelector('[data-contact]')
  const heading = document.querySelector('[data-contact-heading]')
  const links = document.querySelectorAll('[data-contact-link]')

  if (!section) return

  if (heading) {
    const split = SplitText.create(heading, { type: 'words' })

    gsap.from(split.words, {
      opacity: 0,
      y: 50,
      filter: 'blur(8px)',
      stagger: 0.08,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  }

  if (links.length > 0) {
    blurReveal(links, {
      blur: 8,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
    })

    gsap.from(links, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none none',
        onEnter: () => {
          blurReveal(links, { blur: 8, y: 20, stagger: 0.1 })
        },
      },
    })
  }

  // Magnetic hover on CTA
  initMagneticHover('[data-contact-cta]')
}
