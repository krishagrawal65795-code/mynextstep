const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = value;
      if (key === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') supabaseKey = value;
      if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY' && !supabaseKey) supabaseKey = value;
    }
  }
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAndImport() {
  let page = 1;
  let totalImported = 0;
  let hasMore = true;

  while (hasMore) {
    console.log(`Fetching page ${page}...`);
    const url = `https://colleges-api.onrender.com/colleges?page=${page}&limit=500`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.colleges || data.colleges.length === 0) {
      hasMore = false;
      break;
    }

    for (const college of data.colleges) {
      const name = college.name;
      if (!name) continue;

      const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 90);

      const record = {
        name,
        slug,
        city: college.city || null,
        state: college.state || null,
        fees_min: null,
        fees_max: null,
        established_year: null,
        avg_placement_package: null,
        placement_percentage: null,
        branches: []
      };

      const { error } = await supabase.from('colleges').upsert(record, { onConflict: 'slug' });
      if (error) {
        console.error(`Error inserting ${name}:`, error.message);
      } else {
        totalImported++;
        if (totalImported % 100 === 0) console.log(`Imported ${totalImported} colleges...`);
      }
    }

    console.log(`Completed page ${page}, total so far: ${totalImported}`);
    page++;
    // Rate limit – wait 0.5 sec
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n🎉 Done! Imported ${totalImported} colleges.`);
}

fetchAndImport().catch(console.error);