CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT,
  email TEXT,
  telefone TEXT,
  empresa TEXT,
  frente TEXT,
  tipo_projeto TEXT,
  local TEXT,
  prazo TEXT,
  orcamento TEXT,
  mensagem TEXT,
  itens_catalogo TEXT[] NOT NULL DEFAULT '{}',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  origem TEXT NOT NULL DEFAULT 'site',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view leads"
ON public.leads FOR SELECT TO authenticated USING (true);