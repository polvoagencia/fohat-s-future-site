import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cases-tela-brasil")({
  head: () => ({
    meta: [
      { title: "Case Tela Brasil — FOHAT" },
      {
        name: "description",
        content:
          "Case Tela Brasil da FOHAT em construção. Em breve, os detalhes completos do projeto.",
      },
      { property: "og:title", content: "Case Tela Brasil — FOHAT" },
      {
        property: "og:description",
        content: "Case Tela Brasil da FOHAT em construção. Em breve, os detalhes completos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseTelaBrasilPage,
});

function CaseTelaBrasilPage() {
  return (
    <main
      style={{ background: "#07111f" }}
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      <span className="text-xs uppercase tracking-[0.35em] text-white/50">FOHAT · Case Tela Brasil</span>
      <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Página em construção</h1>
      <p className="mt-4 max-w-md text-sm text-white/60">
        Estamos preparando esta seção para apresentar o case Tela Brasil da FOHAT.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        ← Voltar ao site
      </Link>
    </main>
  );
}