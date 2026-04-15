import React from 'react';
import { AlertTriangle, Clock, Ticket, Zap } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import './LiveFeed.css';

const LiveFeed = () => {
  const { events } = useVenue();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'AlertTriangle': return <AlertTriangle size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'Clock': return <Clock size={20} />;
      case 'Ticket': return <Ticket size={20} />;
      default: return <Clock size={20} />;
    }
  };

  return (
    <div className="feed-container animate-fade-in">
      <div>
        <h1>Live Event Feed</h1>
        <p>Real-time updates, security alerts, and exclusive promos.</p>
      </div>

      <div className="timeline">
        {events.map((event) => (
          <div key={event.id} className="timeline-event">
            <div className={`event-icon-wrapper ${event.type}`}>
              {getIcon(event.iconName)}
            </div>
            <div className="event-content">
              <div className="event-time">{event.time}</div>
              <div className="event-title">{event.title}</div>
              <div className="event-desc">{event.desc}</div>
              {event.actionText && (
                <button className="action-btn">{event.actionText}</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;
