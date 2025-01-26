"use client";

import React, { createContext, useContext, useRef, useState } from "react";

interface Song {
  title: string;
  artist: string;
  file: string;
}

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  playRandomSong: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

const songs: Song[] = [
  { title: "Chicane", artist: "Swarms", file: "/music/chicane.mp3" },
  { title: "Derecho", artist: "Photay", file: "/music/derecho.mp3" },
  {
    title: "Hidden Qi",
    artist: "Mindy Meng Wang",
    file: "/music/hidden-qi.mp3",
  },
];

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const song = songs[randomIndex];
    playSong(song);
  };

  const playSong = (song: Song) => {
    if (currentSong?.file === song.file && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.file;
        audioRef.current.play();
        setCurrentSong(song);
        setIsPlaying(true);
      }
    }
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, isPlaying, playSong, playRandomSong }}>
      {children}
      <audio ref={audioRef} className="hidden" />
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}; 