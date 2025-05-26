import { getNowPlaying } from "./_fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 180;

interface SpotifyData {
  is_playing: boolean;
  item: {
    name: string;
    album: {
      name: string;
      artists: Array<{ name: string }>;
      images: [{ url: string }];
    };
    external_urls: {
      spotify: string;
    };
  };
  currently_playing_type: string;
}

export async function GET() {
  const response = await getNowPlaying();
  if (!response.ok) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
    });
  }

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
    });
  }
  const nowplayingData = (await response.json()) as SpotifyData;

  const data = {
    isPlaying: nowplayingData.is_playing,
    title: nowplayingData.item.name,
    album: nowplayingData.item.album.name,
    artist: nowplayingData.item.album.artists
      .map((artist) => artist.name)
      .join(", "),
    albumImageUrl: nowplayingData.item.album.images[0].url,
    songUrl: nowplayingData.item.external_urls.spotify,
  };
  if (nowplayingData.currently_playing_type !== "track") {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
