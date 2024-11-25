export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_details: {
        Row: {
          business_type: string
          description: string | null
          id: number
          industry: string
        }
        Insert: {
          business_type: string
          description?: string | null
          id?: number
          industry: string
        }
        Update: {
          business_type?: string
          description?: string | null
          id?: number
          industry?: string
        }
        Relationships: []
      }
      business_recommendations: {
        Row: {
          business_type: string
          complexity_level: string | null
          id: number
          key_benefits: string[] | null
          key_challenges: string[] | null
          min_investment: string | null
          suitable_for: string[] | null
        }
        Insert: {
          business_type: string
          complexity_level?: string | null
          id?: number
          key_benefits?: string[] | null
          key_challenges?: string[] | null
          min_investment?: string | null
          suitable_for?: string[] | null
        }
        Update: {
          business_type?: string
          complexity_level?: string | null
          id?: number
          key_benefits?: string[] | null
          key_challenges?: string[] | null
          min_investment?: string | null
          suitable_for?: string[] | null
        }
        Relationships: []
      }
      business_types: {
        Row: {
          created_at: string
          default_fixed_cost: number
          description: string
          id: number
          name: string
          registration_cost: number
          tax_rate: number
        }
        Insert: {
          created_at?: string
          default_fixed_cost: number
          description: string
          id?: number
          name: string
          registration_cost: number
          tax_rate: number
        }
        Update: {
          created_at?: string
          default_fixed_cost?: number
          description?: string
          id?: number
          name?: string
          registration_cost?: number
          tax_rate?: number
        }
        Relationships: []
      }
      checklist: {
        Row: {
          business_type: string
          completed: boolean | null
          id: number
          step: string
          user_id: string | null
        }
        Insert: {
          business_type?: string
          completed?: boolean | null
          id?: never
          step: string
          user_id?: string | null
        }
        Update: {
          business_type?: string
          completed?: boolean | null
          id?: never
          step?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          business_type: string
          details: string | null
          document_template_url: string | null
          estimated_time: string | null
          id: number
          industry: string
          order_number: number
          resource_link: string | null
          step: string
        }
        Insert: {
          business_type: string
          details?: string | null
          document_template_url?: string | null
          estimated_time?: string | null
          id?: number
          industry: string
          order_number: number
          resource_link?: string | null
          step: string
        }
        Update: {
          business_type?: string
          details?: string | null
          document_template_url?: string | null
          estimated_time?: string | null
          id?: number
          industry?: string
          order_number?: number
          resource_link?: string | null
          step?: string
        }
        Relationships: []
      }
      forms: {
        Row: {
          created_at: string | null
          data: Json
          form_type: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data: Json
          form_type: string
          id?: never
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          form_type?: string
          id?: never
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_content: {
        Row: {
          action_label: string | null
          action_url: string | null
          business_type: string
          content: string
          id: number
          industry: string
          order_number: number
          step: string
          title: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          business_type: string
          content: string
          id?: number
          industry: string
          order_number: number
          step: string
          title: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          business_type?: string
          content?: string
          id?: number
          industry?: string
          order_number?: number
          step?: string
          title?: string
        }
        Relationships: []
      }
      predefined_scenarios: {
        Row: {
          business_type_id: number | null
          created_at: string
          description: string
          employees: number | null
          fixed_costs: number
          id: number
          name: string
          revenue: number
          sector_id: number | null
        }
        Insert: {
          business_type_id?: number | null
          created_at?: string
          description: string
          employees?: number | null
          fixed_costs: number
          id?: number
          name: string
          revenue: number
          sector_id?: number | null
        }
        Update: {
          business_type_id?: number | null
          created_at?: string
          description?: string
          employees?: number | null
          fixed_costs?: number
          id?: number
          name?: string
          revenue?: number
          sector_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "predefined_scenarios_business_type_id_fkey"
            columns: ["business_type_id"]
            isOneToOne: false
            referencedRelation: "business_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predefined_scenarios_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      questionnaire_responses: {
        Row: {
          ai_recommendations: string | null
          business_idea: string | null
          created_at: string
          experience_level: string | null
          id: number
          initial_investment: string | null
          preferred_structure: string | null
          target_market: string | null
          user_id: string | null
        }
        Insert: {
          ai_recommendations?: string | null
          business_idea?: string | null
          created_at?: string
          experience_level?: string | null
          id?: number
          initial_investment?: string | null
          preferred_structure?: string | null
          target_market?: string | null
          user_id?: string | null
        }
        Update: {
          ai_recommendations?: string | null
          business_idea?: string | null
          created_at?: string
          experience_level?: string | null
          id?: number
          initial_investment?: string | null
          preferred_structure?: string | null
          target_market?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sectors: {
        Row: {
          average_fixed_cost: number
          average_revenue: number
          created_at: string
          description: string
          id: number
          name: string
        }
        Insert: {
          average_fixed_cost: number
          average_revenue: number
          created_at?: string
          description: string
          id?: number
          name: string
        }
        Update: {
          average_fixed_cost?: number
          average_revenue?: number
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          business_type: string
          content: string
          founder_name: string | null
          id: number
          industry: string
          key_learnings: string[] | null
          title: string
          year_founded: number | null
        }
        Insert: {
          business_type: string
          content: string
          founder_name?: string | null
          id?: number
          industry: string
          key_learnings?: string[] | null
          title: string
          year_founded?: number | null
        }
        Update: {
          business_type?: string
          content?: string
          founder_name?: string | null
          id?: number
          industry?: string
          key_learnings?: string[] | null
          title?: string
          year_founded?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
