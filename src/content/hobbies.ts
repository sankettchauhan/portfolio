/**
 * "Off the clock" section. Each hobby needs one personal detail; that's what
 * makes it memorable. `icon` names a pixel icon in components/icons/pixel.tsx.
 */
export type Place = { name: string; lat: number; lng: number };

export const travel = {
  title: "Travel",
  blurb: "[One line about how you like to travel.]",
  // Pins on the travel map. Replace with places you've actually been.
  places: [
    { name: "[Manali]", lat: 32.24, lng: 77.19 },
    { name: "[Goa]", lat: 15.3, lng: 74.12 },
    { name: "[Rishikesh]", lat: 30.09, lng: 78.27 },
    { name: "[Jaipur]", lat: 26.91, lng: 75.79 },
    { name: "[Kerala]", lat: 10.0, lng: 76.3 },
  ] satisfies Place[],
  lastTrip: "[last trip]",
  nextTrip: "[next on the list]",
};

export type Hobby = {
  id: string;
  icon: "mountain" | "dumbbell" | "shuttle" | "gamepad" | "flag" | "bolt";
  title: string;
  facts: { label: string; value: string }[];
  /** Optional 0–100 progress bar, e.g. for a training goal. */
  progress?: { label: string; value: number };
  wide?: boolean;
};

export const hobbies: Hobby[] = [
  {
    id: "trekking",
    icon: "mountain",
    title: "Trekking",
    facts: [
      { label: "highest", value: "[e.g. Kedarkantha, 3,800 m]" },
      { label: "next", value: "[dream trek]" },
    ],
  },
  {
    id: "calisthenics",
    icon: "dumbbell",
    title: "Calisthenics",
    facts: [{ label: "chasing", value: "[e.g. muscle-up]" }],
    progress: { label: "[goal]", value: 60 },
  },
  {
    id: "badminton",
    icon: "shuttle",
    title: "Badminton",
    facts: [{ label: "plays", value: "[e.g. doubles, weekend mornings]" }],
  },
  {
    id: "f1",
    icon: "flag",
    title: "Formula 1",
    facts: [
      { label: "team", value: "[team]" },
      { label: "driver", value: "[driver]" },
    ],
  },
  {
    id: "ps5",
    icon: "gamepad",
    title: "PS5",
    wide: true,
    facts: [
      { label: "now playing", value: "[game]" },
      { label: "all-time fav", value: "[game]" },
    ],
  },
  {
    id: "anime",
    icon: "bolt",
    title: "Anime",
    wide: true,
    facts: [
      { label: "watching", value: "Pokémon · Dragon Ball" },
      { label: "fav", value: "[character]" },
    ],
  },
];
