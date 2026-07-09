import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = '', id, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-texto-sec uppercase tracking-wide">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            h-10 px-3 pr-8 rounded-sm border text-sm text-carbon bg-white
            border-borde appearance-none
            focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15
            transition-all duration-200
            disabled:bg-fondo-suave disabled:opacity-60
            ${error ? 'border-error' : ''}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-error mt-0.5">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
