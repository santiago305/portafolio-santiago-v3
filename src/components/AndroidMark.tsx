import { useEffect, useRef, useId } from 'react'

type Props = {
  size?: number
  /** Eyes follow the pointer. */
  tracking?: boolean
  className?: string
}

/**
 * Logo: a head split down the middle, the left half human, the right half machine.
 */
export function AndroidMark({ size = 40, tracking = false, className }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const eyesRef = useRef<SVGGElement>(null)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    if (!tracking) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const svg = ref.current
    const eyes = eyesRef.current
    if (!svg || !eyes) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = svg.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height * 0.46)
        const dist = Math.hypot(dx, dy) || 1
        const reach = Math.min(dist / 260, 1) * 3.2
        eyes.style.transform = `translate(${(dx / dist) * reach}px, ${(dy / dist) * reach}px)`
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [tracking])

  const head = 'M60 10C84 10 100 26 100 52V74C100 96 84 110 60 110C36 110 20 96 20 74V52C20 26 36 10 60 10Z'

  return (
    <svg
      ref={ref}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Santiago Yacila"
    >
      <defs>
        <clipPath id={`head-${uid}`}>
          <path d={head} />
        </clipPath>
      </defs>

      <g clipPath={`url(#head-${uid})`}>
        <rect x="0" y="0" width="60" height="120" fill="var(--color-paper-2)" />
        <rect x="60" y="0" width="60" height="120" fill="var(--color-moss)" />
        {/* circuit traces on the machine side */}
        <g stroke="var(--color-mint)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75">
          <path d="M60 30H74L82 22H104" />
          <path d="M60 84H72L80 92H104" />
          <path d="M88 52V40L96 32" />
          <path d="M92 74H104" />
        </g>
        <g fill="var(--color-mint)">
          <circle cx="96" cy="32" r="2.4" />
          <circle cx="80" cy="92" r="2.4" />
          <circle cx="92" cy="74" r="2.4" />
        </g>
      </g>

      <path d={head} fill="none" stroke="var(--color-ink)" strokeWidth="3" />
      <path d="M60 10V110" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="3 4" />

      <g ref={eyesRef} className="android-eyes transition-transform duration-250 ease-out">
        {/* human eye */}
        <circle cx="42" cy="56" r="5.5" fill="var(--color-ink)" />
        {/* machine eye */}
        <rect x="70" y="52.5" width="16" height="7" rx="3.5" fill="var(--color-mint)" />
      </g>

      {/* mouth: a soft curve that turns into a straight segmented line */}
      <path d="M40 80C46 84 54 85 60 84" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 84H66M71 84H76" stroke="var(--color-mint)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
