import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses, userId } = await req.json();
    
    // Create the prompt for OpenAI
    const prompt = `As a business advisor in Sweden, analyze this questionnaire response and provide specific recommendations:
    
    Business Idea: ${responses.business_idea}
    Target Market: ${responses.target_market}
    Initial Investment: ${responses.initial_investment}
    Experience Level: ${responses.experience_level}
    Preferred Structure: ${responses.preferred_structure}
    
    Please provide detailed recommendations about:
    1. Business structure suggestions
    2. Key steps to take
    3. Potential challenges to prepare for
    4. Resources they should look into
    5. Timeline expectations
    
    Format the response in clear sections.`;

    // Get AI recommendations
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a knowledgeable business advisor in Sweden, experienced in helping entrepreneurs start their businesses.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const aiData = await openAIResponse.json();
    const recommendations = aiData.choices[0].message.content;

    // Update the questionnaire response with AI recommendations
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    const { error: updateError } = await supabase
      .from('questionnaire_responses')
      .update({ ai_recommendations: recommendations })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) {
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