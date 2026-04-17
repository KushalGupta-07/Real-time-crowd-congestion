import React, { useMemo, useState } from 'react';
import { Coffee, Pizza, Beer, Utensils, CheckCircle, Clock, Truck } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import './OrderExpress.css';

const OrderExpress = () => {
  const [cart, setCart] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const { orders, addOrder } = useVenue();

  const menu = useMemo(
    () => [
      { id: 1, name: 'Stadium Hot Dog', price: 6.5, icon: <Utensils size={24} /> },
      { id: 2, name: 'Classic Pizza Slice', price: 5.0, icon: <Pizza size={24} /> },
      { id: 3, name: 'Craft Beer (IPA)', price: 9.0, icon: <Beer size={24} /> },
      { id: 4, name: 'Premium Coffee', price: 4.5, icon: <Coffee size={24} /> },
    ],
    [],
  );

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setStatusMessage(`Added ${item.name} to your cart.`);
  };

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const placeOrder = () => {
    if (cart.length === 0) {
      setStatusMessage('Add at least one item before checking out.');
      return;
    }

    const didAdd = addOrder(cart, total);
    if (didAdd) {
      setCart([]);
      setStatusMessage('Order submitted successfully. Check Live Feed for updates.');
    } else {
      setStatusMessage('Order could not be submitted. Please try again.');
    }
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  if (latestOrder && latestOrder.status !== 'delivered') {
    const getStatusContent = () => {
      if (latestOrder.status === 'pending') return { icon: <Clock size={32} />, text: 'Order received. Waiting for acceptance.' };
      if (latestOrder.status === 'preparing') return { icon: <Utensils size={32} />, text: 'Your order is being prepared.' };
      if (latestOrder.status === 'dispatched') return { icon: <Truck size={32} />, text: 'Order is on the way to your seat.' };
      return { icon: <CheckCircle size={32} />, text: 'Processing your request.' };
    };
    const statusContent = getStatusContent();

    return (
      <div className="order-container animate-fade-in" style={{ justifyContent: 'center' }}>
        <div className="tracker-panel">
          <div className="tracker-icon" style={{ animation: 'bounce 2s infinite' }}>
            {statusContent.icon}
          </div>
          <h2 className="gradient-text">
            Order Status: <span style={{ textTransform: 'capitalize' }}>{latestOrder.status}</span>
          </h2>
          <p className="text-white mb-2">{statusContent.text}</p>
          <p className="text-sm text-gray-400">Total: ${latestOrder.total.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container animate-fade-in">
      <div>
        <h1>Express Ordering</h1>
        <p>Order from your seat. VIP delivery service.</p>
      </div>

      {statusMessage && (
        <div className="status-message" role="status" aria-live="polite">
          {statusMessage}
        </div>
      )}

      <div className="menu-grid">
        {menu.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="item-icon">{item.icon}</div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <div className="item-price">${item.price.toFixed(2)}</div>
            </div>
            <button type="button" className="add-btn" onClick={() => addToCart(item)}>
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-panel animate-fade-in">
          <div className="cart-info">
            <h3>{cart.reduce((count, item) => count + item.quantity, 0)} Item(s)</h3>
            <p className="text-primary font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-summary">
                <span>{item.quantity}× {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={placeOrder}>
            Checkout Now
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderExpress;
