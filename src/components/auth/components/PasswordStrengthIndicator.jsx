export function PasswordStrengthIndicator({ strength }) {
  const getStrengthColor = (strength) => {
    if (strength < 40) return 'bg-red-500'
    if (strength < 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (strength) => {
    if (strength < 40) return 'Weak'
    if (strength < 80) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="password-strength-indicator space-y-1">
      <div className="strength-bar h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`strength-fill h-full transition-all duration-300 ${getStrengthColor(strength)}`}
          style={{ width: `${strength}%` }}
        />
      </div>
      {/* <div className="strength-text text-sm">
        {getStrengthText(strength)}
      </div> */}
    </div>
  )
} 