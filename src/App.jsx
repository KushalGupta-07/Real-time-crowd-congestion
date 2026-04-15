import React, { useState } from 'react';
import Layout from './components/Layout';
import MapDashboard from './components/MapDashboard';
import OrderExpress from './components/OrderExpress';
import LiveFeed from './components/LiveFeed';
import { VenueProvider } from './context/VenueContext';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [currentTab, setCurrentTab] = useState('map');
  const [isAdmin, setIsAdmin] = useState(false);

  if (isAdmin) {
    return (
      <VenueProvider>
        <AdminDashboard onExit={() => setIsAdmin(false)} />
      </VenueProvider>
    );
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'map':
        return <MapDashboard />;
      case 'order':
        return <OrderExpress />;
      case 'live':
        return <LiveFeed />;
      default:
        return <MapDashboard />;
    }
  };

  return (
    <VenueProvider>
      <Layout currentTab={currentTab} setCurrentTab={setCurrentTab} onAdminClick={() => setIsAdmin(true)}>
        {renderContent()}
      </Layout>
    </VenueProvider>
  );
}

export default App;
