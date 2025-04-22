
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BalancedDietPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/education">
            <Button variant="outline" className="mb-6">
              ← Back to Education
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-6">Balanced Diet Guide</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Components of a Balanced Diet</h2>
            <p className="mb-6">
              A balanced diet includes proper proportions of carbohydrates, proteins, fats, vitamins, minerals, and water. Understanding these components helps in making better food choices.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Macronutrients</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Carbohydrates: Primary source of energy</li>
              <li>Proteins: Essential for body repair and growth</li>
              <li>Fats: Important for nutrient absorption</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Creating Balanced Meals</h2>
            <p className="mb-6">
              Learn to create nutritionally balanced meals by combining different food groups in appropriate portions. This guide helps you make informed decisions about your daily food choices.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BalancedDietPage;
