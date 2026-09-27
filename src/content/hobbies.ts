/**
 * "Off the clock" section. Each hobby needs one personal detail; that's what
 * makes it memorable. `icon` names a pixel icon in components/icons/pixel.tsx.
 */
export type Place = {
  name: string;
  lat: number;
  lng: number;
  /** false hides the name on the map (used for the Indian states — labeling
   * all ten at this zoom would be an unreadable blob); still counted and
   * still listed in the map's accessible name. Defaults to true. */
  label?: boolean;
};

export const travel = {
  title: "Travel",
  blurb: "Equal parts Himalayan treks and Southeast Asian beaches.",
  places: [
    // Abroad — labeled on the map.
    { name: "Japan", lat: 35.6762, lng: 139.6503 },
    { name: "Vietnam", lat: 21.0278, lng: 105.8342 },
    { name: "Thailand", lat: 13.7563, lng: 100.5018 },
    { name: "Philippines", lat: 14.5995, lng: 120.9842 },
    { name: "Indonesia", lat: -6.2088, lng: 106.8456 },
    { name: "Luxembourg", lat: 49.6117, lng: 6.1319 },
    // India, by state/UT — unlabeled dots (see `label` above).
    { name: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, label: false },
    { name: "Himachal Pradesh", lat: 32.2432, lng: 77.1892, label: false },
    { name: "Uttarakhand", lat: 30.7002, lng: 79.616, label: false },
    { name: "Punjab", lat: 31.634, lng: 74.8723, label: false },
    { name: "Haryana", lat: 29.9695, lng: 76.8783, label: false },
    { name: "Rajasthan", lat: 26.9124, lng: 75.7873, label: false },
    { name: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, label: false },
    { name: "Maharashtra", lat: 19.076, lng: 72.8777, label: false },
    { name: "Goa", lat: 15.4909, lng: 73.8278, label: false },
    { name: "Andaman & Nicobar Islands", lat: 11.6234, lng: 92.7265, label: false },
  ] satisfies Place[],
  nextTrip: "Malaysia",
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
      { label: "highest", value: "Hemkund Sahib, 4,572 m" },
      { label: "dream", value: "Annapurna Base Camp" },
    ],
  },
  {
    id: "calisthenics",
    icon: "dumbbell",
    title: "Calisthenics",
    facts: [{ label: "chasing", value: "Front lever" }],
    progress: { label: "front lever", value: 40 },
  },
  {
    id: "badminton",
    icon: "shuttle",
    title: "Badminton",
    facts: [{ label: "highlight", value: "Represented Ghaziabad at the UP state tournament" }],
  },
  {
    id: "f1",
    icon: "flag",
    title: "Formula 1",
    facts: [
      { label: "team", value: "Ferrari" },
      { label: "driver", value: "Lewis Hamilton" },
    ],
  },
  {
    id: "ps5",
    icon: "gamepad",
    title: "PS5",
    wide: true,
    facts: [
      { label: "now playing", value: "The Last of Us" },
      { label: "all-time fav", value: "God of War Ragnarök" },
    ],
  },
  {
    id: "anime",
    icon: "bolt",
    title: "Anime",
    wide: true,
    facts: [
      { label: "watching", value: "Pokémon · Dragon Ball" },
      { label: "fav", value: "Vegeta" },
    ],
  },
];
