import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting SNI codes import...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the SNI codes website
    const response = await fetch('https://snisok.scb.se/');
    const html = await response.text();

    // Parse the HTML and extract SNI codes
    // This is a simplified example - you'll need to adjust the parsing logic
    // based on the actual structure of the website
    const sniCodes = [];
    const regex = /(\d{2}\.\d{3})\s+-\s+([^<]+)/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
      const code = match[1];
      const name = match[2].trim();

      // Translate the name to English using Eden AI
      const translationResponse = await fetch('https://api.edenai.run/v2/translation/automatic_translation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('EDEN_AI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providers: ['google'],
          text: name,
          source_language: 'sv',
          target_language: 'en',
        }),
      });

      const translationData = await translationResponse.json();
      const translatedName = translationData.google.text;

      sniCodes.push({
        code,
        name: translatedName,
        category: code.split('.')[0], // Use the first part of the code as category
        created_at: new Date().toISOString(),
      });

      console.log(`Processed SNI code: ${code} - ${translatedName}`);
    }

    // Insert the codes into the database
    const { error } = await supabase
      .from('sni_codes')
      .upsert(sniCodes, { 
        onConflict: 'code',
        ignoreDuplicates: false 
      });

    if (error) throw error;

    console.log(`Successfully imported ${sniCodes.length} SNI codes`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Imported ${sniCodes.length} SNI codes` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error importing SNI codes:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});