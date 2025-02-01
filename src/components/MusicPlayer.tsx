import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";

interface Song {
  title: string;
  artist: string;
  file: string;
}

const songs: Song[] = [
  { title: "Chicane", artist: "Swarms", file: "/music/1.mp3" },
  { title: "Derecho", artist: "Photay", file: "/music/2.mp3" },
  {
    title: "Hidden Qi",
    artist: "Mindy Meng Wang",
    file: "/music/3.mp3",
  },
  { title: "Azukiiro No Kaori", artist: "Susumu Yokota", file: "/music/4.mp3" },
  { title: "Reality Picture", artist: "Patrick Holland", file: "/music/5.mp3" },
];

const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, playSong, playRandomSong } = useMusicPlayer();

  return (
    <div className="p-4 border border-[#1c41f1] rounded-lg">
      <div className="mb-4 mt-8">
        <button
          onClick={playRandomSong}
          className="w-full py-2 border border-[#1c41f1] rounded-lg text-[#1c41f1] hover:bg-[#1c41f1] hover:text-black transition-colors"
        >
          I&apos;m feeling vibey
        </button>
      </div>

      <div className="space-y-2">
        {songs.map((song, index) => (
          <button
            key={index}
            onClick={() => playSong(song)}
            className={`w-full p-2 border ${
              currentSong?.file === song.file && isPlaying
                ? "bg-[#1c41f1] text-black"
                : "border-[#1c41f1] text-[#1c41f1]"
            } rounded-lg hover:bg-[#1c41f1] hover:text-black transition-colors`}
          >
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="font-bold">{song.title}</div>
                <div className="text-sm opacity-75">{song.artist}</div>
              </div>
              {currentSong?.file === song.file ? (
                isPlaying ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaPlay className="text-xl" />
                )
              ) : (
                <FaPlay className="text-xl" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
