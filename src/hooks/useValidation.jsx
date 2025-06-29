// useValidation: validates fields ensuring non-boolean fields are not empty or null.
// Props: fields object
// Returns: errors object with messages for invalid fields
//------------------------------------------------------------------//


export const useValidation = fields => {

  const errors = {};

  Object.entries(fields).forEach(([k, v]) => {
    
    if(typeof v!=='boolean'&&(v===''||v==null)) errors[k]='Este campo es obligatorio';
  });

  if (fields.birthdate) {
    
    const birth = new Date(fields.birthdate), now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();

    
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;

    if (age < 18) errors.birthdate = 'Debes ser mayor de 18 años';
  }

  return errors;
};
