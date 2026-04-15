import React from 'react';
import { Map, ShoppingBag, Radio, User, Bell, ShieldAlert } from 'lucide-react';
import './Layout.css';

const Layout = ({ children, currentTab, setCurrentTab, onAdminClick }) => {
  const tabs = [
    { id: 'map', icon: <Map size={24} />, label: 'Map' },
    { id: 'order', icon: <ShoppingBag size={24} />, label: 'Order' },
    { id: 'live', icon: <Radio size={24} />, label: 'Live' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar for Desktop / Header for Mobile */}
      <nav className="desktop-sidebar glass-panel">
        <div className="brand">
          <div className="logo-placeholder">VF</div>
          <h2 className="gradient-text mb-0">VenueFlow</h2>
        </div>
        
        <div className="nav-links">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-btn ${currentTab === tab.id ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="user-section">
          <button className="btn-icon" onClick={onAdminClick} title="Admin Portal" style={{ color: '#ef4444' }}><ShieldAlert size={20} /></button>
          <button className="btn-icon"><Bell size={20} /></button>
          <div className="avatar"><User size={20} /></div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="mobile-header glass-panel">
          <h2 className="gradient-text mb-0">VenueFlow</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-icon" onClick={onAdminClick} style={{ color: '#ef4444' }}><ShieldAlert size={20} /></button>
            <button className="btn-icon"><Bell size={20} /></button>
          </div>
        </header>
        {children}
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="mobile-bottom-nav glass-panel">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-nav-btn ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.icon}
            <span className="text-xs mt-2 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
