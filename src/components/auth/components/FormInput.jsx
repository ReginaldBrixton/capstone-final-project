import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    const [showTooltip, setShowTooltip] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={name}
                    className={`
                        block text-sm font-medium tracking-wide
                        transition-all duration-200 ease-in-out
                        ${isFocused ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}
                    `}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div 
                className="relative"
                onMouseEnter={() => error && isFocused && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <input
                    id={name}
                    name={name}
                    type={isPassword && showPassword ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    onFocus={() => {
                        setIsFocused(true);
                        error && setShowTooltip(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        setShowTooltip(false);
                    }}
                    className={`
                        block w-full rounded-lg border px-4 py-3 text-sm
                        transition-all duration-200 ease-in-out
                        ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-75' : 'bg-white dark:bg-gray-800'}
                        ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-gray-600 dark:hover:border-gray-500'
                        }
                        ${isFocused ? 'ring-4 ring-opacity-50' : ''}
                        dark:text-white dark:placeholder-gray-400
                        ${className}
                    `}
                    placeholder={props.placeholder || `Enter your ${label?.toLowerCase()}`}
                    {...props}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${name}-error` : undefined}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`
                            absolute right-2 top-1/2 -translate-y-1/2 p-2
                            text-gray-500 hover:text-gray-700 
                            dark:text-gray-400 dark:hover:text-gray-300
                            transition-colors duration-200
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                            hover:bg-gray-100 dark:hover:bg-gray-700
                        `}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}

                <AnimatePresence>
                    {error && showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-full z-50"
                        >
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg px-3 py-2 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}