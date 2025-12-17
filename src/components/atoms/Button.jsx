import React from 'react';

function Button({ children, text, className, onClick, type = "button" }) {
  return (
    <button
        type={type}
        onClick={onClick}
        className={className}
    >
      {text || children}
    </button>
  );
}

export default Button;