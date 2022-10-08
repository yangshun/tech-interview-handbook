import { createClient } from '@supabase/supabase-js';

import { env } from '~/env/server.mjs';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = env;

// Create a single supabase client for interacting with the file storage
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
