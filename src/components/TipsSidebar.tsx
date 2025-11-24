import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Heart, MessageCircle, Shield, CheckCircle } from "lucide-react";

interface TipsSidebarProps {
  type: "customer" | "response";
}

export const TipsSidebar = ({ type }: TipsSidebarProps) => {
  if (type === "customer") {
    return (
      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Dicas de Análise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Alert className="bg-background/50">
              <Heart className="h-4 w-4 text-accent" />
              <AlertDescription>
                <strong>Identifique emoções:</strong> Palavras como "urgente", "preciso", "não funciona" indicam frustração ou ansiedade.
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-background/50">
              <MessageCircle className="h-4 w-4 text-primary" />
              <AlertDescription>
                <strong>Tom de voz:</strong> Letras maiúsculas, pontuação excessiva (!!! ???) sugerem irritação ou urgência.
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-background/50">
              <Shield className="h-4 w-4 text-success" />
              <AlertDescription>
                <strong>Contexto completo:</strong> Sempre busque entender a situação completa antes de responder.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Boas Práticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success mt-2" />
              <p>Reconheça a emoção do cliente antes de oferecer soluções</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success mt-2" />
              <p>Use linguagem clara e evite termos técnicos complexos</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success mt-2" />
              <p>Demonstre que você entendeu a preocupação do cliente</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success mt-2" />
              <p>Seja específico ao oferecer soluções ou próximos passos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Dicas de Revisão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Alert className="bg-background/50">
            <Heart className="h-4 w-4 text-accent" />
            <AlertDescription>
              <strong>Empatia primeiro:</strong> Inicie reconhecendo a situação do cliente antes de apresentar soluções.
            </AlertDescription>
          </Alert>
          
          <Alert className="bg-background/50">
            <MessageCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              <strong>Clareza:</strong> Evite jargões e frases longas. Seja direto e compreensível.
            </AlertDescription>
          </Alert>
          
          <Alert className="bg-background/50">
            <Shield className="h-4 w-4 text-success" />
            <AlertDescription>
              <strong>Profissionalismo:</strong> Mantenha tom respeitoso mesmo em situações difíceis.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-success/5 to-accent/5 border-success/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            O que Evitar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2" />
            <p><strong>Sarcasmo ou ironia</strong> - Podem ser mal interpretados</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2" />
            <p><strong>Frases ambíguas</strong> - Que possam gerar dupla interpretação</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2" />
            <p><strong>Minimizar problemas</strong> - "É só...", "Basta apenas..."</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2" />
            <p><strong>Linguagem informal demais</strong> - Mantenha profissionalismo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
