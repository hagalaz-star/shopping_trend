import { createClient } from "@/utils/supabase/server";
import UserMenu from "@/components/UserMenu";

export default async function AuthStatus() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <UserMenu user={user} />
    </div>
  );
}
