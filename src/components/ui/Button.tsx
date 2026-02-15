import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "rounded transition font-bold disabled:opacity-50 flex items-center justify-center focus:outline-none";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        secondary: "text-gray-500 hover:text-gray-700 bg-transparent border-0 shadow-none",
        danger: "text-red-500 border border-red-500 hover:bg-red-50 bg-transparent shadow-none",
        ghost: "text-gray-500 hover:text-gray-700 bg-transparent border-0 shadow-none"
    };

    const sizes = {
        sm: "px-3 py-1 text-xs",
        md: "px-6 py-2 text-sm",
        lg: "px-8 py-3 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
