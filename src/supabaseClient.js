// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ''; // Reemplaza con tu Supabase URL
const supabaseAnonKey = ''; // Reemplaza con tu clave pública (anon key)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
