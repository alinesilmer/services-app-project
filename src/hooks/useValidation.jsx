export const useValidation = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (!value) {
      errors[key] = 'Este campo es obligatorio';
    }
  });
  return errors;
};