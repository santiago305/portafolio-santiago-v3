import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile, ui } from '../content'
import { useLang } from '../i18n'
import { btn, cx, gutter } from '../ui'
import { AndroidMark } from './AndroidMark'

/** Room for the i dots and descenders, which overflow-hidden would otherwise clip. */
const line = 'js-line block overflow-hidden pt-[0.12em] pb-[0.16em] -mt-[0.12em] -mb-[0.16em] first:mt-0'

export function Hero() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)

  // The page's one orchestrated entrance: name rises, then the android powers on.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('.js-line > span', { yPercent: 110, duration: 1.1, stagger: 0.09 })
          .from('.js-mark', { scale: 0.86, opacity: 0, duration: 1.2 }, '-=0.8')
          .from('.js-mark .android-eyes', { opacity: 0, duration: 0.18, repeat: 2, yoyo: true }, '-=0.4')
          .from('.js-copy > *', { y: 16, opacity: 0, duration: 0.8, stagger: 0.07 }, '-=0.9')
      })
    },
    { scope: root },
  )

  return (
    <section
      id="top"
      ref={root}
      className={cx(
        gutter,
        'mx-auto grid max-w-[calc(1240px+2*clamp(16px,4vw,56px))] content-center gap-7 pt-[100px] pb-14',
        'sm:gap-10 sm:pt-32 sm:pb-[72px] lg:min-h-svh lg:gap-12 lg:pt-[clamp(110px,16vh,160px)]',
      )}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
        <div>
          <p className="mb-3 font-semibold text-moss">{t(ui.hero.role)}</p>
          <h1 className="text-[clamp(3rem,16.5vw,5.5rem)] leading-[0.84] font-black tracking-[-0.065em] sm:text-[clamp(3.5rem,12.5vw,11.5rem)]">
            <span className={line}>
              <span className="inline-block">Santiago</span>
            </span>
            <span className={line}>
              <span className="inline-block">Yacila</span>
            </span>
            <span className={cx(line, 'text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] sm:[-webkit-text-stroke-width:2px]')}>
              <span className="inline-block">Sandoval</span>
            </span>
          </h1>
        </div>
        <div className="js-mark order-first sm:order-none sm:pb-[1.4vw]">
          <AndroidMark
            size={340}
            tracking
            className="h-auto w-[104px] sm:w-[clamp(120px,26vw,220px)] lg:w-[clamp(150px,24vw,340px)]"
          />
        </div>
      </div>

      <div className="js-copy grid grid-cols-1 gap-x-12 gap-y-4 border-t border-line pt-6 sm:pt-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-bold tracking-[-0.03em]">{t(ui.hero.phrase)}</p>
        <p className="max-w-[48ch] text-ink-soft">{t(ui.hero.lead)}</p>
        <div className="col-span-full mt-2 flex flex-wrap items-center gap-3">
          <a className={cx(btn.solid, 'flex-1 sm:flex-none')} href="#work">
            {t(ui.hero.ctaWork)}
          </a>
          <a className={cx(btn.ghost, 'flex-1 sm:flex-none')} href={`mailto:${profile.email}`}>
            {t(ui.hero.ctaContact)}
          </a>
          <span className="mt-1 inline-flex basis-full items-center gap-2 text-[0.92rem] text-ink-soft sm:mt-0 sm:ml-2 sm:basis-auto">
            <span className="size-2 rounded-full bg-moss shadow-[0_0_0_4px_rgb(30_106_73/0.16)]" aria-hidden="true" />
            {t(ui.hero.status)}
          </span>
        </div>
      </div>
    </section>
  )
}
