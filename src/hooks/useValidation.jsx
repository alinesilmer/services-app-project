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

  if (fields.birthdate) {
    const today = new Date();
    const birth = new Date(fields.birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    const isUnderage = (
      age < 18 ||
      (age === 18 && monthDiff < 0) ||
      (age === 18 && monthDiff === 0 && dayDiff < 0)
    );

    if (isUnderage) {
      errors.birthdate = 'Debes ser mayor de 18 años para registrarte';
    }
  }

  return errors;
};
