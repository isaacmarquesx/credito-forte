import { Mail } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from './SocialIcons'
import { COMPANY, NAV_LINKS } from '../utils/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  const go = (e, href) => {
    if (!href) return
    if (href === '#') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-surface-container-low w-full py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Marca */}
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 flex items-center justify-center mb-4">
              <img
                src={COMPANY.logoSmall}
                alt={COMPANY.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4 max-w-[18rem]">
              Soluções financeiras de alto impacto para quem impulsiona a economia real.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="text-primary hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                <InstagramIcon size={22} />
              </a>
              <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer"
                className="text-primary hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                <FacebookIcon size={22} />
              </a>
              <a href={`mailto:${COMPANY.email}`}
                className="text-primary hover:text-secondary transition-colors" aria-label="E-mail">
                <Mail size={22} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary mb-2">
              Navegação
            </span>
            {NAV_LINKS.map(link => (
              <a key={link.label}
                href={link.href || link.path || '#'}
                onClick={e => go(e, link.href)}
                className="text-on-surface-variant hover:text-secondary transition-colors text-sm">
                {link.label}
              </a>
            ))}
          </div>

          {/* Contato legal */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary mb-2">
              Contato Legal
            </span>
            <p className="text-on-surface-variant text-sm">{COMPANY.email}</p>
            <p className="text-on-surface-variant text-sm">{COMPANY.phone}</p>
            <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
              © {year} Crédito Forte.<br />
              CNPJ {COMPANY.cnpj}<br />
              {COMPANY.localizacao}
            </p>
            <p className="text-outline text-xs mt-1">LC nº 167/2019 — Empresa Simples de Crédito</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
