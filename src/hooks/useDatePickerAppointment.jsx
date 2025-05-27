"use client"

import { useState } from "react"

const useDatePickerAppointment = (initialDate = null) => {
  // Si no hay fecha inicial, usar mañana como mínimo
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  const [date, setDate] = useState(initialDate || tomorrow)
  const [show, setShow] = useState(false)

  const openPicker = () => {
    setShow(true)
  }

  const validateFutureDate = (selectedDate) => {
    const today = new Date()
    today.setHours(23, 59, 59, 999) // Fin del día actual

    const selected = new Date(selectedDate)
    selected.setHours(0, 0, 0, 0)

    return selected > today // Solo fechas futuras (no incluye hoy)
  }

  const handleChange = (event, selectedDate) => {
    setShow(false)
    if (selectedDate) {
      if (validateFutureDate(selectedDate)) {
        setDate(selectedDate)
      } else {
        // Opcional: mostrar mensaje de error o mantener la fecha anterior
        console.log("Por favor selecciona una fecha futura")
      }
    }
  }

  const getMinimumDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  return {
    date,
    show,
    openPicker,
    handleChange,
    validateFutureDate,
    getMinimumDate,
  }
}

export default useDatePickerAppointment
