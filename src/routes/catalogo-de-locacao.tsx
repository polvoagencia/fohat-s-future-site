import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo-de-locacao")({
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
