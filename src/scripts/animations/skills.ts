import { gsap, ScrollTrigger } from '../gsap-init'
import { scrambleOnHover } from '../effects/text-scramble'

export function initSkillsAnimations(): void {
  const section = document.querySelector('[data-skills]')
  const pills = document.querySelectorAll<HTMLElement>('[data-skill-pill]')

  if (!section || pills.length === 0) return

  const mm = ScrollTrigger.matchMedia({})

  // Desktop: scatter in from random positions + scramble on hover
  mm.add('(min-width: 768px)', () => {
    const cleanups: (() => void)[] = []

    pills.forEach((pill) => {
      const randomX = (Math.random() - 0.5) * 600
      const randomY = (Math.random() - 0.5) * 400
      const randomRotation = (Math.random() - 0.5) * 30

      gsap.from(pill, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: Math.random() * 0.5,
      })

      // Scramble text on hover
      cleanups.push(scrambleOnHover(pill))
    })

    return () => {
      cleanups.forEach((fn) => fn())
    }
  })

  // Mobile: simple stagger fade-in
  mm.add('(max-width: 767px)', () => {
    gsap.from(pills, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.5,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  })
}
