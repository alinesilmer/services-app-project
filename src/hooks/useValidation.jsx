// useValidation: validates fields ensuring non-boolean fields are not empty or null.
// Props: fields object
// Returns: errors object with messages for invalid fields
//------------------------------------------------------------------//

export const useValidation = (fields = {}) => {
  const errors = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (typeof value !== 'boolean' && (value === '' || value == null)) {
      errors[key] = 'Este campo es obligatorio';
    }
  });

  return errors;
};
