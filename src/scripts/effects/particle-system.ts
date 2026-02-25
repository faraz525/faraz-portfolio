interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private animationId = 0
  private running = false
  private scrollVelocity = 0

  constructor(canvasId: string, particleCount = 50) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null
    if (!canvas) {
      throw new Error(`Canvas element #${canvasId} not found`)
    }
    this.canvas = canvas

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Could not get 2d context')
    }
    this.ctx = ctx

    this.resize()
    this.initParticles(particleCount)
    window.addEventListener('resize', () => this.resize())
  }

  private resize(): void {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  private initParticles(count: number): void {
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  }

  setScrollVelocity(velocity: number): void {
    this.scrollVelocity = velocity
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.tick()
  }

  stop(): void {
    this.running = false
    cancelAnimationFrame(this.animationId)
  }

  private tick(): void {
    if (!this.running) return

    const { ctx, canvas, particles } = this
    const velocityBoost = Math.min(Math.abs(this.scrollVelocity) * 0.002, 2)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.vx * (1 + velocityBoost)
      p.y += p.vy * (1 + velocityBoost)

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
    }

    // Draw connections
    const connectionDist = 100
    ctx.strokeStyle = 'rgba(255, 107, 43, 0.06)'
    ctx.lineWidth = 0.5

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.06
          ctx.strokeStyle = `rgba(255, 107, 43, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 107, 43, ${p.opacity})`
      ctx.fill()
    }

    this.animationId = requestAnimationFrame(() => this.tick())
  }
}
