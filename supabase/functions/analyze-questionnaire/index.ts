import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Set a timeout for the Eden AI API request
const TIMEOUT_MS = 4000; // 4 seconds to allow for processing time

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses, userId } = await req.json();
    
    const prompt = `Based on the following information, provide a concise recommendation for the best type of company to open in Sweden:
    
    Business Idea: ${responses.business_idea}
    Target Market: ${responses.target_market}
    Initial Investment: ${responses.initial_investment}
    Experience Level: ${responses.experience_level}
    Current Structure Preference: ${responses.preferred_structure}
    
    Focus on key points and keep the response under 300 words.`;

    console.log('Processing request for user:', userId);

    const edenAiApiKey = Deno.env.get('EDEN_AI_API_KEY');
    if (!edenAiApiKey) {
      console.error('Eden AI API key not found');
      return new Response(
        JSON.stringify({ error: 'Configuration error: API key not found' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), TIMEOUT_MS);
    });

    // Create the API request promise
    const apiRequestPromise = fetch('https://api.edenai.run/v2/text/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        providers: "anthropic",
        text: prompt,
        temperature: 0.7,
        settings: {
          anthropic: "claude-2"
        }
      })
    });

    // Race between the timeout and the API request
    const response = await Promise.race([apiRequestPromise, timeoutPromise])
      .catch(error => {
        console.error('Request failed:', error.message);
        throw new Error(error.message === 'Request timeout' 
          ? 'The request took too long to process' 
          : 'Failed to connect to AI service');
      });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate recommendations',
          status: response.status,
          details: errorText
        }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await response.json();
    
    if (!result?.anthropic?.generated_text) {
      console.error('Invalid API response:', result);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response format',
          details: 'The AI service returned an unexpected response format'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const generatedText = result.anthropic.generated_text.trim();
    console.log('Generated recommendations length:', generatedText.length);

    // Save to Supabase with a shorter timeout
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: updateError } = await supabase
      .from('questionnaire_responses')
      .update({ ai_recommendations: generatedText })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) {
      console.error('Database update failed:', updateError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save recommendations',
          details: 'Database update error'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ recommendations: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});