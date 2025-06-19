export const pricingPlans = [
  { id: "Prueba", label: "Prueba de 7 días gratis", price: 0 },
  { id: "Mensual", label: "Plan Mensual", price: 9.99 },
  { id: "Anual", label: "Plan Anual", price: 99.99 },
  { id: "Empresarial", label: "Plan de Empresa / Equipo", price: "Contáctanos" },
]

export const professionalPlans = {
  headers: ["", "ESTANDAR", "PLUS"],
  rows: [
    { id: "price", label: "Precio", values: ["2 US$/mes", "5 US$/mes"] },
    { id: "advertising_days", label: "Días de Publicidad", values: ["4 días\npor mes", "4 días\npor semana"] },
    { id: "day_selection", label: "Elección de Días", values: ["❌", "✅"] },
    { id: "free_cancellation", label: "Cancelación Gratuita", values: ["✅", "✅"] },
  ],
}

// Client plans for personal users
export const clientPlans = {
  headers: ["", "BÁSICO", "PREMIUM"],
  rows: [
    { id: "price", label: "Precio", values: ["4.99 US$/mes", "9.99 US$/mes"] },
    { id: "ads", label: "Sin Publicidad", values: ["❌", "✅"] },
    { id: "features", label: "Funciones Premium", values: ["Limitadas", "Completas"] },
    { id: "support", label: "Soporte", values: ["Básico", "Prioritario"] },
  ],
}

export const getPlanDetails = (planId) => {
  // Check client plans first
  const clientPlan = pricingPlans.find((plan) => plan.id === planId)
  if (clientPlan) return clientPlan

  // Handle professional plans
  if (planId === "estandar") {
    return {
      id: "estandar",
      label: "Plan Estándar",
      price: 2,
      features: professionalPlans.rows.map((row) => ({
        feature: row.label,
        value: row.values[0],
      })),
    }
  }

  if (planId === "plus") {
    return {
      id: "plus",
      label: "Plan Plus",
      price: 5,
      features: professionalPlans.rows.map((row) => ({
        feature: row.label,
        value: row.values[1],
      })),
    }
  }

  // Handle client premium plans
  if (planId === "basico") {
    return {
      id: "basico",
      label: "Plan Básico",
      price: 4.99,
      features: clientPlans.rows.map((row) => ({
        feature: row.label,
        value: row.values[0],
      })),
    }
  }

  if (planId === "premium") {
    return {
      id: "premium",
      label: "Plan Premium",
      price: 9.99,
      features: clientPlans.rows.map((row) => ({
        feature: row.label,
        value: row.values[1],
      })),
    }
  }

  return null
}

export const formatPrice = (price) => {
  if (price === 0) return "Gratis"
  if (typeof price === "string") return price
  return `$${price.toFixed(2)} USD`
}

export const getPricingPlans = () => {
  return pricingPlans
}

export const getClientPlans = () => {
  return clientPlans
}

export const getProfessionalPlans = () => {
  return professionalPlans
}

export const isProfessionalPlan = (planId) => {
  return planId === "estandar" || planId === "plus"
}

export const isClientPlan = (planId) => {
  return pricingPlans.some((plan) => plan.id === planId) || planId === "basico" || planId === "premium"
}
