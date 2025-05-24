"use client"

import { useState, useEffect, useMemo } from "react"

export const useProfileFiltering = (profiles, initialService = null) => {
  const [selectedService, setSelectedService] = useState(initialService)
  const [selectedSubcategories, setSelectedSubcategories] = useState({})
  const [selectedFilter, setSelectedFilter] = useState("valorados")

  // Resetear subcategorías cuando cambia el servicio
  useEffect(() => {
    setSelectedSubcategories({})
  }, [selectedService?.label])

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }))
  }

  // Función para obtener las subcategorías seleccionadas
  const getSelectedSubcategoriesArray = () => {
    return Object.keys(selectedSubcategories).filter((key) => selectedSubcategories[key])
  }

  // Función para ordenar perfiles según el filtro seleccionado
  const sortProfiles = (profiles) => {
    switch (selectedFilter) {
      case "valorados":
        return profiles.sort((a, b) => b.calificaciones - a.calificaciones)
      case "alfabetico":
        return profiles.sort((a, b) => a.nombre.localeCompare(b.nombre))
      case "disponibilidad":
        return profiles.sort((a, b) => a.disponibilidad.localeCompare(b.disponibilidad))
      default:
        return profiles
    }
  }

  // Mapeo de servicios
  const serviceMapping = {
    Plomería: "Plomería",
    Refacción: "Refacción",
    Electricista: "Electricista",
    Carpintería: "Carpintería",
    Limpieza: "Limpieza",
    Pintura: "Pintura",
    Mudanza: "Mudanza",
    Técnico: "Técnico",
  }

  // Función para filtrar perfiles
  const filteredProfiles = useMemo(() => {
    const filtered = profiles.filter((prof) => {
      // Si no hay servicio seleccionado, mostrar todos
      if (!selectedService) return true

      // Filtrar por la profesión que coincida con el servicio seleccionado
      const matchesService = prof.profesion === serviceMapping[selectedService.label]

      if (!matchesService) return false

      // Si no hay subcategorías seleccionadas, mostrar todos los del servicio
      const selectedSubcategoriesArray = getSelectedSubcategoriesArray()
      if (selectedSubcategoriesArray.length === 0) return true

      // Si hay subcategorías seleccionadas, filtrar por ellas
      return selectedSubcategoriesArray.includes(prof.categoria)
    })

    // Aplicar ordenamiento según el filtro seleccionado
    return sortProfiles(filtered)
  }, [profiles, selectedService, selectedSubcategories, selectedFilter])

  return {
    selectedService,
    setSelectedService,
    selectedSubcategories,
    setSelectedSubcategories,
    selectedFilter,
    setSelectedFilter,
    toggleSubcategory,
    getSelectedSubcategoriesArray,
    filteredProfiles,
  }
}
