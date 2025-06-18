export const filterServices = (query, mockServices) => {
  if (!query || query.trim() === "") return [];
  const lower = query.toLowerCase();
  return mockServices.filter((service) =>
    service.servicio.toLowerCase().includes(lower)
  );
};
