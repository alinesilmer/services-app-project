import mockProfiles from "../data/mockProfiles"

export const generateTimeSlots = (professionalId) => {
  // Buscar el profesional por ID
  const professional = mockProfiles.find((profile) => profile.id === Number.parseInt(professionalId))

  if (!professional) {
    return [
      { id: "A", time: "12:00", label: "A" },
      { id: "B", time: "15:00", label: "B" },
      { id: "C", time: "16:00", label: "C" },
      { id: "D", time: "19:00", label: "D" },
    ]
  }

  // Extraer el rango de horas de la disponibilidad
  const availability = professional.disponibilidad

  // Buscar el patrón de horas (ej: "10:00 - 19:00")
  const timeRangeMatch = availability.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)

  if (!timeRangeMatch) {
    return [
      { id: "A", time: "12:00", label: "A" },
      { id: "B", time: "15:00", label: "B" },
      { id: "C", time: "16:00", label: "C" },
      { id: "D", time: "19:00", label: "D" },
    ]
  }

  const startHour = Number.parseInt(timeRangeMatch[1])
  const startMinute = Number.parseInt(timeRangeMatch[2])
  const endHour = Number.parseInt(timeRangeMatch[3])
  const endMinute = Number.parseInt(timeRangeMatch[4])



  // Generar slots de 2 horas
  const timeSlots = []
  let currentHour = startHour
  let slotIndex = 0
  const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]

  while (currentHour < endHour) {
    // Verificar que no exceda el horario de cierre
    if (currentHour + 2 <= endHour) {
      timeSlots.push({
        id: labels[slotIndex] || `SLOT_${slotIndex}`,
        time: `${currentHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`,
        label: labels[slotIndex] || `${slotIndex + 1}`,
      })
      slotIndex++
    }
    currentHour += 2
  }

  // Si no hay slots generados, usar horarios por defecto
  if (timeSlots.length === 0) {
    return [
      { id: "A", time: "12:00", label: "A" },
      { id: "B", time: "15:00", label: "B" },
      { id: "C", time: "16:00", label: "C" },
      { id: "D", time: "19:00", label: "D" },
    ]
  }

  return timeSlots
}

export const getProfessionalInfo = (professionalId) => {
  return mockProfiles.find((profile) => profile.id === Number.parseInt(professionalId))
}
