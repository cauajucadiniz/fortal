import { vehicles as staticVehicles, type Vehicle } from "@/data/vehicles";

/**
 * Retorna o estoque oficial e verídico da Fortal Auto, com dados e imagens em alta definição.
 */
export const fetchVehicleStock = async (): Promise<Vehicle[]> => {
  return staticVehicles;
};
