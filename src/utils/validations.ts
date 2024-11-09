export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('A senha deve ter no mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial (!@#$%^&*)');
  }
  
  return errors;
};

export const validateCEP = (cep: string): boolean => {
  return /^\d{5}-\d{3}$/.test(cep);
};

export const validatePhone = (phone: string): boolean => {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
};