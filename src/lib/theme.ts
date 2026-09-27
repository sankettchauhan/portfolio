export const THEMES = [
  { id: "green", label: "Retro green", swatch: "#4ef08a" },
  { id: "amber", label: "Amber", swatch: "#ffb23f" },
  { id: "purple", label: "Purple", swatch: "#b884ff" },
] as const;

export const MODES = ["dark", "light"] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type Mode = (typeof MODES)[number];

export const DEFAULT_THEME: ThemeId = "green";
export const DEFAULT_MODE: Mode = "dark";

export const THEME_KEY = "theme";
export const MODE_KEY = "mode";

/**
 * Runs in <head> before first paint so a saved theme never flashes the default.
 * Values are validated so a tampered localStorage can't inject attributes.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_KEY}"),m=localStorage.getItem("${MODE_KEY}");if(${JSON.stringify(
  THEMES.map((t) => t.id),
)}.indexOf(t)>-1)d.setAttribute("data-theme",t);if(${JSON.stringify(
  MODES,
)}.indexOf(m)>-1)d.setAttribute("data-mode",m)}catch(e){}})()`;
