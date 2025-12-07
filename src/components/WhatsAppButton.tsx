'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const phone = "+3163xxxxxxxx" // the whatsapp number of barber shop including country code
  const message = "Hi! I'd like to ask about your services."
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
      
      {/* Icon */}
      <MessageCircle className="relative h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute right-16 whitespace-nowrap bg-neutral-900 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none"
      >
        Chat with us
      </motion.span>
    </motion.a>
  )
}