"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type YTItem = {
  id: { videoId: string };
  snippet: { title: string };
};

type Props = {
  channelId?: string;
  maxVideos?: number;
  title?: string;
};

export default function YouTubeSection({
  channelId = "UCwS-h2WNdHpIflVOTzK4p1w",
  maxVideos = 3,
  title = "Vídeos recientes",
}: Props) {
  const [videos, setVideos] = useState<YTItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (!apiKey) {
      setError("Falta NEXT_PUBLIC_YOUTUBE_API_KEY en .env.local");
      setLoading(false);
      return;
    }

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&channelId=${channelId}` +
      `&order=date&maxResults=${maxVideos}&type=video&key=${apiKey}`;

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`YouTube API ${res.status}`);
        const data = await res.json();
        setVideos((data.items || []).filter((it: YTItem) => it.id?.videoId));
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e) || "Error al cargar vídeos");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [channelId, maxVideos]);

  return (
    <section id="videos" className="py-20 px-4 w-full max-w-[1200px] m-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl font-bold text-center mb-12 text-white tracking-wide relative
                   after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2"
      >
        {title}
      </motion.h2>

      {loading && (
        <p className="text-center text-gray-300">Cargando vídeos…</p>
      )}

      {!loading && error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {!loading && !error && videos.length === 0 && (
        <p className="text-center text-gray-300">
          No hay vídeos publicados aún.
        </p>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <motion.article
              key={v.id.videoId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
              className="rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/10 backdrop-blur
                         hover:ring-fuchsia-500/40 transition"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id.videoId}`}
                  title={v.snippet.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <h3 className="px-4 py-3 text-sm font-medium text-gray-100">
                {v.snippet.title}
              </h3>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
