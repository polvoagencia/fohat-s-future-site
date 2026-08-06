import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/acervo-terrua-fohat")({
  head: () => ({
    meta: [
      { title: "Acervo compartilhado | Terruá × FOHAT" },
      {
        name: "description",
        content:
          "Acervo compartilhado Terruá × FOHAT: totens interativos, tablets, impressoras, áudio, vídeo, conectividade e infraestrutura para eventos e ativações.",
      },
      { property: "og:title", content: "Acervo compartilhado | Terruá × FOHAT" },
      {
        property: "og:description",
        content:
          "Acervo reunido para ativações, eventos e experiências itinerantes. Equipamentos de interação, áudio, vídeo, conectividade e operação em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcervoTerruaFohatPage,
});

function AcervoTerruaFohatPage() {
  return (
    <iframe
      title="Acervo compartilhado Terruá × FOHAT"
      src="/fohat/acervo-terrua-fohat.html"
      style={{
        display: "block",
        width: "100%",
        height: "100dvh",
        border: 0,
        background: "#f4f7fb",
      }}
    />
  );
}
