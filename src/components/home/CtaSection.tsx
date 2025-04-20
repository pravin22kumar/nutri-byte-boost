
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  return (
    <section className="py-20 bg-nutribite-green">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Nutrition?</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
          Join thousands of users who have improved their eating habits, saved money on groceries,
          and gained valuable nutrition knowledge with NutriBite.
        </p>
        <Link to="/auth">
          <Button className="bg-white text-nutribite-green hover:bg-gray-100 text-lg px-8 py-3">
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  );
};
