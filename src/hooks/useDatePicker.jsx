
import { useState } from 'react';

const useDatePicker = (initialValue = null) => {
  const [date, setDate]  = useState(initialValue);
  const [show, setShow]  = useState(false);

  const openPicker  = () => setShow(true);
  const closePicker = () => setShow(false);

  const handleChange = (_, selected) => {
    closePicker();
    if (selected) setDate(selected);
  };

  return { date, show, openPicker, handleChange };
};

export default useDatePicker;
