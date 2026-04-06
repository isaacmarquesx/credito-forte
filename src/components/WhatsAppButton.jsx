import { COMPANY } from '../utils/constants'
import { WhatsAppIcon } from './SocialIcons'

export default function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-whatsapp rounded-full
        flex items-center justify-center text-on-whatsapp
        shadow-[0_24px_48px_-12px_rgba(37,211,102,0.4)]
        hover:scale-110 transition-transform active:scale-95 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      {/* Icon */}
      <WhatsAppIcon size={32} />

      {/* Tooltip */}
      <div className="absolute right-20 bg-white text-primary px-4 py-2 rounded-lg
        font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100
        transition-opacity whitespace-nowrap pointer-events-none">
        Fale conosco agora
      </div>

      {/* Ping ring */}
      <div className="absolute inset-0 rounded-full bg-whatsapp animate-wa-ping -z-10" />
    </a>
  )
}
