import { Star, ThumbsUp, ThumbsDown, Crown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  pros: string[];
  cons: string[];
  score: number;
  isRecommended: boolean;
}

interface ResultsDisplayProps {
  results: {
    query: string;
    products: Product[];
  };
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const recommendedProduct = results.products.find(p => p.isRecommended);
  const otherProducts = results.products.filter(p => !p.isRecommended);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Analysis Results
          </h2>
          <p className="text-lg text-muted-foreground">
            Based on your query: <span className="font-medium text-foreground">"{results.query}"</span>
          </p>
        </div>

        {/* Recommended Product */}
        {recommendedProduct && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-warning" />
              <h3 className="text-2xl font-bold">Our Top Recommendation</h3>
            </div>
            
            <Card className="result-card border-2 border-success bg-gradient-to-br from-success/5 to-transparent">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-success text-success-foreground">
                        Recommended
                      </Badge>
                      <h4 className="text-xl font-semibold mb-2">{recommendedProduct.name}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-success">{recommendedProduct.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="font-medium">{recommendedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Overall Score</span>
                      <span className="font-bold text-success">{recommendedProduct.score}/100</span>
                    </div>
                    <Progress value={recommendedProduct.score} className="h-2" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ThumbsUp className="w-4 h-4 text-success" />
                        <span className="font-medium text-success">Pros</span>
                      </div>
                      <ul className="space-y-1">
                        {recommendedProduct.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ThumbsDown className="w-4 h-4 text-destructive" />
                        <span className="font-medium text-destructive">Cons</span>
                      </div>
                      <ul className="space-y-1">
                        {recommendedProduct.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="bg-muted rounded-xl p-4 mb-4 flex-1 flex items-center justify-center">
                    <img 
                      src={recommendedProduct.image} 
                      alt={recommendedProduct.name}
                      className="max-w-full max-h-48 object-contain"
                    />
                  </div>
                  <Button variant="success" size="lg" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Amazon
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Other Products */}
        {otherProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Other Options</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {otherProducts.map((product) => (
                <Card key={product.id} className="result-card">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-w-full max-h-24 object-contain"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-warning text-warning" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Score</span>
                          <span className="text-sm font-medium">{product.score}/100</span>
                        </div>
                        <Progress value={product.score} className="h-1" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        <div>
                          <span className="font-medium text-success">Top Pro:</span>
                          <p className="text-muted-foreground">{product.pros[0]}</p>
                        </div>
                        <div>
                          <span className="font-medium text-destructive">Main Con:</span>
                          <p className="text-muted-foreground">{product.cons[0]}</p>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View Product
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Summary */}
        <Card className="result-card mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Analysis Summary</h3>
            <p className="text-muted-foreground">
              Analyzed {results.products.length} products from Amazon search results. 
              Our recommendation is based on price, features, reviews, and overall value.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ResultsDisplay;
