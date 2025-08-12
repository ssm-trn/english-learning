import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 型定義
export interface Profile {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: number;
  user_id?: string;
  role: "user" | "ai";
  message: string;
  created_at: string;
  updated_at: string;
}

export interface Suggestion {
  id: number;
  chat_message_id: number;
  english_sentence: string;
  japanese_translation: string;
  created_at: string;
  updated_at: string;
}

export interface Bookmark {
  id: number;
  user_id: string;
  suggestion_id: number;
  created_at: string;
  updated_at: string;
}
