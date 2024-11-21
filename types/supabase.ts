export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          name: string
          description?: string | null
          created_by: string
        }
        Update: {
          name?: string
          description?: string | null
        }
      }
      company_users: {
        Row: {
          company_id: string
          user_id: string
          role: 'admin' | 'contributor' | 'viewer'
          created_at: string
        }
        Insert: {
          company_id: string
          user_id: string
          role: 'admin' | 'contributor' | 'viewer'
        }
        Update: {
          role?: 'admin' | 'contributor' | 'viewer'
        }
      }
    }
  }
} 