import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { responses, userId } = await req.json();
    
    // Create prompts for each question with enhanced business type focus
    const businessIdeaPrompt = `Based on the business idea: ${responses.business_idea}, analyze the market potential and suggest key considerations for success in Sweden.`;
    const targetMarketPrompt = `For the target market: ${responses.target_market}, evaluate the market size in Sweden and suggest effective marketing strategies.`;
    const investmentPrompt = `With an investment capacity of ${responses.initial_investment}, recommend suitable business structures and initial resource allocation.`;
    const experiencePrompt = `For someone with ${responses.experience_level} business experience, suggest key areas to focus on and potential challenges to prepare for.`;
    const structurePrompt = `Regarding the ${responses.preferred_structure} business structure, explain its advantages, requirements, and potential limitations.`;

    const prompt = `Please provide a comprehensive business analysis and recommendations based on the following aspects:

1. ${businessIdeaPrompt}
2. ${targetMarketPrompt}
3. ${investmentPrompt}
4. ${experiencePrompt}
5. ${structurePrompt}

Additionally, based on all the information provided:
- Recommend which business structure would be most suitable (Limited Company (Aktiebolag), Sole Proprietorship (Enskild Firma), Trading Partnership (Handelsbolag), or Limited Partnership (Kommanditbolag)) and explain why.
- When mentioning business types in your response, always include the Swedish term in parentheses, e.g., "Limited Company (Aktiebolag)" or "Sole Proprietorship (Enskild Firma)".

Please structure your response with clear sections for each aspect and provide actionable recommendations. Keep the total response under 800 words.`;

    console.log('Processing request for user:', userId);
    console.log('Generated prompt:', prompt);

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

    const response = await fetch('https://api.edenai.run/v2/text/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        providers: ["openai"],
        text: prompt,
        temperature: 0.7,
        max_tokens: 1000,
        settings: {
          openai: "gpt-4"
        }
      })
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
    console.log('Eden AI response:', JSON.stringify(result));
    
    if (!result?.openai?.generated_text) {
      console.error('Invalid API response:', result);
      if (result?.openai?.error) {
        return new Response(
          JSON.stringify({ 
            error: 'AI service error',
            details: result.openai.error.message
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
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

    const generatedText = result.openai.generated_text.trim();
    console.log('Generated recommendations length:', generatedText.length);

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