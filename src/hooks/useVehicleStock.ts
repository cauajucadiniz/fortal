import { useQuery } from "@tanstack/react-query";
import { fetchVehicleStock } from "@/lib/vehicleStock";

export const useVehicleStock = () =>
  useQuery({
    queryKey: ["vehicle-stock"],
    queryFn: fetchVehicleStock,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
