
import { FeatureCard } from "@/components/ui/feature-card";

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How NutriBite Helps You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to improve your nutrition,
            plan healthier meals, and make informed food choices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Meal Planner"
            description="Create personalized meal plans based on your dietary preferences, nutritional needs, and health goals."
            icon={<div className="w-12 h-12 flex items-center justify-center rounded-full bg-nutribite-green-light/30">🍽️</div>}
            linkTo="/meal-planner"
            color="green"
          />
          
          <FeatureCard
            title="Nutrition Assistant"
            description="Chat with our AI-powered nutrition assistant to get answers to your nutrition questions instantly."
            icon={<div className="w-12 h-12 flex items-center justify-center rounded-full bg-nutribite-orange-light/30">💬</div>}
            linkTo="/chatbot"
            color="orange"
          />
          
          <FeatureCard
            title="Smart Shopping"
            description="Browse products with real-time prices, track inflation, and get suggestions for budget-friendly nutritious options."
            icon={<div className="w-12 h-12 flex items-center justify-center rounded-full bg-nutribite-green-light/30">🛒</div>}
            linkTo="/shop"
            color="green"
          />
          
          <FeatureCard
            title="Nutrition Education"
            description="Access a wealth of information about nutrition, malnutrition, and strategies for maintaining a balanced diet."
            icon={<div className="w-12 h-12 flex items-center justify-center rounded-full bg-nutribite-orange-light/30">📚</div>}
            linkTo="/education"
            color="orange"
          />
        </div>
      </div>
    </section>
  );
};
