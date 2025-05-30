"use client"

import { useState } from "react"

const useDatePickerAppointment = (initialDate = null) => {
  const getInitialDate = () => {
    if (initialDate) return initialDate
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow
  }

  const [date, setDate] = useState(getInitialDate)
  const [show, setShow] = useState(false)

  const openPicker = () => {
    setShow(true)
  }

  const validateFutureDate = (selectedDate) => {
    const today = new Date()
    today.setHours(23, 59, 59, 999) 

    const selected = new Date(selectedDate)
    selected.setHours(0, 0, 0, 0)

    return selected > today 
  }

  const handleChange = (event, selectedDate) => {
    setShow(false)
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  const getMinimumDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  const setDateDirectly = (newDate) => {
    setDate(newDate)
  }

  return {
    date,
    show,
    openPicker,
    handleChange,
    validateFutureDate,
    getMinimumDate,
    setDateDirectly,
  }
}

export default useDatePickerAppointment
