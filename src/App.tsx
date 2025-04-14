
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlockchainPage from "./pages/BlockchainPage";
import NodesPage from "./pages/NodesPage";
import DockerPage from "./pages/DockerPage";
import DexPage from "./pages/DexPage";
import CliPage from "./pages/CliPage";
import ClientPage from "./pages/ClientPage";
import NotFound from "./pages/NotFound";
import VmiaClientApp from "./pages/VmiaClientApp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5000,
      refetchOnWindowFocus: true,
    },
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
          <Route path="/nodes" element={<NodesPage />} />
          <Route path="/docker" element={<DockerPage />} />
          <Route path="/dex" element={<DexPage />} />
          <Route path="/cli" element={<CliPage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/app" element={<VmiaClientApp />} />
          <Route path="/settings" element={<ClientPage />} /> {/* Temporary redirect to client page */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
