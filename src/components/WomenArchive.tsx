"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { WomanProfile, influentialWomen } from "../data/influentialWomen";

const WomenArchive: React.FC = () => {
  const [selectedWoman, setSelectedWoman] = useState<WomanProfile | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique tags from all profiles
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    influentialWomen.forEach((woman) => {
      woman.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort women
  const filteredWomen = useMemo(() => {
    let filtered = [...influentialWomen];

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter((woman) =>
        selectedTags.some((tag) => woman.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      return sortOrder === "asc"
        ? a.birthYear - b.birthYear
        : b.birthYear - a.birthYear;
    });

    return filtered;
  }, [selectedTags, sortOrder]);

  const FilterMenu = () => (
    <div className="absolute right-0 top-12 bg-black border border-[#1c41f1] rounded-lg p-4 z-10 w-64">
      <div className="mb-4">
        <h3 className="text-[#1c41f1] font-bold mb-2">Sort by Year</h3>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="bg-black text-[#1c41f1] border border-[#1c41f1] rounded p-1 w-full"
        >
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-4 h-[80vh]">
      {selectedWoman ? (
        <div className="h-full flex flex-col">
          <button
            onClick={() => setSelectedWoman(null)}
            className="flex items-center text-[#1c41f1] hover:opacity-75 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Grid
          </button>

          <div className="border border-[#1c41f1] rounded-lg p-6 max-w-2xl mx-auto w-full overflow-y-auto">
            <div className="flex flex-col items-center">
              <Image
                src={selectedWoman.image}
                alt={selectedWoman.name}
                width={256}
                height={256}
                className="object-cover rounded-lg mb-4 opacity-80"
              />
              <h2 className="text-2xl font-bold mb-2 text-[#1c41f1]">
                {selectedWoman.name}
              </h2>
              <p className="text-[#1c41f1] mb-4">{selectedWoman.field}</p>
              <p className="mb-4 text-[#1c41f1]">{selectedWoman.description}</p>
              <h3 className="font-bold mb-2 text-[#1c41f1] self-start">
                Key Achievements:
              </h3>
              <ul className="list-disc list-inside text-[#1c41f1] self-start">
                {selectedWoman.achievements.map((achievement, index) => (
                  <li key={index} className="mb-1">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 overflow-x-auto flex-1 mr-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag)
                        ? prev.filter((t) => t !== tag)
                        : [...prev, tag]
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    selectedTags.includes(tag)
                      ? "bg-[#1c41f1] text-black"
                      : "border border-[#1c41f1] text-[#1c41f1]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-[#1c41f1] hover:opacity-75"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
              {isFilterOpen && <FilterMenu />}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredWomen.map((woman) => (
                <button
                  key={woman.id}
                  onClick={() => setSelectedWoman(woman)}
                  className="text-center hover:opacity-75 transition-opacity"
                >
                  <div className="border border-[#1c41f1] rounded-lg p-2">
                    <div className="aspect-square w-full mb-2">
                      <Image
                        src={woman.image}
                        alt={woman.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover rounded-lg opacity-80"
                      />
                    </div>
                    <p className="font-medium text-[#1c41f1] font-mono text-sm h-10 overflow-hidden line-clamp-2">
                      {woman.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenArchive;
