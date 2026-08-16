import { Song } from "@/data/songs";

export const YOUTUBE_API_KEY = "AIzaSyDd957ow_f9i9fiuIo8jZbmfrWVdrr_NnY";

/** Search YouTube live for any query string using YouTube Data API v3 */
export async function searchYouTubeSongs(query: string, maxResults = 12): Promise<Song[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodedQuery}&type=video&key=${YOUTUBE_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.items) return [];

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
      artist: item.snippet.channelTitle || "YouTube Music",
      tag: "Live YouTube Music",
    }));
  } catch (err) {
    console.warn("YouTube API search error:", err);
    return [];
  }
}
