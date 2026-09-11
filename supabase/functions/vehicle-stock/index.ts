import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const DEFAULT_WHATSAPP = '5585998308911'

type UnknownRecord = Record<string, unknown>

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const normalizeKey = (key: string) =>
  key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase()

const field = (item: UnknownRecord, aliases: string[]): unknown => {
  const normalized = new Map(Object.entries(item).map(([key, value]) => [normalizeKey(key), value]))
  for (const alias of aliases) {
    const value = normalized.get(normalizeKey(alias))
    if (value !== undefined && value !== null && value !== '') return value
  }
  return undefined
}

const text = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim()
  return ''
}

const firstUrl = (value: unknown): string => {
  if (typeof value === 'string') {
    const candidates = value.split(/[|,;]/).map((part) => part.trim())
    return candidates.find((part) => /^https?:\/\//i.test(part)) ?? ''
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      const url = firstUrl(entry)
      if (url) return url
    }
  }
  if (isRecord(value)) {
    return firstUrl(field(value, ['url', 'foto', 'imagem', 'image', 'src', 'arquivo', 'original']))
  }
  return ''
}

const findVehicleArray = (payload: unknown): UnknownRecord[] => {
  if (Array.isArray(payload)) {
    const records = payload.filter(isRecord)
    if (records.some((item) => field(item, ['modelo', 'model', 'veiculo', 'vehicle']))) return records
    for (const entry of payload) {
      const nested = findVehicleArray(entry)
      if (nested.length) return nested
    }
  }
  if (isRecord(payload)) {
    for (const preferred of ['veiculos', 'vehicles', 'estoque', 'stock', 'data', 'items', 'resultados']) {
      const match = Object.entries(payload).find(([key]) => normalizeKey(key) === preferred)
      if (match) {
        const nested = findVehicleArray(match[1])
        if (nested.length) return nested
      }
    }
    for (const value of Object.values(payload)) {
      const nested = findVehicleArray(value)
      if (nested.length) return nested
    }
  }
  return []
}

const formatPrice = (value: unknown): string => {
  const raw = text(value)
  if (!raw) return 'Consulte'
  const numeric = Number(raw.replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.'))
  return Number.isFinite(numeric)
    ? numeric.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : raw
}

const list = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((entry) => text(entry)).filter(Boolean)
  const raw = text(value)
  return raw ? raw.split(/[|;,\n]/).map((entry) => entry.trim()).filter(Boolean) : []
}

const mapVehicle = (item: UnknownRecord, index: number) => {
  const brand = text(field(item, ['marca', 'brand', 'fabricante'])) || 'Veículo'
  const model = text(field(item, ['modelo', 'model', 'veiculo', 'versao', 'version'])) || 'Modelo não informado'
  const version = text(field(item, ['versao', 'version']))
  const id = text(field(item, ['id', 'codigo', 'code', 'vehicleId', 'veiculoId'])) || `${brand}-${model}-${index}`
  const photos = field(item, ['fotos', 'photos', 'imagens', 'images', 'foto', 'photo', 'imagem', 'image'])
  const year = text(field(item, ['anoModelo', 'modelYear', 'ano_modelo', 'ano', 'year'])) || 'Consulte'

  return {
    id,
    image: firstUrl(photos),
    brand,
    model: version && !model.toLowerCase().includes(version.toLowerCase()) ? `${model} ${version}` : model,
    year,
    price: formatPrice(field(item, ['preco', 'price', 'valor', 'value'])),
    km: text(field(item, ['km', 'quilometragem', 'mileage', 'kilometers'])) || undefined,
    transmission: text(field(item, ['cambio', 'transmissao', 'transmission'])) || 'Não informado',
    engine: text(field(item, ['motor', 'engine', 'motorizacao', 'combustivel', 'fuel'])) || undefined,
    highlights: list(field(item, ['opcionais', 'options', 'acessorios', 'destaques', 'descricao', 'description'])),
    whatsapp: DEFAULT_WHATSAPP,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Método não permitido.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const feedUrl = Deno.env.get('REVENDAMAIS_FEED_URL')
    if (!feedUrl) throw new Error('Feed não configurado.')

    const upstream = await fetch(feedUrl, {
      headers: { Accept: 'application/json', 'User-Agent': 'FortalAuto/1.0' },
      signal: AbortSignal.timeout(15000),
    })
    const body = await upstream.text()
    if (!upstream.ok) throw new Error(`O fornecedor respondeu com status ${upstream.status}.`)
    if (!body.trim()) throw new Error('O fornecedor retornou uma resposta vazia.')

    let payload: unknown
    try {
      payload = JSON.parse(body)
    } catch {
      throw new Error('O fornecedor retornou dados em formato inválido.')
    }

    const sourceVehicles = findVehicleArray(payload)
    const vehicles = sourceVehicles.map(mapVehicle).filter((vehicle) => vehicle.model !== 'Modelo não informado')

    return new Response(JSON.stringify({ vehicles, updatedAt: new Date().toISOString() }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível carregar o estoque.'
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
