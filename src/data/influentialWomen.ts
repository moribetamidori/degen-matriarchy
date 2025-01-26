export interface WomanProfile {
  id: number;
  name: string;
  image: string;
  description: string;
  achievements: string[];
  field: string;
  birthYear: number;
  tags: string[];
}

export const influentialWomen: WomanProfile[] = [
  {
    id: 1,
    name: "Frida Kahlo",
    image: "/profiles/frida.png",
    description:
      "Mexican artist known for her vibrant self-portraits and works inspired by nature and Mexican culture.",
    achievements: [
      "Created 143 paintings including 55 self-portraits",
      "First Mexican artist featured at the Louvre",
      "Inspired feminist movement in art",
    ],
    field: "Art",
    birthYear: 1907,
    tags: ["Artist"],
  },
  {
    id: 2,
    name: "Nina Simone",
    image: "/profiles/nina.png",
    description:
      "American singer, songwriter, pianist, and civil rights activist who blended classical, jazz, blues, folk, and pop.",
    achievements: [
      "Released over 40 albums",
      "Grammy Hall of Fame inductee",
      "Pioneered civil rights music",
    ],
    field: "Music",
    birthYear: 1933,
    tags: ["Musician", "Activist"],
  },
  {
    id: 3,
    name: "Gertrude Ederle",
    image: "/profiles/gertrude.png",
    description:
      "American competitive swimmer, Olympic champion, and former world record holder. First woman to swim across the English Channel.",
    achievements: [
      "First woman to swim across the English Channel (1926)",
      "Olympic gold medalist (1924)",
      "Set 29 national and world records",
      "Inducted into the International Swimming Hall of Fame",
    ],
    field: "Sports",
    birthYear: 1905,
    tags: ["Athlete", "Olympic Medalist"],
  },
  {
    id: 4,
    name: "Ada Lovelace",
    image: "/profiles/ada.png",
    description:
      "English mathematician and writer, known for her work on Charles Babbage's early mechanical general-purpose computer, the Analytical Engine.",
    achievements: [
      "Wrote the first algorithm intended to be processed by a machine",
      "Recognized as the first computer programmer",
      "Pioneered the concept that computers could do more than just calculations",
      "Created the first computer program in history",
    ],
    field: "Computer Science",
    birthYear: 1815,
    tags: ["Computer Scientist", "Mathematician"],
  },
  {
    id: 5,
    name: "Grace Hopper",
    image: "/profiles/grace.png",
    description:
      "American computer scientist and United States Navy rear admiral who was a pioneer of computer programming. She invented one of the first linkers and popularized the term 'debugging'.",
    achievements: [
      "Invented the first compiler for a computer programming language",
      "Developed COBOL programming language",
      "Awarded Presidential Medal of Freedom",
      "First woman to receive Computer Sciences Man of the Year Award",
    ],
    field: "Computer Science",
    birthYear: 1906,
    tags: ["Computer Scientist", "Naval Officer"],
  },
  {
    id: 6,
    name: "Amelia Earhart",
    image: "/profiles/amelia.png",
    description:
      "American aviation pioneer and author who was the first female aviator to fly solo across the Atlantic Ocean and set many other records.",
    achievements: [
      "First female aviator to fly solo across the Atlantic Ocean",
      "First person to fly solo from Hawaii to the U.S. mainland",
      "Set multiple aviation speed and distance records",
      "Helped form The Ninety-Nines, an organization of women pilots",
    ],
    field: "Aviation",
    birthYear: 1897,
    tags: ["Aviator", "Author"],
  },
  {
    id: 7,
    name: "Marie Curie",
    image: "/profiles/marie.png",
    description:
      "Polish-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in multiple sciences.",
    achievements: [
      "First woman to win a Nobel Prize",
      "Only person to win Nobel Prizes in multiple sciences (Physics and Chemistry)",
      "Discovered the elements polonium and radium",
      "Founded the Curie Institutes in Paris and Warsaw",
    ],
    field: "Physics & Chemistry",
    birthYear: 1867,
    tags: ["Physicist", "Chemist", "Nobel Laureate"],
  },
  {
    id: 8,
    name: "Idoia López Riaño",
    image: "/profiles/idoia.png",
    description:
      "Former member of the Basque separatist group ETA, known for her involvement in several high-profile attacks during the 1980s.",
    achievements: [
      "Involved in ETA's activities during the 1980s",
      "Known for her role in high-profile attacks",
      "Killed 23 people",
    ],
    field: "Activism",
    birthYear: 1964,
    tags: ["Activist", "Killer"],
  },
  {
    id: 9,
    name: "Diane Hendricks",
    image: "/profiles/diane.png",
    description:
      "American businesswoman and film producer, known for being the chairperson of ABC Supply, one of the largest wholesale distributors of roofing, siding, and windows in America.",
    achievements: [
      "Co-founded ABC Supply in 1982",
      "Named one of Forbes' richest self-made women",
      "Philanthropist supporting education and economic development",
    ],
    field: "Business",
    birthYear: 1947,
    tags: ["Businesswoman"],
  },
  {
    id: 10,
    name: "Taylor Swift",
    image: "/profiles/taylor.png",
    description:
      "American singer-songwriter known for her narrative songwriting and versatile musical style, which has earned her numerous awards and a global fanbase.",
    achievements: [
      "Won 11 Grammy Awards",
      "First female artist to win Album of the Year three times",
      "Advocate for artists' rights and gender equality",
      "Sold over 200 million records worldwide",
    ],
    field: "Music",
    birthYear: 1989,
    tags: ["Musician", "Activist"],
  },
  {
    id: 11,
    name: "Chien-Shiung Wu",
    image: "/profiles/wu.png",
    description:
      "Chinese-American physicist who made significant contributions to nuclear physics and helped disprove the law of conservation of parity. Known as the 'First Lady of Physics' and the 'Chinese Madame Curie'.",
    achievements: [
      "Contributed to the Manhattan Project",
      "Conducted the Wu Experiment, disproving the law of conservation of parity",
      "First female president of the American Physical Society",
      "First living scientist to have an asteroid named after her",
    ],
    field: "Physics",
    birthYear: 1912,
    tags: ["Physicist", "Scientist"],
  },
  {
    id: 12,
    name: "Lin Huiyin",
    image: "/profiles/lin.png",
    description:
      "Chinese architect, architectural historian, and poet who became the first female architect in modern China. She played a crucial role in documenting and preserving traditional Chinese architecture.",
    achievements: [
      "First female architect in modern China",
      "Conducted groundbreaking surveys of Chinese traditional architecture",
      "Helped design the Chinese national emblem",
      "Pioneer in architectural education in China",
    ],
    field: "Architecture",
    birthYear: 1904,
    tags: ["Architect", "Poet", "Historian"],
  },
  {
    id: 13,
    name: "Rosalind Franklin",
    image: "/profiles/franklin.png",
    description:
      "British chemist and X-ray crystallographer whose work was central to understanding the molecular structures of DNA, RNA, viruses, coal, and graphite.",
    achievements: [
      "Produced the famous Photo 51 that helped reveal DNA's double helix structure",
      "Made breakthrough discoveries about viral structures",
      "Pioneered the use of X-ray diffraction techniques",
      "Contributed fundamental research to the understanding of molecular structures",
    ],
    field: "Chemistry",
    birthYear: 1920,
    tags: ["Chemist", "Crystallographer"],
  },
  {
    id: 14,
    name: "Deng Yingchao",
    image: "/profiles/deng.png",
    description:
      "Chinese revolutionary, politician and women's rights activist who served as the Chairwoman of the Chinese People's Political Consultative Conference from 1983 to 1988.",
    achievements: [
      "Led the Chinese women's suffrage movement",
      "Helped establish the All-China Women's Federation",
      "Served as Chairwoman of the CPPCC",
      "Pioneered women's rights and education in China",
    ],
    field: "Politics",
    birthYear: 1904,
    tags: ["Politician", "Activist", "Revolutionary"],
  },
];
