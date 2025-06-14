import React, { Suspense } from 'react';
const AnalyticsWidget = React.lazy(() => import('../pages/AnalyticsWidget'));

export default function Reports() {
  return (
    <div>
      <h2>Reports</h2>
      <Suspense fallback={<div>Loading Widget...</div>}>
        <AnalyticsWidget />
      </Suspense>
    </div>
  );
}
