const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually read .env.local (because dotenv may not be loaded)
const envPath = path.join(process.cwd(), '.env.local');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = value;
      if (key === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') supabaseKey = value;
    }
  }
}

console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  // First, try to count rows
  const { count, error: countError } = await supabase
    .from('colleges')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ Count error:', countError.message);
    return;
  }
  console.log(`✅ Found ${count} colleges`);

  // Fetch first 2 colleges
  const { data, error } = await supabase
    .from('colleges')
    .select('id, name')
    .limit(2);

  if (error) {
    console.error('❌ Fetch error:', error.message);
  } else {
    console.log('✅ Sample data:', data);
  }
}

test();