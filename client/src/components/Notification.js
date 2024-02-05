import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ type, message }) => {
  let bgColor = 'bg-green-500';
  if (type === 'warning') {
    bgColor = 'bg-yellow-500';
  } else if (type === 'error') {
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 mb-4 text-sm text-white ${bgColor} rounded-lg`} role="alert">
      <span className="font-medium">{message}</span>
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error']),
  message: PropTypes.string.isRequired
};

Notification.defaultProps = {
  type: 'success'
};

export default Notification;