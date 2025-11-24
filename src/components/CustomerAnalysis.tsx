import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const CustomerAnalysis = () => {
  const [customerMessage, setCustomerMessage] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCustomerMessage = async () => {
    if (!customerMessage.trim()) {
      toast.error("Por favor, insira a mensagem do cliente");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis("");

    try {
      const { data, error } = await supabase.functions.invoke("analyze-message", {
        body: {
          message: customerMessage,
          analysisType: "customer",
        },
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success("Análise concluída!");
    } catch (error) {
      console.error("Error analyzing message:", error);
      toast.error("Erro ao analisar mensagem. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Análise da Mensagem do Cliente
          </CardTitle>
          <CardDescription>
            Cole a mensagem do cliente para receber uma análise completa de intenção, emoções e orientações de resposta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="customer-message" className="text-sm font-medium mb-2 block">
              Mensagem do Cliente
            </label>
            <Textarea
              id="customer-message"
              placeholder="Cole aqui a mensagem enviada pelo cliente..."
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <Button 
            onClick={analyzeCustomerMessage} 
            disabled={isAnalyzing || !customerMessage.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              "Analisar Mensagem"
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card className="border-accent shadow-lg">
          <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
            <CardTitle className="text-accent flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Resultado da Análise
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground bg-secondary/30 p-6 rounded-lg border border-border">
                {analysis}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
