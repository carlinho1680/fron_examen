import React from 'react';

const MailLink = ({ email, children, className }) => {
  return (
    <a href={`mailto:${email}`} className={className}>
      {children || email}
    </a>
  );
};

export default MailLink;