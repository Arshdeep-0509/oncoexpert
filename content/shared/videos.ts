/**
 * OncoXpert YouTube videos, shared by every page.
 * The ID is the part after `watch?v=` in a YouTube link. Titles and thumbnails are
 * fetched from YouTube at build time (lib/youtube.ts). The first video is shown large.
 *
 * SOURCE: EXISTING (video IDs). The fourth is the client's (review, 30 Oct 2026): it replaces
 * "3PQkYqAZLoY".
 */
export const youtubeVideos = ["nV-3cYw4f3w", "f9C2rx-d3vA", "5eQ4jZxbz4U", "_3fI1R_Ddg8"] as const;
