import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route - Proxy para Revenda Mais
  app.get('/api/estoque', async (req, res) => {
    try {
      const response = await fetch('https://app.revendamais.com.br/application/index.php/apiGeneratorXml/companyFeed/id/46556/type/appdaloja/hash/7fa747df0f74e4213f93bc706cd88d7c.json', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const text = await response.text();
      if (!text || text.trim() === '') {
        return res.status(200).json([]);
      }
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (error) {
      console.error('Proxy fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch inventory' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
