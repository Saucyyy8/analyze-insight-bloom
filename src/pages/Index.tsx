import { useState } from "react";
import { Search, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import SearchInterface from "@/components/SearchInterface";
import ResultsDisplay from "@/components/ResultsDisplay";

const Index = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async (input: string, type: 'url' | 'description') => {
    setIsAnalyzing(true);
    
    try {
      // This would connect to your Spring Boot backend
      // Example: const response = await fetch('/api/analyze', { ... });
      
      // Mock delay for demo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results for demonstration
      const mockResults = {
        query: input,
        products: [
          {
            id: 1,
            name: "Premium Wireless Headphones Pro",
            price: "$199.99",
            rating: 4.8,
            image: "/placeholder.svg",
            pros: ["Excellent sound quality", "Long battery life", "Comfortable fit"],
            cons: ["Expensive", "Heavy for extended use"],
            score: 92,
            isRecommended: true
          },
          {
            id: 2,
            name: "Budget Wireless Earbuds",
            price: "$49.99",
            rating: 4.2,
            image: "/placeholder.svg",
            pros: ["Affordable", "Good battery", "Compact"],
            cons: ["Average sound", "Plastic build"],
            score: 78,
            isRecommended: false
          },
          {
            id: 3,
            name: "Studio Quality Headphones",
            price: "$299.99",
            rating: 4.9,
            image: "/placeholder.svg",
            pros: ["Professional quality", "Detachable cable", "Excellent build"],
            cons: ["Very expensive", "Not wireless"],
            score: 89,
            isRecommended: false
          }
        ]
      };
      
      setSearchResults(mockResults);
      toast({
        title: "Analysis Complete!",
        description: "Found and analyzed the best products for you.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SearchInterface onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
      {searchResults && (
        <ResultsDisplay results={searchResults} />
      )}
    </div>
  );
};

export default Index;
