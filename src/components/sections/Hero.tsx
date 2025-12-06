"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Scissors, Clock, Star, ArrowRight } from 'lucide-react'

// ============================================
// TYPES
// ============================================
type StatItemProps = {
  icon: React.ElementType
  value: string
  label: string
  delay: number
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: 'easeOut'
    }
  })
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

// ============================================
// COMPONENTS
// ============================================
const StatItem = ({ icon: Icon, value, label, delay }: StatItemProps) => (
  <motion.div
    custom={delay}
    initial="hidden"
    animate="visible"
    variants={scaleIn}
    className="flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10"
  >
    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-amber-400" strokeWidth={2} />
    </div>
    <div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-300">{label}</div>
    </div>
  </motion.div>
)

const CTAButton = ({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' }) => {
  const baseClasses = "group relative px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 flex items-center gap-2 overflow-hidden"
  
  const variantClasses = variant === 'primary'
    ? "bg-amber-500 text-black hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1"
    : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30"

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  )
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-900">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-neutral-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full"
            >
              <Scissors className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-300">Premium Grooming Since 2020</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-white">Craft Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                  Perfect Look
                </span>
              </motion.h1>

              <motion.p
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed"
              >
                Experience masterful cuts, traditional shaves, and premium grooming services in a refined atmosphere. Where style meets precision.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <CTAButton variant="primary">
                Book Appointment
              </CTAButton>
              <CTAButton variant="secondary">
                View Services
              </CTAButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
            >
              <StatItem icon={Star} value="5.0" label="Rating" delay={0.5} />
              <StatItem icon={Scissors} value="10K+" label="Happy Clients" delay={0.6} />
              <StatItem icon={Clock} value="15min" label="Avg Wait Time" delay={0.7} />
            </motion.div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="hidden lg:block space-y-6">
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                  <Scissors className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Master Barbers</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our team of expert barbers with 10+ years of experience will craft the perfect style for you.
                </p>
              </div>
            </motion.div>

            <motion.div
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Quick & Easy Booking</h3>
                <p className="text-gray-400 leading-relaxed">
                  Book your appointment online in seconds. Walk-ins always welcome.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
    </section>
  )
}