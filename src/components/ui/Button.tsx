import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-gradient-dataria text-white font-semibold shadow-primary hover:!bg-[#1B5BC1] hover:!bg-none hover:shadow-[0_4px_12px_rgba(48,110,207,0.35)] active:translate-y-0',
  secondary: 'bg-tinte-interfaz text-azul-nucleo font-semibold border-[1.5px] border-azul-nucleo/20 hover:bg-azul-nucleo/10 hover:border-azul-accion',
  ghost:     'bg-transparent text-texto-sec font-semibold hover:bg-fondo-suave',
  danger:    'bg-error/10 text-error font-semibold border-[1.5px] border-error/20 hover:bg-error/20',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8      px-5 text-xs    rounded-[10px]',
  md: 'h-[46px] px-6 text-[13px] rounded-[10px]',
  lg: 'h-[46px] px-6 text-[13px] rounded-[10px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 tracking-[0.02em] uppercase
          transition-all duration-150 whitespace-nowrap
          hover:-translate-y-px
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
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
