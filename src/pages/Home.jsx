import { COMPANY } from '../utils/constants'
import { WhatsAppIcon } from '../components/SocialIcons'
import { useRef, useState, useEffect } from 'react'

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  const imageRef = useRef(null)
  const rafRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 1024)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (isMobile.current || !imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setTilt({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const cardStyle = {
    transform: `
      perspective(900px)
      rotateY(${tilt.x * 5}deg)
      rotateX(${-tilt.y * 3}deg)
      translateY(${-scrollY * 0.06}px)
      scale(1.02)
    `,
    transition: tilt.x === 0 && tilt.y === 0
      ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'transform 0.1s linear',
    willChange: 'transform',
  }

  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden isolate bg-surface">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Texto */}
        <div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight mb-6">
            Seu negócio merece crédito. Crédito Forte.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl">
            Empréstimos, financiamentos e desconto de títulos direto para MEI e
            micro/pequenas empresas. Sem burocracia, com a força que seu negócio precisa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={COMPANY.whatsappUrl}
              target="_blank" rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center justify-center gap-3 bg-secondary text-white px-8 py-4 rounded-xl font-headline font-bold
                text-center transition-all shadow-lg shadow-secondary/30
                hover:brightness-110 hover:shadow-xl hover:shadow-secondary/40 hover:scale-105
                active:scale-95 relative overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none"
            >
              <WhatsAppIcon size={24} className="text-white" />
              Quero impulsionar meu negócio!
            </a>
            <a
              href="#educacao"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline font-bold
                text-center hover:opacity-90 transition-all"
            >
              Entenda como funcionamos
            </a>
          </div>
        </div>

        {/* Imagem */}
        <div
          ref={imageRef}
          className="relative rounded-2xl"
          style={{ perspective: '900px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="rounded-2xl overflow-hidden shadow-2xl relative"
            style={cardStyle}
          >
            <img
              alt="Empreendedor confiante"
              className="w-full aspect-[4/3] object-cover"
              src={COMPANY.heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex items-end p-8 pb-20 md:p-10 md:pb-24">
              <h2 className="text-white font-headline font-extrabold text-2xl md:text-3xl leading-tight tracking-tight drop-shadow-md">
                QUEM FAZ O <br />BRASIL CRESCER
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Decoração arquitetural */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-0 rounded-l-[120px] hidden lg:block" />
    </header>
  )
}

/* ─── Quem Somos ───────────────────────────────────────── */
function QuemSomos() {
  return (
    <section className="py-24 bg-surface-container-low" id="sobre">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="text-secondary font-body font-bold uppercase tracking-widest mb-4 block text-sm">
              Nossa História
            </span>
            <h2 className="font-headline text-4xl font-bold text-primary mb-8">Quem Somos</h2>
            <div className="w-20 h-1 bg-secondary mb-8" />
          </div>
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                A Crédito Forte nasceu em 2019 com o firme propósito de apoiar o crescimento de
                pequenos e médios empreendedores, oferecendo soluções financeiras ágeis, seguras e
                transparentes. Com sede em Feira de Santana – BA, atendendo regiões limítrofes como
                Coração de Maria, São Gonçalo dos Campos, Irará, Santa Bárbara, Anguera. Nos
                consolidamos como uma Empresa Simples de Crédito (ESC), atuando rigorosamente dentro
                do marco legal estabelecido pela Lei Complementar nº 167/2019.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Nossa trajetória é pautada pela ética e pelo compromisso com o desenvolvimento
                regional, transformando capital em oportunidades para quem movimenta a economia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Missão / Visão / Valores ─────────────────────────── */
function MissaoVisaoValores() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Missão */}
          <div className="p-10 rounded-xl bg-primary text-white flex flex-col justify-between group hover:translate-y-[-8px] transition-all duration-300">
            <div>
              <span className="material-symbols-outlined text-5xl mb-6 text-on-primary-container">flag</span>
              <h3 className="font-headline text-2xl font-bold mb-4">Missão</h3>
              <p className="text-white text-lg opacity-90">
                Apoiar os micro e pequenos empreendedores, para que tenham oportunidade de
                adquirir capital de giro para expandir o seu negócio, sem distinção de segmento.
              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="p-10 rounded-xl bg-surface-container-high flex flex-col justify-between group hover:translate-y-[-8px] transition-all duration-300">
            <div>
              <span className="material-symbols-outlined text-5xl mb-6 text-primary">visibility</span>
              <h3 className="font-headline text-2xl font-bold text-primary mb-4">Visão</h3>
              <p className="text-on-surface-variant text-lg">
                Ser reconhecida no estado da Bahia como a melhor oportunidade para adquirir
                capital de giro para o crescimento empresarial dos pequenos e médios
                empreendedores, e crescimento pessoal e profissional dos nossos sócios,
                funcionários e colaboradores.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="p-10 rounded-xl bg-white shadow-lg shadow-primary/5 flex flex-col justify-between group hover:translate-y-[-8px] transition-all duration-300 border border-outline-variant/10">
            <div>
              <div className="flex gap-2 mb-6">
                <span className="material-symbols-outlined text-3xl text-secondary">handshake</span>
                <span className="material-symbols-outlined text-3xl text-secondary">balance</span>
                <span className="material-symbols-outlined text-3xl text-secondary">shield</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-4">Valores</h3>
              <ul className="space-y-2 text-on-surface-variant font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" /> Honestidade
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" /> Transparência
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" /> Comprometimento
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" /> Responsabilidade
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" /> Inovação
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Educação (MEI + ESC) ─────────────────────────────── */
function Educacao() {
  return (
    <section className="py-24 bg-surface-container-low" id="educacao">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-secondary font-body font-bold uppercase tracking-widest mb-4 block text-sm">
            Informativo
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Soluções financeiras sob medida para quem faz o Brasil crescer.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* MEI */}
          <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-6 mb-8">
              <div className="bg-primary/5 p-4 rounded-xl">
                <span className="material-symbols-outlined text-4xl text-primary">person_apron</span>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary">O que é MEI?</h3>
                <p className="text-sm font-body text-slate-400 mt-1 uppercase tracking-widest">
                  Microempreendedor Individual
                </p>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              O Microempreendedor Individual é a pessoa que trabalha por conta própria e se
              legaliza como pequeno empresário. Na Crédito Forte, entendemos os desafios do MEI
              e oferecemos o suporte necessário para que seu pequeno negócio possa dar o próximo
              passo com segurança, te disponibilizando consultoria comercial e financeira de forma gratuita.
            </p>
          </div>

          {/* ESC */}
          <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-6 mb-8">
              <div className="bg-primary/5 p-4 rounded-xl">
                <span className="material-symbols-outlined text-4xl text-primary">account_balance</span>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary">O que é ESC?</h3>
                <p className="text-sm font-body text-slate-400 mt-1 uppercase tracking-widest">
                  Empresa Simples de Crédito
                </p>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              A ESC é um modelo de negócio que realiza operações de empréstimo, financiamento e
              desconto de títulos de crédito, exclusivamente para microempreendedores individuais,
              microempresas e empresas de pequeno porte. Atuamos localmente, fomentando a economia
              da nossa região.
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="mt-12 p-8 bg-primary-container rounded-2xl text-center">
          <p className="text-on-primary-container font-headline font-bold text-xl mb-4">
            Dinheiro rápido, processo simples, parceiro de verdade.
          </p>
          <p className="text-white opacity-90 max-w-3xl mx-auto">
            Operamos de acordo com a Lei Complementar 167/2019, utilizando capital próprio para oferecer crédito a empresários locais, garantindo total legalidade e transparência em cada contrato assinado.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Vídeo Institucional ──────────────────────────────── */
function Video() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-headline text-3xl font-bold text-primary mb-12">
          Conheça nossa Empresa
        </h2>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-white mb-10">
          <video
            src={COMPANY.videoLocal}
            className="absolute top-0 left-0 w-full h-full object-contain bg-black outline-none"
            playsInline
            preload="metadata"
            controls
          >
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>
        <a
          href={COMPANY.whatsappUrl}
          target="_blank" rel="noopener noreferrer"
          className="btn-shimmer inline-flex items-center justify-center gap-3 bg-secondary text-white px-10 py-5
            rounded-xl font-headline font-bold transition-all
            shadow-lg shadow-secondary/30
            hover:brightness-110 hover:shadow-xl hover:shadow-secondary/40 hover:scale-105
            active:scale-95 relative overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none"
        >
          <WhatsAppIcon size={24} className="text-white" />
          Quero impulsionar meu negócio!
        </a>
      </div>
    </section>
  )
}

/* ─── Legalidade e Transparência ───────────────────────── */
function Transparencia() {
  return (
    <section className="py-24 bg-surface-container-high relative overflow-hidden" id="transparencia">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="font-headline text-4xl font-bold text-primary mb-4">
            Legalidade e Transparência
          </h2>
          <p className="text-on-surface-variant text-lg max-w-3xl">
            A confiança é a base do nosso negócio. Fornecemos todos os dados corporativos
            para sua consulta e segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex items-center justify-center lg:justify-end p-4 order-2 lg:order-1">
            <img
              alt="Crédito Forte Logo"
              className="w-full max-w-sm lg:max-w-md h-auto object-contain"
              src={COMPANY.logoBig}
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
              <span className="material-symbols-outlined text-secondary">corporate_fare</span>
              <div>
                <p className="text-xs font-body text-slate-500 uppercase">Razão Social</p>
                <p className="font-bold text-primary">{COMPANY.razaoSocial}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
              <span className="material-symbols-outlined text-secondary">fingerprint</span>
              <div>
                <p className="text-xs font-body text-slate-500 uppercase">CNPJ</p>
                <p className="font-bold text-primary">{COMPANY.cnpj}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-xs font-body text-slate-500 uppercase">Situação</p>
                <p className="font-bold text-on-tertiary-container">{COMPANY.situacao}</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-xs font-body text-slate-500 uppercase">Abertura</p>
                <p className="font-bold text-primary">{COMPANY.abertura}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              <div>
                <p className="text-xs font-body text-slate-500 uppercase">Localização</p>
                <p className="font-bold text-primary">{COMPANY.localizacao}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Localização (mapa Google) ────────────────────────── */
function Localizacao() {
  return (
    <section className="py-24 bg-surface-container-low" id="localizacao">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-secondary font-body font-bold uppercase tracking-widest mb-4 block text-sm">
            Onde Estamos
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Venha nos visitar
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Nossa sede fica no coração de Feira de Santana – BA. Estamos
            prontos para atender você pessoalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

          {/* Mapa */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl
            border-4 border-white bg-white min-h-[420px]">
            <iframe
              src={COMPANY.googleMapsEmbed}
              title="Localização Crédito Forte"
              className="w-full h-full min-h-[420px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Informações de endereço */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Card endereço */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex items-start gap-4 mb-5">
                <div className="bg-secondary/10 p-3 rounded-xl shrink-0">
                  <span className="material-symbols-outlined text-3xl text-secondary">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-body text-slate-500 uppercase tracking-widest mb-1">
                    Endereço
                  </p>
                  <p className="font-headline font-bold text-primary text-lg leading-tight">
                    {COMPANY.endereco}
                  </p>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {COMPANY.enderecoComplemento}
                  </p>
                </div>
              </div>

              {/* Botão Como chegar */}
              <a
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2
                  bg-primary text-on-primary px-6 py-4 rounded-xl font-headline font-bold
                  text-sm hover:opacity-90 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">directions</span>
                Como chegar
              </a>
            </div>

            {/* Card contato rápido */}
            <div className="bg-primary p-8 rounded-2xl text-white flex-1">
              <p className="text-xs font-body text-on-primary-container uppercase tracking-widest mb-3">
                Prefere ligar ou mandar mensagem?
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:+55${COMPANY.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-on-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">call</span>
                  <span className="font-headline font-bold">{COMPANY.phone}</span>
                </a>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-on-primary-container transition-colors"
                >
                  <WhatsAppIcon size={20} className="text-white" />
                  <span className="font-headline font-bold">Fale no WhatsApp</span>
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-white hover:text-on-primary-container transition-colors break-all"
                >
                  <span className="material-symbols-outlined text-xl">mail</span>
                  <span className="font-headline font-bold text-sm">{COMPANY.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Página Home (composição) ─────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <QuemSomos />
      <MissaoVisaoValores />
      <Educacao />
      <Video />
      <Transparencia />
      <Localizacao />
    </>
  )
}
