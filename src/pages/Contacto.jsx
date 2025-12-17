import React from 'react';
import ContactForm from '../components/organisms/ContactForm';
import Text from '../components/atoms/Text'; 
import MailLink from '../components/atoms/MailLink';
import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contact-page-container">
      
      <Text variant="h2" className="contact-title">
        Ponte en Contacto
      </Text>
      
      <Text variant="p" className="contact-description">
        Completa el formulario y nos pondremos en contacto contigo a la brevedad.
      </Text>

      <ContactForm />

      <hr className="contact-divider" />

      <Text variant="p" className="contact-email-info">
        También puedes escribirnos directamente a:
      </Text>
      
      <MailLink 
        email="contacto@miempresa.com" 
        className="contact-email-link" 
      />

    </div>
  );
};

export default Contacto;