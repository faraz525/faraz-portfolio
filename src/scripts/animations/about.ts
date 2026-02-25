import { gsap, ScrollTrigger } from '../gsap-init'
import { blurReveal } from '../effects/blur-reveal'

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

  // Image clip-path wipe
  if (aboutImage) {
    tl.fromTo(
      aboutImage,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.5 }
    )
  }

  // Text blur reveal
  if (aboutText.length > 0) {
    tl.add(() => {
      blurReveal(aboutText, {
        blur: 12,
        stagger: 0.15,
        duration: 0.8,
        y: 30,
      })
    }, '-=0.8')
  }

  // Badge: scale + blur reveal
  if (aboutBadge) {
    tl.from(
      aboutBadge,
      {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(8px)',
        duration: 0.6,
      },
      '-=0.3'
    )
  }
}
