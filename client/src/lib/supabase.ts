import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://faulkwugtqaakjrevrir.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdWxrd3VndHFhYWtqcmV2cmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MzY5MDQsImV4cCI6MjEwMzIxMjkwNH0.eyZznJmW20ZgYmwNHHfM8LvwjbWkxi3Y31-B4MGDVB0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
