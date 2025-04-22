import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MealPlanner from "./pages/MealPlanner";
import Chatbot from "./pages/Chatbot";
import Shop from "./pages/Shop";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import MalnutritionPage from "./pages/education/Malnutrition";
import BalancedDietPage from "./pages/education/BalancedDiet";
import NutritionMythsPage from "./pages/education/NutritionMyths";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/malnutrition" element={<MalnutritionPage />} />
            <Route path="/education/balanced-diet" element={<BalancedDietPage />} />
            <Route path="/education/nutrition-myths" element={<NutritionMythsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
