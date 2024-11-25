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
    
    // Criar o prompt para análise
    const prompt = `Analise esta resposta de questionário e forneça recomendações específicas:
    
    Ideia de Negócio: ${responses.business_idea}
    Mercado Alvo: ${responses.target_market}
    Investimento Inicial: ${responses.initial_investment}
    Nível de Experiência: ${responses.experience_level}
    Estrutura Preferida: ${responses.preferred_structure}
    
    Por favor, forneça recomendações detalhadas sobre:
    1. Sugestões de estrutura empresarial
    2. Principais passos a serem tomados
    3. Desafios potenciais para se preparar
    4. Recursos que devem ser consultados
    5. Expectativas de cronograma
    
    Formate a resposta em seções claras.`;

    // Fazer requisição para Eden AI
    const response = await fetch('https://api.edenai.run/v2/text/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('EDEN_AI_API_KEY')}`,
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

    const result = await response.json();
    console.log('Eden AI response:', result);

    // Extrair recomendações da resposta do Eden AI
    const recommendations = result.anthropic.generated_text;
    console.log('Recommendations generated:', recommendations);

    // Atualizar a resposta do questionário com as recomendações
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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