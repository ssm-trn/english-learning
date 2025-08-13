"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type ActionState = { success: boolean; error?: string };

export async function sendResetEmail(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = String(formData.get("email") || "").trim();
    if (!email) {
      return { success: false, error: "メールアドレスを入力してください" };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // 事前チェック: 対象メールのユーザーが存在するか（管理者API）
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: linkData, error: checkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email,
        options: { redirectTo: `${siteUrl}/reset-password/update` },
      });
    if (checkError) {
      return {
        success: false,
        error: "このメールアドレスのユーザーが見つかりません",
      };
    }
    if (process.env.NODE_ENV !== "production") {
      const link = (linkData as any)?.properties?.action_link;
      if (link) {
        // 開発用デバッグログ
        console.log(`[DEV] Password recovery link for ${email}: ${link}`);
      }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password/update`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "送信に失敗しました",
    };
  }
}
