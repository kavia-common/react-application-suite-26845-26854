import React from 'react';

/**
 * Dashboard page shell.
 * Future: integrate charts (e.g., Recharts) and stats.
 */
// PUBLIC_INTERFACE
const Dashboard = () => {
  return (
    <section className="page-wrapper">
      <h3 className="page-title">Dashboard</h3>
      <p className="page-subtitle">Overview of analytics and activity.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-purple-200 bg-white/70 p-4 h-24 flex items-center justify-center text-secondary text-sm">
          KPI Card
        </div>
        <div className="rounded-xl border border-purple-200 bg-white/70 p-4 h-24 flex items-center justify-center text-secondary text-sm">
          KPI Card
        </div>
        <div className="rounded-xl border border-purple-200 bg-white/70 p-4 h-24 flex items-center justify-center text-secondary text-sm">
          KPI Card
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-purple-200 bg-white/70 p-6 h-72 flex items-center justify-center text-secondary">
        Chart placeholder
      </div>
    </section>
  );
};

export default Dashboard;
