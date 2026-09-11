import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, X, CarFront, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCardDetailed from "@/components/VehicleCardDetailed";
import VehicleFilters from "@/components/VehicleFilters";
import SEO from "@/components/SEO";
import { vehicles as staticVehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVehicleStock } from "@/hooks/useVehicleStock";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applyFilters,
  Filters,
  getKmNumber,
  getPriceNumber,
  getYearNumber,
  SortKey,
  SORT_LABEL,
  sortVehicles,
} from "@/lib/vehicleFilters";

const Veiculos = () => {
  const { data: apiVehicles, isLoading } = useVehicleStock();
  const vehicles = apiVehicles || staticVehicles;

  const bounds = useMemo(() => {
    const prices = vehicles.map(getPriceNumber);
    const years = vehicles.map(getYearNumber);
    const kms = vehicles.map(getKmNumber).filter((k) => k > 0);
    return {
      priceMin: Math.floor(Math.min(...prices) / 1000) * 1000,
      priceMax: Math.ceil(Math.max(...prices) / 1000) * 1000,
      yearMin: Math.min(...years),
      yearMax: Math.max(...years),
      kmMax: kms.length ? Math.ceil(Math.max(...kms) / 10000) * 10000 : 200000,
    };
  }, [vehicles]);

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.brand))).sort(),
    [vehicles]
  );

  const initial: Filters = {
    query: "",
    brands: [],
    bodyStyles: [],
    priceMin: bounds.priceMin,
    priceMax: bounds.priceMax,
    yearMin: bounds.yearMin,
    yearMax: bounds.yearMax,
    transmission: "Todos",
    kmMax: bounds.kmMax,
    fuels: [],
  };

  const [filters, setFilters] = useState<Filters>(initial);
  const [sort, setSort] = useState<SortKey>("recent");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const reset = () => setFilters(initial);

  const filtered = useMemo(() => applyFilters(vehicles, filters), [filters, vehicles]);
  const results = useMemo(() => sortVehicles(filtered, sort), [filtered, sort]);

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];
  if (filters.query)
    activeChips.push({
      key: "q",
      label: `"${filters.query}"`,
      onRemove: () => setFilters({ ...filters, query: "" }),
    });
  filters.brands.forEach((b) =>
    activeChips.push({
      key: `b-${b}`,
      label: b,
      onRemove: () =>
        setFilters({ ...filters, brands: filters.brands.filter((x) => x !== b) }),
    })
  );
  filters.bodyStyles.forEach((b) =>
    activeChips.push({
      key: `bs-${b}`,
      label: b,
      onRemove: () =>
        setFilters({
          ...filters,
          bodyStyles: filters.bodyStyles.filter((x) => x !== b),
        }),
    })
  );
  filters.fuels.forEach((f) =>
    activeChips.push({
      key: `f-${f}`,
      label: f,
      onRemove: () =>
        setFilters({ ...filters, fuels: filters.fuels.filter((x) => x !== f) }),
    })
  );
  if (filters.transmission !== "Todos")
    activeChips.push({
      key: "t",
      label: filters.transmission,
      onRemove: () => setFilters({ ...filters, transmission: "Todos" }),
    });
  if (filters.kmMax !== bounds.kmMax)
    activeChips.push({
      key: "km",
      label: `Até ${filters.kmMax.toLocaleString("pt-BR")} km`,
      onRemove: () => setFilters({ ...filters, kmMax: bounds.kmMax }),
    });
  if (filters.priceMin !== bounds.priceMin || filters.priceMax !== bounds.priceMax)
    activeChips.push({
      key: "p",
      label: "Preço personalizado",
      onRemove: () =>
        setFilters({ ...filters, priceMin: bounds.priceMin, priceMax: bounds.priceMax }),
    });
  if (filters.yearMin !== bounds.yearMin || filters.yearMax !== bounds.yearMax)
    activeChips.push({
      key: "y",
      label: `${filters.yearMin} - ${filters.yearMax}`,
      onRemove: () =>
        setFilters({ ...filters, yearMin: bounds.yearMin, yearMax: bounds.yearMax }),
    });

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Estoque de veículos seminovos - Fortal Auto",
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${v.brand} ${v.model} ${v.year}`,
        image: v.image,
        offers: {
          "@type": "Offer",
          price: v.price,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Veículos Seminovos em Fortaleza | Fortal Auto"
        description="Confira o estoque atualizado de carros seminovos da Fortal Auto em Fortaleza. Veículos revisados, com procedência e garantia. Fale no WhatsApp."
        path="/veiculos"
        jsonLd={itemListJsonLd}
      />
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-6 md:pb-10">
        <div className="container text-center">
          <div className="section-divider mb-4 mx-auto" />
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Veículos Seminovos em Fortaleza
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Encontre o veículo perfeito com nossos filtros avançados. Todos revisados e com procedência.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="flex gap-6 lg:gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Utility bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{results.length}</span>{" "}
                  {results.length === 1 ? "veículo encontrado" : "veículos encontrados"}
                </p>
                <div className="flex items-center gap-2">
                  {/* Filter trigger */}
                  <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filtros
                        {activeChips.length > 0 && (
                          <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                            {activeChips.length}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">

                      <SheetHeader>
                        <SheetTitle>Filtrar veículos</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <VehicleFilters
                          filters={filters}
                          setFilters={setFilters}
                          brands={brands}
                          bounds={bounds}
                          onReset={reset}
                        />
                      </div>
                      <SheetFooter>
                        <Button className="w-full" onClick={() => setDrawerOpen(false)}>
                          Ver {results.length} resultados
                        </Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                    <SelectTrigger className="w-[200px]" aria-label="Ordenar">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                        <SelectItem key={k} value={k}>{SORT_LABEL[k]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active chips */}
              {activeChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {activeChips.map((c) => (
                    <button
                      key={c.key}
                      onClick={c.onRemove}
                      className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary px-3 py-1 text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      {c.label}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  <button
                    onClick={reset}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                  >
                    Limpar tudo
                  </button>
                </div>
              )}

              {/* Grid or empty state */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-card rounded-2xl overflow-hidden border border-border/50 h-[400px]">
                      <div className="aspect-[3/4] bg-secondary/50" />
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-secondary/50 rounded-md w-3/4" />
                        <div className="flex gap-2">
                          <div className="h-4 bg-secondary/50 rounded-md w-12" />
                          <div className="h-4 bg-secondary/50 rounded-md w-16" />
                        </div>
                        <div className="h-7 bg-secondary/50 rounded-md w-1/2" />
                        <div className="h-10 bg-secondary/50 rounded-md w-full mt-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.map((vehicle) => (
                    <VehicleCardDetailed key={vehicle.id} {...vehicle} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-border/60 bg-card/30">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CarFront className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">
                    Nenhum veículo encontrado
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Não encontramos veículos com esses filtros. Ajuste os critérios ou limpe os filtros para ver todo o estoque.
                  </p>
                  <Button onClick={reset} className="gap-2">
                    <X className="h-4 w-4" /> Limpar filtros
                  </Button>
                </div>
              )}

              <div className="mt-10 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  O estoque está sempre atualizando! Entre em contato pelo WhatsApp para ver os veículos disponíveis.
                </p>
                <Link
                  to="/vendidos"
                  className="inline-block text-sm text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Ver veículos já vendidos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Veiculos;
