import React from "react";

const Input = ({
    type = "text",
    placeholder = "",
    name = "",
    id,
    value = "",
    onChange = () => {},
    required = false,
    autoComplete = "",
    className = "",
    disabled = false,
    maxLength,
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id || name}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            disabled={disabled}
            className={className}
            maxLength={maxLength}
        />
    );
};

export default Input;