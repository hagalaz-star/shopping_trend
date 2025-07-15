"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  console.log("--- 로그인 시도 ---");
  console.log("전송된 이메일:", data.email);
  console.log("전송된 비밀번호:", data.password);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("--- 로그인 에러 발생 ---", error.message);
    return redirect(`/login?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  return redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nickName = formData.get("nickName") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nick_name: nickName,
      },
    },
  });

  if (error) {
    console.error("Signup Error:", error);
    redirect("/login?error=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/auth/check-email");
}

// export async function updatePassword(formData: FormData) {
//   const supabase = await createClient();

//   const password = formData.get("password") as string;
//   // type-casting here for convenience
//   // in practice, you should validate your inputs

//   // 1. 비밀번호 업데이트를 위해 updateUser 함수를 사용합니다.
//   const { error } = await supabase.auth.updateUser({ password: password });

//   if (error) {
//     console.error("--- 비밀번호 변경 에러 ---", error.message);
//     // 2. 실패 시, 에러 메시지와 함께 비밀번호 변경 페이지로 다시 보냅니다.
//     return redirect(`/auth/update-password?error=${error.message}`);
//   }

//   return redirect(
//     "/login?message=Password updated successfully. Please log in."
//   );
// }

export async function sendResetLink(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  console.log("--- 비밀번호 재설정 시도 ---");
  console.log("전송된 이메일:", email);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/update-password",
  });

  if (error) {
    console.error("--- 재설정 에러 발생 ---", error.message);
    return redirect(`/auth/forgot-password?error=${error.message}`);
  }
  return redirect("/auth/check-email");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

export async function savePersona(persona: {
  title: string;
  imageUrl: string;
  description: string;
  clusterName: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const { data, error } = await supabase
    .from(`personas`)
    .insert([
      {
        title: persona.title,
        user_id: user.id,
        image_url: persona.imageUrl,
        description: persona.description,
        cluster_name: persona.clusterName,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase 저장 에러:", error);

    if (error.code === "42501") {
      return { error: "데이터 저장 권한이 없습니다. 관리자에게 문의하세요." };
    }
    return { error: "페르소나를 저장하는 데 실패했습니다." };
  }
  return { success: "페르소나가 성공적으로 저장되었습니다!", data: data };
}

export async function deletePersona(personaId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("personas")
    .delete()
    .eq("id", personaId);

  if (error) {
    console.error("삭제 에러:", error);
    return { error: "삭제에 실패했습니다." };
  }

  revalidatePath("/my-page");

  return { success: "성공적으로 삭제되었습니다." };
}
