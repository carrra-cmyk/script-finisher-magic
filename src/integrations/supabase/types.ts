export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_model_category: boolean | null
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_model_category?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_model_category?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      flagged_content: {
        Row: {
          action_taken: string | null
          created_at: string
          details: string | null
          id: string
          listing_id: string
          reason: string
          reported_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          details?: string | null
          id?: string
          listing_id: string
          reason: string
          reported_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          details?: string | null
          id?: string
          listing_id?: string
          reason?: string
          reported_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flagged_content_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flagged_content_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flagged_content_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_upgrades: {
        Row: {
          expires_at: string | null
          id: string
          is_active: boolean | null
          listing_id: string
          purchased_at: string
          upgrade_id: string
        }
        Insert: {
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          listing_id: string
          purchased_at?: string
          upgrade_id: string
        }
        Update: {
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          listing_id?: string
          purchased_at?: string
          upgrade_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_upgrades_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_upgrades_upgrade_id_fkey"
            columns: ["upgrade_id"]
            isOneToOne: false
            referencedRelation: "upgrades"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          available_now_active: boolean | null
          available_now_ends_at: string | null
          bump_count: number | null
          bump_next_available_at: string | null
          category_id: string
          created_at: string
          description: string | null
          has_slideshow: boolean | null
          highlight_expires_at: string | null
          id: string
          is_active: boolean | null
          is_highlighted: boolean | null
          is_paid_listing: boolean | null
          is_special: boolean | null
          last_bumped_at: string | null
          location_id: string | null
          price_tokens: number | null
          slug: string
          tagline: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          available_now_active?: boolean | null
          available_now_ends_at?: string | null
          bump_count?: number | null
          bump_next_available_at?: string | null
          category_id: string
          created_at?: string
          description?: string | null
          has_slideshow?: boolean | null
          highlight_expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_highlighted?: boolean | null
          is_paid_listing?: boolean | null
          is_special?: boolean | null
          last_bumped_at?: string | null
          location_id?: string | null
          price_tokens?: number | null
          slug: string
          tagline?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          available_now_active?: boolean | null
          available_now_ends_at?: string | null
          bump_count?: number | null
          bump_next_available_at?: string | null
          category_id?: string
          created_at?: string
          description?: string | null
          has_slideshow?: boolean | null
          highlight_expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_highlighted?: boolean | null
          is_paid_listing?: boolean | null
          is_special?: boolean | null
          last_bumped_at?: string | null
          location_id?: string | null
          price_tokens?: number | null
          slug?: string
          tagline?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city: string | null
          country: string
          created_at: string
          id: string
          state: string | null
        }
        Insert: {
          city?: string | null
          country: string
          created_at?: string
          id?: string
          state?: string | null
        }
        Update: {
          city?: string | null
          country?: string
          created_at?: string
          id?: string
          state?: string | null
        }
        Relationships: []
      }
      love_coin_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          invoice_id: string | null
          related_listing_id: string | null
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_id?: string | null
          related_listing_id?: string | null
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_id?: string | null
          related_listing_id?: string | null
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "love_coin_transactions_related_listing_id_fkey"
            columns: ["related_listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "love_coin_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          created_at: string
          display_order: number | null
          hash: string | null
          id: string
          is_compressed: boolean | null
          listing_id: string
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          hash?: string | null
          id?: string
          is_compressed?: boolean | null
          listing_id: string
          type: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          hash?: string | null
          id?: string
          is_compressed?: boolean | null
          listing_id?: string
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          is_yoti_verified: boolean | null
          love_coin_balance: number
          tier: Database["public"]["Enums"]["tier_name"]
          tier_expires_at: string | null
          updated_at: string
          username: string | null
          yoti_activity_id: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          is_yoti_verified?: boolean | null
          love_coin_balance?: number
          tier?: Database["public"]["Enums"]["tier_name"]
          tier_expires_at?: string | null
          updated_at?: string
          username?: string | null
          yoti_activity_id?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          is_yoti_verified?: boolean | null
          love_coin_balance?: number
          tier?: Database["public"]["Enums"]["tier_name"]
          tier_expires_at?: string | null
          updated_at?: string
          username?: string | null
          yoti_activity_id?: string | null
        }
        Relationships: []
      }
      tiers: {
        Row: {
          available_now_cooldown_hours: number
          bump_cooldown_minutes: number
          created_at: string
          id: string
          max_ads: number
          max_images: number
          max_videos: number
          name: Database["public"]["Enums"]["tier_name"]
          price_love_coins: number | null
          upgrade_discount_percent: number | null
        }
        Insert: {
          available_now_cooldown_hours: number
          bump_cooldown_minutes: number
          created_at?: string
          id?: string
          max_ads: number
          max_images: number
          max_videos: number
          name: Database["public"]["Enums"]["tier_name"]
          price_love_coins?: number | null
          upgrade_discount_percent?: number | null
        }
        Update: {
          available_now_cooldown_hours?: number
          bump_cooldown_minutes?: number
          created_at?: string
          id?: string
          max_ads?: number
          max_images?: number
          max_videos?: number
          name?: Database["public"]["Enums"]["tier_name"]
          price_love_coins?: number | null
          upgrade_discount_percent?: number | null
        }
        Relationships: []
      }
      upgrades: {
        Row: {
          cost_love_coins: number
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          max_active: number | null
          name: string
          type: string
        }
        Insert: {
          cost_love_coins: number
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          max_active?: number | null
          name: string
          type: string
        }
        Update: {
          cost_love_coins?: number
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          max_active?: number | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      tier_name: "free" | "basic" | "vip" | "elite"
      user_role: "model" | "classified_user" | "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      tier_name: ["free", "basic", "vip", "elite"],
      user_role: ["model", "classified_user", "admin", "moderator"],
    },
  },
} as const
