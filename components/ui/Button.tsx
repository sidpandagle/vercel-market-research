import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const variants = {
      primary:
        'bg-ocean-600 text-white hover:bg-ocean-700 focus:ring-ocean-500 shadow-primary hover:shadow-primary-lg transform hover:scale-[1.02]',
      secondary:
        'bg-slate-50 text-slate-700 hover:bg-slate-100 focus:ring-slate-300 border border-slate-200 hover:border-slate-300 shadow-soft',
      outline:
        'bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-ocean-600 hover:text-ocean-600 focus:ring-ocean-500 transition-colors',
      ghost:
        'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300',
      danger:
        'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-sm hover:shadow-md transform hover:scale-[1.02]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
      md: 'px-5 py-2.5 text-base rounded-xl gap-2',
      lg: 'px-7 py-3.5 text-lg rounded-xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
