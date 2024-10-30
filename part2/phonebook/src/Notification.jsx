// Notification.js
import React from 'react';
import './index.css';

const Notification = ({ message, type }) => {
  if (message === null) return null;

  const notificationStyle = type === 'success' ? 'success' : 'error';

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
