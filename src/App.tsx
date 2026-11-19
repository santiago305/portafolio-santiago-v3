import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { About, Contact, Experience, HowIWork } from './components/Sections'
import { setLenis } from './scroll'

gsap.registerPlugin(ScrollTrigger)

/** Smooth scrolling for mouse and trackpad only; touch devices keep their native scroll. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const lenis = new Lenis({ anchors: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Stop smooth scrolling while a modal (menu, lightbox) is open.
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('is-locked')) lenis.stop()
      else lenis.start()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
      gsap.ticker.remove(tick)
      setLenis(null)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  useSmoothScroll()
  return (
    <>
      <a
        className="absolute top-2 -left-[999px] z-[100] rounded-full bg-ink px-3.5 py-2 text-paper focus:left-2"
        href="#work"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <HowIWork />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
