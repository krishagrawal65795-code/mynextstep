const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local manually (dotenv sometimes fails)
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

async function importColleges() {
  console.log('📥 Downloading college data from JSON API...');
  // Using a reliable JSON dataset (Indian Colleges API)
  const url = 'https://raw.githubusercontent.com/HypertextAssassin0273/Indian_Colleges_API/main/colleges.json';
  const response = await fetch(url);
  const data = await response.json();
  
  // The JSON structure: an array of objects with keys: id, name, city, state, etc.
  const colleges = data.colleges || data; // adjust if nested
  
  console.log(`📊 Found ${colleges.length} colleges in dataset.`);
  
  let inserted = 0;
  let skipped = 0;
  
  for (const college of colleges) {
    const name = college.name || college.college_name;
    if (!name) {
      skipped++;
      continue;
    }
    
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
      console.error(`❌ Error inserting ${name}:`, error.message);
      skipped++;
    } else {
      inserted++;
      if (inserted % 500 === 0) console.log(`✅ Inserted ${inserted} colleges...`);
    }
  }
  
  console.log(`\n🎉 Import finished! Inserted: ${inserted}, Skipped: ${skipped}`);
}

importColleges().catch(console.error);