import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-texto-sec uppercase tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            h-10 px-3 rounded-sm border text-sm text-carbon bg-white
            placeholder:text-outline
            border-borde
            focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15
            transition-all duration-160
            disabled:bg-fondo-suave disabled:opacity-60 disabled:cursor-not-allowed
            ${error ? 'border-error focus:border-error focus:ring-error/15' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-error mt-0.5">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
