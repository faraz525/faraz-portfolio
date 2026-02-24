import { gsap, ScrollTrigger } from '../gsap-init'

export function initAboutAnimations(): void {
  const aboutSection = document.querySelector('[data-about]')
  const aboutImage = document.querySelector('[data-about-image]')
  const aboutText = document.querySelectorAll('[data-about-text]')
  const aboutBadge = document.querySelector('[data-about-badge]')

  if (!aboutSection) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: 'top 80%',
      end: 'center center',
      scrub: 1,
    },
  })

  if (aboutImage) {
    tl.fromTo(
      aboutImage,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.5 }
    )
  }

  if (aboutText.length > 0) {
    tl.from(
      aboutText,
      {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
      },
      '-=0.8'
    )
  }

  if (aboutBadge) {
    tl.from(
      aboutBadge,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
      },
      '-=0.3'
    )
  }
}
