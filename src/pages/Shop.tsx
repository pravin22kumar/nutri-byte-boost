
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Shop = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Fresh Organic Apples",
      price: 2.99,
      unit: "per pound",
      category: "Fruits",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      trending: "stable"
    },
    {
      id: 2,
      name: "Organic Spinach",
      price: 3.49,
      unit: "per bunch",
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      trending: "up"
    },
    {
      id: 3,
      name: "Brown Rice",
      price: 4.99,
      unit: "per kg",
      category: "Grains",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      trending: "down"
    },
    {
      id: 4,
      name: "Organic Eggs",
      price: 5.99,
      unit: "per dozen",
      category: "Dairy & Eggs",
      image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      trending: "up"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop Fresh & Nutritious</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of fresh produce, track real-time prices, and make informed purchasing decisions
            with our price trend indicators.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Sign in to access the full shop features</h2>
            <p className="text-gray-600 mb-6">
              Get access to personalized recommendations, price tracking, and convenient checkout.
            </p>
            <Button className="bg-nutribite-green hover:bg-nutribite-green-dark px-6 py-2">
              Sign in to Continue
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    product.trending === "up" 
                      ? "bg-red-500" 
                      : product.trending === "down" 
                      ? "bg-green-500" 
                      : "bg-gray-500"
                  }`}
                >
                  {product.trending === "up" 
                    ? "Price Rising" 
                    : product.trending === "down" 
                    ? "Price Falling" 
                    : "Stable Price"}
                </Badge>
              </div>
              <CardHeader className="p-4 pb-0">
                <CardDescription>{product.category}</CardDescription>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">${product.price}</p>
                  <p className="text-gray-500 text-sm">{product.unit}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-nutribite-orange hover:bg-nutribite-orange-dark">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Pricing</CardTitle>
              <CardDescription>Stay informed about market changes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our prices are updated in real-time based on market data from reliable sources
                like Agmarknet and CEDA Daily Food Prices.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Inflation Tracking</CardTitle>
              <CardDescription>Make budget-friendly choices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We track price trends and alert you when products are experiencing inflation or price drops,
                helping you make smart purchasing decisions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Secure Checkout</CardTitle>
              <CardDescription>Safe and convenient payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our secure payment processing ensures your information is protected while
                you enjoy a seamless shopping experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
