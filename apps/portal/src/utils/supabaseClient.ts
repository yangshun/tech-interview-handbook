import { createClient } from '@supabase/supabase-js';

import { env } from '~/env/server.mjs';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
