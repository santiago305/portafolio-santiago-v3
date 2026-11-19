import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Height of the fixed nav, so sections don't land underneath it. */
const NAV_OFFSET = 72

/** Scrolls to a section: through Lenis on desktop, natively on touch devices. */
export function scrollToHash(hash: string) {
  const target = hash === '#top' ? document.body : document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (lenis) {
    lenis.start()
    // Lenis already honours the scroll-padding-top set on <html>.
    lenis.scrollTo(hash === '#top' ? 0 : target, { force: true })
    return
  }
  const top = hash === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
