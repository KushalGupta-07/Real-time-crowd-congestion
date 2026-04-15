import React, { useState } from 'react';
import { useVenue } from '../../context/VenueContext';
import { Video, AlertTriangle } from 'lucide-react';

const SurveillanceRoom = () => {
  const { addEvent } = useVenue();
  const [alertText, setAlertText] = useState('');

  const cameras = [
    { id: 1, name: 'Gate A (North)', status: 'Live' },
    { id: 2, name: 'Gate B (West)', status: 'Live' },
    { id: 3, name: 'Main Concourse', status: 'Live' },
    { id: 4, name: 'VIP Lounge', status: 'Live' },
  ];

  const handleBroadcast = () => {
    if (!alertText.trim()) return;
    addEvent({
      type: 'important',
      title: 'Security Alert',
      desc: alertText,
      iconName: 'AlertTriangle'
    });
    setAlertText('');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Surveillance & Communications</h1>
        <p className="text-gray-400">Monitor gates and broadcast emergency alerts to user devices.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '1.5rem' }}>
        
        {/* Camera Feeds */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {cameras.map(cam => (
            <div key={cam.id} className="admin-panel" style={{ padding: 0, overflow: 'hidden', margin: 0, height: '200px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#000', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Video size={32} color="#334155" />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}></div>
                  REC
                </div>
              </div>
              <div style={{ padding: '0.75rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="font-bold">{cam.name}</span>
                <span className="text-success">{cam.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Broadcast Panel */}
        <div className="admin-panel" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', margin: 0 }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={20} color="#ef4444" /> Event Broadcast</h2>
          <p className="text-sm text-gray-400 mb-4">Send a high-priority push notification to all users' Live Feeds.</p>
          
          <textarea 
            className="mb-4"
            style={{ 
              width: '100%', height: '120px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px', padding: '1rem', color: 'white', resize: 'none'
            }}
            placeholder="E.g., Please evacuate via Gate B due to an incident..."
            value={alertText}
            onChange={(e) => setAlertText(e.target.value)}
          />
          <button 
            className="btn btn-primary w-full" 
            style={{ background: '#ef4444' }}
            onClick={handleBroadcast}
            disabled={!alertText.trim()}
          >
            Broadcast to Users
          </button>
        </div>

      </div>
    </div>
  );
};

export default SurveillanceRoom;
