import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { count, error } = await supabase
    .from('colleges')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('❌ Supabase error:', error.message);
  } else {
    console.log(`✅ Found ${count} colleges`);
  }
}

test();