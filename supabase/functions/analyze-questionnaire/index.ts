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
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    });
  }

  try {
    const { responses, userId } = await req.json();
    
    const prompt = `Based on the following information, what is the best type of company to open in Sweden?
    
    Business Idea: ${responses.business_idea}
    Target Market: ${responses.target_market}
    Initial Investment Available: ${responses.initial_investment}
    Business Experience Level: ${responses.experience_level}
    Current Structure Preference: ${responses.preferred_structure}
    
    Please provide a detailed analysis considering these factors and recommend the most suitable company type.`;

    console.log('Formatted prompt:', prompt);

    const edenAiApiKey = Deno.env.get('EDEN_AI_API_KEY');
    if (!edenAiApiKey) {
      throw new Error('Eden AI API key not found in environment variables');
    }

    const response = await fetch('https://api.edenai.run/v2/text/chat', {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Eden AI API error response:', errorText);
      return new Response(
        JSON.stringify({ error: 'Eden AI API request failed', details: errorText }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await response.json();
    console.log('Eden AI raw response:', JSON.stringify(result, null, 2));

    // Validate the response structure
    if (!result?.anthropic?.generated_text) {
      console.error('Invalid or missing response from Eden AI:', result);
      return new Response(
        JSON.stringify({ error: 'Invalid or missing response from Eden AI' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const generatedText = result.anthropic.generated_text.trim();
    if (!generatedText) {
      return new Response(
        JSON.stringify({ error: 'Empty response from Eden AI' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generated recommendations:', generatedText);

    // Save to Supabase
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
      console.error('Supabase update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to save recommendations', details: updateError }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ recommendations: generatedText }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in analyze-questionnaire function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack || 'No stack trace available'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});