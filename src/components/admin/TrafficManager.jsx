import React from 'react';
import { useVenue } from '../../context/VenueContext';
import { AlertCircle, ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';

const TrafficManager = () => {
  const { zones, updateZoneCrowd } = useVenue();

  const handleUpdate = (zoneId, currentCrowd) => {
    let nextCrowd = 'low';
    if (currentCrowd === 'low') nextCrowd = 'medium';
    else if (currentCrowd === 'medium') nextCrowd = 'high';
    else nextCrowd = 'low';
    
    updateZoneCrowd(zoneId, nextCrowd);
  };

  const getStatusColor = (crowd) => {
    if (crowd === 'low') return '#10b981'; // Green
    if (crowd === 'medium') return '#f59e0b'; // Yellow
    if (crowd === 'high') return '#ef4444'; // Red
    return '#64748b';
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Traffic Control</h1>
        <p className="text-gray-400">Manage real-time crowd congestion across venue zones.</p>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {zones.map(zone => (
          <div key={zone.id} className="admin-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="mb-0" style={{ fontSize: '1.1rem', margin: 0 }}>{zone.label}</h3>
              <span 
                style={{ 
                  background: `${getStatusColor(zone.crowd)}20`, 
                  color: getStatusColor(zone.crowd),
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {zone.crowd}
              </span>
            </div>
            
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>
              Adjust the current pedestrian density. Users will be re-routed automatically if congestion is HIGH.
            </p>

            <button 
              className="btn" 
              style={{ background: 'rgba(255,255,255,0.05)', marginTop: 'auto' }}
              onClick={() => handleUpdate(zone.id, zone.crowd)}
            >
              Toggle Congestion
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficManager;
