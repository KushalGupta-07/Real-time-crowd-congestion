import React, { useMemo } from 'react';
import { AlertTriangle, Clock, Ticket, Zap } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import './LiveFeed.css';

const iconMap = {
  AlertTriangle: <AlertTriangle size={20} />,
  Zap: <Zap size={20} />,
  Clock: <Clock size={20} />,
  Ticket: <Ticket size={20} />,
};

const LiveFeed = () => {
  const { events } = useVenue();

  const feedItems = useMemo(
    () => events.map((event) => (
      <li key={event.id} className="timeline-event">
        <div className={`event-icon-wrapper ${event.type}`}>
          {iconMap[event.iconName] || iconMap.Clock}
        </div>
        <div className="event-content">
          <div className="event-time">{event.time}</div>
          <div className="event-title">{event.title}</div>
          <div className="event-desc">{event.desc}</div>
          {event.actionText && (
            <button type="button" className="action-btn" aria-label={`Activate ${event.actionText}`}>
              {event.actionText}
            </button>
          )}
        </div>
      </li>
    )),
    [events],
  );

  return (
    <div className="feed-container animate-fade-in">
      <div>
        <h1>Live Event Feed</h1>
        <p>Real-time updates, security alerts, and exclusive promos.</p>
      </div>

      <ul className="timeline" role="list">
        {feedItems}
      </ul>
    </div>
  );
};

export default LiveFeed;
