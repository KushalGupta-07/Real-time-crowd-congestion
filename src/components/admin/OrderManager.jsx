import React from 'react';
import { useVenue } from '../../context/VenueContext';
import { Check, Clock, Truck, CheckCircle } from 'lucide-react';

const OrderManager = () => {
  const { orders, updateOrderStatus } = useVenue();

  const handleStatusChange = (id, currentStatus) => {
    let nextStatus = 'preparing';
    if (currentStatus === 'pending') nextStatus = 'preparing';
    else if (currentStatus === 'preparing') nextStatus = 'dispatched';
    else if (currentStatus === 'dispatched') nextStatus = 'delivered';
    else return;
    
    updateOrderStatus(id, nextStatus);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: '#f59e0b', bg: '#f59e0b20', icon: <Clock size={14} />, label: 'Pending' },
      preparing: { color: '#3b82f6', bg: '#3b82f620', icon: <Check size={14} />, label: 'Preparing' },
      dispatched: { color: '#8b5cf6', bg: '#8b5cf620', icon: <Truck size={14} />, label: 'Dispatched' },
      delivered: { color: '#10b981', bg: '#10b98120', icon: <CheckCircle size={14} />, label: 'Delivered' }
    };
    const c = config[status] || config.pending;
    
    return (
      <span style={{ 
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        color: c.color, background: c.bg, padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
      }}>
        {c.icon} {c.label}
      </span>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Order Express Terminal</h1>
        <p className="text-gray-400">Manage incoming food & merchandise orders from seats.</p>
      </div>

      {orders.length === 0 ? (
        <div className="admin-panel text-center py-12" style={{ color: '#64748b' }}>
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p>No active orders.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} className="admin-panel" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: '1rem 1.5rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span className="font-bold">Order #{order.id.toString().slice(-4)}</span>
                  <span className="text-sm text-gray-500">{order.time}</span>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-sm text-gray-300">
                  {order.items.map(item => item.name).join(', ')} <span className="text-primary font-bold ml-2">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              {order.status !== 'delivered' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(order.id, order.status)}
                >
                  {order.status === 'pending' ? 'Accept & Prepare' : order.status === 'preparing' ? 'Dispatch' : 'Mark Delivered'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManager;
