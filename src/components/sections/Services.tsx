"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Scissors, Sparkles, Palette, Crown, Star, Check } from 'lucide-react'

// ============================================
// TYPES
// ============================================
type Service = {
  id: string
  title: string
  description: string
  price: string
  icon: React.ElementType
  features: string[]
  popular?: boolean
}

// ============================================
// DATA
// ============================================
const services: Service[] = [
  {
    id: 'haircut',
    title: 'Signature Haircut',
    description: 'Precision cut tailored to your style and face shape. Includes consultation, wash, cut, and styling.',
    price: '€35',
    icon: Scissors,
    features: ['Style Consultation', 'Wash & Cut', 'Hot Towel Finish', 'Premium Products']
  },
  {
    id: 'beard',
    title: 'Beard Sculpting',
    description: 'Expert beard trim and shaping with hot towel treatment. Perfect grooming for the modern gentleman.',
    price: '€25',
    icon: Sparkles,
    features: ['Shape & Trim', 'Hot Towel Treatment', 'Beard Oil', 'Line-up']
  },
  {
    id: 'fade',
    title: 'Premium Fade',
    description: 'Masterful fade technique from our expert barbers. Clean, sharp, and professionally executed.',
    price: '€40',
    icon: Palette,
    features: ['Skin Fade', 'Precision Blend', 'Style Finish', 'Neck Shave'],
    popular: true
  },
  {
    id: 'deluxe',
    title: 'Deluxe Package',
    description: 'The complete grooming experience. Haircut, beard trim, hot towel shave, and facial treatment.',
    price: '€75',
    icon: Crown,
    features: ['Full Haircut', 'Beard Service', 'Hot Towel Shave', 'Facial Treatment', 'Head Massage']
  },
  {
    id: 'kids',
    title: 'Kids Cut',
    description: 'Fun and friendly haircuts for the little ones. Patient service in a comfortable environment.',
    price: '€20',
    icon: Star,
    features: ['Kid-Friendly', 'Quick Service', 'Fun Atmosphere', 'Parent Approved']
  },
  {
    id: 'grooming',
    title: 'Executive Grooming',
    description: 'Premium service for the professional. Complete grooming with luxury products and attention to detail.',
    price: '€95',
    icon: Crown,
    features: ['Haircut & Style', 'Beard Service', 'Facial', 'Shoulder Massage', 'Premium Products', 'Complimentary Drink']
  }
]

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
}

// ============================================
// COMPONENTS
// ============================================
const SectionHeader = () => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6"
    >
      <Scissors className="w-4 h-4 text-amber-400" />
      <span className="text-sm font-medium text-amber-300">Our Services</span>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
    >
      Premium Grooming
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
        Services
      </span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg text-gray-400 leading-relaxed"
    >
      Experience excellence in every cut, trim, and style. Our master barbers deliver precision grooming tailored to your unique style.
    </motion.p>
  </div>
)

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute -top-3 right-6 z-10 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full">
          <span className="text-xs font-bold text-black">MOST POPULAR</span>
        </div>
      )}

      {/* Card */}
      <div className="relative h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-amber-500/30 overflow-hidden">
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative space-y-6">
          
          {/* Icon & Price */}
          <div className="flex items-start justify-between">
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors duration-300"
            >
              <Icon className="w-8 h-8 text-amber-400" strokeWidth={2} />
            </motion.div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">From</div>
              <div className="text-3xl font-bold text-white">{service.price}</div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-amber-400" strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full mt-6 px-6 py-3.5 bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-500 rounded-xl text-white hover:text-black font-semibold transition-all duration-300 group/btn">
            <span className="flex items-center justify-center gap-2">
              Book Now
              <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// MAIN SERVICES COMPONENT
// ============================================
export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-20 bg-neutral-900 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <SectionHeader />

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Not sure which service is right for you?
          </p>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full text-white font-semibold transition-all duration-300 backdrop-blur-sm">
            Chat with Our Experts
          </button>
        </motion.div>
      </div>
    </section>
  )
}