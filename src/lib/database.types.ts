export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name: string
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string | null
          updated_at: string | null
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          type: Database["public"]["Enums"]["task_type"]
          priority: Database["public"]["Enums"]["priority_type"]
          status: Database["public"]["Enums"]["status_type"]
          project_id: string | null
          assigned_to: string | null
          created_by: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type?: Database["public"]["Enums"]["task_type"]
          priority?: Database["public"]["Enums"]["priority_type"]
          status?: Database["public"]["Enums"]["status_type"]
          project_id?: string | null
          assigned_to?: string | null
          created_by: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: Database["public"]["Enums"]["task_type"]
          priority?: Database["public"]["Enums"]["priority_type"]
          status?: Database["public"]["Enums"]["status_type"]
          project_id?: string | null
          assigned_to?: string | null
          created_by?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Enums: {
      priority_type: "LOW" | "MEDIUM" | "HIGH"
      status_type: "TODO" | "IN_PROGRESS" | "DONE"
      task_type: "SYSTEM" | "SERVER" | "BUG" | "DATABASE" | "CODE" | "SECURITY" | "NETWORK" | "OTHER"
    }
  }
}