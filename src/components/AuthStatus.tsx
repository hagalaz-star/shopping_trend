import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/login/actions";

export default async function AuthStatus() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user?.user_metadata.nick_name || user?.email;

  return (
    <div className="absolute top-8 right-10 z-10 flex flex-col items-center">
      {user ? (
        <div>
          <span className="text-sm text-gray-900 bg-white p-2 rounded-md ">
            안녕하세요, {displayName}님!
          </span>
          <form action={logout}>
            <button className="rounded-md bg-gray-600 py-2 px-4 text-sm text-white hover:bg-gray-500 mt-5">
              로그아웃
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
