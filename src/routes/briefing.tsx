import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/briefing")({
  head: () => ({
    meta: [
      { title: "Briefing FOHAT — Conte o que precisa funcionar" },
      {
        name: "description",
        content:
          "Formulário interativo da FOHAT: responda etapa por etapa e receba o direcionamento certo para seu projeto de tecnologia, experiência ou locação.",
      },
      { property: "og:title", content: "Briefing FOHAT — Conte o que precisa funcionar" },
      {
        property: "og:description",
        content: "Briefing interativo em etapas para projetos de experiência, tecnologia e locação da FOHAT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BriefingPage,
});

function BriefingPage() {
  return (
    <iframe
      title="Briefing FOHAT"
      src="/fohat/briefing.html"
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
