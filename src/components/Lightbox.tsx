import { useEffect, useRef, useState } from 'react'
import { ui, type Project } from '../content'
import { useLang } from '../i18n'
import { btn, cx } from '../ui'

/** Phones need a closer zoom: the screenshot starts out much smaller there. */
/** Compact buttons on phones. */
const small = 'max-sm:min-h-10 max-sm:px-3.5 max-sm:text-[0.875rem]'
const step = 'max-sm:w-11 max-sm:px-0'

const zoomLevel = () => (window.innerWidth <= 640 ? 3.6 : 2.4)
/** How quickly the image catches up with the pointer (0–1, per frame). */
const EASE = 0.14

export function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDialogElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const count = project.shots.length
  const shot = project.shots[index]

  // Pan/zoom state lives outside React so pointer moves never trigger a re-render.
  const view = useRef({ scale: 1, x: 0, y: 0, targetScale: 1, targetX: 0, targetY: 0, frame: 0 })

  const go = (step: number) => {
    setZoomed(false)
    setIndex((i) => (i + step + count) % count)
  }

  useEffect(() => {
    const dialog = ref.current
    // Guard against StrictMode's double effect: never close here, unmounting removes the dialog.
    if (dialog && !dialog.open) dialog.showModal()
    document.documentElement.classList.add('is-locked')
    return () => document.documentElement.classList.remove('is-locked')
  }, [])

  const render = () => {
    const v = view.current
    const img = imgRef.current
    if (!img) return
    v.scale += (v.targetScale - v.scale) * EASE
    v.x += (v.targetX - v.x) * EASE
    v.y += (v.targetY - v.y) * EASE
    img.style.transform = `translate3d(${v.x}px, ${v.y}px, 0) scale(${v.scale})`
    const settled =
      Math.abs(v.targetScale - v.scale) < 0.001 && Math.abs(v.targetX - v.x) < 0.3 && Math.abs(v.targetY - v.y) < 0.3
    v.frame = settled ? 0 : requestAnimationFrame(render)
  }

  const animate = () => {
    if (!view.current.frame) view.current.frame = requestAnimationFrame(render)
  }

  /** Aim the zoomed image so the point under the pointer stays in view. */
  const aim = (clientX: number, clientY: number) => {
    const figure = figureRef.current
    if (!figure) return
    const r = figure.getBoundingClientRect()
    const px = Math.min(Math.max((clientX - r.left) / r.width, 0), 1)
    const py = Math.min(Math.max((clientY - r.top) / r.height, 0), 1)
    const v = view.current
    v.targetX = (0.5 - px) * r.width * (zoomLevel() - 1)
    v.targetY = (0.5 - py) * r.height * (zoomLevel() - 1)
    animate()
  }

  /** Touch: drag the zoomed image like a map, kept inside its edges. */
  const drag = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null)
  const pan = (clientX: number, clientY: number) => {
    const figure = figureRef.current
    const d = drag.current
    if (!figure || !d) return
    const r = figure.getBoundingClientRect()
    const maxX = (r.width * (zoomLevel() - 1)) / 2
    const maxY = (r.height * (zoomLevel() - 1)) / 2
    const clamp = (n: number, max: number) => Math.min(Math.max(n, -max), max)
    const v = view.current
    v.targetX = clamp(d.startX + (clientX - d.x) * 1.4, maxX)
    v.targetY = clamp(d.startY + (clientY - d.y) * 1.4, maxY)
    animate()
  }

  useEffect(() => {
    const v = view.current
    v.targetScale = zoomed ? zoomLevel() : 1
    if (!zoomed) {
      v.targetX = 0
      v.targetY = 0
    }
    animate()
  }, [zoomed])

  useEffect(() => {
    // New screenshot: reset instantly.
    const v = view.current
    Object.assign(v, { scale: 1, x: 0, y: 0, targetScale: 1, targetX: 0, targetY: 0 })
    if (imgRef.current) imgRef.current.style.transform = ''
  }, [index])

  useEffect(() => {
    const v = view.current
    return () => {
      cancelAnimationFrame(v.frame)
      v.frame = 0
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={cx(
        'm-auto max-h-[94vh] w-[min(1320px,96vw)] max-w-none rounded-[22px] border-0 bg-paper p-4 text-ink',
        'backdrop:bg-ink/70 backdrop:backdrop-blur-[6px] open:grid open:animate-lightbox-in open:grid-cols-[minmax(0,1fr)] open:gap-3',
        'max-sm:m-0 max-sm:h-dvh max-sm:max-h-dvh max-sm:w-screen max-sm:rounded-none max-sm:p-3 max-sm:pb-[calc(12px+env(safe-area-inset-bottom))] max-sm:open:grid-rows-[auto_minmax(0,1fr)_auto_auto]',
      )}
      aria-label={project.name}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-ink-soft max-sm:text-[0.9rem]">
          <strong className="mr-1.5 text-ink">{project.name}</strong> {t(shot.alt)}
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={cx(btn.ghost, small)} onClick={() => setZoomed((z) => !z)}>
            {zoomed ? t(ui.work.zoomOut) : t(ui.work.zoomIn)}
          </button>
          <button type="button" className={cx(btn.solid, small)} onClick={onClose}>
            {t(ui.work.close)}
          </button>
        </div>
      </div>

      <figure
        ref={figureRef}
        className={cx(
          'overflow-hidden rounded-xl bg-white max-sm:flex max-sm:items-center max-sm:bg-transparent',
          zoomed ? 'cursor-zoom-out touch:touch-none' : 'cursor-zoom-in touch:touch-manipulation',
        )}
        onClick={(e) => {
          if (!zoomed) aim(e.clientX, e.clientY)
          setZoomed((z) => !z)
        }}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse') return
          drag.current = { x: e.clientX, y: e.clientY, startX: view.current.targetX, startY: view.current.targetY }
        }}
        onPointerMove={(e) => {
          if (!zoomed) return
          if (e.pointerType === 'mouse') aim(e.clientX, e.clientY)
          else if (drag.current) pan(e.clientX, e.clientY)
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <img
          key={shot.src}
          ref={imgRef}
          src={shot.src}
          alt={t(shot.alt)}
          draggable={false}
          className="max-h-[68vh] w-full min-w-0 origin-center animate-shot-in object-contain select-none max-sm:max-h-full max-sm:bg-white"
        />
      </figure>
      <p className="text-center text-[0.85rem] text-ink-soft">
        <span className="touch:hidden">{t(ui.work.zoomHint)}</span>
        <span className="hidden touch:inline">{t(ui.work.zoomHintTouch)}</span>
      </p>

      <div className="flex items-center justify-between gap-3">
        <button type="button" className={cx(btn.ghost, small, step)} onClick={() => go(-1)} aria-label={t(ui.work.prev)}>
          <span aria-hidden="true" className="text-[1.3em] leading-none">‹</span>
          <span className="max-sm:hidden">{t(ui.work.prev)}</span>
        </button>
        <div className="flex min-w-0 gap-2 overflow-x-auto p-0.5 [scrollbar-width:none]">
          {project.shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={t(s.alt)}
              aria-current={i === index}
              className={cx(
                'w-[52px] flex-none cursor-pointer overflow-hidden rounded-lg border-2 bg-white p-0 sm:w-[72px]',
                i === index ? 'border-moss' : 'border-transparent opacity-55',
              )}
              onClick={() => {
                setZoomed(false)
                setIndex(i)
              }}
            >
              <img src={s.src} alt="" className="aspect-video w-full object-cover object-left-top" />
            </button>
          ))}
        </div>
        <button type="button" className={cx(btn.ghost, small, step)} onClick={() => go(1)} aria-label={t(ui.work.next)}>
          <span className="max-sm:hidden">{t(ui.work.next)}</span>
          <span aria-hidden="true" className="text-[1.3em] leading-none">›</span>
        </button>
      </div>
    </dialog>
  )
}
