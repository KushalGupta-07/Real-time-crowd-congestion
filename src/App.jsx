import React, { useState, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import MapDashboard from './components/MapDashboard';
import OrderExpress from './components/OrderExpress';
import LiveFeed from './components/LiveFeed';
import { VenueProvider } from './context/VenueContext';
import AdminGate from './components/AdminGate';

const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

function App() {
  const [currentTab, setCurrentTab] = useState('map');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminGate, setShowAdminGate] = useState(false);

  const handleAdminAuthorize = () => {
    setShowAdminGate(false);
    setIsAdmin(true);
  };

  if (isAdmin) {
    return (
      <VenueProvider>
        <Suspense fallback={<div className="centered-feedback">Loading admin portal…</div>}>
          <AdminDashboard onExit={() => setIsAdmin(false)} />
        </Suspense>
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
      <AdminGate
        open={showAdminGate}
        onClose={() => setShowAdminGate(false)}
        onAuthorize={handleAdminAuthorize}
      />
      <Layout currentTab={currentTab} setCurrentTab={setCurrentTab} onAdminClick={() => setShowAdminGate(true)}>
        {renderContent()}
      </Layout>
    </VenueProvider>
  );
}

export default App;
