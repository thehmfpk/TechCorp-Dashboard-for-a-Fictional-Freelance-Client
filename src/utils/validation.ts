export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Email must be a valid @gmail.com address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Contact number is required';
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
};