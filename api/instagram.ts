// Função serverless da Vercel: devolve o número de seguidores do Instagram da Fortal Auto.
// Configure na Vercel (Settings > Environment Variables):
//   IG_USER_ID       = ID da conta Instagram Business (ex.: 1784...)
//   IG_ACCESS_TOKEN  = token de acesso de longa duração da Meta (Graph API)
export default async function handler(_req: any, res: any) {
  const id = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  if (!id || !token) return res.status(503).json({ error: "not_configured" });
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${id}?fields=followers_count&access_token=${token}`);
    const j = await r.json();
    if (!r.ok || typeof j.followers_count !== "number") throw new Error(JSON.stringify(j.error || j));
    res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
    return res.status(200).json({ followers: j.followers_count });
  } catch (e) {
    return res.status(502).json({ error: "instagram_failed" });
  }
}
