import { describe, it, expect } from "vitest";
import { vehicles, soldVehicles, allVehicles } from "@/data/vehicles";
import { applyFilters, getBodyStyle } from "@/lib/vehicleFilters";

describe("Vehicle Stock Management", () => {
  it("should mark Corolla 2021/2022 and T-Cross as sold", () => {
    const activeIds = vehicles.map((v) => v.id);
    const soldIds = soldVehicles.map((v) => v.id);

    expect(activeIds).not.toContain("corolla-xei-20-flex-2021-2022");
    expect(activeIds).not.toContain("tcross-comfortline-2026");

    expect(soldIds).toContain("corolla-xei-20-flex-2021-2022");
    expect(soldIds).toContain("tcross-comfortline-2026");
  });

  it("should have Onix Joy 2020 and HB20 Comfort 2016 active at top of inventory", () => {
    const activeIds = vehicles.map((v) => v.id);

    expect(activeIds).toContain("onix-joy-2020");
    expect(activeIds).toContain("hb20-comfort-2016");

    // Should be at the very beginning of the stock
    expect(vehicles[0].id).toBe("onix-joy-2020");
    expect(vehicles[1].id).toBe("hb20-comfort-2016");

    const onix = vehicles.find((v) => v.id === "onix-joy-2020");
    expect(onix?.price).toBe("R$ 58.900,00");
    expect(onix?.year).toBe("2020");
    expect(onix?.km).toBe("94.000");

    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");
    expect(hb20?.price).toBe("R$ 51.900,00");
    expect(hb20?.year).toBe("2016");
    expect(hb20?.km).toBe("99.000");
  });

  it("should categorize both new vehicles as Hatch", () => {
    const onix = vehicles.find((v) => v.id === "onix-joy-2020");
    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");

    expect(getBodyStyle(onix!)).toBe("Hatch");
    expect(getBodyStyle(hb20!)).toBe("Hatch");
  });

  it("should show both new vehicles when filtering without constraints", () => {
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
    const filteredIds = filtered.map((v) => v.id);
    expect(filteredIds).toContain("onix-joy-2020");
    expect(filteredIds).toContain("hb20-comfort-2016");
    expect(filteredIds).not.toContain("corolla-xei-20-flex-2021-2022");
    expect(filteredIds).not.toContain("tcross-comfortline-2026");
  });
});
