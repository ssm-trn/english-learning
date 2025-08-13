"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function signInAction(email: string, password: string) {
  try {
    // サーバーサイドでのみ使用されるサービスロールキーを使用
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, user: data.user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "ログインに失敗しました",
    };
  }
}
