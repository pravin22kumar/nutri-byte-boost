
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <span className="text-nutribite-green">Nutri</span>
              <span className="text-nutribite-orange">Bite</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Fuel your body, feed your soul. Your one-stop solution for nutrition planning and education.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/meal-planner" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Nutrition Assistant
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Education
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-nutribite-green transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Connect With Us</h4>
            <p className="text-gray-600 mb-2">Email: contact@nutribite.com</p>
            <p className="text-gray-600 mb-4">Phone: +1 (555) 123-4567</p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
              <span className="w-8 h-8 rounded-full bg-nutribite-green flex items-center justify-center text-white">F</span>
              <span className="w-8 h-8 rounded-full bg-nutribite-green flex items-center justify-center text-white">T</span>
              <span className="w-8 h-8 rounded-full bg-nutribite-green flex items-center justify-center text-white">I</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} NutriBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
