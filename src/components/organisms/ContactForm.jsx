import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        alert('¡Formulario enviado! (Revisa la consola)');
        setFormData({ nombre: '', correo: '', mensaje: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            
            <FormField
                label="Nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                maxLength={40}
                required
            />
            
            <FormField
                label="Correo Electrónico"
                name="correo"
                type="email"
                placeholder="tu@correo.com"
                value={formData.correo}
                onChange={handleChange}
                maxLength={100}
                required
            />
            
            <FormField
                label="Mensaje"
                name="mensaje"
                type="textarea"
                placeholder="Escribe tu consulta aquí..."
                value={formData.mensaje}
                onChange={handleChange}
                maxLength={1000}
                required
            />
            
            <Button type="submit" className="submit-button">
                Enviar Mensaje
            </Button>
            
        </form>
    );
};

export default ContactForm;