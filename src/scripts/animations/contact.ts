import { gsap, SplitText } from '../gsap-init'

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
    gsap.from(links, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
    })
  }
}
