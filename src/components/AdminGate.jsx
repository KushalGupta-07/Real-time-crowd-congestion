import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

const ADMIN_ACCESS_CODE = 'VenueFlow@2026';

const AdminGate = ({ open, onClose, onAuthorize }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setAccessCode('');
      setError('');
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleSubmit = () => {
    if (accessCode.trim() === ADMIN_ACCESS_CODE) {
      onAuthorize();
      return;
    }
    setError('Incorrect access code. Please try again or contact a venue operator.');
  };

  if (!open) return null;

  return (
    <div className="admin-gate-overlay" role="dialog" aria-modal="true" aria-labelledby="admin-gate-title">
      <div className="admin-gate-card">
        <div className="admin-gate-header">
          <div className="admin-gate-icon" aria-hidden="true">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 id="admin-gate-title">Admin access required</h2>
            <p>Enter the event operations code to continue into the management portal.</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close admin access dialog">
            <X size={18} />
          </button>
        </div>

        <label htmlFor="admin-access-code" className="sr-only">Admin access code</label>
        <input
          id="admin-access-code"
          ref={inputRef}
          className="admin-gate-input"
          type="password"
          value={accessCode}
          onChange={(event) => setAccessCode(event.target.value)}
          placeholder="Access code"
          aria-describedby="admin-access-help"
        />
        <p id="admin-access-help" className="text-sm text-gray-400">
          If you do not have the code, ask an event operations manager for access.
        </p>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <div className="admin-gate-actions">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Unlock Portal
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGate;
