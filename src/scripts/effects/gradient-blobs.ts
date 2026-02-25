import { gsap } from '../gsap-init'

export function initGradientBlobs(): void {
  const blobs = document.querySelectorAll('[data-gradient-blob]')
  if (blobs.length === 0) return

  blobs.forEach((blob) => {
    const randomDuration = 6 + Math.random() * 6
    const randomDelay = Math.random() * 4

    gsap.to(blob, {
      x: () => (Math.random() - 0.5) * 80,
      y: () => (Math.random() - 0.5) * 80,
      scale: () => 0.85 + Math.random() * 0.3,
      duration: randomDuration,
      delay: randomDelay,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  })
}
