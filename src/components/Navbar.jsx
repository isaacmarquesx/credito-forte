import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons'
import { COMPANY, NAV_LINKS } from '../utils/constants'

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('#')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)

      // Detecta seção ativa — se estiver perto do topo, marca "#"
      if (window.scrollY < 120) {
        setActiveHref('#')
        return
      }

      // Procura a seção mais próxima do topo do viewport
      const sections = NAV_LINKS
        .map(l => l.href)
        .filter(h => h && h !== '#')
        .map(h => ({ href: h, el: document.querySelector(h) }))
        .filter(s => s.el)

      const threshold = 140 // offset da navbar
      let current = '#'
      for (const s of sections) {
        const rect = s.el.getBoundingClientRect()
        if (rect.top <= threshold) current = s.href
      }
      setActiveHref(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    if (!href) return
    if (href === '#') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveHref('#')
      setIsOpen(false)
      return
    }
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 glass-nav transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src={COMPANY.logoSmall} alt={COMPANY.name} className="h-12 w-auto object-contain" />
        </a>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8 font-headline text-sm font-medium tracking-tight">
          {NAV_LINKS.map(link => {
            const href = link.href || link.path || '#'
            const isActive = href === activeHref
            return (
              <a
                key={link.label}
                href={href}
                onClick={e => go(e, href)}
                className={`transition-colors pb-0.5 ${
                  isActive
                    ? 'text-secondary font-bold border-b-2 border-secondary'
                    : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <a
            href={COMPANY.whatsappUrl}
            target="_blank" rel="noopener noreferrer"
            className="text-primary-container hover:text-[#25D366] transition-colors p-2"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={22} />
          </a>
          <a
            href={COMPANY.instagramUrl}
            target="_blank" rel="noopener noreferrer"
            className="text-primary-container hover:text-[#E1306C] transition-colors p-2"
            aria-label="Instagram"
          >
            <InstagramIcon size={22} />
          </a>
          <a
            href={COMPANY.facebookUrl}
            target="_blank" rel="noopener noreferrer"
            className="text-primary-container hover:text-[#1877F2] transition-colors p-2"
            aria-label="Facebook"
          >
            <FacebookIcon size={22} />
          </a>
          <button
            onClick={() => setIsOpen(v => !v)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary"
            aria-label={isOpen ? 'Fechar' : 'Abrir menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-outline-variant/20 bg-surface-container-lowest overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map(link => {
                const href = link.href || link.path || '#'
                const isActive = href === activeHref
                return (
                  <a
                    key={link.label}
                    href={href}
                    onClick={e => go(e, href)}
                    className={`block px-3 py-3 font-headline font-medium text-base rounded-lg transition-colors ${
                      isActive
                        ? 'text-secondary font-bold bg-surface-container'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <div className="pt-3 border-t border-surface-container">
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-secondary text-white
                    px-4 py-3 rounded-xl font-headline font-bold w-full text-sm"
                >
                  Fale conosco no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
