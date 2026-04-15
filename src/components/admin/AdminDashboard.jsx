import React, { useState } from 'react';
import { Settings, ShieldAlert, Activity, ClipboardList } from 'lucide-react';
import TrafficManager from './TrafficManager';
import OrderManager from './OrderManager';
import SurveillanceRoom from './SurveillanceRoom';
import './Admin.css';

const AdminDashboard = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('surveillance');

  const renderContent = () => {
    switch (activeTab) {
      case 'traffic':
        return <TrafficManager />;
      case 'orders':
        return <OrderManager />;
      case 'surveillance':
        return <SurveillanceRoom />;
      default:
        return <SurveillanceRoom />;
    }
  };

  const tabs = [
    { id: 'surveillance', label: 'Surveillance', icon: <ShieldAlert size={20} /> },
    { id: 'traffic', label: 'Traffic Control', icon: <Activity size={20} /> },
    { id: 'orders', label: 'Order Services', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="admin-container">
      <nav className="admin-sidebar glass-panel-dark">
        <div className="admin-brand mb-6">
          <div className="logo-placeholder" style={{ background: 'var(--accent)' }}>VF</div>
          <h2 className="text-white mb-0">Admin Portal</h2>
        </div>
        
        <div className="admin-nav-links">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <button className="exit-admin-btn mt-auto" onClick={onExit}>
          Exit Admin
        </button>
      </nav>

      <main className="admin-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
