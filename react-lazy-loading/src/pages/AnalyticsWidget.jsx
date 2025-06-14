import React, { useEffect, useState } from 'react';

export default function AnalyticsWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setData({
        visitors: 1340,
        bounceRate: 39,
        avgSession: '6m 23s',
      });
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    return (
      <div className="widget-container">
        <div className="skeleton" style={{ width: "70%", height: 28 }} />
        <div className="skeleton" style={{ width: "40%", height: 22 }} />
        <div className="skeleton" style={{ width: "50%", height: 22 }} />
        <div className="skeleton" style={{ width: "60%", height: 22 }} />
      </div>
    );
  }

  return (
    <div className="widget-container analytics-widget">
      <h3>Site Analytics</h3>
      <div className="stats-row">
        <div className="stat">
          <span className="stat-label">Visitors</span>
          <span className="stat-value">{data.visitors}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Bounce Rate</span>
          <span className="stat-value">{data.bounceRate}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Avg. Session</span>
          <span className="stat-value">{data.avgSession}</span>
        </div>
      </div>
    </div>
  );
}