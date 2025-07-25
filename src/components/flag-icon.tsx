interface FlagIconProps {
  countryCode: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function FlagIcon({ countryCode, className = '', size = 'md' }: FlagIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-6',
    xl: 'w-12 h-8'
  }

  return (
    <span 
      className={`fi fi-${countryCode.toLowerCase()} ${sizeClasses[size]} ${className}`}
      title={countryCode}
    />
  )
} 