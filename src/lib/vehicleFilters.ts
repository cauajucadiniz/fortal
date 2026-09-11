import type { Vehicle } from "@/data/vehicles";

export type BodyStyle = "Sedã" | "SUV" | "Hatch" | "Picape" | "Crossover" | "Utilitário";
export type Fuel = "Flex" | "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";

const BODY_MAP: Record<string, BodyStyle> = {
  "bmw-320i-gp-sport-2022": "Sedã",
  "hb20-platinum-2022": "Hatch",
  "onix-ltz-2018": "Hatch",
  "nivus-highline-2021": "Crossover",
  "renegade-longitude-t270-2023": "SUV",
  "civic-lxr-2015": "Sedã",
  "civic-ex-2018": "Sedã",
  "hilux-sw4-srx-2017": "SUV",
  "jimny-sport-2016": "Utilitário",
  "argo-drive-2022": "Hatch",
  "hb20-sense-2021": "Hatch",
  "argo-1-0-2019": "Hatch",
  "kicks-active-2021": "SUV",
  "sandero-stepway-2025": "Hatch",
  "gol-trendline-2017": "Hatch",
  "gol-g7-2023": "Hatch",
  "mobi-like-2028": "Hatch",
  "corolla-xei-2019": "Sedã",
  "tcross-comfortline-2026": "SUV",
  "renegade-longitude-t270-2024": "SUV",
};

const FUEL_MAP: Record<string, Fuel> = {
  "bmw-320i-gp-sport-2022": "Gasolina",
  "hilux-sw4-srx-2017": "Diesel",
};

export const getBodyStyle = (v: Vehicle): BodyStyle =>
  BODY_MAP[v.id] ?? "Sedã";

export const getFuel = (v: Vehicle): Fuel => {
  if (FUEL_MAP[v.id]) return FUEL_MAP[v.id];
  const e = (v.engine ?? "").toLowerCase();
  if (e.includes("diesel")) return "Diesel";
  if (e.includes("elétr") || e.includes("eletr")) return "Elétrico";
  if (e.includes("híbr") || e.includes("hibr")) return "Híbrido";
  return "Flex";
};

export const getPriceNumber = (v: Vehicle): number =>
  Number(v.price.replace(/[^\d,]/g, "").replace(",", ".")) || 0;

export const getKmNumber = (v: Vehicle): number =>
  v.km ? Number(v.km.replace(/\D/g, "")) || 0 : 0;

export const getYearNumber = (v: Vehicle): number => Number(v.year) || 0;

export const normalizeTransmission = (t: string): "Automático" | "Manual" | "CVT" => {
  const s = t.toLowerCase();
  if (s.includes("cvt")) return "CVT";
  if (s.includes("autom")) return "Automático";
  return "Manual";
};

export const formatBRL = (n: number): string =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export interface Filters {
  query: string;
  brands: string[];
  bodyStyles: BodyStyle[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  transmission: "Todos" | "Automático" | "Manual" | "CVT";
  kmMax: number;
  fuels: Fuel[];
}

export type SortKey =
  | "recent"
  | "price-asc"
  | "price-desc"
  | "km-asc"
  | "year-desc";

export const SORT_LABEL: Record<SortKey, string> = {
  recent: "Mais recentes",
  "price-asc": "Menor preço",
  "price-desc": "Maior preço",
  "km-asc": "Menor quilometragem",
  "year-desc": "Ano mais novo",
};

export const applyFilters = (vehicles: Vehicle[], f: Filters): Vehicle[] => {
  const q = f.query.trim().toLowerCase();
  return vehicles.filter((v) => {
    if (q) {
      const hay = `${v.brand} ${v.model} ${v.year}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.brands.length && !f.brands.includes(v.brand)) return false;
    if (f.bodyStyles.length && !f.bodyStyles.includes(getBodyStyle(v))) return false;
    const price = getPriceNumber(v);
    if (price < f.priceMin || price > f.priceMax) return false;
    const year = getYearNumber(v);
    if (year < f.yearMin || year > f.yearMax) return false;
    if (f.transmission !== "Todos" && normalizeTransmission(v.transmission) !== f.transmission)
      return false;
    const km = getKmNumber(v);
    if (f.kmMax > 0 && km > 0 && km > f.kmMax) return false;
    if (f.fuels.length && !f.fuels.includes(getFuel(v))) return false;
    return true;
  });
};

export const sortVehicles = (vehicles: Vehicle[], key: SortKey): Vehicle[] => {
  const arr = [...vehicles];
  switch (key) {
    case "price-asc":
      return arr.sort((a, b) => getPriceNumber(a) - getPriceNumber(b));
    case "price-desc":
      return arr.sort((a, b) => getPriceNumber(b) - getPriceNumber(a));
    case "km-asc":
      return arr.sort((a, b) => getKmNumber(a) - getKmNumber(b));
    case "year-desc":
      return arr.sort((a, b) => getYearNumber(b) - getYearNumber(a));
    default:
      return arr;
  }
};
