import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: "user-read-currently-playing user-read-playback-state",
  });
  console.log(
    "Redirecting to Spotify for authentication...",
    process.env.SPOTIFY_REDIRECT_URI,
    params.toString(),
  );

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
  );
}
