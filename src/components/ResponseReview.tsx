import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ResponseReview = () => {
  const [agentResponse, setAgentResponse] = useState("");
  const [review, setReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const reviewAgentResponse = async () => {
    if (!agentResponse.trim()) {
      toast.error("Por favor, insira a resposta do atendente");
      return;
    }

    setIsReviewing(true);
    setReview("");

    try {
      const { data, error } = await supabase.functions.invoke("analyze-message", {
        body: {
          message: agentResponse,
          analysisType: "response",
        },
      });

      if (error) throw error;

      setReview(data.analysis);
      toast.success("Revisão concluída!");
    } catch (error) {
      console.error("Error reviewing response:", error);
      toast.error("Erro ao revisar resposta. Tente novamente.");
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            Verificação da Resposta do Atendente
          </CardTitle>
          <CardDescription>
            Cole a resposta do atendente para receber correções gramaticais, análise de empatia e sugestões de melhoria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="agent-response" className="text-sm font-medium mb-2 block">
              Resposta do Atendente
            </label>
            <Textarea
              id="agent-response"
              placeholder="Cole aqui a resposta preparada pelo atendente..."
              value={agentResponse}
              onChange={(e) => setAgentResponse(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <Button 
            onClick={reviewAgentResponse} 
            disabled={isReviewing || !agentResponse.trim()}
            className="w-full"
            variant="default"
          >
            {isReviewing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Revisando...
              </>
            ) : (
              "Revisar Resposta"
            )}
          </Button>
        </CardContent>
      </Card>

      {review && (
        <div className="grid lg:grid-cols-[350px,1fr] gap-6">
          <Card className="border-primary/30 shadow-md">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Modelos de Resposta
              </CardTitle>
              <CardDescription className="text-xs">
                Exemplos de boas práticas de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Cliente Frustrado</h4>
                <p className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded border border-border/50 leading-relaxed">
                  "Compreendo perfeitamente sua frustração. Vou verificar imediatamente o que aconteceu e garantir que isso seja resolvido o mais rápido possível. Pode contar comigo para acompanhar pessoalmente este caso."
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Cliente Confuso</h4>
                <p className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded border border-border/50 leading-relaxed">
                  "Entendo que possa parecer confuso. Deixe-me explicar de forma mais clara: [explicação passo a passo]. Estou aqui para esclarecer qualquer dúvida adicional."
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Solicitação Geral</h4>
                <p className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded border border-border/50 leading-relaxed">
                  "Obrigado por entrar em contato! Ficarei feliz em ajudar. Para atendê-lo da melhor forma, [ação necessária]. Estou à disposição para qualquer esclarecimento."
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Cliente Irritado</h4>
                <p className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded border border-border/50 leading-relaxed">
                  "Peço sinceras desculpas pelo transtorno. Reconheço a gravidade da situação e vou priorizar a resolução imediata. Entrarei em contato com você assim que houver atualização."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success shadow-lg">
            <CardHeader className="bg-gradient-to-r from-success/10 to-accent/10">
              <CardTitle className="text-success flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Feedback da Revisão
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground bg-secondary/30 p-6 rounded-lg border border-border">
                  {review}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
