import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChartBar, ExternalLink } from "lucide-react";

const MealPlanner = () => {
  const { isLoggedIn } = useAuth();
  const streamlitAppUrl = "https://msachin11-innovnutri-bite-backendapp-mcpxdf.streamlit.app/";

  const openStreamlitApp = () => {
    window.open(streamlitAppUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        {isLoggedIn ? (
          <>
            <UserDashboard />
            <div className="mt-8 text-center">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={openStreamlitApp}
              >
                <ExternalLink className="h-4 w-4" />
                Open Nutrition Planner App
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Personalized Meal Planning</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Create customized meal plans based on your preferences, dietary restrictions, 
                and health goals. Get nutritional insights and recommendations for balanced eating.
              </p>
              <div className="mt-6">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  onClick={openStreamlitApp}
                >
                  <ExternalLink className="h-4 w-4" />
                  Try Nutrition Planner App
                </Button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Sign in to save your meal plans</h2>
                <p className="text-gray-600 mb-6">
                  Your personalized meal planning experience is just one click away. 
                  Sign in to start creating and saving customized meal plans that match your nutritional needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/auth">
                    <Button className="bg-nutribite-green hover:bg-nutribite-green-dark px-6 py-2">
                      Sign in to Continue
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={openStreamlitApp}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Try App Without Signing In
                  </Button>
                </div>
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
          </>
        )}

        {/* Streamlit App Embed Section */}
        <div className="mt-16 border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-muted py-3 px-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-semibold">NutriBite Planner App</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={openStreamlitApp}
              className="text-muted-foreground flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </Button>
          </div>
          <div className="w-full h-[600px]">
            <iframe
              src={streamlitAppUrl}
              title="NutriBite Planner App"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MealPlanner;