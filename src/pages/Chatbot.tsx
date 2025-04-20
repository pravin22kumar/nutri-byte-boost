
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Chatbot = () => {
  const { isLoggedIn } = useAuth();
  const [message, setMessage] = useState("");

  // Sample quick questions about nutrition
  const quickQuestions = [
    "What foods are high in protein?",
    "How much water should I drink daily?",
    "Are eggs good for health?",
    "Best sources of vitamin D?",
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would normally handle the chat interaction
      // For now we'll just clear the input
      setMessage("");
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nutrition Assistant</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant answers to your nutrition questions from our AI-powered assistant.
            Learn about healthy eating, dietary choices, and nutritional information.
          </p>
        </div>

        {isLoggedIn ? (
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Chat with Nutrition Assistant</CardTitle>
                <CardDescription>Ask any nutrition-related question</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 min-h-[300px] mb-4 border">
                  <div className="text-center text-gray-500 py-12">
                    Your conversation will appear here
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your question here..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <Button 
                    className="bg-nutribite-green hover:bg-nutribite-green-dark"
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Sign in to Chat with our Nutrition Assistant</CardTitle>
                <CardDescription>Get personalized nutrition advice instantly</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Example questions you can ask:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {quickQuestions.map((question, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700"
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/auth">
                    <Button className="bg-nutribite-green hover:bg-nutribite-green-dark px-6">
                      Sign in to Access
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">How It Works</h3>
                <p className="text-gray-600">
                  Our AI-powered Nutrition Assistant uses advanced natural language processing 
                  to understand your questions and provide accurate, personalized nutrition advice.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Get Personalized Advice</h3>
                <p className="text-gray-600">
                  Ask about specific foods, dietary restrictions, meal planning, or general nutrition 
                  questions. Our assistant learns from your interactions to provide better recommendations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Chatbot;
