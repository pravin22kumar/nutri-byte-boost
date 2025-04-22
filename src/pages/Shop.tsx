import { Link } from "react-router-dom";
import { useState } from "react";

// Import local SVG icons instead of remote URLs
// Note: You'll need to create/download these SVG files in your assets folder
// For now, I'll continue using the remote URLs but you should replace these

export default function NutriBiteMarket() {
  // Product data for the three categories
  const products = {
    fruits: [
      { id: 'f1', name: 'Organic Apples', price: 180, unit: 'kg', stock: 50, image: 'https://img.icons8.com/color/96/apple.png', category: 'fruits' },
      { id: 'f2', name: 'Bananas', price: 60, unit: 'dozen', stock: 40, image: 'https://img.icons8.com/color/96/banana.png', category: 'fruits' },
      { id: 'f3', name: 'Oranges', price: 120, unit: 'kg', stock: 30, image: 'https://img.icons8.com/color/96/orange.png', category: 'fruits' },
      { id: 'f4', name: 'Watermelon', price: 70, unit: 'piece', stock: 15, image: 'https://img.icons8.com/color/96/watermelon.png', category: 'fruits' },
      { id: 'f5', name: 'Strawberries', price: 230, unit: '250g', stock: 20, image: 'https://img.icons8.com/color/96/strawberry.png', category: 'fruits' },
      { id: 'f6', name: 'Mangoes', price: 250, unit: 'kg', stock: 25, image: 'https://img.icons8.com/color/96/mango.png', category: 'fruits' },
      { id: 'f7', name: 'Grapes', price: 140, unit: '500g', stock: 35, image: 'https://img.icons8.com/color/96/grapes.png', category: 'fruits' },
      { id: 'f8', name: 'Pineapple', price: 90, unit: 'piece', stock: 18, image: 'https://img.icons8.com/color/96/pineapple.png', category: 'fruits' },
      { id: 'f9', name: 'Pomegranate', price: 210, unit: 'kg', stock: 22, image: 'https://img.icons8.com/color/96/pomegranate.png', category: 'fruits' },
      { id: 'f10', name: 'Kiwi', price: 320, unit: '500g', stock: 15, image: 'https://img.icons8.com/color/96/kiwi-fruit.png', category: 'fruits' }
    ],
    vegetables: [
      { id: 'v1', name: 'Potatoes', price: 40, unit: 'kg', stock: 100, image: 'https://img.icons8.com/color/96/potato.png', category: 'vegetables' },
      { id: 'v2', name: 'Onions', price: 35, unit: 'kg', stock: 120, image: 'https://img.icons8.com/color/96/onion.png', category: 'vegetables' },
      { id: 'v3', name: 'Tomatoes', price: 60, unit: 'kg', stock: 80, image: 'https://img.icons8.com/color/96/tomato.png', category: 'vegetables' },
      { id: 'v4', name: 'Carrots', price: 50, unit: 'kg', stock: 70, image: 'https://img.icons8.com/color/96/carrot.png', category: 'vegetables' },
      { id: 'v5', name: 'Spinach', price: 30, unit: 'bunch', stock: 45, image: 'https://img.icons8.com/color/96/spinach.png', category: 'vegetables' },
      { id: 'v6', name: 'Bell Peppers', price: 80, unit: '500g', stock: 35, image: 'https://img.icons8.com/color/96/paprika.png', category: 'vegetables' },
      { id: 'v7', name: 'Cauliflower', price: 45, unit: 'piece', stock: 30, image: 'https://img.icons8.com/color/96/cauliflower.png', category: 'vegetables' },
      { id: 'v8', name: 'Cucumber', price: 40, unit: 'kg', stock: 60, image: 'https://img.icons8.com/color/96/cucumber.png', category: 'vegetables' },
      { id: 'v9', name: 'Broccoli', price: 90, unit: 'piece', stock: 25, image: 'https://img.icons8.com/color/96/broccoli.png', category: 'vegetables' },
      { id: 'v10', name: 'Eggplant', price: 50, unit: 'kg', stock: 40, image: 'https://img.icons8.com/color/96/eggplant.png', category: 'vegetables' }
    ],
    packaged: [
      { id: 'p1', name: 'Whole Wheat Bread', price: 45, unit: 'loaf', stock: 30, image: 'https://img.icons8.com/color/96/bread.png', category: 'packaged' },
      { id: 'p2', name: 'Brown Rice', price: 120, unit: 'kg', stock: 50, image: 'https://img.icons8.com/color/96/rice-bowl.png', category: 'packaged' },
      { id: 'p3', name: 'Oats', price: 90, unit: '500g', stock: 40, image: 'https://img.icons8.com/color/96/oatmeal.png', category: 'packaged' },
      { id: 'p4', name: 'Mixed Nuts', price: 350, unit: '250g', stock: 25, image: 'https://img.icons8.com/color/96/nut.png', category: 'packaged' },
      { id: 'p5', name: 'Honey', price: 220, unit: '500g', stock: 20, image: 'https://img.icons8.com/color/96/honey.png', category: 'packaged' },
      { id: 'p6', name: 'Pasta', price: 85, unit: '500g', stock: 35, image: 'https://img.icons8.com/color/96/spaghetti.png', category: 'packaged' },
      { id: 'p7', name: 'Quinoa', price: 290, unit: '500g', stock: 15, image: 'https://img.icons8.com/color/96/quinoa.png', category: 'packaged' },
      { id: 'p8', name: 'Organic Tea', price: 170, unit: '100g', stock: 30, image: 'https://img.icons8.com/color/96/tea.png', category: 'packaged' },
      { id: 'p9', name: 'Muesli', price: 210, unit: '500g', stock: 25, image: 'https://img.icons8.com/color/96/cereal.png', category: 'packaged' },
      { id: 'p10', name: 'Olive Oil', price: 450, unit: '500ml', stock: 20, image: 'https://img.icons8.com/color/96/olive-oil.png', category: 'packaged' }
    ]
  };

  // State variables
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState(500);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [buttonClicked, setButtonClicked] = useState(null);
  
  // Flatten products for searching and filtering
  const allProducts = [...products.fruits, ...products.vegetables, ...products.packaged];
  
  // Filter products based on search, category and price
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Add item to cart with button animation
  const addToCart = (product) => {
    setButtonClicked(product.id);
    setTimeout(() => setButtonClicked(null), 500);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Update quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Handle payment method selection
  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };
  
  // Process payment with animation
  const processPayment = () => {
    setButtonClicked('payment');
    setTimeout(() => {
      alert(`Payment of ₹${totalPrice} processed using ${selectedPayment}. Thank you for shopping with NutriBite Market!`);
      setCart([]);
      setShowPayment(false);
      setSelectedPayment('');
      setButtonClicked(null);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-green-600">NutriBite</h1>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Home</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Dashboard</Link>
            <Link to="/nutrition" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Nutrition Assistant</Link>
            <Link to="/shop" className="text-green-600 font-medium border-b-2 border-green-600">Shop</Link>
            <Link to="/education" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Education</Link>
          </div>
        </div>
      </nav>

      {/* Search Header */}
      <header className="bg-green-600 text-white shadow-md mt-0">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Browse Products</h2>
          </div>
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search for fruits, vegetables, etc..."
              className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Products section */}
        <main className="flex-grow p-4">
          {/* Filters */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-sm font-medium mb-1">Category</label>
              <select 
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="packaged">Packaged Foods</option>
              </select>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-sm font-medium mb-1">Max Price: ₹{priceRange}</label>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full md:w-48"
              />
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                style={{ transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out' }}
              >
                <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold">₹{product.price}</p>
                    <p className="text-gray-600 text-sm">per {product.unit}</p>
                  </div>
                  <button 
                    className={`w-full py-2 rounded font-medium transition-all duration-300 ${
                      buttonClicked === product.id
                        ? 'bg-green-800 text-white transform scale-95'
                        : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
                    }`}
                    style={{ transform: buttonClicked === product.id ? 'scale(0.95)' : 'scale(1)' }}
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {buttonClicked === product.id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No products match your search criteria.</p>
            </div>
          )}
        </main>

        {/* Cart sidebar */}
        <aside className="w-full md:w-80 bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex border-b pb-2">
                    <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-2 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600 text-sm">₹{item.price} per {item.unit}</p>
                      <div className="flex items-center mt-1">
                        <button 
                          className="bg-gray-200 px-2 rounded-l hover:bg-gray-300 transition-colors duration-200 active:bg-gray-400"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="bg-gray-100 px-3">{item.quantity}</span>
                        <button 
                          className="bg-gray-200 px-2 rounded-r hover:bg-gray-300 transition-colors duration-200 active:bg-gray-400"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="ml-2">
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button 
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-orange-600 hover:shadow-md active:transform active:scale-95"
                  onClick={() => setShowPayment(true)}
                >
                  Proceed to Payment
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Payment modal */}
      {showPayment && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ 
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md"
            style={{ 
              animation: 'scaleIn 0.3s ease-out',
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Payment Options</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPayment(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div 
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-green-50 ${selectedPayment === 'UPI' ? 'border-green-500 bg-green-50' : ''}`}
                onClick={() => handlePaymentSelection('UPI')}
              >
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={selectedPayment === 'UPI'} 
                    onChange={() => {}} 
                    className="mr-2"
                  />
                  <span>UPI (Google Pay, PhonePe, etc.)</span>
                </label>
              </div>
              
              <div 
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-green-50 ${selectedPayment === 'Card' ? 'border-green-500 bg-green-50' : ''}`}
                onClick={() => handlePaymentSelection('Card')}
              >
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={selectedPayment === 'Card'} 
                    onChange={() => {}} 
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
              
              <div 
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-green-50 ${selectedPayment === 'COD' ? 'border-green-500 bg-green-50' : ''}`}
                onClick={() => handlePaymentSelection('COD')}
              >
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={selectedPayment === 'COD'} 
                    onChange={() => {}} 
                    className="mr-2"
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="text-xl font-bold">₹{totalPrice}</p>
              </div>
              <button 
                className={`px-6 py-2 rounded font-medium transition-all duration-300 ${
                  buttonClicked === 'payment'
                    ? 'bg-green-800 text-white transform scale-95'
                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md disabled:bg-gray-300'
                }`}
                style={{ transform: buttonClicked === 'payment' ? 'scale(0.95)' : 'scale(1)' }}
                disabled={!selectedPayment}
                onClick={processPayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}