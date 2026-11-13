import { describe, it, expect } from "vitest";
import { vehicles, soldVehicles } from "@/data/vehicles";
import { applyFilters, getBodyStyle } from "@/lib/vehicleFilters";

describe("Vehicle Stock Management", () => {
  it("should mark sold vehicles as sold and exclude them from active inventory", () => {
    const activeIds = vehicles.map((v) => v.id);
    const soldIds = soldVehicles.map((v) => v.id);

    const retiredIds = [
      "corolla-xei-20-flex-2021-2022",
      "tcross-comfortline-2026",
      "gol-g7-2023",
      "gol-trendline-2017-black",
      "gol-trendline-10-2017",
      "jimny-sport-2016",
      "onix-ltz-2018",
      "argo-drive-2025",
      "polo-10-track-2025",
      "corolla-seg-2009",
      "civic-lxr-2014",
      "honda-fit-ex-2016",
      "compass-longitude-2020",
      "onix-joy-2020",
    ];

    for (const id of retiredIds) {
      expect(activeIds).not.toContain(id);
      expect(soldIds).toContain(id);
    }
  });

  it("should have Spin Activ 2020 and HB20 Comfort 2016 active at top of inventory", () => {
    const activeIds = vehicles.map((v) => v.id);

    expect(activeIds).toContain("spin-activ-2020");
    expect(activeIds).toContain("hb20-comfort-2016");

    expect(vehicles[0].id).toBe("spin-activ-2020");
    expect(vehicles[1].id).toBe("hb20-comfort-2016");

    const spin = vehicles.find((v) => v.id === "spin-activ-2020");
    expect(spin?.price).toBe("R$ 76.900,00");
    expect(spin?.year).toBe("2020");
    expect(spin?.km).toBe("96.000");
    expect(spin?.seats).toBe("7 lugares");

    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");
    expect(hb20?.price).toBe("R$ 51.900,00");
    expect(hb20?.year).toBe("2016");
    expect(hb20?.km).toBe("99.000");
    expect(hb20?.color).toBe("Branco");
  });

  it("should categorize active vehicles properly", () => {
    const spin = vehicles.find((v) => v.id === "spin-activ-2020");
    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");

    expect(getBodyStyle(spin!)).toBe("Utilitário");
    expect(getBodyStyle(hb20!)).toBe("Hatch");
  });

  it("should show active vehicles when filtering without constraints", () => {
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
    expect(ids).toContain("hb20-comfort-2016");
    expect(ids).not.toContain("onix-joy-2020");
    expect(ids).not.toContain("compass-longitude-2020");
  });
});
