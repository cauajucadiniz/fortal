import { describe, it, expect } from "vitest";
import { vehicles, soldVehicles, allVehicles } from "@/data/vehicles";
import { applyFilters, getBodyStyle } from "@/lib/vehicleFilters";

describe("Vehicle Stock Management", () => {
  it("should mark Corolla 2021/2022, T-Cross and Gol 2023 as sold", () => {
    const activeIds = vehicles.map((v) => v.id);
    const soldIds = soldVehicles.map((v) => v.id);

    expect(activeIds).not.toContain("corolla-xei-20-flex-2021-2022");
    expect(activeIds).not.toContain("tcross-comfortline-2026");
    expect(activeIds).not.toContain("gol-g7-2023");

    expect(soldIds).toContain("corolla-xei-20-flex-2021-2022");
    expect(soldIds).toContain("tcross-comfortline-2026");
    expect(soldIds).toContain("gol-g7-2023");
  });

  it("should have Spin Activ 2020, Onix Joy 2020 and HB20 Comfort 2016 active at top of inventory", () => {
    const activeIds = vehicles.map((v) => v.id);

    expect(activeIds).toContain("spin-activ-2020");
    expect(activeIds).toContain("onix-joy-2020");
    expect(activeIds).toContain("hb20-comfort-2016");

    // Should be at the beginning of the stock
    expect(vehicles[0].id).toBe("spin-activ-2020");
    expect(vehicles[1].id).toBe("onix-joy-2020");
    expect(vehicles[2].id).toBe("hb20-comfort-2016");

    const spin = vehicles.find((v) => v.id === "spin-activ-2020");
    expect(spin?.price).toBe("R$ 76.900,00");
    expect(spin?.year).toBe("2020");
    expect(spin?.km).toBe("96.000");
    expect(spin?.seats).toBe("7 lugares");

    const onix = vehicles.find((v) => v.id === "onix-joy-2020");
    expect(onix?.price).toBe("R$ 58.900,00");
    expect(onix?.year).toBe("2020");
    expect(onix?.km).toBe("94.000");

    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");
    expect(hb20?.price).toBe("R$ 51.900,00");
    expect(hb20?.year).toBe("2016");
    expect(hb20?.km).toBe("99.000");
    expect(hb20?.color).toBe("Branco");
  });

  it("should categorize new vehicles properly", () => {
    const spin = vehicles.find((v) => v.id === "spin-activ-2020");
    const onix = vehicles.find((v) => v.id === "onix-joy-2020");
    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");

    expect(getBodyStyle(spin!)).toBe("Utilitário");
    expect(getBodyStyle(onix!)).toBe("Hatch");
    expect(getBodyStyle(hb20!)).toBe("Hatch");
  });

  it("should show new vehicles when filtering without constraints", () => {
    const initialFilters = {
      query: "",
      brands: [],
      bodyStyles: [],
      priceMin: 30000,
      priceMax: 500000,
      yearMin: 2010,
      yearMax: 2030,
      transmission: "Todos",
      kmMax: 300000,
      fuels: [],
    };

    const filtered = applyFilters(vehicles, initialFilters);
    const ids = filtered.map((v) => v.id);
    expect(ids).toContain("spin-activ-2020");
    expect(ids).toContain("onix-joy-2020");
    expect(ids).toContain("hb20-comfort-2016");
  });
});
