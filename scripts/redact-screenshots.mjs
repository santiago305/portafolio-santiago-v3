// Blurs personal data (DNI, names, phones, addresses, emails) out of the
// private-system screenshots before they are published in the portfolio.
// Usage: node scripts/redact-screenshots.mjs <source-folder>
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const src = resolve(process.argv[2] ?? 'C:/Users/MARTION2/Downloads/fotos')
const out = resolve('public/projects')

// [x, y, width, height] in source pixels (screenshots are 1568px wide)
const jobs = [
  { from: 'eunoia/preview.webp', to: 'eunoia-pedidos.webp', boxes: [[415, 128, 460, 615], [1245, 128, 135, 615]] },
  { from: 'eunoia/preview (1).webp', to: 'eunoia-enganches.webp', boxes: [] },
  { from: 'eunoia/preview (2).webp', to: 'eunoia-compras.webp', boxes: [] },
  { from: 'eunoia/preview (3).webp', to: 'eunoia-couriers.webp', boxes: [] },
  { from: 'eunoia/preview (4).webp', to: 'eunoia-agencias.webp', boxes: [] },
  { from: 'fuvx/preview.webp', to: 'fuvx-filtrar.webp', boxes: [[333, 160, 230, 614], [1205, 160, 150, 614]] },
  { from: 'fuvx/preview (5).webp', to: 'fuvx-clientes.webp', boxes: [[333, 165, 290, 555], [738, 165, 220, 555]] },
  { from: 'fuvx/preview (1).webp', to: 'fuvx-bancaria.webp', boxes: [[333, 460, 285, 317], [912, 460, 75, 317]] },
  {
    from: 'fuvx/preview (2).webp',
    to: 'fuvx-workers.webp',
    boxes: [325, 532, 738, 944, 1150].map((x) => [x + 30, 78, 90, 295]),
  },
  { from: 'fuvx/preview (3).webp', to: 'fuvx-asistencia.webp', boxes: [[328, 398, 270, 60], [333, 505, 300, 205]] },
]

mkdirSync(out, { recursive: true })

for (const job of jobs) {
  const input = join(src, job.from)
  const base = sharp(input)
  const overlays = await Promise.all(
    job.boxes.map(async ([left, top, width, height]) => ({
      input: await sharp(input).extract({ left, top, width, height }).blur(9).toBuffer(),
      left,
      top,
    })),
  )
  await base.composite(overlays).webp({ quality: 86 }).toFile(join(out, job.to))
  console.log('✓', job.to)
}
