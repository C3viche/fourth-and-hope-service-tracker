// app/components/layout/Sidebar.tsx
import Sidebar from "@/app/(components)/sidebar/sidebar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient(); // already scoped to the current request
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log(user);
  if (userError || !user) {
    return redirect("/login");
  }

  // Fetch the user's role from the Roles table
  const { data: roleData, error: roleError } = await supabase
    .from("Roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (roleError) {
    console.log(roleError);
  }
  // Pass the `isAdmin` prop to Sidebar
  const isAdmin = roleData?.role === "admin";
  const { full_name, avatar_url } = user.user_metadata;

  return (
    <html lang="en">
      <body>
        <Sidebar
          isAdmin={isAdmin}
          fullName={full_name}
          avatarUrl={avatar_url}
        />
        {children}
      </body>
    </html>
  );
}
