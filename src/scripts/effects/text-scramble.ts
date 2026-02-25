const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

interface ScrambleOptions {
  readonly duration?: number
  readonly staggerPerChar?: number
  readonly onComplete?: () => void
}

export function scrambleText(
  element: HTMLElement,
  finalText?: string,
  options: ScrambleOptions = {}
): () => void {
  const {
    duration = 1400,
    staggerPerChar = 40,
    onComplete,
  } = options

  const target = finalText ?? element.textContent ?? ''
  const chars = target.split('')
  let frameId = 0
  let cancelled = false

  const startTime = performance.now()

  element.textContent = chars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')

  function tick(now: number) {
    if (cancelled) return

    const elapsed = now - startTime
    let resolved = ''

    for (let i = 0; i < chars.length; i++) {
      const charResolveTime = staggerPerChar * i
      if (elapsed >= charResolveTime + duration * 0.6) {
        resolved += chars[i]
      } else if (elapsed >= charResolveTime) {
        resolved += CHARS[Math.floor(Math.random() * CHARS.length)]
      } else {
        resolved += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
    }

    element.textContent = resolved

    if (elapsed < duration) {
      frameId = requestAnimationFrame(tick)
    } else {
      element.textContent = target
      onComplete?.()
    }
  }

  frameId = requestAnimationFrame(tick)

  return () => {
    cancelled = true
    cancelAnimationFrame(frameId)
    element.textContent = target
  }
}

export function scrambleOnHover(element: HTMLElement): () => void {
  const originalText = element.textContent ?? ''
  let cancel: (() => void) | null = null

  function handleEnter() {
    cancel?.()
    cancel = scrambleText(element, originalText, { duration: 600 })
  }

  element.addEventListener('mouseenter', handleEnter)

  return () => {
    element.removeEventListener('mouseenter', handleEnter)
    cancel?.()
  }
}
