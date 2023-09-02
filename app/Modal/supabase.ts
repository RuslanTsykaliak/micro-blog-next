import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseApiKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('Supabase URL and API Key must be provided in the environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);
