import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  nome: z.string().trim().max(120).optional().nullable(),
  email: z.string().trim().max(255).optional().nullable(),
  telefone: z.string().trim().max(60).optional().nullable(),
  empresa: z.string().trim().max(160).optional().nullable(),
  frente: z.string().trim().max(160).optional().nullable(),
  tipo_projeto: z.string().trim().max(160).optional().nullable(),
  local: z.string().trim().max(160).optional().nullable(),
  prazo: z.string().trim().max(160).optional().nullable(),
  orcamento: z.string().trim().max(160).optional().nullable(),
  mensagem: z.string().trim().max(4000).optional().nullable(),
  itens_catalogo: z.array(z.string().max(200)).max(100).optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid json" }, { status: 400, headers: corsHeaders });
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "invalid payload" }, { status: 400, headers: corsHeaders });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("leads").insert({
          ...parsed.data,
          itens_catalogo: parsed.data.itens_catalogo ?? [],
          payload: (parsed.data.payload ?? {}) as never,
          origem: "site",
        });

        if (error) {
          console.error("[leads] insert failed", error.message);
          return Response.json({ error: "could not save lead" }, { status: 500, headers: corsHeaders });
        }

        return Response.json({ ok: true }, { headers: corsHeaders });
      },
    },
  },
});