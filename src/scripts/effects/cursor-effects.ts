import { gsap } from '../gsap-init'

export function initCursorGlow(): () => void {
  const glow = document.getElementById('cursor-glow')
  if (!glow) return () => {}

  const xTo = gsap.quickTo(glow, 'left', { duration: 0.4, ease: 'power3.out' })
  const yTo = gsap.quickTo(glow, 'top', { duration: 0.4, ease: 'power3.out' })

  function handleMove(e: MouseEvent) {
    xTo(e.clientX)
    yTo(e.clientY)
  }

  window.addEventListener('mousemove', handleMove)

  return () => {
    window.removeEventListener('mousemove', handleMove)
  }
}

export function initMagneticHover(selector: string): () => void {
  const elements = document.querySelectorAll<HTMLElement>(selector)
  const cleanups: (() => void)[] = []

  elements.forEach((el) => {
    function handleMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.2
      const deltaY = (e.clientY - centerY) * 0.2

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    function handleLeave() {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    cleanups.push(() => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    })
  })

  return () => {
    cleanups.forEach((fn) => fn())
  }
}
