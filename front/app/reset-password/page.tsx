"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendResetEmail } from "./actions";

const initialState = { success: false, error: "" };

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(sendResetEmail, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            パスワードの再設定
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          {state.error && (
            <div className="text-red-600 text-center">{state.error}</div>
          )}
          {state.success && (
            <div className="text-green-600 text-center">
              再設定用メールを送信しました。受信ボックスをご確認ください。
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                name="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              再設定メールを送信
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              ログイン画面に戻る
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
