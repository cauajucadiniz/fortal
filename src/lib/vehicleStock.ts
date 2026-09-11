import { vehicles as staticVehicles, type Vehicle } from "@/data/vehicles";

export const fetchVehicleStock = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch('/api/estoque');
    if (!response.ok) {
      console.warn('API error fetching stock, using static fallback data.', response.status);
      return staticVehicles;
    }
    
    const data = await response.json();
    
    // Parse defensivo: procurar o array independentemente da chave raiz
    let vehicleArray: Record<string, unknown>[] = [];
    if (Array.isArray(data)) {
      vehicleArray = data;
    } else if (data && typeof data === 'object') {
      // Procura a primeira chave que seja array
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
          vehicleArray = data[key];
          break;
        }
      }
    }
    
    // Fallback crítico: se estiver vazio (ex: sistema gerando feed ainda), retorna estático
    if (vehicleArray.length === 0) {
      console.warn('API returned empty or invalid data format, using static fallback data.');
      return staticVehicles;
    }

    // Mapear dados recebidos
    return vehicleArray.map((v: Record<string, unknown>): Vehicle => {
      // Mapeamento defensivo de fotos
      const fotosObj = v.fotos as Record<string, unknown> | undefined;
      const fotos = Array.isArray(v.fotos) ? v.fotos : (fotosObj?.foto ? (Array.isArray(fotosObj.foto) ? fotosObj.foto : [fotosObj.foto]) : []);
      const imageUrl = (fotos[0] as Record<string, unknown>)?.url || fotos[0] || v.foto_principal || "https://picsum.photos/seed/placeholder/800/600";
      
      // Formatar preço
      const priceVal = parseFloat(String(v.valor || v.preco || 0).replace(/[^\d.,]/g, '').replace(',', '.'));
      const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(isNaN(priceVal) ? 0 : priceVal);
      
      return {
        id: String(v.id || v.codigo || Math.random()),
        image: imageUrl as string,
        brand: (v.marca || "Marca Desconhecida") as string,
        model: (v.modelo || "Modelo Desconhecido") as string,
        year: String(v.ano_modelo || v.ano_fabricacao || "2000"),
        price: formattedPrice,
        km: v.km ? String(v.km) : undefined,
        transmission: (v.cambio || "Não informado") as string,
        engine: (v.motor || v.versao || "") as string,
        highlights: v.opcionais ? (Array.isArray(v.opcionais) ? v.opcionais : (typeof v.opcionais === 'string' ? v.opcionais.split(',').map((o: string) => o.trim()) : [])) : [],
        whatsapp: "5585998308911"
      };
    });
  } catch (err) {
    console.warn('Error fetching stock, using static fallback data.', err);
    return staticVehicles;
  }
};
