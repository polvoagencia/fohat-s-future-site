import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/acervo-terrua-fohat")({
  loader: () => {
    throw redirect({ to: "/acervo-compartilhado", replace: true });
  },
});
