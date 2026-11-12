# CollAI

Assistente para quem atende cliente por texto. Tem duas funções:

- **Análise do cliente:** cola a mensagem que o cliente mandou e recebe o que ele realmente está pedindo, o estado emocional (com a justificativa) e uma orientação de como responder.
- **Revisão de resposta:** cola a resposta que você escreveu, informa o contexto (cliente irritado, frustrado, confuso ou solicitação geral) e recebe os pontos a ajustar antes de enviar.

Uma barra lateral traz lembretes rápidos de boas práticas, como reconhecer a emoção antes de oferecer solução e evitar frase ambígua.

## Stack

- React, TypeScript, Vite, Tailwind e shadcn/ui
- Supabase Edge Function (`supabase/functions/analyze-message`)
- Gemini 2.5 Flash, chamado pelo gateway de IA da Lovable

## Rodando

```
npm install
npm run dev
```

A função precisa da variável `LOVABLE_API_KEY` configurada no Supabase.

## Status

Protótipo feito para testar a ideia com o time de atendimento. Não guarda nenhuma mensagem: tudo que é colado vai para o modelo e volta.
