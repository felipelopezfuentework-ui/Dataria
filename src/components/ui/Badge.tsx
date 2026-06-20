type BadgeVariant = 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'celeste'

const variantClasses: Record<BadgeVariant, string> = {
  blue:    'bg-tinte-interfaz text-azul-nucleo border border-azul-nucleo/20',
  celeste: 'bg-celeste-dataria/15 text-secondary border border-celeste-dataria/30',
  green:   'bg-green-50 text-green-700 border border-green-200',
  yellow:  'bg-yellow-50 text-yellow-700 border border-yellow-200',
  red:     'bg-error-container text-error border border-error/20',
  gray:    'bg-fondo-suave text-texto-sec border border-borde',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
