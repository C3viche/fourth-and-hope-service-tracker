// 'use server';

// import { redirect } from 'next/navigation';
// import { createClient } from '@/utils/supabase/server';

// export async function admin() {
//     const supabase = await createClient();
    
//     const { data, error } = await supabase.auth.getUser();
//     console.log("GOT HERE!");
//     if (error || !data?.user) {
//         // console.log("NO SESSION!!");
//         return redirect('/login');  
//     }
//     // console.log(data.user.email);
//     { // for scoping issue with error var name
//     const { data: roleData, error } = await supabase
//         .from('Roles')
//         .select('role')
//         .eq('user_id', data.user.id)
//         .single();

//     if (error || roleData?.role !== 'admin') {
//         return redirect('/unauthorized');
//     }
//     }
// }
