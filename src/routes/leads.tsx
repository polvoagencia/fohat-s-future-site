import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads FOHAT — Briefings recebidos" },
      {
        name: "description",
        content: "Área interna da FOHAT para consultar os briefings enviados pelo site.",
      },
      { property: "og:title", content: "Leads FOHAT — Briefings recebidos" },
      { property: "og:description", content: "Área interna para consultar os briefings do site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LeadsPage,
});

type Lead = {
  id: string;
  created_at: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  empresa: string | null;
  frente: string | null;
  tipo_projeto: string | null;
  local: string | null;
  prazo: string | null;
  mensagem: string | null;
  itens_catalogo: string[] | null;
};

function LeadsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data: d }) => {
      setSession(d.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return <Shell>Carregando…</Shell>;
  if (!session) return <AuthForm />;
  return <LeadsTable onSignOut={() => supabase.auth.signOut()} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: "#07111f" }} className="min-h-[100dvh] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/leads` },
          });
    setLoading(false);
    if (error) setMsg(error.message);
    else if (mode === "up") setMsg("Conta criada. Verifique seu e-mail se a confirmação estiver ativa.");
  }

  return (
    <Shell>
      <div className="mx-auto mt-16 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-2xl font-semibold">Acesso interno FOHAT</h1>
        <p className="mt-2 text-sm text-white/60">Entre para consultar os briefings recebidos.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/40"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#07111f] disabled:opacity-60"
          >
            {mode === "in" ? "Entrar" : "Criar conta"}
          </button>
        </form>
        {msg && <p className="mt-3 text-xs text-amber-300">{msg}</p>}
        <button
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-4 text-xs text-white/50 underline"
        >
          {mode === "in" ? "Criar uma conta de acesso" : "Já tenho conta"}
        </button>
      </div>
    </Shell>
  );
}

function LeadsTable({ onSignOut }: { onSignOut: () => void }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setLeads((data ?? []) as Lead[]);
      });
  }, []);

  return (
    <Shell>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Briefings recebidos</h1>
          <p className="text-sm text-white/60">{leads ? `${leads.length} registro(s)` : "Carregando…"}</p>
        </div>
        <button onClick={onSignOut} className="rounded-full border border-white/20 px-4 py-2 text-xs">
          Sair
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      <div className="mt-8 space-y-4">
        {leads?.length === 0 && (
          <p className="text-sm text-white/50">Nenhum briefing recebido ainda.</p>
        )}
        {leads?.map((lead) => (
          <article key={lead.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium">{lead.nome || "Sem nome"}</h2>
              <span className="text-xs text-white/40">
                {new Date(lead.created_at).toLocaleString("pt-BR")}
              </span>
            </div>
            <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <Field label="E-mail" value={lead.email} />
              <Field label="Telefone" value={lead.telefone} />
              <Field label="Empresa" value={lead.empresa} />
              <Field label="Frente" value={lead.frente} />
              <Field label="Tipo de projeto" value={lead.tipo_projeto} />
              <Field label="Local" value={lead.local} />
              <Field label="Prazo" value={lead.prazo} />
              <Field label="Itens do catálogo" value={lead.itens_catalogo?.join(", ") || null} />
            </dl>
            {lead.mensagem && <p className="mt-3 text-sm text-white/70">{lead.mensagem}</p>}
          </article>
        ))}
      </div>
    </Shell>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-white/40">{label}</dt>
      <dd className="text-white/80">{value}</dd>
    </div>
  );
}