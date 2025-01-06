import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

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
    
    const prompt = `As a business advisor in Sweden, please analyze this business case and provide recommendations:

Business Idea: ${responses.business_idea}
Target Market: ${responses.target_market}
Investment Capacity: ${responses.initial_investment}
Experience Level: ${responses.experience_level}

Please provide a structured analysis with the following sections:

1. Business Structure Recommendation
- Analyze which business structure would be most suitable (Aktiebolag, Enskild Firma, Handelsbolag) and explain why
- Consider the investment capacity, experience level, and business complexity
- List pros and cons of the recommended structure

2. SNI Code Recommendations
- Suggest 2-3 most relevant SNI codes for this business
- Include both the code numbers and descriptions
- Explain why these codes are appropriate

3. Key Considerations
- Market potential in Sweden
- Initial setup requirements
- Important regulations to consider
- Risk assessment

Please keep the total response under 800 words and format it clearly with headers and bullet points.`;

    console.log('Processing request for user:', userId);
    console.log('Generated prompt:', prompt);

    const edenAiApiKey = Deno.env.get('EDEN_AI_API_KEY');
    if (!edenAiApiKey) {
      throw new Error('Configuration error: API key not found');
    }

    const edenAiResponse = await fetch('https://api.edenai.run/v2/text/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        providers: ["openai"],
        text: prompt,
        temperature: 0.5,
        max_tokens: 1000,
        settings: {
          openai: "gpt-4"
        }
      })
    });

    if (!edenAiResponse.ok) {
      const errorText = await edenAiResponse.text();
      console.error('Eden AI API error:', edenAiResponse.status, errorText);
      throw new Error(`Eden AI API error: ${errorText}`);
    }

    const result = await edenAiResponse.json();
    console.log('Eden AI response received');
    
    if (!result?.openai?.generated_text) {
      console.error('Invalid API response:', result);
      throw new Error('Invalid response format from Eden AI');
    }

    const generatedText = result.openai.generated_text.trim();
    console.log('Generated recommendations length:', generatedText.length);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to database if user is authenticated
    if (userId) {
      const { error: updateError } = await supabase
        .from('questionnaire_responses')
        .upsert({
          user_id: userId,
          business_idea: responses.business_idea,
          target_market: responses.target_market,
          initial_investment: responses.initial_investment,
          experience_level: responses.experience_level,
          ai_recommendations: generatedText,
        });

      if (updateError) {
        console.error('Error saving to database:', updateError);
      }
    }

    return new Response(
      JSON.stringify({ recommendations: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});