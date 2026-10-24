import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Gera dist/sitemap.xml no build com as páginas fixas + uma página por veículo ativo
const sitemapPlugin = () => ({
  name: "fortal-sitemap",
  apply: "build" as const,
  closeBundle() {
    const SITE = "https://www.fortalauto.com.br";
    const src = fs.readFileSync(path.resolve(__dirname, "src/data/vehicles.ts"), "utf8");
    const ids: string[] = [];
    for (const m of src.matchAll(/\{\s*id: "([^"]+)",([\s\S]*?)\n  \},/g)) {
      if (!/status: "sold"/.test(m[2])) ids.push(m[1]);
    }
    const urls = ["/", "/veiculos", "/sobre", "/contato", "/vendidos", ...ids.map((id) => `/veiculos/${id}`)];
    const today = new Date().toISOString().slice(0, 10);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`)
      .join("\n")}\n</urlset>\n`;
    const out = path.resolve(__dirname, "dist");
    if (fs.existsSync(out)) fs.writeFileSync(path.join(out, "sitemap.xml"), xml);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), sitemapPlugin()].filter(Boolean),
  assetsInclude: ["**/*.PNG", "**/*.JPG", "**/*.JPEG"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
