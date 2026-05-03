const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually read .env.local
const envPath = path.join(__dirname, '.env.local');
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
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.from('colleges').select('*', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Supabase error:', error.message);
    } else {
      console.log('✅ Colleges count:', count);
    }
  });