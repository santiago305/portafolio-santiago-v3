import { useEffect, useLayoutEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { ui, profile } from '../content'
import { useLang, type Lang } from '../i18n'
import { scrollToHash } from '../scroll'
import { cx } from '../ui'
import { AndroidMark } from './AndroidMark'

const links = [
  { href: '#work', label: ui.nav.work },
  { href: '#how', label: ui.nav.how },
  { href: '#experience', label: ui.nav.experience },
  { href: '#contact', label: ui.nav.contact },
]

export function Nav() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Layout effect so the page unlocks in the same commit the menu closes, before we scroll.
  useLayoutEffect(() => {
    if (!menuOpen) return
    const root = document.documentElement
    root.classList.add('is-locked')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    flushSync(() => setMenuOpen(false))
    scrollToHash(href)
    history.replaceState(null, '', href === '#top' ? location.pathname : href)
  }

  const solid = scrolled || menuOpen

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b px-[clamp(16px,4vw,56px)] py-3 transition-[background-color,border-color] duration-300',
        solid ? 'border-line' : 'border-transparent',
        menuOpen ? 'bg-paper' : scrolled && 'bg-paper/80 backdrop-blur-[18px] backdrop-saturate-[1.6]',
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 sm:gap-6">
        <a
          href="#top"
          onClick={(e) => goTo(e, '#top')}
          className="mr-auto flex min-w-0 items-center gap-2.5 font-bold tracking-[-0.02em] no-underline"
        >
          <AndroidMark size={30} className="shrink-0" />
          <span className="truncate">{profile.name}</span>
        </a>

        <nav className="hidden gap-7 text-[0.95rem] lg:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goTo(e, l.href)}
              className="text-ink-soft no-underline transition-colors hover:text-ink"
            >
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 rounded-full border border-line bg-paper p-[3px]" role="group" aria-label="Language / Idioma">
          {(['es', 'en'] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={cx(
                'cursor-pointer rounded-full px-[11px] py-[5px] text-[0.8rem] font-bold touch:px-3 touch:py-2',
                lang === l ? 'bg-ink text-paper' : 'text-ink-soft',
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex size-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-paper lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t(ui.nav.close) : t(ui.nav.menu)}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={cx('h-[1.5px] w-4 bg-ink transition-transform duration-300', menuOpen && 'translate-y-[3.25px] rotate-45')}
          />
          <span
            className={cx('h-[1.5px] w-4 bg-ink transition-transform duration-300', menuOpen && '-translate-y-[3.25px] -rotate-45')}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 top-[69px] bottom-0 flex flex-col overflow-y-auto overscroll-contain bg-paper px-[clamp(16px,4vw,56px)] pt-4 pb-[calc(24px+env(safe-area-inset-bottom))] lg:hidden"
        >
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goTo(e, l.href)}
              style={{ animationDelay: `${i * 50}ms` } as CSSProperties}
              className="animate-menu-in border-b border-line py-3.5 text-[clamp(2rem,9vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.045em] no-underline active:text-moss"
            >
              {t(l.label)}
            </a>
          ))}
          <div className="mt-auto grid gap-2.5 pt-8 text-ink-soft">
            <a className="no-underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="no-underline" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp {profile.whatsappLabel}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
