
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { Calculator, ChartBar, Utensils, Activity, Heart, Plus, FileText, Zap } from "lucide-react";
import { toast } from "sonner";

type NutritionProfile = {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose' | 'maintain' | 'gain';
}

type MacroRatio = {
  carbs: number;
  protein: number;
  fat: number;
}

type MealPlan = {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

type NutritionNeeds = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const activityOptions = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Light (exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (exercise 3-5 days/week)' },
  { value: 'active', label: 'Active (exercise 6-7 days/week)' },
  { value: 'very_active', label: 'Very Active (hard exercise daily)' },
];

const goalOptions = [
  { value: 'lose', label: 'Lose Weight' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'gain', label: 'Gain Weight' },
];

// Sample meal options
const mealOptions = {
  breakfast: [
    "Oatmeal with berries and nuts",
    "Greek yogurt with honey and granola",
    "Avocado toast with eggs",
    "Protein smoothie with spinach and banana",
    "Whole grain cereal with milk",
    "Breakfast burrito with eggs, beans, and vegetables"
  ],
  lunch: [
    "Grilled chicken salad with mixed greens",
    "Quinoa bowl with roasted vegetables",
    "Turkey and avocado wrap",
    "Lentil soup with whole grain bread",
    "Tuna sandwich on whole grain bread",
    "Chickpea and vegetable stir-fry"
  ],
  dinner: [
    "Baked salmon with roasted vegetables",
    "Chicken stir-fry with brown rice",
    "Vegetable curry with tofu",
    "Lean beef with sweet potato",
    "Grilled fish with quinoa and asparagus",
    "Bean and vegetable chili"
  ],
  snacks: [
    "Apple with almond butter",
    "Greek yogurt with berries",
    "Hummus with carrot sticks",
    "Trail mix with nuts and dried fruit",
    "Protein bar",
    "Hard-boiled eggs"
  ]
};

// Sample nutritional data for visualization
const macroDistributionData = [
  { name: 'Carbs', grams: 200 },
  { name: 'Protein', grams: 120 },
  { name: 'Fat', grams: 60 },
];

const mealNutritionData = [
  { name: 'Breakfast', calories: 450, protein: 25, carbs: 45, fat: 15 },
  { name: 'Lunch', calories: 550, protein: 35, carbs: 55, fat: 20 },
  { name: 'Dinner', calories: 600, protein: 40, carbs: 60, fat: 25 },
  { name: 'Snacks', calories: 300, protein: 20, carbs: 30, fat: 10 },
];

const AdvancedPlanner = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("calculator");
  const [profile, setProfile] = useState<NutritionProfile>({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 170,
    activityLevel: 'moderate',
    goal: 'maintain'
  });
  
  const [macroRatio, setMacroRatio] = useState<MacroRatio>({
    carbs: 50,
    protein: 30,
    fat: 20
  });
  
  const [nutritionNeeds, setNutritionNeeds] = useState<NutritionNeeds | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateNutritionNeeds = () => {
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (profile.gender === 'male') {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }
    
    // Apply activity factor
    let activityFactor = 1.2; // sedentary
    switch (profile.activityLevel) {
      case 'light': activityFactor = 1.375; break;
      case 'moderate': activityFactor = 1.55; break;
      case 'active': activityFactor = 1.725; break;
      case 'very_active': activityFactor = 1.9; break;
    }
    
    let calories = bmr * activityFactor;
    
    // Adjust for goal
    switch (profile.goal) {
      case 'lose': calories -= 500; break;
      case 'gain': calories += 500; break;
    }
    
    // Calculate macros
    const carbsCalories = calories * (macroRatio.carbs / 100);
    const proteinCalories = calories * (macroRatio.protein / 100);
    const fatCalories = calories * (macroRatio.fat / 100);
    
    const needs: NutritionNeeds = {
      calories: Math.round(calories),
      carbs: Math.round(carbsCalories / 4), // 4 calories per gram of carbs
      protein: Math.round(proteinCalories / 4), // 4 calories per gram of protein
      fat: Math.round(fatCalories / 9), // 9 calories per gram of fat
    };
    
    setNutritionNeeds(needs);
    generateMealPlan();
    setShowResults(true);
    toast.success("Nutritional needs calculated successfully!");
  };

  const generateMealPlan = () => {
    // Simple random selection of meals
    const getRandomMeals = (category: keyof typeof mealOptions, count: number) => {
      const options = [...mealOptions[category]];
      const selected = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        selected.push(options[randomIndex]);
        options.splice(randomIndex, 1);
      }
      return selected;
    };
    
    const plan: MealPlan = {
      breakfast: getRandomMeals('breakfast', 1),
      lunch: getRandomMeals('lunch', 1),
      dinner: getRandomMeals('dinner', 1),
      snacks: getRandomMeals('snacks', 2),
    };
    
    setMealPlan(plan);
  };

  const handleSavePlan = () => {
    // In a real app, this would save to a database
    toast.success("Meal plan saved successfully!");
  };

  const handleMacroChange = (type: keyof MacroRatio, value: number) => {
    // When one macro changes, adjust the others proportionally
    const current = macroRatio[type];
    const diff = value - current;
    
    const newRatio = { ...macroRatio, [type]: value };
    
    // Distribute remaining percentage
    const remainingTypes = Object.keys(macroRatio).filter(k => k !== type) as Array<keyof MacroRatio>;
    const remainingTotal = remainingTypes.reduce((sum, t) => sum + newRatio[t], 0);
    
    if (remainingTotal > 0) {
      remainingTypes.forEach(t => {
        const proportion = newRatio[t] / remainingTotal;
        newRatio[t] = Math.max(0, Math.round(newRatio[t] - diff * proportion));
      });
    }
    
    // Ensure total is 100%
    const newTotal = Object.values(newRatio).reduce((sum, val) => sum + val, 0);
    if (newTotal !== 100) {
      const lastType = remainingTypes[remainingTypes.length - 1];
      newRatio[lastType] += (100 - newTotal);
    }
    
    setMacroRatio(newRatio);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Advanced Nutrition Planner</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your personalized nutrition needs, design optimal meal plans, and track your progress toward your health goals.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" /> Nutrition Calculator
            </TabsTrigger>
            <TabsTrigger value="mealplanner" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" /> Meal Planner
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2" disabled={!showResults}>
              <ChartBar className="h-4 w-4" /> Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter your details to calculate your nutritional requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      value={profile.age} 
                      onChange={(e) => setProfile({...profile, age: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={profile.gender} 
                      onValueChange={(value: 'male' | 'female') => setProfile({...profile, gender: value})}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      value={profile.weight} 
                      onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={profile.height} 
                      onChange={(e) => setProfile({...profile, height: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select 
                    value={profile.activityLevel} 
                    onValueChange={(value: NutritionProfile['activityLevel']) => setProfile({...profile, activityLevel: value})}
                  >
                    <SelectTrigger id="activity">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="goal">Goal</Label>
                  <Select 
                    value={profile.goal} 
                    onValueChange={(value: NutritionProfile['goal']) => setProfile({...profile, goal: value})}
                  >
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Macro Distribution</CardTitle>
                    <CardDescription>
                      Adjust your preferred macronutrient ratio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="carbs">Carbohydrates: {macroRatio.carbs}%</Label>
                          <span className="text-sm text-muted-foreground">{macroRatio.carbs}%</span>
                        </div>
                        <Slider 
                          id="carbs"
                          value={[macroRatio.carbs]} 
                          min={10} 
                          max={70} 
                          step={5}
                          onValueChange={(value) => handleMacroChange('carbs', value[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="protein">Protein: {macroRatio.protein}%</Label>
                          <span className="text-sm text-muted-foreground">{macroRatio.protein}%</span>
                        </div>
                        <Slider 
                          id="protein"
                          value={[macroRatio.protein]} 
                          min={10} 
                          max={50} 
                          step={5}
                          onValueChange={(value) => handleMacroChange('protein', value[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="fat">Fat: {macroRatio.fat}%</Label>
                          <span className="text-sm text-muted-foreground">{macroRatio.fat}%</span>
                        </div>
                        <Slider 
                          id="fat"
                          value={[macroRatio.fat]} 
                          min={10} 
                          max={50} 
                          step={5}
                          onValueChange={(value) => handleMacroChange('fat', value[0])}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="bg-muted p-2 rounded-md flex justify-between items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Carbs: {macroRatio.carbs}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>Protein: {macroRatio.protein}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Fat: {macroRatio.fat}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="pt-4 flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => navigate("/meal-planner")}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={calculateNutritionNeeds}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Calculate & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mealplanner">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Meal Planner</CardTitle>
                <CardDescription>
                  Generate and customize your daily meal plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!nutritionNeeds ? (
                  <div className="text-center py-10">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium mb-2">Calculate Your Nutrition Needs First</h3>
                    <p className="text-muted-foreground mb-6">
                      Please complete the nutrition calculator to generate your personalized meal plan.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("calculator")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Go to Calculator
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <h3 className="text-lg font-medium mb-3">Daily Nutrition Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-secondary p-3 rounded-md text-center shadow-sm">
                          <div className="text-2xl font-bold text-green-600">{nutritionNeeds.calories}</div>
                          <div className="text-sm text-muted-foreground">Calories</div>
                        </div>
                        <div className="bg-white dark:bg-secondary p-3 rounded-md text-center shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">{nutritionNeeds.carbs}g</div>
                          <div className="text-sm text-muted-foreground">Carbs</div>
                        </div>
                        <div className="bg-white dark:bg-secondary p-3 rounded-md text-center shadow-sm">
                          <div className="text-2xl font-bold text-red-600">{nutritionNeeds.protein}g</div>
                          <div className="text-sm text-muted-foreground">Protein</div>
                        </div>
                        <div className="bg-white dark:bg-secondary p-3 rounded-md text-center shadow-sm">
                          <div className="text-2xl font-bold text-yellow-600">{nutritionNeeds.fat}g</div>
                          <div className="text-sm text-muted-foreground">Fat</div>
                        </div>
                      </div>
                    </div>
                    
                    {mealPlan && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center">
                                <Utensils className="h-4 w-4 mr-2" />
                                Breakfast
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {mealPlan.breakfast.map((meal, i) => (
                                  <li key={i} className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted">
                                    <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 text-xs font-medium flex-shrink-0">
                                      {i+1}
                                    </div>
                                    <span>{meal}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center">
                                <Utensils className="h-4 w-4 mr-2" />
                                Lunch
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {mealPlan.lunch.map((meal, i) => (
                                  <li key={i} className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted">
                                    <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 text-xs font-medium flex-shrink-0">
                                      {i+1}
                                    </div>
                                    <span>{meal}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center">
                                <Utensils className="h-4 w-4 mr-2" />
                                Dinner
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {mealPlan.dinner.map((meal, i) => (
                                  <li key={i} className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted">
                                    <div className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 text-xs font-medium flex-shrink-0">
                                      {i+1}
                                    </div>
                                    <span>{meal}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center">
                                <Utensils className="h-4 w-4 mr-2" />
                                Snacks
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {mealPlan.snacks.map((meal, i) => (
                                  <li key={i} className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted">
                                    <div className="h-5 w-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 text-xs font-medium flex-shrink-0">
                                      {i+1}
                                    </div>
                                    <span>{meal}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button 
                            variant="outline" 
                            onClick={generateMealPlan}
                            className="flex items-center gap-2"
                          >
                            <RefreshCcw className="h-4 w-4" />
                            Regenerate Meals
                          </Button>
                          
                          <div className="space-x-4">
                            <Button 
                              onClick={() => setActiveTab("results")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              View Results
                            </Button>
                            
                            <Button 
                              onClick={handleSavePlan}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Save Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Analysis & Results</CardTitle>
                <CardDescription>
                  Visualize your nutritional intake and plan details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!nutritionNeeds ? (
                  <div className="text-center py-10">
                    <ChartBar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium mb-2">Complete Your Profile First</h3>
                    <p className="text-muted-foreground mb-6">
                      Please complete the nutrition calculator to see your results.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("calculator")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Go to Calculator
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Daily Macronutrient Distribution</h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: 'Carbs', amount: nutritionNeeds.carbs, color: '#3B82F6' },
                                { name: 'Protein', amount: nutritionNeeds.protein, color: '#EF4444' },
                                { name: 'Fat', amount: nutritionNeeds.fat, color: '#10B981' }
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis label={{ value: 'Grams', angle: -90, position: 'insideLeft' }} />
                              <Tooltip formatter={(value) => [`${value}g`, 'Amount']} />
                              <Legend />
                              <Bar 
                                dataKey="amount" 
                                name="Grams" 
                                fill="#8884d8" 
                                radius={[4, 4, 0, 0]}
                                fillOpacity={0.8}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Meal Nutritional Breakdown</h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mealNutritionData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="protein" fill="#EF4444" name="Protein (g)" />
                              <Bar dataKey="carbs" fill="#3B82F6" name="Carbs (g)" />
                              <Bar dataKey="fat" fill="#10B981" name="Fat (g)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Nutrition Profile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Age</div>
                            <div className="font-medium">{profile.age} years</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Gender</div>
                            <div className="font-medium capitalize">{profile.gender}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Weight</div>
                            <div className="font-medium">{profile.weight} kg</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Height</div>
                            <div className="font-medium">{profile.height} cm</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Activity Level</div>
                            <div className="font-medium capitalize">{profile.activityLevel.replace('_', ' ')}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Goal</div>
                            <div className="font-medium capitalize">{profile.goal} weight</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("mealplanner")}
                      >
                        Back to Meal Planner
                      </Button>
                      
                      <div className="space-x-4">
                        <Button 
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            toast.success("Nutrition plan exported!");
                          }}
                        >
                          <FileText className="h-4 w-4" />
                          Export Plan
                        </Button>
                        
                        <Button 
                          onClick={handleSavePlan}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Save Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdvancedPlanner;
