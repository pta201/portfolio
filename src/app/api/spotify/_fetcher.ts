const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

export const getAccessToken = async () => {
  const queryString = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token ?? "",
  });
  const token = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT + "?" + queryString.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${token}`,
    },
  });
  const data = await res.json();

  return data.access_token;
};
export const getNowPlaying = async () => {
  const access_token = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
