import { useState } from 'react'
import { education, experience, principles, profile, projects, stack, ui } from '../content'
import { useLang } from '../i18n'
import { btn, cx, gutter, sectionTitle } from '../ui'
import { AndroidMark } from './AndroidMark'

export function HowIWork() {
  const { t } = useLang()
  return (
    <section id="how" className={cx(gutter, 'py-[72px] sm:py-[88px] lg:py-[120px]')}>
      <div className="mx-auto mb-8 max-w-[1240px] sm:mb-12">
        <h2 className={sectionTitle}>{t(ui.how.title)}</h2>
      </div>
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 border-t border-ink lg:grid-cols-3">
        {principles.map((p) => (
          <div
            key={p.title.en}
            className={cx(
              'grid gap-2 py-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-x-8',
              'lg:grid-cols-1 lg:content-start lg:gap-3 lg:pt-7 lg:pr-7 lg:pb-8',
              'not-first:border-t not-first:border-line lg:not-first:border-t-0 lg:not-first:border-l lg:not-first:pl-7',
            )}
          >
            <h3 className="text-[1.3rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[1.45rem]">{t(p.title)}</h3>
            <p className="text-ink-soft">{t(p.body)}</p>
          </div>
        ))}
      </div>
      <ul className="mx-auto mt-7 flex max-w-[1240px] flex-wrap gap-2 text-moss sm:mt-10" aria-label="Stack">
        {stack.map((s) => (
          <li key={s} className="rounded-full border border-current px-[13px] py-1.5 text-[0.875rem] sm:px-4 sm:py-2 sm:text-[0.95rem]">
            {s}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function About() {
  const { t } = useLang()
  return (
    <section
      id="about"
      className={cx(
        gutter,
        'mx-auto grid max-w-[calc(1240px+2*clamp(16px,4vw,56px))] grid-cols-1 gap-7 pt-4 pb-20',
        'sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-start sm:gap-[clamp(32px,6vw,96px)] sm:pt-10 sm:pb-24 lg:items-center lg:pb-[120px]',
      )}
    >
      <figure className="w-[min(100%,340px)] overflow-hidden rounded-[28px] bg-paper-2 sm:w-auto">
        <img src={profile.photo} alt={profile.fullName} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      </figure>
      <div className="grid gap-6">
        <h2 className={sectionTitle}>{t(ui.about.title)}</h2>
        <p className="max-w-[52ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.5]">{t(ui.about.body)}</p>
        <dl className="flex gap-9 sm:gap-12">
          {[
            { label: ui.about.years, value: 3 },
            { label: ui.about.systems, value: projects.length },
          ].map(({ label, value }) => (
            <div key={label.en} className="flex flex-col-reverse">
              <dt className="text-ink-soft">{t(label)}</dt>
              <dd className="text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-black tracking-[-0.06em] text-moss">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className={cx(gutter, 'pb-[88px] sm:pb-[104px] lg:pb-[140px]')}>
      <div className="mx-auto mb-8 max-w-[1240px] sm:mb-12">
        <h2 className={sectionTitle}>{t(ui.experience.title)}</h2>
      </div>
      <ol className="mx-auto max-w-[1240px]">
        {experience.map((job) => (
          <li
            key={job.company}
            className={cx(
              'grid grid-cols-1 gap-1 border-t border-line py-5 last:border-b',
              'sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-x-8 sm:gap-y-2 sm:py-[26px]',
              'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]',
            )}
          >
            <h3 className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold tracking-[-0.035em]">{job.company}</h3>
            <p className="font-medium">{t(job.role)}</p>
            {job.note && <p className="text-[0.95rem] text-ink-soft sm:col-start-2 sm:-mt-1">{t(job.note)}</p>}
            {job.period && (
              <p className="text-[0.95rem] text-ink-soft sm:col-start-2 lg:col-start-3 lg:row-start-1">{job.period}</p>
            )}
          </li>
        ))}
      </ol>
      <div className="mx-auto mt-8 flex max-w-[1240px] flex-col gap-1 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-2">
        <h3 className="text-base font-semibold text-ink-soft">{t(ui.experience.education)}</h3>
        <p>
          <strong className="mr-1.5 font-bold">{education.school}</strong> {t(education.degree)}
        </p>
      </div>
    </section>
  )
}

export function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const action = 'px-3 sm:px-[22px]'

  return (
    <section
      id="contact"
      className={cx(
        gutter,
        'grid justify-items-center gap-4 rounded-t-[22px] bg-moss-deep pt-[72px] pb-8 text-center text-paper',
        'sm:gap-5 sm:rounded-t-[28px] sm:pt-[88px] lg:pt-[120px]',
      )}
    >
      <AndroidMark size={72} className="size-14 sm:size-[72px]" />
      <h2 className="max-w-[14ch] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em]">
        {t(ui.contact.title)}
      </h2>
      <p className="text-paper/70">{t(ui.contact.lead)}</p>
      <a
        href={`mailto:${profile.email}`}
        className="text-[clamp(1.25rem,3.4vw,2.25rem)] font-bold tracking-[-0.03em] [overflow-wrap:anywhere] underline decoration-mint decoration-2 underline-offset-8"
      >
        {profile.email}
      </a>
      <div className="mt-3 grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-2.5">
        <a
          className={cx(btn.mint, action, 'order-first col-span-2 sm:order-none')}
          href={`https://wa.me/${profile.whatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp {profile.whatsappLabel}
        </a>
        <button type="button" className={cx(btn.ghostLight, action)} onClick={copy}>
          {copied ? t(ui.contact.copied) : t(ui.contact.copy)}
        </button>
        <a className={cx(btn.ghostLight, action)} href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className={cx(btn.ghostLight, action)} href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className={cx(btn.ghostLight, action)} href={profile.cv} download>
          {t(ui.contact.cv)}
        </a>
      </div>
      <footer className="mt-16 flex w-full max-w-[1240px] flex-col items-center gap-2 border-t border-paper/15 pt-5 pb-[env(safe-area-inset-bottom)] text-[0.875rem] text-paper/60 sm:mt-24 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6">
        <span>
          © {new Date().getFullYear()} {profile.fullName}
        </span>
        <span>{t(ui.footer.made)}</span>
      </footer>
    </section>
  )
}
