// pages/admin/dashboard.tsx
import { withAuth } from '@/lib/withAuth';

function AdminDashboard() {
  return <div>Analytics Dashboard for Admin</div>;
}

export default withAuth(AdminDashboard, 'admin');
