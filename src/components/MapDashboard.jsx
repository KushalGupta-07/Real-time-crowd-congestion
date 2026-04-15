import React, { useState } from 'react';
import { Navigation, Users, Coffee, Droplets } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import './MapDashboard.css';

const MapDashboard = () => {
  const [activeRoute, setActiveRoute] = useState(null);
  const { zones } = useVenue();

  const handleZoneClick = (zone) => {
    setActiveRoute(zone);
  };

  return (
    <div className="map-container animate-fade-in">
      <div className="map-header">
        <div>
          <h1>Live Heatmap</h1>
          <p className="mb-0">Real-time crowd congestion & smart routing</p>
        </div>
      </div>

      {activeRoute && (
        <div className="routing-panel animate-fade-in">
          <div className="routing-icon">
            <Navigation size={24} />
          </div>
          <div className="routing-details">
            <h3>Navigating to {activeRoute.label}</h3>
            <p className="mb-0 text-sm text-white">Suggested route avoids {activeRoute.crowd === 'high' ? 'heavy traffic' : 'minor congestion'}. Est. time: 3 mins.</p>
          </div>
          <button className="btn btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setActiveRoute(null)}>
            Clear
          </button>
        </div>
      )}

      <div className="map-visual">
        <div className="stadium-mockup">
          <div className="field">FIELD</div>
          
          {zones.map((zone) => {
            const getIcon = () => {
              if (zone.id === 'south') return <Droplets size={16} />;
              if (zone.id === 'east') return <Coffee size={16} />;
              return <Users size={16} />;
            };
            return (
              <div
                key={zone.id}
                className={`zone ${zone.crowd} ${zone.posClass}`}
                onClick={() => handleZoneClick(zone)}
              >
                {getIcon()}
                <span>{zone.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item"><div className="dot low"></div> Low Crowd</div>
        <div className="legend-item"><div className="dot medium"></div> Moderate</div>
        <div className="legend-item"><div className="dot high"></div> Heavy Congestion</div>
      </div>
    </div>
  );
};

export default MapDashboard;
