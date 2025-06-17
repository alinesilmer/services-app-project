"use client"

import { useState, useEffect, useMemo } from "react"

export const useProfileFiltering = (profiles, initialService = null) => {
  const [selectedService, setSelectedService] = useState(initialService)
  const [selectedSubcategories, setSelectedSubcategories] = useState({})
  const [selectedFilter, setSelectedFilter] = useState("valorados")

  useEffect(() => {
    setSelectedSubcategories({})
  }, [selectedService?.label])

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }))
  }

  const getSelectedSubcategoriesArray = () => {
    return Object.keys(selectedSubcategories).filter((key) => selectedSubcategories[key])
  }

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

  const serviceMapping = {
    Plomería: "Plomería",
    Refacción: "Refacción",
    Electricista: "Electricista",
    Belleza: 'Belleza',
    Carpintería: "Carpintería",
    Limpieza: "Limpieza",
    Pintura: "Pintura",
    Mudanza: "Mudanza",
    Técnico: "Técnico",
  }

  const filteredProfiles = useMemo(() => {
    const filtered = profiles.filter((prof) => {
      if (!selectedService) return true

      const matchesService = prof.profesion === serviceMapping[selectedService.label]

      if (!matchesService) return false

      const selectedSubcategoriesArray = getSelectedSubcategoriesArray()
      if (selectedSubcategoriesArray.length === 0) return true

      return selectedSubcategoriesArray.includes(prof.categoria)
    })

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
