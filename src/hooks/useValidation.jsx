
export const useValidation = (fields = {}) => {
  const errors = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (typeof value !== 'boolean' && (value === '' || value == null)) {
      errors[key] = 'Este campo es obligatorio';
    }
  });

  return errors;
};
