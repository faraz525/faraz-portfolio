import { gsap, ScrollTrigger } from '../gsap-init'

export function initExperienceAnimations(): void {
  const section = document.querySelector('[data-experience]')
  const track = document.querySelector('[data-experience-track]')
  const slides = document.querySelectorAll('[data-experience-slide]')

  if (!section || !track || slides.length === 0) return

  // Desktop: horizontal scroll
  const mm = ScrollTrigger.matchMedia({})

  mm.add('(min-width: 768px)', () => {
    const totalWidth = (track as HTMLElement).scrollWidth - window.innerWidth

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    // Stagger in each slide's content when it enters viewport
    slides.forEach((slide) => {
      const content = slide.querySelectorAll('[data-slide-content]')
      const pills = slide.querySelectorAll('[data-tech-pill]')

      gsap.from(content, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: slide,
          containerAnimation: gsap.getById?.('expScroll') || undefined,
          start: 'left 80%',
          end: 'left 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(pills, {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.4,
        scrollTrigger: {
          trigger: slide,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
  })

  // Mobile: simple vertical stagger
  mm.add('(max-width: 767px)', () => {
    slides.forEach((slide) => {
      gsap.from(slide, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: slide,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  })
}
