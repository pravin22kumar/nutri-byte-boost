
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useForm } from "react-hook-form";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

type UserProfile = {
  name: string;
  age: number;
  height: number;
  weight: number;
  goal: string;
};

const calculateBMI = (weight: number, height: number) => {
  // BMI = weight(kg) / (height(m))^2
  const heightInM = height / 100;
  return (weight / (heightInM * heightInM)).toFixed(1);
};

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { category: "Underweight", color: "#3B82F6" };
  if (bmi < 25) return { category: "Normal", color: "#10B981" };
  if (bmi < 30) return { category: "Overweight", color: "#F59E0B" };
  return { category: "Obese", color: "#EF4444" };
};

const sampleWeightData = [
  { date: 'Jan', weight: 68 },
  { date: 'Feb', weight: 70 },
  { date: 'Mar', weight: 69 },
  { date: 'Apr', weight: 71 },
  { date: 'May', weight: 70 },
  { date: 'Jun', weight: 69 },
];

const sampleNutritionData = [
  { name: 'Protein', actual: 80, target: 100 },
  { name: 'Carbs', actual: 200, target: 250 },
  { name: 'Fat', actual: 60, target: 70 },
  { name: 'Fiber', actual: 15, target: 25 },
];

export const UserDashboard = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState({ category: "", color: "" });
  
  const form = useForm<UserProfile>({
    defaultValues: {
      name: "",
      age: 0,
      height: 0,
      weight: 0,
      goal: "",
    },
  });

  useEffect(() => {
    // Check if user profile exists in localStorage
    const profileData = localStorage.getItem("user_profile");
    if (profileData) {
      const profile = JSON.parse(profileData);
      form.reset(profile);
      setHasProfile(true);
      
      // Calculate BMI
      const calculatedBMI = Number(calculateBMI(profile.weight, profile.height));
      setBmi(calculatedBMI);
      setBmiCategory(getBMICategory(calculatedBMI));
    }
  }, [form]);

  const onSubmit = (data: UserProfile) => {
    localStorage.setItem("user_profile", JSON.stringify(data));
    setHasProfile(true);
    
    // Calculate BMI
    const calculatedBMI = Number(calculateBMI(data.weight, data.height));
    setBmi(calculatedBMI);
    setBmiCategory(getBMICategory(calculatedBMI));
    
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Nutrition Dashboard</h1>
          <p className="text-gray-600 max-w-2xl">
            Track your nutritional goals, body metrics, and meal planning all in one place.
          </p>
        </div>
        <Button 
          onClick={() => {
            localStorage.removeItem("nutribite_user");
            window.location.reload();
          }}
          variant="outline" 
          className="whitespace-nowrap"
        >
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Update your personal information and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Your age" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Your height in cm" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Your weight in kg" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nutrition Goal</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="E.g., Weight loss, Muscle gain, Maintain" 
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-nutribite-green hover:bg-nutribite-green-dark">
                  Save Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* BMI Card */}
          {hasProfile && (
            <Card>
              <CardHeader>
                <CardTitle>BMI Analysis</CardTitle>
                <CardDescription>Based on your height and weight</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex flex-col items-center justify-center w-36 h-36 rounded-full border-8" style={{ borderColor: bmiCategory.color }}>
                    <span className="text-3xl font-bold">{bmi}</span>
                    <span className="text-sm text-gray-500">BMI</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Your BMI is in the <span style={{ color: bmiCategory.color }}>{bmiCategory.category}</span> range</h3>
                    <p className="text-gray-600">
                      {bmiCategory.category === "Underweight" && "You're below the healthy weight range. Consider consulting with a nutritionist to develop a plan for gaining weight in a healthy way."}
                      {bmiCategory.category === "Normal" && "You're in a healthy weight range for your height. Maintain your current habits and continue with a balanced diet and regular exercise."}
                      {bmiCategory.category === "Overweight" && "You're slightly above the healthy weight range. Focus on balanced nutrition and regular physical activity to move toward a healthier weight."}
                      {bmiCategory.category === "Obese" && "Your BMI indicates obesity. It's recommended to consult with healthcare professionals to develop a personalized weight management plan."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weight Tracking Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weight Tracking</CardTitle>
              <CardDescription>Your weight fluctuations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sampleWeightData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                            <p className="font-medium">{payload[0].payload.date}</p>
                            <p className="text-nutribite-green">Weight: {payload[0].value} kg</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#10B981" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Analysis</CardTitle>
              <CardDescription>Daily intake compared to targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sampleNutritionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                            <p className="font-medium">{payload[0].payload.name}</p>
                            <p className="text-nutribite-green">Actual: {payload[0].value}g</p>
                            <p className="text-nutribite-orange">Target: {payload[0].payload.target}g</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend />
                    <Bar dataKey="actual" fill="#10B981" name="Current" />
                    <Bar dataKey="target" fill="#F97316" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
