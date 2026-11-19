/** Joins class names, skipping falsy ones. */
export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')

const btnBase =
  'inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-full border px-[22px] text-[0.975rem] font-semibold whitespace-nowrap no-underline transition-colors duration-200'

export const btn = {
  solid: cx(btnBase, 'border-transparent bg-ink text-paper hover:bg-moss'),
  ghost: cx(btnBase, 'border-line bg-transparent text-ink hover:border-ink'),
  mint: cx(btnBase, 'border-transparent bg-mint text-moss-deep hover:bg-mint-light'),
  ghostLight: cx(btnBase, 'border-paper/25 bg-transparent text-paper hover:border-paper'),
  /** Outline that takes the card's own text colour. */
  card: cx(btnBase, 'border-current/35 bg-transparent text-inherit hover:border-current'),
  cardSolid: cx(btnBase, 'border-transparent bg-moss-deep text-paper hover:bg-ink'),
}

export const sectionTitle = 'text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em]'

export const chip = 'rounded-full border border-current px-3 py-[5px] text-[0.85rem] opacity-80'

/** Side padding shared by every section. */
export const gutter = 'px-[clamp(16px,4vw,56px)]'
