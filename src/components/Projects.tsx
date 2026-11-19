import { useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects, ui, type Project } from '../content'
import { useLang } from '../i18n'
import { btn, chip, cx, gutter, sectionTitle } from '../ui'
import { Lightbox } from './Lightbox'

gsap.registerPlugin(ScrollTrigger)

/** Each card has its own surface; `soft` is the muted text colour on that surface. */
const themes: Record<string, { surface: string; soft: string }> = {
  eunoia: { surface: 'border border-line bg-white text-ink', soft: 'text-ink-soft' },
  fuvx: { surface: 'bg-moss-deep text-paper', soft: 'text-paper/70' },
  visualblack: { surface: 'bg-mint text-moss-deep', soft: 'text-moss-deep/75' },
}

export function Projects() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Project | null>(null)

  // Apple-style stack: each card pins under the nav and recedes as the next one slides over it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 901px) and (min-height: 700px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.js-card')
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          gsap.fromTo(
            card.querySelector('.js-card-inner'),
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.92 + i * 0.02,
              filter: 'brightness(0.86)',
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="work" ref={root} className={cx(gutter, 'pt-16 pb-16 lg:pt-24')}>
      <div className="mx-auto mb-8 grid max-w-[1240px] gap-4 sm:mb-12">
        <h2 className={sectionTitle}>{t(ui.work.title)}</h2>
        <p className="max-w-[56ch] text-ink-soft">{t(ui.work.intro)}</p>
      </div>

      <div className="mx-auto max-w-[1240px]">
        {projects.map((p, i) => {
          const theme = themes[p.id]
          return (
            <article
              key={p.id}
              style={{ '--i': i } as CSSProperties}
              className="js-card relative mb-6 last:mb-0 stack:sticky stack:top-[calc(84px+var(--i)*16px)] stack:mb-[8vh] stack:last:mb-0"
            >
              <div
                className={cx(
                  'js-card-inner grid origin-top grid-cols-1 gap-5 overflow-hidden rounded-[22px] p-3 pb-6',
                  'sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 sm:rounded-[28px] sm:p-[clamp(24px,3.2vw,48px)]',
                  'lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:gap-8 xl:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)] xl:gap-10',
                  'stack:min-h-[min(80vh,700px)]',
                  theme.surface,
                )}
              >
                <div className="col-span-full flex flex-col gap-3 px-2 sm:grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:content-start sm:gap-x-8 sm:px-0 lg:col-span-1 lg:flex lg:gap-3.5">
                  <div className="flex flex-col gap-3 lg:contents">
                    <h3 className="text-[2.5rem] leading-[0.95] font-extrabold tracking-[-0.05em] sm:text-[clamp(2.25rem,4.6vw,4rem)] lg:max-xl:text-[clamp(2.25rem,4.2vw,3.25rem)]">
                      {p.name}
                    </h3>
                    <p className="text-[1.1rem] leading-[1.3] font-semibold">{t(p.tagline)}</p>
                    <p className={cx('text-[0.95rem] sm:text-[0.98rem]', theme.soft)}>{t(p.summary)}</p>
                    <p className={cx('text-[0.95rem] sm:text-[0.98rem] lg:max-xl:hidden', theme.soft)}>{t(p.outcome)}</p>
                  </div>

                  <div className="flex flex-col gap-3 lg:contents">
                    <dl className="mt-1 grid gap-2.5 border-y border-current/20 py-3.5 sm:mt-0 lg:mt-auto">
                      {[
                        [ui.work.duration, p.duration],
                        [ui.work.role, p.role],
                      ].map(([label, value]) => (
                        <div key={label.en} className="grid grid-cols-[76px_1fr] gap-3 text-[0.92rem] sm:grid-cols-[80px_1fr]">
                          <dt className={theme.soft}>{t(label)}</dt>
                          <dd className="font-semibold">{t(value)}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="flex flex-wrap gap-2" aria-label={t(ui.work.stack)}>
                      {p.stack.map((s) => (
                        <li key={s} className={chip}>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2.5">
                      {p.url && (
                        <a className={cx(btn.cardSolid, 'flex-auto sm:flex-none')} href={p.url} target="_blank" rel="noreferrer">
                          {t(ui.work.visit)}
                        </a>
                      )}
                      <button type="button" className={cx(btn.card, 'flex-auto sm:flex-none')} onClick={() => setOpen(p)}>
                        {t(ui.work.gallery)} ({p.shots.length})
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  aria-label={`${t(ui.work.gallery)}: ${p.name}`}
                  className={cx(
                    'group relative order-first col-span-full block w-full cursor-zoom-in self-center overflow-hidden rounded-xl bg-white p-0',
                    'shadow-[0_1px_0_rgb(19_32_26/0.06),0_30px_60px_-30px_rgb(15_61_42/0.45)] transition-transform duration-400 ease-out-soft hover:-translate-y-1',
                    'sm:rounded-[14px] lg:order-none lg:col-span-1',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="relative flex items-center gap-[5px] border-b border-[#dcdcdc] bg-[#ececec] px-2.5 py-2 sm:gap-[7px] sm:px-3.5 sm:py-2.5"
                  >
                    {['bg-[#ff5f57]', 'bg-[#febc2e]', 'bg-[#28c840]'].map((c) => (
                      <i key={c} className={cx('size-2 rounded-full shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.14)] sm:size-[11px]', c)} />
                    ))}
                    <span className="absolute left-1/2 w-[52%] -translate-x-1/2 truncate rounded-md bg-white px-3.5 py-0.5 text-center text-[0.62rem] text-[#6b6b6b] sm:w-auto sm:min-w-[40%] sm:text-[0.72rem]">
                      {p.url ? p.url.replace(/^https?:\/\/|\/$/g, '') : p.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3.5 bottom-3.5 translate-y-1.5 rounded-full bg-ink/80 px-3.5 py-[7px] text-[0.82rem] font-semibold text-paper opacity-0 transition duration-250 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 touch:translate-y-0 touch:px-[11px] touch:py-[5px] touch:text-[0.75rem] touch:opacity-100"
                  >
                    {t(ui.work.zoomIn)}
                  </span>
                  <img
                    src={p.shots[0].src}
                    alt={t(p.shots[0].alt)}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="aspect-[16/9.4] w-full object-cover object-left-top"
                  />
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {open && <Lightbox project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
