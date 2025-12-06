import { z } from 'zod'

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  barber: z.string().optional(),
  date: z.date().refine((d) => d instanceof Date && !isNaN(d.getTime()), {
    message: 'Please select a valid date',
  }),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>