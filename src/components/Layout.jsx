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
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <nav className="desktop-sidebar glass-panel" aria-label="Primary navigation">
        <div className="brand">
          <div className="logo-placeholder">VF</div>
          <h2 className="gradient-text mb-0">VenueFlow</h2>
        </div>
        
        <div className="nav-links">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`nav-btn ${currentTab === tab.id ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab.id)}
              aria-current={currentTab === tab.id ? 'page' : undefined}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="user-section">
          <button type="button" className="btn-icon" onClick={onAdminClick} title="Admin Portal" style={{ color: '#ef4444' }}>
            <ShieldAlert size={20} />
          </button>
          <button type="button" className="btn-icon" title="Notifications">
            <Bell size={20} />
          </button>
          <div className="avatar"><User size={20} /></div>
        </div>
      </nav>

      <main id="main-content" className="main-content" tabIndex={-1}>
        <header className="mobile-header glass-panel">
          <h2 className="gradient-text mb-0">VenueFlow</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn-icon" onClick={onAdminClick} style={{ color: '#ef4444' }}>
              <ShieldAlert size={20} />
            </button>
            <button type="button" className="btn-icon" title="Notifications">
              <Bell size={20} />
            </button>
          </div>
        </header>
        {children}
      </main>

      <nav className="mobile-bottom-nav glass-panel" aria-label="Secondary navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`bottom-nav-btn ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
            aria-current={currentTab === tab.id ? 'page' : undefined}
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
