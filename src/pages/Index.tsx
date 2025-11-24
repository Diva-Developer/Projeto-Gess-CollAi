import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerAnalysis } from "@/components/CustomerAnalysis";
import { ResponseReview } from "@/components/ResponseReview";
import { TipsSidebar } from "@/components/TipsSidebar";
import { Headphones } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <Headphones className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Call Center AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Análise inteligente de mensagens e respostas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="customer">Análise do Cliente</TabsTrigger>
            <TabsTrigger value="response">Revisão de Resposta</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <div className="grid lg:grid-cols-[1fr,350px] gap-6 max-w-7xl mx-auto">
              <div className="order-2 lg:order-1">
                <CustomerAnalysis />
              </div>
              <div className="order-1 lg:order-2 lg:sticky lg:top-4 self-start">
                <TipsSidebar type="customer" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="response">
            <div className="grid lg:grid-cols-[1fr,350px] gap-6 max-w-7xl mx-auto">
              <div className="order-2 lg:order-1">
                <ResponseReview />
              </div>
              <div className="order-1 lg:order-2 lg:sticky lg:top-4 self-start">
                <TipsSidebar type="response" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CollAI. Desenvolvido por Divanilson Silva</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
