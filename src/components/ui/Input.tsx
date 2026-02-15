import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = "", id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={inputId} className="block text-xs font-bold text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`w-full bg-gray-50 border border-gray-300 rounded p-2 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100 placeholder-gray-400
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
