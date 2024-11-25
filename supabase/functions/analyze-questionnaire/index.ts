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
    
    // Create prompt for analysis in English
    const prompt = `Analyze this questionnaire response and provide specific recommendations:
    
    Business Idea: ${responses.business_idea}
    Target Market: ${responses.target_market}
    Initial Investment: ${responses.initial_investment}
    Experience Level: ${responses.experience_level}
    Preferred Structure: ${responses.preferred_structure}
    
    Please provide detailed recommendations about:
    1. Business structure suggestions
    2. Key steps to take
    3. Potential challenges to prepare for
    4. Resources to consult
    5. Timeline expectations
    
    Format the response in clear sections.`;

    console.log('Making request to Eden AI with prompt:', prompt);

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
          anthropic: {
            model: "claude-2"
          }
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
      console.error('Invalid Eden AI response format:', result);
      throw new Error('Invalid response format from Eden AI');
    }

    // Extract recommendations from Eden AI response
    const recommendations = result.anthropic.generated_text;
    console.log('Recommendations generated:', recommendations);

    // Update questionnaire response with recommendations
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
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-questionnaire function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});