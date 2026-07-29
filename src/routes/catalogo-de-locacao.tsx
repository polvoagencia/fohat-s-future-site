import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo-de-locacao")({
  head: () => ({
    meta: [
      { title: "Catálogo de Locação — FOHAT" },
      {
        name: "description",
        content:
          "Confira o catálogo completo de equipamentos audiovisuais para locação da FOHAT e monte seu orçamento.",
      },
      { property: "og:title", content: "Catálogo de Locação — FOHAT" },
      {
        property: "og:description",
        content:
          "Catálogo completo de equipamentos audiovisuais para locação da FOHAT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <iframe
      title="Catálogo de locação FOHAT"
      src="/fohat/catalogo.html"
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
