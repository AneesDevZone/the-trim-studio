import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_SUPABASE_URL: str(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: str(),
  RESEND_API_KEY: str(),
  NEXT_PUBLIC_FROM_EMAIL: str(),
  NEXT_PUBLIC_SITE_URL: str({ default: 'http://localhost:3000' }),
})