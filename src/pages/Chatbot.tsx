import { useState, useRef, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  MessageCircle,
  RefreshCcw,
  Zap,
  HelpCircle,
  Apple,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const quickQuestions = [
  "What are some healthy breakfast options?",
  "How much protein should I eat daily?",
  "What are the symptoms of vitamin D deficiency?",
  "Which foods are high in iron?",
  "How can I reduce sugar in my diet?"
];

// Sample data for more realistic responses
const nutritionResponses = {
  breakfast: [
    "For a healthy breakfast, try overnight oats with berries and nuts, Greek yogurt with honey and granola, or a vegetable omelet with whole grain toast. These options provide a good balance of protein, complex carbs, and healthy fats to fuel your morning! 🍳🥣",
    "Great breakfast choices include: avocado toast on whole grain bread with a poached egg, a smoothie bowl with spinach, banana, and chia seeds, or a breakfast burrito with scrambled eggs, black beans, and veggies. Starting your day with protein and fiber helps maintain steady energy levels! 🥑🍌"
  ],
  protein: [
    "The recommended daily protein intake is about 0.8g per kg of body weight for average adults. For someone weighing 70kg (154lbs), that's about 56g daily. Athletes and those building muscle may need 1.2-2g per kg. Good sources include lean meats, fish, eggs, dairy, legumes, and tofu. Spreading protein intake throughout the day is optimal for muscle synthesis! 🥩🥚🫘",
    "Protein needs vary based on activity level and goals. The general guideline is 0.8-1g per kg of body weight daily for most people, higher for athletes (1.2-2g/kg). A 160lb person might aim for 58-73g daily. Try incorporating a protein source at each meal - a palm-sized portion of protein-rich food is roughly 20-30g. 🍗🧀"
  ],
  vitaminD: [
    "Common symptoms of vitamin D deficiency include: fatigue, bone pain, muscle weakness, mood changes (like depression), and increased susceptibility to infections. Severe deficiency can lead to osteomalacia in adults or rickets in children. The best sources are sunlight exposure, fatty fish, fortified foods, and supplements when recommended by healthcare providers. 🌞🐟",
    "Vitamin D deficiency signs include unexpected fatigue, bone/muscle pain, frequent illness, hair loss, and slow wound healing. Risk factors include limited sun exposure, darker skin tone, obesity, and being over 65. Try to get 10-30 minutes of midday sun exposure several times weekly, and consider foods like salmon, egg yolks, and fortified milk. Always consult your doctor for proper testing and supplementation guidance. 💊🥛"
  ],
  iron: [
    "Foods high in iron include: red meat, organ meats (like liver), shellfish, legumes (beans, lentils), spinach, tofu, pumpkin seeds, quinoa, and fortified cereals. Plant sources contain non-heme iron, which is better absorbed when consumed with vitamin C-rich foods like citrus fruits or bell peppers. Cooking in cast iron pans can also increase the iron content of your meals! 🍖🍃🦪",
    "Great iron sources include lean beef (3.5oz = 2.7mg), spinach (1 cup cooked = 6.4mg), lentils (1 cup = 6.6mg), tofu (1/2 cup = 3.4mg), and dark chocolate (1oz = 3.4mg). Animal sources provide heme iron (more easily absorbed), while plant sources offer non-heme iron. To enhance absorption from plant sources, pair with vitamin C foods like strawberries, citrus, or tomatoes. Avoid coffee or tea with meals as they can inhibit iron absorption. 🥩🫘🍓"
  ],
  sugar: [
    "To reduce sugar in your diet: 1) Read food labels and look for hidden sugars (ingredients ending in '-ose'), 2) Gradually decrease sugar in coffee/tea, 3) Choose whole fruits over juice, 4) Use spices like cinnamon or vanilla to add flavor without sugar, 5) Opt for plain yogurt and add fresh fruit, 6) Stay hydrated with water instead of sugary drinks, and 7) Satisfy sweet cravings with healthier options like dark chocolate or frozen fruit. Your taste buds will adapt over time! 🍎🚫🍭",
    "Cutting back on sugar? Try these strategies: Replace sodas with sparkling water infused with fruit, swap candy for nuts and dried fruit, use natural sweeteners like dates in baking, read labels for hidden sugars (look for terms like corn syrup, dextrose, maltose), cook more at home to control ingredients, manage stress (which can trigger sugar cravings), and get adequate sleep. Remember, gradual reduction works better than going cold turkey for most people! 🥤➡️💧"
  ]
};

const generalResponses = [
  "That's a great nutrition question! A balanced diet rich in whole foods like fruits, vegetables, lean proteins, and whole grains is key to overall health. Try to minimize processed foods and stay hydrated with plenty of water throughout the day. Would you like more specific information about this topic?",
  "Excellent question about nutrition! Remember that individual needs vary based on factors like age, activity level, and health conditions. It's generally recommended to eat a variety of colorful foods, limit added sugars and saturated fats, and maintain proper portion sizes. Would you like me to elaborate on any specific aspect?",
  "Thanks for your question! When thinking about nutrition, it's important to consider both what and how you eat. Mindful eating, regular meal times, and enjoying food with others can be just as important as the nutrients themselves. The Mediterranean and DASH diets are often recommended by experts for their balanced approach and health benefits. Is there a particular element you'd like to know more about?",
  "That's something I'm asked frequently! A sustainable approach to nutrition often works better than strict diets. Focus on eating plenty of plants, choosing quality proteins, including healthy fats, and staying well-hydrated. Small, consistent changes tend to be more effective than dramatic short-term ones. Would you like some practical tips for implementing these principles?"
];

type Message = {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    text: "👋 Hello! I'm NutriBite, your AI nutrition assistant. Ask me anything about healthy eating, nutrients, or meal ideas!",
    sender: "bot",
    timestamp: new Date()
  }, {
    text: "💡 Tip: Try asking things like 'What should I eat for breakfast?' or 'How much protein do I need?'",
    sender: "bot",
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState({ min: 20, max: 50 });
  const [showQuickQuestionsPanel, setShowQuickQuestionsPanel] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  // Simulated typing animation
  const typeMessage = (message: string, callback: () => void) => {
    setIsTyping(true);
    setTypingText("");
    
    const words = message.split(" ");
    let currentIndex = 0;
    
    const typeWord = () => {
      if (currentIndex < words.length) {
        // Add the next word plus a space
        setTypingText(prev => prev + words[currentIndex] + " ");
        currentIndex++;
        
        // Calculate random delay between words, faster for short words, slower for longer ones
        const wordLength = words[currentIndex - 1].length;
        const baseDelay = Math.floor(Math.random() * (typingSpeed.max - typingSpeed.min + 1)) + typingSpeed.min;
        const delay = baseDelay * (0.8 + (wordLength * 0.1)); // Adjust delay based on word length
        
        // Add occasional "thinking" pauses for more realism
        const shouldPause = Math.random() < 0.1 && currentIndex > 3;
        const pauseTime = shouldPause ? Math.random() * 300 + 200 : 0;
        
        setTimeout(typeWord, delay + pauseTime);
      } else {
        // Short delay before considering the message "sent"
        setTimeout(() => {
          setIsTyping(false);
          setTypingText("");
          callback();
        }, 300);
      }
    };
    
    // Add initial delay before typing starts
    setTimeout(typeWord, 400);
  };

  const findRelevantResponse = (text: string) => {
    text = text.toLowerCase();
    
    if (text.includes("breakfast") || text.includes("morning meal") || text.includes("eat in the morning")) {
      return nutritionResponses.breakfast[Math.floor(Math.random() * nutritionResponses.breakfast.length)];
    } else if (text.includes("protein") || text.includes("meat") || text.includes("muscle")) {
      return nutritionResponses.protein[Math.floor(Math.random() * nutritionResponses.protein.length)];
    } else if (text.includes("vitamin d") || text.includes("vitamin-d") || text.includes("deficiency")) {
      return nutritionResponses.vitaminD[Math.floor(Math.random() * nutritionResponses.vitaminD.length)];
    } else if (text.includes("iron") || text.includes("anemia") || text.includes("anemic")) {
      return nutritionResponses.iron[Math.floor(Math.random() * nutritionResponses.iron.length)];
    } else if (text.includes("sugar") || text.includes("sweet") || text.includes("dessert") || text.includes("candy")) {
      return nutritionResponses.sugar[Math.floor(Math.random() * nutritionResponses.sugar.length)];
    }
    
    // If no specific match, return a general response
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = inputValue.trim();
    if (!input) return;

    // Hide suggestions when sending a message
    setShowSuggestions(false);

    const userMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Find the appropriate response
    const userText = userMessage.text.toLowerCase();
    let botReply = "";

    if (["hi", "hello", "hey", "howdy", "greetings"].some(greeting => userText.includes(greeting))) {
      botReply = "Hey there! 👋 How can I help with your nutrition questions today?";
    } else if (["bye", "goodbye", "see you", "farewell"].some(farewell => userText.includes(farewell))) {
      botReply = "See you later! Stay healthy and remember to eat your veggies! 🥦🥕";
    } else if (["thanks", "thank you", "appreciate", "helpful"].some(thanks => userText.includes(thanks))) {
      botReply = "You're welcome! 😊 I'm always here to help with your nutrition questions. Anything else you'd like to know?";
    } else if (["good morning", "morning"].some(morning => userText.includes(morning))) {
      botReply = "Good morning! Ready to fuel your day with nutritious food? ☀️ A good breakfast sets you up for success!";
    } else {
      botReply = findRelevantResponse(userText);
    }

    // Simulate typing delay based on message length
    const baseDelay = Math.min(botReply.length * 5, 2000);
    const randomDelay = Math.floor(Math.random() * 1000) + baseDelay;

    // Start the typing animation with the final message
    typeMessage(botReply, () => {
      const botMessage: Message = {
        text: botReply,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();
      
      // Occasionally suggest a follow-up question
      if (Math.random() > 0.6) {
        setTimeout(() => {
          const followUp = "Would you like to know more about this topic? Or do you have another nutrition question?";
          
          typeMessage(followUp, () => {
            const followUpMessage: Message = {
              text: followUp,
              sender: "bot",
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, followUpMessage]);
            scrollToBottom();
          });
        }, 1000);
      }
    });
  };

  const handleReset = () => {
    setMessages([{
      text: "👋 Hello! I'm NutriBite, your AI nutrition assistant. Ask me anything about healthy eating, nutrients, or meal ideas!",
      sender: "bot",
      timestamp: new Date()
    }, {
      text: "💡 Tip: Try asking things like 'What should I eat for breakfast?' or 'How much protein do I need?'",
      sender: "bot",
      timestamp: new Date()
    }]);
    setIsTyping(false);
    setTypingText("");
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
    // Hide quick questions panel after selecting a question
    setShowQuickQuestionsPanel(false);
  };

  const showQuickQuestions = () => {
    // Toggle quick questions panel
    setShowQuickQuestionsPanel(!showQuickQuestionsPanel);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Toggle suggestions display
  const toggleSuggestions = () => {
    setShowSuggestions(prev => !prev);
  };

  // Smart suggestions based on context
  const getSuggestions = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "bot") {
      if (lastMessage.text.includes("breakfast")) {
        return [
          "What's a quick breakfast for busy mornings?",
          "Are eggs healthy to eat every day?",
          "Best breakfast for weight loss?"
        ];
      } else if (lastMessage.text.includes("protein")) {
        return [
          "Best vegetarian protein sources?",
          "Can I get too much protein?",
          "Is protein powder healthy?"
        ];
      } else if (lastMessage.text.includes("vitamin")) {
        return [
          "Should I take vitamin supplements?",
          "Which fruits have the most vitamins?",
          "Foods rich in vitamin B12?"
        ];
      }
    }
    
    return [
      "What's your advice on intermittent fasting?",
      "How many vegetables should I eat daily?",
      "Tips for healthy meal prep?"
    ];
  };

  const showHelpInfo = () => {
    const helpMessage: Message = {
      text: "Here are some questions you can ask me about nutrition:\n\n" +
        quickQuestions.map(q => `• ${q}`).join("\n") +
        "\n\nFeel free to ask me about meal planning, specific nutrients, diet tips, or food choices!",
      sender: "bot",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, helpMessage]);
    scrollToBottom();
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <Apple className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-4xl font-bold">NutriBite</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Your personal AI nutrition assistant for healthy eating advice
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4 order-2 md:order-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={showQuickQuestions}
                      className="w-full flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-green-600" />
                        <span className="font-medium">Quick Questions</span>
                      </div>
                      {showQuickQuestionsPanel ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  
                  {showQuickQuestionsPanel && (
                    <div className="space-y-2 mb-4 animate-fadeIn max-h-96 overflow-y-auto">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-2 hover:bg-green-50 hover:text-green-700 text-sm"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={showHelpInfo}
                      className="w-full flex items-center gap-2"
                    >
                      <HelpCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Need Help?</span>
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3 flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                      About NutriBite
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      NutriBite is an AI assistant specialized in nutrition information. Ask about balanced diets, nutrients, meal plans, and healthy eating habits!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-8 order-1 md:order-2">
              <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden border border-border">
                <div className="bg-muted py-3 px-4 border-b border-border flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="rounded-full bg-green-600 p-1.5">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white"></div>
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium">NutriBite Assistant</h3>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-muted-foreground"
                  >
                    <RefreshCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>

                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-green-600 text-white"
                              : "bg-muted"
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.text}</p>
                          <div
                            className={`text-xs mt-1 ${
                              message.sender === "user"
                                ? "text-white/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                          {typingText ? (
                            <div>
                              <p className="whitespace-pre-line">{typingText}</p>
                              <div className="inline-block ml-1 align-middle">
                                <span className="inline-block w-1 h-4 bg-green-600 animate-pulse"></span>
                              </div>
                              <div className="text-xs mt-1 text-muted-foreground">
                                {formatTime(new Date())}
                              </div>
                            </div>
                          ) : (
                            <div className="flex space-x-2 items-center h-6">
                              <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t border-border p-3">
                  {showSuggestions && !isTyping && messages.length > 2 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {getSuggestions().map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs hover:bg-green-50"
                          onClick={() => handleQuickQuestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <form onSubmit={handleSend} className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your nutrition question..."
                        className="resize-none min-h-[60px]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        disabled={isTyping}
                      />
                      <div className="flex flex-col space-y-2">
                        <Button 
                          type="submit" 
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          disabled={isTyping || !inputValue.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={toggleSuggestions}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-center text-muted-foreground">
                      {isTyping ? "NutriBite is typing..." : "Ask me anything about nutrition!"}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default Chatbot;