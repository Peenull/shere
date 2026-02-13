import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Sharing is Earning";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        background: "linear-gradient(to bottom right, #1E293B, #020617)", // slate-800 to slate-950
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "sans-serif",
        padding: 50,
      }}
    >
      <div
        style={{
          color: "#FACC15", // yellow-400
          fontSize: 90,
          fontWeight: "bolder",
          fontStyle: "italic",
          marginBottom: 30,
        }}
      >
        SHERE.
      </div>
      <div
        style={{
          fontSize: 50,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Sharing is Earning
      </div>
      <div style={{ fontSize: 30, color: "#94A3B8", textAlign: "center" }}>
        The easiest way to monetize your network.
      </div>
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
