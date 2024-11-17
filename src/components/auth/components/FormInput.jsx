import { useState } from 'react'
import { Input } from "../../form/input"
import { Label } from "../../form/label"

export function FormInput({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    disabled,
    required,
    className = '',
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={name}
                    className={`
            block text-sm font-medium
            transition-opacity duration-200 ease-in-out
            ${isFocused ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}
          `}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="space-y-1 relative">
                <input
                    id={name}
                    name={name}
                    type={isPassword && showPassword ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            block w-full rounded-lg border px-4 py-2 text-sm
            transition-all duration-200 ease-in-out
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}
            ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        }
            ${isFocused ? 'ring-2 ring-opacity-50 shadow-sm' : ''}
            dark:border-gray-600 dark:bg-gray-700 dark:text-white 
            dark:placeholder-gray-400
            ${className}
          `}
                    placeholder={props.placeholder || `Enter your ${label?.toLowerCase()}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`
              absolute right-2 top-1/2 -translate-y-1/2 p-1 pb-4
              text-gray-500 hover:text-gray-700 
              dark:text-gray-400 dark:hover:text-gray-300
              transition-all duration-200 ease-in-out
              rounded-lg text-sm
              focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600
              ${isFocused ? 'bg-gray-50 dark:bg-gray-700' : ''}
            `}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 transition-all duration-200 ease-in">
                    {error}
                </p>
            )}
        </div>
    );
}