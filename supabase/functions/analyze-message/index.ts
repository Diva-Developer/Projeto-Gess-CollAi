import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, analysisType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (analysisType === "customer") {
      systemPrompt = `Você é um especialista em análise de comunicação para call centers. Seja claro, objetivo e estruturado na sua análise. Use formatação com emojis para facilitar a leitura.`;
      
      userPrompt = `Analise esta mensagem de um cliente e forneça uma análise bem estruturada e clara:

📋 **1. ENTENDIMENTO DA MENSAGEM**

Identifique:
• Qual é a principal dúvida ou necessidade do cliente?
• Existem intenções secundárias ou problemas ocultos?

😊 **2. DETECÇÃO DE EMOÇÕES**

• Estado emocional identificado: [calmo/neutro/confuso/frustrado/irritado/muito irritado]
• Justificativa detalhada: Explique quais palavras, frases ou tom indicam essa emoção

💬 **3. ORIENTAÇÃO PARA RESPOSTA**

a) Tom recomendado: [empático/acolhedor/formal/instrutivo/outro]

b) Estratégias de interação:
• Como abordar o cliente
• Que tipo de solução priorizar
• Como estruturar a resposta

c) ⚠️ O QUE EVITAR:
• Termos ou palavras específicas
• Abordagens inadequadas
• Expressões que podem gerar má interpretação

d) ✅ FRASES RECOMENDADAS:
Liste 3-4 frases profissionais e empáticas que podem ser usadas neste contexto

Mensagem do cliente:
${message}`;
    } else if (analysisType === "response") {
      systemPrompt = `Você é um revisor especializado em comunicação de call center. Forneça feedback construtivo, claro e bem estruturado. Use formatação com emojis para facilitar a leitura.`;
      
      userPrompt = `Analise esta resposta de atendente e forneça um feedback detalhado e estruturado:

✍️ **1. ANÁLISE GRAMATICAL E ESTRUTURAL**

• Erros de gramática, concordância ou ortografia encontrados
• Problemas de estrutura ou clareza
• Sugestões de melhorias nas frases

😊 **2. AVALIAÇÃO DE TOM E EMPATIA**

• A resposta demonstra empatia adequada?
• O tom está profissional e respeitoso?
• A comunicação está clara e acessível?
• Há alinhamento com a emoção do cliente?

📝 **3. SUGESTÕES DE MELHORIA**

a) Pontos fortes da resposta atual:
• O que está bem feito

b) Pontos que precisam de ajuste:
• Liste especificamente o que melhorar

c) ✅ VERSÃO MELHORADA:
Forneça uma versão otimizada da resposta completa

d) 💡 FRASES ALTERNATIVAS:
Sugira 2-3 frases alternativas mais eficazes para partes específicas

Resposta do atendente:
${message}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente mais tarde." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione créditos ao seu workspace Lovable AI." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao processar análise" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ analysis }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in analyze-message function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
