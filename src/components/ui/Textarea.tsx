import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = "", id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label htmlFor={inputId} className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    className={`flex min-h-[80px] w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-base md:text-sm shadow-sm transition-all placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-destructive focus-visible:ring-destructive" : "hover:border-primary/50"} ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-destructive font-medium ml-1 animate-pulse">{error}</p>}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";
