import { useState, useEffect } from 'react'

interface ValidationRules {
  minLength: boolean
  hasNumber: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasSpecialChar: boolean
}

export const usePasswordValidation = (password: string) => {
  const [validations, setValidations] = useState<ValidationRules>({
    minLength: false,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  })

  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const rules: ValidationRules = {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    setValidations(rules)
    setIsValid(Object.values(rules).every(Boolean))
  }, [password])

  return { validations, isValid }
}