import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient(); // already scoped to the current request

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return redirect('/login');
  }

  const {
    data: roleData,
    error: roleError,
  } = await supabase
    .from('Roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (roleError || roleData?.role !== 'admin') {
    return redirect('/unauthorized');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
}
