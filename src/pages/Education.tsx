import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Education = () => {
  const { isLoggedIn } = useAuth();

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nutrition Education Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expand your knowledge about nutrition, learn about the impact of malnutrition,
            and discover strategies for maintaining a balanced diet.
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Sign in to access full educational content</h2>
              <p className="text-gray-600 mb-6">
                Get access to comprehensive articles, interactive infographics, and personalized nutrition guides.
              </p>
              <Link to="/auth">
                <Button className="bg-nutribite-green hover:bg-nutribite-green-dark px-6 py-2">
                  Sign in to Continue
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Your Education Hub</h2>
              <p className="text-gray-600 mb-6">
                Explore our premium educational content customized for your health and nutrition goals.
              </p>
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Malnutrition</CardTitle>
                <CardDescription>Causes, effects, and prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn about the different forms of malnutrition, their impact on health,
                  and effective strategies for prevention and treatment.
                </p>
                <Link to="/education/malnutrition">
                  <Button variant="outline" className="w-full border-nutribite-green text-nutribite-green hover:bg-nutribite-green-light/10">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Balanced Diet Guide</CardTitle>
                <CardDescription>Principles of healthy eating</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Discover the key components of a balanced diet, understand macro and micronutrients,
                  and learn how to create meals that support optimal health.
                </p>
                <Link to="/education/balanced-diet">
                  <Button variant="outline" className="w-full border-nutribite-green text-nutribite-green hover:bg-nutribite-green-light/10">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Myths Debunked</CardTitle>
                <CardDescription>Evidence-based information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Separate fact from fiction with our evidence-based analysis of common nutrition myths
                  and misconceptions that may be affecting your dietary choices.
                </p>
                <Link to="/education/nutrition-myths">
                  <Button variant="outline" className="w-full border-nutribite-green text-nutribite-green hover:bg-nutribite-green-light/10">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Educational Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-nutribite-green-light/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Interactive Infographics</h3>
              <p className="text-gray-700 mb-4">
                Explore our collection of interactive infographics that make complex nutrition concepts
                easy to understand and remember.
              </p>
              <Button className="bg-nutribite-green hover:bg-nutribite-green-dark">
                Browse Infographics
              </Button>
            </div>
            
            <div className="bg-nutribite-orange-light/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
              <p className="text-gray-700 mb-4">
                Watch expert-led video tutorials covering various aspects of nutrition, healthy eating,
                and practical tips for improving your diet.
              </p>
              <Button className="bg-nutribite-orange hover:bg-nutribite-orange-dark">
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Education;
