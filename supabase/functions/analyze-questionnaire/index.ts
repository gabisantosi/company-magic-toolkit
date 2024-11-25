import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses, userId } = await req.json();
    
    // Format questionnaire responses into a comprehensive text
    const prompt = `Based on the following information, what is the best type of company to open in Sweden?
    
    Business Idea: ${responses.business_idea}
    Target Market: ${responses.target_market}
    Initial Investment Available: ${responses.initial_investment}
    Business Experience Level: ${responses.experience_level}
    Current Structure Preference: ${responses.preferred_structure}
    
    Please provide a detailed analysis considering these factors and recommend the most suitable company type.`;

    console.log('Formatted prompt:', prompt);

    // Get Eden AI API key from environment variables
    const edenAiApiKey = Deno.env.get('EDEN_AI_API_KEY');
    if (!edenAiApiKey) {
      throw new Error('Eden AI API key not found in environment variables');
    }

    // Make request to Eden AI
    const response = await fetch('https://api.edenai.run/v2/text/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        providers: "anthropic",
        text: prompt,
        temperature: 0.7,
        max_tokens: 500,
        settings: {
          anthropic: "claude-2"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Eden AI API error:', errorData);
      throw new Error(`Eden AI API failed with status ${response.status}: ${errorData}`);
    }

    const result = await response.json();
    console.log('Eden AI response:', result);

    if (!result.anthropic || !result.anthropic.generated_text) {
      console.error('Invalid response format from Eden AI:', result);
      throw new Error('Invalid response format from Eden AI');
    }

    // Extract recommendations from Eden AI response
    const recommendations = result.anthropic.generated_text;
    console.log('Generated recommendations:', recommendations);

    // Update questionnaire response with AI recommendations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: updateError } = await supabase
      .from('questionnaire_responses')
      .update({ ai_recommendations: recommendations })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({ recommendations }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error in analyze-questionnaire function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});