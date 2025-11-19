import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xtbjhubevkeinikayqle.supabase.co'
const supabaseKey = 'sb_publishable_6ferGH7cc0B72roHqm7RzA_fB1MLUYS'
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: { eventsPerSecond: 10 }
  }
})
