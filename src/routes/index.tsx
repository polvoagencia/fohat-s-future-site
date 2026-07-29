import { createFileRoute } from "@tanstack/react-router";

type HomeSearch = {
  openBriefing?: "1";
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    openBriefing: search.openBriefing === "1" ? "1" : undefined,
  }),
  component: HomePage,
});

function HomePage() {
  const { openBriefing } = Route.useSearch();
  const src = openBriefing
    ? "/fohat/home.html?openBriefing=1"
    : "/fohat/home.html";

  return (
    <iframe
      title="FOHAT"
      src={src}
      style={{
        display: "block",
        width: "100%",
        height: "100dvh",
        border: 0,
        background: "#07111f",
      }}
    />
  );
}
