
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NutritionMythsPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/education">
            <Button variant="outline" className="mb-6">
              ← Back to Education
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-6">Nutrition Myths Debunked</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Common Nutrition Myths</h2>
            <p className="mb-6">
              Many popular beliefs about nutrition are not supported by scientific evidence. Here we examine common myths and provide evidence-based explanations.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Facts vs. Fiction</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Myth: All fats are bad for you</li>
              <li>Myth: Carbs always lead to weight gain</li>
              <li>Myth: Supplements can replace a balanced diet</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Evidence-Based Nutrition</h2>
            <p className="mb-6">
              Understanding scientific research helps in making informed decisions about your diet. Learn to distinguish between factual information and popular misconceptions.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NutritionMythsPage;
