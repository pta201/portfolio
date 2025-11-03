import { useQuery } from "@tanstack/react-query";
import { FaSpotify } from "react-icons/fa";
import { Button } from "./ui/button";
import { TypographySmall } from "./ui/typography";

interface SpotifyNowPlayingProps {
  data: {
    isPlaying: boolean;
    title: string;
    album: string;
    artist: string;
    albumImageUrl: string;
    songUrl: string;
  };
  isLoading: boolean;
  isError: boolean;
}

const MUSIC_EMOTES = [
  "🎻",
  "🪕",
  "🎸",
  "🎺",
  "🎷",
  "🪗",
  "🪈",
  "🪇",
  "🥁",
  "📯",
  "🎶",
  "🎵",
  "🎤",
  "🎧",
];
const SpotifyNowPlayingContent = ({
  data,
  isError,
  isLoading,
}: Readonly<SpotifyNowPlayingProps>) => {
  const renderContent = () => {
    if (isError) return "Error Loading";
    if (isLoading) return "Loading...";
    if (!data?.isPlaying) return "Not playing anything right now 😅";
    const title = data.title || "Unknown Title";
    const artist = data.artist || "Unknown Artist";
    return `${title} - ${artist} ${
      MUSIC_EMOTES[Math.floor(Math.random() * MUSIC_EMOTES.length)]
    }`;
  };

  const isDisabled = isError || isLoading || !data?.isPlaying;
  const handleSpotifyClick = () => {
    if (data?.songUrl) {
      window.open(data.songUrl, "_blank");
    }
  };
  return (
    <Button
      key={data?.songUrl}
      disabled={isDisabled}
      className="w-full flex items-center rounded-none"
      onClick={handleSpotifyClick}
    >
      <FaSpotify fontSize={24} />
      <TypographySmall>Now playing: </TypographySmall>
      <TypographySmall>{renderContent()}</TypographySmall>
    </Button>
  );
};

const SpotifyNowPlaying = () => {
  const {
    data: spotifyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["spotify-now-playing"],
    queryFn: async () => {
      const response = await fetch("/api/spotify");

      return response.json();
    },
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
  return (
    <SpotifyNowPlayingContent
      data={spotifyData}
      isError={isError}
      isLoading={isLoading}
    />
  );
};
export default SpotifyNowPlaying;
