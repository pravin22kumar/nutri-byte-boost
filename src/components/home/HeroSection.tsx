
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-nutribite-green-light/20 to-nutribite-orange-light/20">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Fuel your body,<br />
              <span className="text-nutribite-green">feed your soul</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Your complete nutrition companion for planning meals, 
              shopping smartly, tracking food inflation, and learning 
              about nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/auth">
                <Button className="bg-nutribite-green hover:bg-nutribite-green-dark text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="outline" className="border-nutribite-green text-nutribite-green hover:bg-nutribite-green-light/10 font-medium px-6 py-2 rounded-md w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-nutribite-green rounded-full opacity-10 blur-3xl animate-pulse-soft"></div>
              <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" 
                alt="Fresh vegetables and fruits" 
                className="relative z-10 rounded-xl shadow-xl animate-fade-in object-cover"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
