import React, { createContext, useState, useContext } from 'react';

const VenueContext = createContext();

export const useVenue = () => useContext(VenueContext);

export const VenueProvider = ({ children }) => {
  const [zones, setZones] = useState([
    { id: 'north', label: 'Gate A (North)', crowd: 'high', posClass: 'z-north' },
    { id: 'south', label: 'Restrooms', crowd: 'medium', posClass: 'z-south' },
    { id: 'east', label: 'Concessions', crowd: 'low', posClass: 'z-east' },
    { id: 'west', label: 'Gate B (West)', crowd: 'medium', posClass: 'z-west' },
  ]);

  const [orders, setOrders] = useState([]);
  
  const [events, setEvents] = useState([
    {
      id: 1,
      type: 'important',
      time: 'Just Now',
      title: 'Exit Route Update',
      desc: 'Gate B is experiencing heavy flow. Consider using Gate A or C for a faster exit after the match.',
      iconName: 'AlertTriangle',
      actionText: 'View Map'
    },
    {
      id: 2,
      type: 'promo',
      time: '15 mins ago',
      title: 'Flash Sale: Merchandise',
      desc: 'Get 20% off all jerseys at the East Wing Store for the next 30 minutes!',
      iconName: 'Zap',
      actionText: 'Order Express'
    },
    {
      id: 3,
      type: 'normal',
      time: '1 hour ago',
      title: 'Match kickoff delayed',
      desc: 'Kickoff is delayed by 10 minutes due to weather conditions. Stay tuned.',
      iconName: 'Clock'
    },
    {
      id: 4,
      type: 'normal',
      time: '2 hours ago',
      title: 'Welcome to the Venue!',
      desc: 'Have your digital tickets ready. Tap here for your seat navigation.',
      iconName: 'Ticket'
    }
  ]);

  // Actions
  const updateZoneCrowd = (id, newCrowd) => {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, crowd: newCrowd } : z)));
  };

  const addOrder = (orderItems, total) => {
    const newOrder = {
      id: Date.now(),
      items: orderItems,
      total,
      status: 'pending', // pending, preparing, dispatched, delivered
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now(),
      time: 'Just Now',
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <VenueContext.Provider
      value={{
        zones,
        orders,
        events,
        updateZoneCrowd,
        addOrder,
        updateOrderStatus,
        addEvent,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};
