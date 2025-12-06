'use client'

import { motion } from 'framer-motion'
import { Scissors, Sparkles, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '../ui/Card'

const services = [
  {
    icon: Scissors,
    title: 'Classic Haircut',
    description: 'Professional haircut with style consultation, shampoo, and finishing.',
    price: 35,
    duration: 45,
    popular: true,
  },
  {
    icon: Scissors,
    title: 'Beard Trim & Shape',
    description: 'Precision beard trimming with hot towel treatment and conditioning.',
    price: 25,
    duration: 30,
  },
  {
    icon: Sparkles,
    title: 'Deluxe Grooming',
    description: 'Haircut, beard trim, facial massage, and premium product treatment.',
    price: 65,
    duration: 90,
    popular: true,
  },
  {
    icon: Scissors,
    title: 'Kids Cut',
    description: 'Specialized haircut for children in a comfortable, fun environment.',
    price: 28,
    duration: 40,
  },
  {
    icon: Scissors,
    title: 'Head Shave',
    description: 'Complete head shave with pre-shave oil and post-shave balm.',
    price: 40,
    duration: 50,
  },
  {
    icon: Sparkles,
    title: 'Executive Package',
    description: 'Full grooming experience including haircut, shave, and facial treatment.',
    price: 85,
    duration: 120,
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-barber-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-barber-navy font-display">
            Our <span className="text-barber-gold">Services</span>
          </h2>
          <p className="text-lg text-barber-charcoal/80 max-w-2xl mx-auto">
            Premium grooming services tailored to your style. Experience the art of barbering.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                gradient
                className={`h-full p-8 relative ${service.popular ? 'border-2 border-barber-gold' : ''}`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-barber-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-barber-gold/10 mb-6">
                    <service.icon className="h-10 w-10 text-barber-gold" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-barber-navy">{service.title}</h3>
                  <p className="text-barber-charcoal/70 mb-6 flex-grow">{service.description}</p>
                  
                  <div className="flex items-center justify-between w-full mt-6 pt-6 border-t border-barber-charcoal/10">
                    <div className="flex items-center text-barber-charcoal/70">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center text-barber-gold font-bold text-xl">
                      <DollarSign className="h-5 w-5" />
                      <span>{service.price}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-barber-charcoal/60">
            All services include complimentary consultation, shampoo, and styling.
          </p>
        </motion.div>
      </div>
    </section>
  )
}