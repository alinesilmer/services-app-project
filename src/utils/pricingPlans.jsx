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

export const getPlanDetails = (planId) => {
  const clientPlan = pricingPlans.find((plan) => plan.id === planId)
  if (clientPlan) return clientPlan

  if (planId === "estandar" || planId === "plus") {
    const idx = planId === "estandar" ? 0 : 1
    return {
      id: planId,
      label: planId === "estandar" ? "Plan Estándar" : "Plan Plus",
      price: planId === "estandar" ? 2 : 5,
      features: professionalPlans.rows.map((row) => ({
        feature: row.label,
        value: row.values[idx],
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

export const getProfessionalPlans = () => {
  return professionalPlans
}

export const isProfessionalPlan = (planId) => {
  return planId === "estandar" || planId === "plus"
}

export const isClientPlan = (planId) => {
  return pricingPlans.some((plan) => plan.id === planId)
}
