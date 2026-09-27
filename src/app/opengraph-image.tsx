import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { renderAvatarSvg } from "@/lib/avatar-grid";
import { fetchGoogleFont } from "@/lib/og-fonts";

// Static (no dynamic segments here), so Next generates this once at build
// time and caches it — this fetch runs per build, not per visitor.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hardcoded to the retro-green dark theme regardless of a visitor's chosen
// palette: a share-preview image is the site's fixed brand identity, not a
// live, theme-reactive surface.
const COLORS = {
  bg: "#070b08",
  surface2: "#111a14",
  border: "#2a3d31",
  fg: "#d6e6da",
  muted: "#8aa393",
  accent: "#4ef08a",
};

export default async function Image() {
  const [spaceGrotesk, jetbrainsMono] = await Promise.all([
    fetchGoogleFont("Space Grotesk", 700),
    fetchGoogleFont("JetBrains Mono", 500),
  ]);

  const avatarSvg = renderAvatarSvg({ accent: COLORS.accent, lensColor: "rgba(78,240,138,0.35)" });
  const avatarUri = `data:image/svg+xml;base64,${Buffer.from(avatarSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.bg,
          padding: "70px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            display: "flex",
            background: "radial-gradient(circle, rgba(78,240,138,0.18) 0%, rgba(78,240,138,0) 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 60 }}>
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 28, color: COLORS.accent }}>
            {`~/${profile.handle}_`}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 84,
              color: COLORS.fg,
              marginTop: 22,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 30, color: COLORS.accent, marginTop: 16 }}
          >
            {`${profile.role} @ ${profile.company}`}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 26,
              color: COLORS.muted,
              marginTop: 26,
              maxWidth: 620,
              lineHeight: 1.5,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              width: 340,
              height: 340,
              borderRadius: 28,
              border: `2px solid ${COLORS.border}`,
              backgroundColor: COLORS.surface2,
              padding: 28,
            }}
          >
            {/* next/og renders via satori, not the DOM — a plain <img> is required here. */}
            <img src={avatarUri} width={284} height={284} style={{ display: "flex" }} alt="" />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: jetbrainsMono, weight: 500, style: "normal" },
      ],
    },
  );
}
