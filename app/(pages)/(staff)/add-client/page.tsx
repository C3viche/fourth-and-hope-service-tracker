'use client';

import { withAuth } from '@/lib/withAuth';

function AddClientPage() {
  return <div>Add New Client Profile</div>;
}

export default withAuth(AddClientPage, 'staff');
