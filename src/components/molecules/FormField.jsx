import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';

const FormField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    maxLength,
    required = false,
}) => {

    const isTextArea = type === 'textarea';

    return (
        <div className="form-field">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            
            {isTextArea ? (
                <TextArea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    required={required}
                    className="form-textarea"
                />
            ) : (
                <Input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    required={required}
                    className="form-input"
                />
            )}
        </div>
    );
};

export default FormField;