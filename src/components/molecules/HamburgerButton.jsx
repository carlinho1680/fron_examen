import React from 'react';
import Button from '../atoms/Button';

const HamburgerButton = ({ onClick, isOpen }) => {
  return (
    <Button onClick={onClick} className={`hamburger-button ${isOpen ? 'open' : ''}`}>
      <span className="hamburger-line" />
      <span className="hamburger-line" />
      <span className="hamburger-line" />
    </Button>
  );
}

export default HamburgerButton;