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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      activity: {
        Row: {
          created_at: string
          id: string
          kind: string
          label: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          label: string
          owner_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          label?: string
          owner_id?: string
        }
        Relationships: []
      }
      collabs: {
        Row: {
          audience: string | null
          contact: string | null
          content_type: string | null
          created_at: string
          follow_up_date: string | null
          id: string
          idea: string | null
          name: string
          notes: string | null
          outreach_date: string | null
          owner_id: string
          platform: string | null
          profile_url: string | null
          stage: string
          username: string | null
        }
        Insert: {
          audience?: string | null
          contact?: string | null
          content_type?: string | null
          created_at?: string
          follow_up_date?: string | null
          id?: string
          idea?: string | null
          name: string
          notes?: string | null
          outreach_date?: string | null
          owner_id?: string
          platform?: string | null
          profile_url?: string | null
          stage?: string
          username?: string | null
        }
        Update: {
          audience?: string | null
          contact?: string | null
          content_type?: string | null
          created_at?: string
          follow_up_date?: string | null
          id?: string
          idea?: string | null
          name?: string
          notes?: string | null
          outreach_date?: string | null
          owner_id?: string
          platform?: string | null
          profile_url?: string | null
          stage?: string
          username?: string | null
        }
        Relationships: []
      }
      content_projects: {
        Row: {
          captions: Json
          created_at: string
          description: string | null
          due_date: string | null
          format: string | null
          hashtags: string | null
          id: string
          link: string | null
          notes: string | null
          owner_id: string
          platform: string | null
          publish_date: string | null
          published_url: string | null
          recording_date: string | null
          status: string
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          captions?: Json
          created_at?: string
          description?: string | null
          due_date?: string | null
          format?: string | null
          hashtags?: string | null
          id?: string
          link?: string | null
          notes?: string | null
          owner_id?: string
          platform?: string | null
          publish_date?: string | null
          published_url?: string | null
          recording_date?: string | null
          status?: string
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          captions?: Json
          created_at?: string
          description?: string | null
          due_date?: string | null
          format?: string | null
          hashtags?: string | null
          id?: string
          link?: string | null
          notes?: string | null
          owner_id?: string
          platform?: string | null
          publish_date?: string | null
          published_url?: string | null
          recording_date?: string | null
          status?: string
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          kind: string
          link_id: string | null
          link_type: string | null
          notes: string | null
          owner_id: string
          starts_at: string
          title: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          kind?: string
          link_id?: string | null
          link_type?: string | null
          notes?: string | null
          owner_id?: string
          starts_at: string
          title: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          kind?: string
          link_id?: string | null
          link_type?: string | null
          notes?: string | null
          owner_id?: string
          starts_at?: string
          title?: string
        }
        Relationships: []
      }
      focus_sessions: {
        Row: {
          created_at: string
          duration_sec: number
          id: string
          label: string | null
          notes: string | null
          owner_id: string
          started_at: string
          task_id: string | null
        }
        Insert: {
          created_at?: string
          duration_sec: number
          id?: string
          label?: string | null
          notes?: string | null
          owner_id?: string
          started_at: string
          task_id?: string | null
        }
        Update: {
          created_at?: string
          duration_sec?: number
          id?: string
          label?: string | null
          notes?: string | null
          owner_id?: string
          started_at?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "focus_sessions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_progress: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          notes: string | null
          owner_id: string
          recorded_at: string
          value: number
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          notes?: string | null
          owner_id?: string
          recorded_at?: string
          value: number
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          notes?: string | null
          owner_id?: string
          recorded_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "goal_progress_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          current: number | null
          deadline: string | null
          id: string
          kind: string
          notes: string | null
          owner_id: string
          platform: string | null
          status: string
          target: number
          title: string
          unit: string | null
        }
        Insert: {
          created_at?: string
          current?: number | null
          deadline?: string | null
          id?: string
          kind?: string
          notes?: string | null
          owner_id?: string
          platform?: string | null
          status?: string
          target?: number
          title: string
          unit?: string | null
        }
        Update: {
          created_at?: string
          current?: number | null
          deadline?: string | null
          id?: string
          kind?: string
          notes?: string | null
          owner_id?: string
          platform?: string | null
          status?: string
          target?: number
          title?: string
          unit?: string | null
        }
        Relationships: []
      }
      ideas: {
        Row: {
          category: string
          created_at: string
          description: string | null
          favourite: boolean
          id: string
          notes: string | null
          owner_id: string
          priority: string
          status: string
          tags: string[]
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          favourite?: boolean
          id?: string
          notes?: string | null
          owner_id?: string
          priority?: string
          status?: string
          tags?: string[]
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          favourite?: boolean
          id?: string
          notes?: string | null
          owner_id?: string
          priority?: string
          status?: string
          tags?: string[]
          title?: string
        }
        Relationships: []
      }
      login_attempts: {
        Row: {
          created_at: string
          id: number
          ip: string
          success: boolean
        }
        Insert: {
          created_at?: string
          id?: number
          ip: string
          success?: boolean
        }
        Update: {
          created_at?: string
          id?: number
          ip?: string
          success?: boolean
        }
        Relationships: []
      }
      milestones: {
        Row: {
          created_at: string
          id: string
          owner_id: string
          reward: string
          status: string
          subs: number
        }
        Insert: {
          created_at?: string
          id?: string
          owner_id?: string
          reward: string
          status?: string
          subs: number
        }
        Update: {
          created_at?: string
          id?: string
          owner_id?: string
          reward?: string
          status?: string
          subs?: number
        }
        Relationships: []
      }
      stream_segments: {
        Row: {
          checklist: Json
          description: string | null
          duration_min: number
          id: string
          name: string
          notes: string | null
          owner_id: string
          position: number
          stream_id: string
        }
        Insert: {
          checklist?: Json
          description?: string | null
          duration_min?: number
          id?: string
          name: string
          notes?: string | null
          owner_id?: string
          position?: number
          stream_id: string
        }
        Update: {
          checklist?: Json
          description?: string | null
          duration_min?: number
          id?: string
          name?: string
          notes?: string | null
          owner_id?: string
          position?: number
          stream_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stream_segments_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      streams: {
        Row: {
          category: string | null
          checklist: Json
          created_at: string
          description: string | null
          duration_min: number | null
          game: string | null
          goals: string | null
          guests: string | null
          id: string
          is_template: boolean
          notes: string | null
          owner_id: string
          platform: string | null
          review: Json | null
          start_time: string | null
          status: string
          stream_date: string | null
          stream_type: string | null
          title: string
        }
        Insert: {
          category?: string | null
          checklist?: Json
          created_at?: string
          description?: string | null
          duration_min?: number | null
          game?: string | null
          goals?: string | null
          guests?: string | null
          id?: string
          is_template?: boolean
          notes?: string | null
          owner_id?: string
          platform?: string | null
          review?: Json | null
          start_time?: string | null
          status?: string
          stream_date?: string | null
          stream_type?: string | null
          title: string
        }
        Update: {
          category?: string | null
          checklist?: Json
          created_at?: string
          description?: string | null
          duration_min?: number | null
          game?: string | null
          goals?: string | null
          guests?: string | null
          id?: string
          is_template?: boolean
          notes?: string | null
          owner_id?: string
          platform?: string | null
          review?: Json | null
          start_time?: string | null
          status?: string
          stream_date?: string | null
          stream_type?: string | null
          title?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          notes: string | null
          owner_id: string
          priority: string
          related_id: string | null
          related_type: string | null
          status: string
          title: string
        }
        Insert: {
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          owner_id?: string
          priority?: string
          related_id?: string | null
          related_type?: string | null
          status?: string
          title: string
        }
        Update: {
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          owner_id?: string
          priority?: string
          related_id?: string | null
          related_type?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      office_session_ok: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
