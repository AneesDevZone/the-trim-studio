'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from 'react-datepicker'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Scissors, Instagram, Facebook } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { bookingSchema, type BookingFormData } from '@/lib/validations/booking'
import { generateTimeSlots } from '@/lib/utils'

import 'react-datepicker/dist/react-datepicker.css'

// ============================================
// DATA (UNCHANGED)
// ============================================
const services = [
  { id: 'haircut', name: 'Classic Haircut' },
  { id: 'beard', name: 'Beard Trim & Shape' },
  { id: 'deluxe', name: 'Deluxe Grooming' },
  { id: 'kids', name: 'Kids Cut' },
  { id: 'shave', name: 'Head Shave' },
  { id: 'executive', name: 'Executive Package' },
]

const barbers = [
  { id: 'tony', name: 'Tony Masters' },
  { id: 'marcus', name: 'Marcus Chen' },
  { id: 'james', name: 'James Rivera' },
]

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
  { 
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ), 
    href: 'https://tiktok.com', 
    label: 'TikTok', 
    color: 'hover:text-gray-900' 
  },
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// ============================================
// MAIN BOOKING COMPONENT
// ============================================
export function Booking() {
  // ALL ORIGINAL STATE AND LOGIC (UNCHANGED)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: 'haircut',
      date: new Date(),
    },
  })

  const selectedService = watch('service')
  const selectedBarber = watch('barber')
  const timeSlots = generateTimeSlots()

  // ORIGINAL SUBMIT HANDLER (UNCHANGED)
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    
    try {
      const [time, modifier] = data.time.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      
      if (modifier === 'PM' && hours < 12) hours += 12
      if (modifier === 'AM' && hours === 12) hours = 0
      
      const dateTime = new Date(data.date)
      dateTime.setHours(hours, minutes)
      
      const serviceDurationMap: Record<string, number> = {
        haircut: 45,
        beard: 30,
        deluxe: 90,
        kids: 40,
        shave: 50,
        executive: 120,
      }
      
      const duration = serviceDurationMap[data.service] || 45
      
      console.log('Sending booking request:', {
        ...data,
        dateTime: dateTime.toISOString(),
        duration,
      })
      
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          dateTime: dateTime.toISOString(),
          duration,
        }),
      })
      
      console.log('Response status:', response.status)
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('Response data:', result)
      
      if (!response.ok) {
        throw new Error(result.error || `Booking failed: ${response.status}`)
      }
      
      toast.success('Appointment Booked!', {
        description: `Your appointment for ${data.service} has been scheduled. Confirmation email sent.`,
        duration: 5000,
      })
      
    } catch (error: any) {
      console.error('Booking error:', error)
      toast.error('Booking Failed', {
        description: error.message || 'Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="booking" className="relative py-20 lg:py-32 bg-neutral-900 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <Scissors className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Easy Booking</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Book Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
              Appointment
            </span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed">
            Schedule your grooming session with our master barbers. We'll confirm your appointment within 24 hours.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-sm text-gray-500">Follow us:</span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 rounded-lg hover:bg-white/10`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          
          {/* LEFT: Booking Form */}
          <motion.div variants={slideInLeft}>
            <div className="relative p-8 lg:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-50" />
              
              <div className="relative space-y-8">
                
                {/* Personal Information */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Personal Info</h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Service Selection */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <Scissors className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Service Details</h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Service *
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.id} className="bg-neutral-800">
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Barber (Optional)
                    </label>
                    <select
                      {...register('barber')}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    >
                      <option value="" className="bg-neutral-800">Any Available Barber</option>
                      {barbers.map((barber) => (
                        <option key={barber.id} value={barber.id} className="bg-neutral-800">
                          {barber.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Date & Time */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Date & Time</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Date *
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date)
                            setValue('date', date || new Date())
                          }}
                          minDate={new Date()}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholderText="Select a date"
                        />
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                      {errors.date && (
                        <p className="mt-2 text-sm text-red-400">{errors.date.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Time *
                      </label>
                      <div className="relative">
                        <select
                          {...register('time')}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all appearance-none"
                        >
                          <option value="" className="bg-neutral-800">Choose a time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot} className="bg-neutral-800">
                              {slot}
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                      {errors.time && (
                        <p className="mt-2 text-sm text-red-400">{errors.time.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm font-medium text-gray-300">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                    placeholder="Any special requests or requirements..."
                  />
                  {errors.notes && (
                    <p className="mt-2 text-sm text-red-400">{errors.notes.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  loading={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                  className="w-full py-4 text-lg bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                </Button>
                
                
              </div>
            </div>
          </motion.div>
          
          {/* RIGHT: Info Cards */}
          <motion.div variants={slideInRight} className="space-y-6">
            
            {/* Working Hours */}
            <div className="p-6 bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-amber-500/20 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-4">Working Hours</h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-gray-300 text-sm">{schedule.day}</span>
                    <span className="font-semibold text-white text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-500/20 backdrop-blur-sm rounded-xl border border-amber-500/30">
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-semibold text-amber-300">Note:</span> Last appointment 30min before closing.
                </p>
              </div>
            </div>
            
            {/* Need Help */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Call for immediate assistance or same-day appointments.
              </p>
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                (123) 456-7890
              </a>
            </div>

            {/* Location Card */}
            <div className="group relative p-6 bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent backdrop-blur-sm border border-amber-500/20 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-4">
                {/* Interactive Map Container */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-amber-500/30 transition-all duration-300">
                  <div className="aspect-[16/11] bg-neutral-800 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.5847389583447!2d6.893835776771847!3d52.21877067197625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b813c0c8b0c5e5%3A0x3c4b0b5d5e5f0b5d!2sEnschede%2C%20Netherlands!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Find Us Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-neutral-900/90 backdrop-blur-md rounded-xl border border-amber-500/30">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-white font-semibold text-sm">Find Us</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Address with Get Directions */}
                <a
                  href="https://maps.google.com/?q=Enschede,Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-white/5 hover:bg-amber-500/10 rounded-xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 group/addr"
                >
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold text-sm">Our Location</h4>
                      <svg className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover/addr:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      123 Style Street, Enschede<br />
                      Overijssel, 7511 AB, Netherlands
                    </p>
                    <span className="inline-block mt-2 text-xs text-amber-400 font-medium">Get Directions →</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}