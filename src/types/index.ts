export interface Service {
    id: string
    name: string
    description: string
    price: number
    duration: number // in minutes
    category: string
  }
  
  export interface Barber {
    id: string
    name: string
    specialty: string
    experience: string
    image?: string
  }
  
  export interface Appointment {
    id: string
    name: string
    email: string
    phone: string
    service: string
    barber?: string
    dateTime: Date
    duration: number
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    notes?: string
  }
  
  export interface TimeSlot {
    time: string
    available: boolean
  }