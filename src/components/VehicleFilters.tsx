import { Search, X, Car, Truck, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  BodyStyle,
  Filters,
  Fuel,
  formatBRL,
} from "@/lib/vehicleFilters";

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
  brands: string[];
  bounds: {
    priceMin: number;
    priceMax: number;
    yearMin: number;
    yearMax: number;
    kmMax: number;
  };
  onReset: () => void;
}

const BODY_OPTIONS: { value: BodyStyle; icon: typeof Car }[] = [
  { value: "Sedã", icon: Car },
  { value: "SUV", icon: Car },
  { value: "Hatch", icon: Car },
  { value: "Picape", icon: Truck },
  { value: "Crossover", icon: Car },
  { value: "Utilitário", icon: Wrench },
];

const FUEL_OPTIONS: Fuel[] = ["Flex", "Gasolina", "Diesel", "Híbrido", "Elétrico"];

const KM_SHORTCUTS = [
  { label: "Até 30k", value: 30000 },
  { label: "Até 60k", value: 60000 },
  { label: "Até 100k", value: 100000 },
];

const VehicleFilters = ({ filters, setFilters, brands, bounds, onReset }: Props) => {
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters({ ...filters, [key]: value });

  const toggleArray = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const years = Array.from(
    { length: bounds.yearMax - bounds.yearMin + 1 },
    (_, i) => bounds.yearMin + i
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Buscar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
            placeholder="Modelo, marca, versão..."
            className="pl-9"
          />
        </div>
      </div>

      <Separator />

      {/* Brand */}
      {brands.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Marca</Label>
          <div className="grid grid-cols-2 gap-2">
            {brands.map((b) => {
              const checked = filters.brands.includes(b);
              return (
                <label
                  key={b}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => update("brands", toggleArray(filters.brands, b))}
                  />
                  <span className="text-sm">{b}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <Separator />

      {/* Body style */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Carroceria</Label>
        <div className="grid grid-cols-3 gap-2">
          {BODY_OPTIONS.map(({ value, icon: Icon }) => {
            const active = filters.bodyStyles.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => update("bodyStyles", toggleArray(filters.bodyStyles, value))}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Faixa de preço</Label>
        <Slider
          min={bounds.priceMin}
          max={bounds.priceMax}
          step={1000}
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={([min, max]) =>
            setFilters({ ...filters, priceMin: min, priceMax: max })
          }
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatBRL(filters.priceMin)}</span>
          <span>{formatBRL(filters.priceMax)}</span>
        </div>
      </div>

      <Separator />

      {/* Year */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Ano</Label>
        <div className="grid grid-cols-2 gap-2">
          <Select
            value={String(filters.yearMin)}
            onValueChange={(v) => update("yearMin", Number(v))}
          >
            <SelectTrigger><SelectValue placeholder="De" /></SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(filters.yearMax)}
            onValueChange={(v) => update("yearMax", Number(v))}
          >
            <SelectTrigger><SelectValue placeholder="Até" /></SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Transmission */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Câmbio</Label>
        <div className="grid grid-cols-4 gap-1.5">
          {(["Todos", "Automático", "Manual", "CVT"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update("transmission", t)}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                filters.transmission === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {t === "Automático" ? "Auto" : t}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* KM */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Quilometragem máxima</Label>
        <Slider
          min={0}
          max={bounds.kmMax}
          step={5000}
          value={[filters.kmMax || bounds.kmMax]}
          onValueChange={([v]) => update("kmMax", v)}
        />
        <div className="flex flex-wrap gap-2">
          {KM_SHORTCUTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => update("kmMax", s.value)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                filters.kmMax === s.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Até {(filters.kmMax || bounds.kmMax).toLocaleString("pt-BR")} km
        </p>
      </div>

      <Separator />

      {/* Fuel */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Combustível</Label>
        <div className="space-y-2">
          {FUEL_OPTIONS.map((f) => {
            const checked = filters.fuels.includes(f);
            return (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => update("fuels", toggleArray(filters.fuels, f))}
                />
                <span className="text-sm">{f}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={onReset}>
        <X className="h-4 w-4" /> Limpar filtros
      </Button>
    </div>
  );
};

export default VehicleFilters;
