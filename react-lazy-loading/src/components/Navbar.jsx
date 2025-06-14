import React from 'react';

function Navbar() {
  const preloadReports = () => import('../pages/Reports');
  const preloadDashboard = () => import('../pages/Dashboard');
  return (
    <nav>
      <a href="/" >Home</a>
      <a href="/reports" onMouseEnter={preloadReports}>Reports</a>
      <a href="/reports" onMouseEnter={preloadDashboard}>Dashboard</a>
    </nav>
  );
}
export default Navbar;
