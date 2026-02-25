import { gsap } from '../gsap-init'

interface CounterOptions {
  readonly duration?: number
  readonly ease?: string
  readonly prefix?: string
  readonly suffix?: string
  readonly onUpdate?: (value: number) => void
}

export function animateCounter(
  element: HTMLElement,
  target: number,
  options: CounterOptions = {}
): gsap.core.Tween {
  const {
    duration = 2,
    ease = 'power2.out',
    prefix = '',
    suffix = '',
    onUpdate,
  } = options

  const obj = { value: 0 }

  return gsap.to(obj, {
    value: target,
    duration,
    ease,
    onUpdate: () => {
      const rounded = target >= 1000
        ? Math.round(obj.value).toLocaleString()
        : target % 1 === 0
          ? Math.round(obj.value).toString()
          : obj.value.toFixed(1)

      element.textContent = `${prefix}${rounded}${suffix}`
      onUpdate?.(obj.value)
    },
  })
}
