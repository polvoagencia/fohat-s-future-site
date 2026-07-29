import { createFileRoute } from "@tanstack/react-router";

type HomeSearch = {
  openBriefing?: "1";
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    openBriefing: search.openBriefing === "1" ? "1" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "FOHAT — Tecnologia e locação de equipamentos audiovisuais" },
      {
        name: "description",
        content:
          "FOHAT: soluções audiovisuais, locação de equipamentos e produção técnica para eventos e experiências imersivas.",
      },
      { property: "og:title", content: "FOHAT — Tecnologia e locação audiovisual" },
      {
        property: "og:description",
        content:
          "Soluções audiovisuais, locação de equipamentos e produção técnica para eventos e experiências imersivas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
