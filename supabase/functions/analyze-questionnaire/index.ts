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

    const response = await fetch('https://api.edenai.run/v2/text/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        providers: ["anthropic"],
        text: prompt,
        temperature: 0.7,
        settings: {
          anthropic: "claude-2"  // Updated to use the correct model name
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
    
    if (!result?.anthropic?.generated_text) {
      console.error('Invalid API response:', result);
      if (result?.anthropic?.error) {
        return new Response(
          JSON.stringify({ 
            error: 'AI service error',
            details: result.anthropic.error.message
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

    const generatedText = result.anthropic.generated_text.trim();
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