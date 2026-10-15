import { cacheLife } from "next/cache";

export type VideoMeta = {
  id: string;
  /** From YouTube oEmbed; null when the lookup fails (the card then shows no title). */
  title: string | null;
  thumbnail: string;
};

/**
 * Title + best thumbnail for each video, looked up at build time and cached for a week.
 * Network failures degrade to "no title" and the hqdefault thumbnail (always present).
 */
export async function getVideos(ids: readonly string[]): Promise<VideoMeta[]> {
  "use cache";
  cacheLife("weeks");

  return Promise.all(
    ids.map(async (id) => {
      const watchUrl = `https://www.youtube.com/watch?v=${id}`;
      const [title, hasMaxRes] = await Promise.all([
        fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`, {
          signal: AbortSignal.timeout(5000),
        })
          .then((r) => (r.ok ? (r.json() as Promise<{ title?: string }>) : null))
          .then((j) => j?.title ?? null)
          .catch(() => null),
        fetch(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, { method: "HEAD", signal: AbortSignal.timeout(5000) })
          .then((r) => r.ok)
          .catch(() => false),
      ]);
      return {
        id,
        title,
        thumbnail: `https://i.ytimg.com/vi/${id}/${hasMaxRes ? "maxresdefault" : "hqdefault"}.jpg`,
      };
    }),
  );
}
