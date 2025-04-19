import { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function withAuth(Component: any, requiredRole?: 'admin' | 'staff') {
  return function ProtectedPage(props: any) {
    const session = useSession();
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const fetchRole = async () => {
        if (session) {
          const { data, error } = await supabase
            .from('Roles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching role:', error);
            router.push('/unauthorized'); // Redirect to an unauthorized page
          } else {
            setUserRole(data?.role || 'staff');
          }
        } else {
          router.push('/login'); // Redirect to login if not authenticated
        }
      };

      fetchRole();
    }, [session]);

    if (!session || !userRole) {
      return <div>Loading...</div>; // Optionally display loading spinner
    }

    // Redirect based on user role
    if (requiredRole && userRole !== requiredRole) {
      router.push('/unauthorized');
    }

    return <Component {...props} />;
  };
}
