import React from 'react';
import Image from '../atoms/Image';
import Link from '../atoms/Link';

const Logo = ({ src, alt, to = "/" }) => { 
  return (
    <Link to={to} className="logo-link">
      <Image src={src} alt={alt} className="logo-image" />
    </Link>
  );
}

export default Logo;