import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useQuestionnaireApi = () => {
  const session = useSession();
  const { toast } = useToast();

  const ensureUserProfile = async (userId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return;

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: userData.user.email,
          full_name: userData.user.user_metadata?.full_name || null
        });
    }
  };

  const submitQuestionnaire = async (answers: Record<string, string>, userId: string) => {
    await ensureUserProfile(userId);

    const { error: responseError } = await supabase
      .from("questionnaire_responses")
      .insert({
        user_id: userId,
        business_idea: answers.business_idea,
        target_market: answers.target_market,
        initial_investment: answers.initial_investment,
        experience_level: answers.experience_level,
        preferred_structure: answers.preferred_structure,
      });

    if (responseError) throw responseError;

    const aiResponse = await supabase.functions.invoke('analyze-questionnaire', {
      body: { 
        responses: answers,
        userId: userId
      }
    });

    if (aiResponse.error) throw aiResponse.error;

    return aiResponse.data.recommendations;
  };

  return {
    submitQuestionnaire,
  };
};