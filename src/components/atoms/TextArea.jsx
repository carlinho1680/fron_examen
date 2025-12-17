import React from 'react';

const TextArea = ({
    placeholder = "",
    name = "",
    id,
    value = "",
    onChange = () => {},
    required = false,
    className = "",
    disabled = false,
    maxLength,
    rows = 8,
}) => {
    return (
        <textarea
            placeholder={placeholder}
            name={name}
            id={id || name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={className}
            maxLength={maxLength}
            rows={rows}
        />
    );
};

export default TextArea;