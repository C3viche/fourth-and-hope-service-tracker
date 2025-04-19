// pages/staff/logger.tsx
import { withAuth } from '@/lib/withAuth';

function LoggerPage() {
  return <div>Logger Page for Staff (add service logs)</div>;
}

export default withAuth(LoggerPage, 'staff');
