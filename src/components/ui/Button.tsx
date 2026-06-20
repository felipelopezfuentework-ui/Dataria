import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-gradient-dataria text-white shadow-primary hover:opacity-90 active:scale-[.98]',
  secondary: 'bg-tinte-interfaz text-azul-nucleo border border-azul-nucleo/20 hover:bg-azul-nucleo/10',
  ghost:     'bg-transparent text-texto-sec hover:bg-fondo-suave',
  danger:    'bg-error/10 text-error border border-error/20 hover:bg-error/20',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8  px-3 text-xs  rounded-xs',
  md: 'h-10 px-4 text-sm  rounded-sm',
  lg: 'h-12 px-6 text-sm  rounded-sm',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 font-semibold
          transition-all duration-160 whitespace-nowrap
          disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul-nucleo/50
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
