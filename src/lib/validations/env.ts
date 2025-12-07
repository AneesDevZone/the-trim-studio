import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_SUPABASE_URL: str(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: str(),
  NEXT_PUBLIC_SITE_URL: str({ default: 'http://localhost:3000' }),
  // Add these for EmailJS:
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: str(),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: str(),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: str(),
})