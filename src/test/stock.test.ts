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
      "spin-lt-18-2013",
    ];

    for (const id of retiredIds) {
      expect(activeIds).not.toContain(id);
      expect(soldIds).toContain(id);
    }
  });

  it("should have Gol Trendline 2017 black, Spin Activ 2020, and HB20 Comfort 2016 active", () => {
    const activeIds = vehicles.map((v) => v.id);
    const soldIds = soldVehicles.map((v) => v.id);

    expect(activeIds).toContain("gol-trendline-2017-black");
    expect(soldIds).not.toContain("gol-trendline-2017-black");
    expect(activeIds).toContain("spin-activ-2020");
    expect(activeIds).toContain("hb20-comfort-2016");

    const golBlack = vehicles.find((v) => v.id === "gol-trendline-2017-black");
    expect(golBlack?.year).toBe("2017");
    expect(golBlack?.price).toBe("R$ 52.900,00");
  });

  it("should categorize active vehicles properly", () => {
    const spin = vehicles.find((v) => v.id === "spin-activ-2020");
    const hb20 = vehicles.find((v) => v.id === "hb20-comfort-2016");
    const golBlack = vehicles.find((v) => v.id === "gol-trendline-2017-black");

    expect(getBodyStyle(spin!)).toBe("Utilitário");
    expect(getBodyStyle(hb20!)).toBe("Hatch");
    expect(getBodyStyle(golBlack!)).toBe("Hatch");
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
    expect(ids).toContain("gol-trendline-2017-black");
    expect(ids).toContain("spin-activ-2020");
    expect(ids).toContain("hb20-comfort-2016");
    expect(ids).not.toContain("spin-lt-18-2013");
    expect(ids).not.toContain("onix-joy-2020");
  });
});
