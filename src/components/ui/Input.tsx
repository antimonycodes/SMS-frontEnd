// src/components/ui/Input.tsx
import React from "react";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  disabled,
  ...rest
}) => {
  const inputId = name || React.useId();

  return (
    <div className={clsx("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            "w-full rounded border p-3 outline-none font-medium text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300",
            disabled && "bg-gray-100 cursor-not-allowed text-gray-400",
            className
          )}
          {...rest}
        />

        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <p
          className={clsx(
            "mt-1 text-sm",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
