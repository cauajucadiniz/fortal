import { useQuery } from "@tanstack/react-query";
import { INSTAGRAM_FOLLOWERS_FALLBACK } from "@/lib/site";

const format = (n: number) =>
  n >= 1000 ? `${(Math.floor(n / 100) / 10).toString().replace(".", ",")}k+` : `${n}+`;

/** Busca seguidores em /api/instagram (função da Vercel). Sem token configurado, usa o valor reserva. */
export const useInstagramFollowers = () => {
  const { data } = useQuery({
    queryKey: ["instagram-followers"],
    queryFn: async () => {
      const r = await fetch("/api/instagram");
      if (!r.ok) throw new Error("ig");
      const j = await r.json();
      if (typeof j.followers !== "number") throw new Error("ig");
      return j.followers as number;
    },
    staleTime: 60 * 60 * 1000,
    retry: false,
  });
  return format(data ?? INSTAGRAM_FOLLOWERS_FALLBACK);
};
