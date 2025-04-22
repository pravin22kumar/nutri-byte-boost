
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MalnutritionPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/education">
            <Button variant="outline" className="mb-6">
              ← Back to Education
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-6">Understanding Malnutrition</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What is Malnutrition?</h2>
            <p className="mb-6">
              Malnutrition refers to deficiencies, excesses, or imbalances in a person's intake of energy and/or nutrients. It includes both undernutrition and overnutrition, as well as micronutrient deficiencies.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Common Forms of Malnutrition</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Undernutrition</li>
              <li>Micronutrient deficiencies</li>
              <li>Overweight and obesity</li>
              <li>Diet-related diseases</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Prevention Strategies</h2>
            <p className="mb-6">
              Preventing malnutrition involves ensuring access to nutritious foods, proper education about dietary needs, and regular health monitoring. Early intervention and community support play crucial roles in prevention.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MalnutritionPage;
