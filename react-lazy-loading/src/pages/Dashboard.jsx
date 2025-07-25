import React, { Suspense } from 'react';
const AnalyticsWidget = React.lazy(() => import('../pages/AnalyticsWidget'));

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Suspense fallback={<div>Loading Widget...</div>}>
        <AnalyticsWidget />
      </Suspense>
    </div>
  );
}
