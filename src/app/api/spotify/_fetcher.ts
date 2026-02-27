const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export async function getAccessToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data.access_token as string;
}

export async function getNowPlaying<T>() {
  const access_token = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (res.status === 204 || res.status > 400) {
    return null;
  }
  const data = await res.json();
  return data as T;
}
