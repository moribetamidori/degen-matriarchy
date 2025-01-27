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
    image: "/profiles/1.png",
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
    image: "/profiles/2.png",
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
    image: "/profiles/3.png",
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
    image: "/profiles/4.png",
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
    image: "/profiles/5.png",
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
    image: "/profiles/6.png",
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
    image: "/profiles/7.png",
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
    image: "/profiles/8.png",
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
    image: "/profiles/9.png",
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
    image: "/profiles/10.png",
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
    image: "/profiles/11.png",
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
    image: "/profiles/12.png",
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
    image: "/profiles/13.png",
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
    image: "/profiles/14.png",
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
  {
    id: 15,
    name: "Xiang Jingyu",
    image: "/profiles/15.png",
    description:
      "Chinese feminist pioneer and revolutionary who became the first leader of the Chinese Communist Party's Women's Department and fought for women's liberation and education rights.",
    achievements: [
      "First Director of the Communist Party's Women's Department",
      "Established schools for women's education",
      "Led movements for women's liberation in China",
      "Pioneered female labor rights movement",
    ],
    field: "Politics",
    birthYear: 1895,
    tags: ["Revolutionary", "Feminist", "Educator"],
  },
  {
    id: 16,
    name: "Artemisia Gentileschi",
    image: "/profiles/16.png",
    description:
      "Italian Baroque painter, considered one of the most accomplished painters in the generation after Caravaggio. She was the first woman to become a member of the Accademia di Arte del Disegno in Florence.",
    achievements: [
      "First woman member of the Accademia di Arte del Disegno",
      "Created groundbreaking feminist and biblical paintings",
      "Developed unique dramatic style in Baroque art",
      "Successfully ran her own studio in multiple cities",
    ],
    field: "Art",
    birthYear: 1593,
    tags: ["Artist", "Painter"],
  },
  {
    id: 17,
    name: "Eileen Chang",
    image: "/profiles/17.png",
    description:
      "Chinese writer whose work depicted the tensions between modern and traditional Chinese society. Her psychological insights and elegant writing style made her one of the most influential Chinese writers of the twentieth century.",
    achievements: [
      "Wrote influential novels including 'Love in a Fallen City'",
      "Pioneer of modern Chinese literature",
      "Created unique narrative style blending East and West",
      "Received the Modern Literature Award in Taiwan",
    ],
    field: "Literature",
    birthYear: 1920,
    tags: ["Writer", "Novelist"],
  },
  {
    id: 18,
    name: "Bertha Benz",
    image: "/profiles/18.png",
    description:
      "German automotive pioneer who was the first person to drive an automobile over a long distance. Her historic trip helped promote her husband's invention and demonstrated the potential of the automobile.",
    achievements: [
      "First person to drive an automobile long distance (1888)",
      "Pioneered brake lining",
      "Instrumental in the development of the automobile industry",
      "Demonstrated the viability of motor vehicles to the world",
    ],
    field: "Automotive",
    birthYear: 1849,
    tags: ["Pioneer", "Inventor"],
  },
  {
    id: 19,
    name: "Xia Peisu",
    image: "/profiles/19.png",
    description:
      "Chinese computer scientist known as the 'Mother of Computer Science in China'. She played a crucial role in developing China's first general-purpose electronic computer.",
    achievements: [
      "Led development of China's first general-purpose computer",
      "Established China's first computer science department",
      "Pioneered computer education in China",
      "Authored fundamental computer science textbooks",
    ],
    field: "Computer Science",
    birthYear: 1923,
    tags: ["Computer Scientist", "Educator"],
  },
  {
    id: 20,
    name: "Nettie Maria Stevens",
    image: "/profiles/20.png",
    description:
      "American geneticist who discovered sex chromosomes and their role in determining gender, making one of the most important breakthrough discoveries in the field of genetics.",
    achievements: [
      "Discovered XY sex-determination system",
      "Made groundbreaking contributions to genetics",
      "Published numerous influential research papers",
      "Advanced understanding of chromosomal inheritance",
    ],
    field: "Genetics",
    birthYear: 1861,
    tags: ["Geneticist", "Scientist"],
  },
  {
    id: 21,
    name: "Qian Zhengying",
    image: "/profiles/21.png",
    description:
      "Chinese hydraulic engineer and politician who made significant contributions to water conservancy in China. She served as the Minister of Water Resources and Electric Power.",
    achievements: [
      "First female Minister of Water Resources in China",
      "Led major water conservation projects",
      "Pioneered modern irrigation systems",
      "Contributed to China's hydraulic engineering development",
    ],
    field: "Engineering",
    birthYear: 1924,
    tags: ["Engineer", "Politician"],
  },
  {
    id: 22,
    name: "Hedy Lamarr",
    image: "/profiles/22.png",
    description:
      "Austrian-American actress and inventor who developed a radio guidance system using frequency-hopping spread spectrum technology, which later became fundamental to wireless communication systems.",
    achievements: [
      "Invented frequency-hopping spread spectrum technology",
      "Patented secret communication system",
      "Contributed to wireless communication development",
      "Inducted into the National Inventors Hall of Fame",
    ],
    field: "Engineering",
    birthYear: 1914,
    tags: ["Inventor", "Actress"],
  },
  {
    id: 23,
    name: "Hypatia",
    image: "/profiles/23.png",
    description:
      "Ancient Greek mathematician, astronomer, and philosopher in Alexandria, Egypt. She was one of the earliest known female mathematicians and astronomers.",
    achievements: [
      "Wrote commentaries on important mathematical works",
      "Taught philosophy and astronomy",
      "Invented the hydrometer",
      "Preserved and transmitted ancient mathematical knowledge",
    ],
    field: "Mathematics",
    birthYear: 350,
    tags: ["Mathematician", "Philosopher", "Astronomer"],
  },
  {
    id: 24,
    name: "Lin Qiaozhi",
    image: "/profiles/24.png",
    description:
      "Chinese physician who revolutionized modern Chinese obstetrics and gynecology. She was known as the 'Mother of Modern Chinese Obstetrics and Gynecology'.",
    achievements: [
      "Pioneered modern obstetrics in China",
      "Developed new surgical techniques",
      "Established China's first obstetrics hospital",
      "Trained generations of medical professionals",
    ],
    field: "Medicine",
    birthYear: 1901,
    tags: ["Doctor", "Medical Pioneer"],
  },
  {
    id: 25,
    name: "Yang Jiang",
    image: "/profiles/25.png",
    description:
      "Chinese playwright, author, and translator who made significant contributions to Chinese literature and translation. She was known for her wit, humor, and scholarly work.",
    achievements: [
      "Translated Don Quixote into Chinese",
      "Wrote influential plays and novels",
      "Published important scholarly works",
      "Contributed to modern Chinese literature",
    ],
    field: "Literature",
    birthYear: 1911,
    tags: ["Writer", "Translator", "Scholar"],
  },
  {
    id: 26,
    name: "Wu Zetian",
    image: "/profiles/26.png",
    description:
      "Chinese empress who ruled during the Tang Dynasty, becoming the only female emperor in Chinese history. She expanded the empire, reformed the government, and promoted Buddhism and education.",
    achievements: [
      "First and only female emperor of China",
      "Reformed civil service examination system",
      "Expanded Chinese territory significantly",
      "Promoted education and religious tolerance",
    ],
    field: "Politics",
    birthYear: 624,
    tags: ["Emperor", "Ruler", "Reformer"],
  },
  {
    id: 27,
    name: "Zenobia",
    image: "/profiles/27.png",
    description:
      "Queen of the Palmyrene Empire who conquered Egypt and much of the Roman East, challenging the authority of Rome. She was a skilled military commander and patron of learning and culture.",
    achievements: [
      "Expanded Palmyrene Empire to include Egypt and parts of Asia Minor",
      "Created one of the largest empires in ancient history",
      "Promoted cultural and intellectual development",
      "Successfully ruled a multi-ethnic empire",
    ],
    field: "Politics",
    birthYear: 240,
    tags: ["Queen", "Military Leader", "Ruler"],
  },
];
