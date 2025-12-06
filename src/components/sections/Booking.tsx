'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from 'react-datepicker'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Scissors } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { bookingSchema, type BookingFormData } from '@/lib/validations/booking'
import { generateTimeSlots } from '@/lib/utils'

import 'react-datepicker/dist/react-datepicker.css'

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

export function Booking() {
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

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    
    try {
      // Combine date and time
      const [time, modifier] = data.time.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      
      if (modifier === 'PM' && hours < 12) hours += 12
      if (modifier === 'AM' && hours === 12) hours = 0
      
      const dateTime = new Date(data.date)
      dateTime.setHours(hours, minutes)
      
      // Get duration based on service
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
      
      // Call your API
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
      
      // Handle non-JSON responses
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
      
      // Reset form
      // You'll need to reset your form fields here
      // setValue('name', '')
      // setValue('email', '')
      // setValue('phone', '')
      // setValue('notes', '')
      // setSelectedDate(new Date())
      
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
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-barber-navy font-display">
            Book Your <span className="text-barber-gold">Appointment</span>
          </h2>
          <p className="text-lg text-barber-charcoal/80 max-w-2xl mx-auto">
            Schedule your grooming session with our master barbers. We'll confirm your appointment within 24 hours.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-barber-navy flex items-center">
                    <User className="h-5 w-5 mr-2 text-barber-gold" />
                    Personal Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-barber-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-barber-charcoal mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-barber-charcoal/40" />
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-barber-charcoal mb-2">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-barber-charcoal/40" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Service Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-barber-navy flex items-center">
                    <Scissors className="h-5 w-5 mr-2 text-barber-gold" />
                    Service Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-barber-charcoal mb-2">
                      Select Service *
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all bg-white"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-barber-charcoal mb-2">
                      Preferred Barber (Optional)
                    </label>
                    <select
                      {...register('barber')}
                      className="w-full px-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all bg-white"
                    >
                      <option value="">Any Available Barber</option>
                      {barbers.map((barber) => (
                        <option key={barber.id} value={barber.id}>
                          {barber.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Date & Time */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-barber-navy flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-barber-gold" />
                    Date & Time
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-barber-charcoal mb-2">
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
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all"
                          placeholderText="Select a date"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-barber-charcoal/40" />
                      </div>
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-barber-charcoal mb-2">
                        Select Time *
                      </label>
                      <div className="relative">
                        <select
                          {...register('time')}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all bg-white appearance-none"
                        >
                          <option value="">Choose a time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-barber-charcoal/40" />
                      </div>
                      {errors.time && (
                        <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-barber-charcoal flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-barber-gold" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-barber-charcoal/20 focus:border-barber-gold focus:ring-2 focus:ring-barber-gold/20 outline-none transition-all resize-none"
                    placeholder="Any special requests or requirements..."
                  />
                  {errors.notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full py-4 text-lg"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                </Button>
                
                <p className="text-sm text-barber-charcoal/60 text-center">
                  You'll receive a confirmation email within 24 hours.
                  Cancel or reschedule up to 12 hours before your appointment.
                </p>
              </form>
            </Card>
          </motion.div>
          
          {/* Booking Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-barber-navy">Why Choose Us</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Master Barbers',
                    description: 'Our barbers have 10+ years of experience and ongoing training.',
                  },
                  {
                    title: 'Premium Products',
                    description: 'We use only the highest quality grooming products and tools.',
                  },
                  {
                    title: 'Sanitary Standards',
                    description: 'All tools are sterilized between clients for your safety.',
                  },
                  {
                    title: 'Satisfaction Guarantee',
                    description: 'Not happy with your cut? We\'ll fix it within 48 hours.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-barber-gold"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-barber-navy">{item.title}</h4>
                      <p className="text-barber-charcoal/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-8 bg-barber-navy text-white">
              <h3 className="text-2xl font-bold mb-6">Working Hours</h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>{schedule.day}</span>
                    <span className="font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-barber-gold/10 rounded-lg border border-barber-gold/30">
                <p className="text-sm">
                  <span className="font-semibold">Note:</span> Last appointment is 30 minutes before closing.
                  Evening appointments may require advance booking.
                </p>
              </div>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-barber-navy">Need Help?</h3>
              <div className="space-y-4">
                <p className="text-barber-charcoal/70">
                  Call us directly for immediate assistance or same-day appointments.
                </p>
                <div className="text-center">
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center text-barber-gold hover:text-barber-gold/80 font-semibold text-lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    (123) 456-7890
                  </a>
                </div>
                <p className="text-sm text-barber-charcoal/60 text-center">
                  We typically respond within 15 minutes during business hours.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}