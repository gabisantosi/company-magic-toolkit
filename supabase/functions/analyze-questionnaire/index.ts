import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    
    // Create the prompt for OpenAI
    const prompt = `Como um consultor de negócios na Suécia, analise esta resposta do questionário e forneça recomendações específicas:
    
    Ideia de Negócio: ${responses.business_idea}
    Mercado-Alvo: ${responses.target_market}
    Investimento Inicial: ${responses.initial_investment}
    Nível de Experiência: ${responses.experience_level}
    Estrutura Preferida: ${responses.preferred_structure}
    
    Por favor, forneça recomendações detalhadas sobre:
    1. Sugestões de estrutura de negócio
    2. Principais passos a serem tomados
    3. Potenciais desafios a se preparar
    4. Recursos que devem ser consultados
    5. Expectativas de cronograma
    
    Formate a resposta em seções claras.`;

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
          { role: 'system', content: 'Você é um consultor de negócios experiente na Suécia, especializado em ajudar empreendedores a iniciar seus negócios.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await openAIResponse.json();
    const recommendations = data.choices[0].message.content;

    // Save recommendations to Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const { error: updateError } = await supabase
      .from('questionnaire_responses')
      .update({ ai_recommendations: recommendations })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) throw updateError;

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