
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MealPlanner = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Personalized Meal Planning</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create customized meal plans based on your preferences, dietary restrictions, 
            and health goals. Get nutritional insights and recommendations for balanced eating.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Sign in to access the Meal Planner</h2>
            <p className="text-gray-600 mb-6">
              Your personalized meal planning experience is just one click away. 
              Sign in to start creating customized meal plans that match your nutritional needs.
            </p>
            <Button className="bg-nutribite-green hover:bg-nutribite-green-dark px-6 py-2">
              Sign in to Continue
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Tailored to your specific needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our smart meal planner considers your dietary preferences, restrictions, 
                health goals, and even budget to suggest the perfect meals for you.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Insights</CardTitle>
              <CardDescription>Understand what you eat</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get detailed nutritional breakdowns of your meal plans, including macronutrients, 
                micronutrients, and alignment with your health goals.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Planning</CardTitle>
              <CardDescription>Organize your nutrition effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Plan your meals for the entire week in advance. Save time, reduce waste, 
                and make shopping easier with organized grocery lists.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default MealPlanner;
