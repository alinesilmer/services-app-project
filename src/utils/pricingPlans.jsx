import AsyncStorage from "@react-native-async-storage/async-storage";

export const pricingPlans = [
  { id: "Prueba",      label: "Prueba de 7 días gratis", price: 0    },
  { id: "Mensual",     label: "Plan Mensual",            price: 9.99 },
  { id: "Anual",       label: "Plan Anual",              price: 99.99},
  { id: "Empresarial", label: "Plan de Empresa / Equipo", price: "Contáctanos" },
];

export const clientPlans = {
  headers: ["", "Mensual", "Anual"],
  rows: [
    { id: "price",    label: "Precio",           values: ["$9.99/mes", "$99.99/año"] },
    { id: "ads",      label: "Sin Anuncios",      values: ["✅", "✅"] },
    { id: "support",  label: "Soporte Premium",   values: ["❌", "✅"] },
    { id: "features", label: "Funciones Avanzadas", values: ["❌", "✅"] },
  ],
};

export const professionalPlans = {
  headers: ["", "Estandar", "Plus"],
  rows: [
    { id: "price",             label: "Precio",               values: ["2 US$/mes", "5 US$/mes"] },
    { id: "advertising_days",  label: "Días de Publicidad",    values: ["4 días\npor mes", "4 días\npor semana"] },
    { id: "day_selection",     label: "Elección de Días",      values: ["❌", "✅"] },
    { id: "free_cancellation", label: "Cancelación Gratuita",   values: ["✅", "✅"] },
  ],
};

export const getPlanDetails = (planId) => {
  const normalized = planId.toString().toLowerCase();

  const clientPlan = pricingPlans.find(
    (plan) => plan.id.toLowerCase() === normalized
  );
  if (clientPlan) return clientPlan;

  if (["estandar", "plus"].includes(normalized)) {
    const idx = normalized === "estandar" ? 0 : 1;
    return {
      id: normalized,
      label: normalized === "estandar" ? "Plan Estándar" : "Plan Plus",
      price: normalized === "estandar" ? 2 : 5,
      features: professionalPlans.rows.map((row) => ({
        feature: row.label,
        value: row.values[idx],
      })),
    };
  }


  if (normalized === "basico")  return { id: "basico",  label: "Plan Básico", price: 9.99  };
  if (normalized === "premium") return { id: "premium", label: "Plan Premium", price: 99.99 };

  console.warn(`Plan not found: ${planId}`);
  return null;
};

export const formatPrice = (price) => {
  if (price === 0)           return "Gratis";
  if (typeof price === "string") return price;
  if (typeof price === "number") return `$${price.toFixed(2)} USD`;
  return "Precio no disponible";
};

export const getPricingPlans      = () => clientPlans;
export const getClientPlans       = () => clientPlans;
export const getProfessionalPlans = () => professionalPlans;
export const isProfessionalPlan   = (planId) => ["estandar","plus"].includes(planId.toString().toLowerCase());
export const isClientPlan         = (planId) =>
  pricingPlans.some((plan) => plan.id.toLowerCase() === planId.toString().toLowerCase()) ||
  ["basico","premium"].includes(planId.toString().toLowerCase());
