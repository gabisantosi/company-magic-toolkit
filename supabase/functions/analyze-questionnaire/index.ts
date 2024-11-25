import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

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

    // Inicializar o cliente Hugging Face
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'));

    // Usar o modelo de linguagem do Hugging Face
    const result = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
      }
    });

    const recommendations = result.generated_text;
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