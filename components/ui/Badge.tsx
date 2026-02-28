import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors duration-150 whitespace-nowrap';

    const variants = {
      default:
        'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm',
      primary:
        'bg-ocean-600 text-white shadow-primary',
      success:
        'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm',
      warning:
        'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm',
      danger:
        'bg-red-100 text-red-700 border border-red-200 shadow-sm',
      outline:
        'border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-ocean-500',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs rounded-md',
      md: 'px-2.5 py-0.5 text-sm rounded-md',
      lg: 'px-3 py-1 text-base rounded-lg',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
