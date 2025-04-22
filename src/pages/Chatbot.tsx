import { useState, useRef, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  MessageCircle,
  RefreshCcw,
  Zap
} from "lucide-react";

const sampleResponses = [
  {
    question: "What are some healthy breakfast options?",
    answer: "Sure! Healthy breakfast choices include:\n\n1. Oats topped with banana and flax seeds\n2. Scrambled tofu or eggs with spinach\n3. Smoothie bowls with berries, Greek yogurt, and almonds\n4. Whole grain wraps with hummus and veggies\n5. Quinoa porridge with dates and nuts"
  },
  {
    question: "How much protein should I eat daily?",
    answer: "Protein needs vary by activity level:\n\n- Sedentary: 0.8g/kg\n- Active: 1.2–2.0g/kg\n- Muscle building: 1.6–2.2g/kg\n\nIf you're 60kg and active, aim for 72–120g protein/day."
  },
  {
    question: "What are the symptoms of vitamin D deficiency?",
    answer: "Vitamin D deficiency symptoms:\n\n- Fatigue\n- Bone or joint pain\n- Mood changes\n- Muscle weakness\n\nGet sunlight and eat fish, eggs, and fortified foods!"
  },
  {
    question: "Which foods are high in iron?",
    answer: "Iron-rich foods:\n\n- Red meat, liver\n- Spinach, lentils\n- Chickpeas, pumpkin seeds\n- Fortified cereals\n\nPair with vitamin C to absorb better!"
  },
  {
    question: "How can I reduce sugar in my diet?",
    answer: "Cut sugar by:\n\n- Avoiding sugary drinks\n- Using fruits to sweeten\n- Reading food labels\n- Choosing whole foods\n- Limiting desserts"
  }
];

type Message = {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hello! I'm NutriBite, your AI nutrition assistant. Ask me anything about healthy eating, nutrients, or meal ideas!",
      sender: "bot",
      timestamp: new Date()
    },
    {
      text: "💡 Tip: Try asking things like 'What should I eat for breakfast?' or 'How much protein do I need?'",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const quickQuestions = [
    "What are some healthy breakfast options?",
    "How much protein should I eat daily?",
    "What are the symptoms of vitamin D deficiency?",
    "Which foods are high in iron?",
    "How can I reduce sugar in my diet?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      const userMessage: Message = {
        text: trimmedInput,
        sender: "user",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(() => {
        let botReply = "";

        // Greeting detection
        if (/^(hi|hello|hey)\b/i.test(trimmedInput)) {
          botReply = "Hey there! 😊 How can I help you with your nutrition today?";
        } else {
          const matchedResponse = sampleResponses.find((resp) =>
            trimmedInput.toLowerCase().includes(resp.question.toLowerCase())
          );

          botReply = matchedResponse
            ? matchedResponse.answer
            : "Hmm... I don't have a specific answer for that right now. Try rephrasing or check with a dietitian!";
        }

        const botMessage: Message = {
          text: botReply,
          sender: "bot",
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        text: "👋 Hello! I'm NutriBite, your AI nutrition assistant. Ask me anything about healthy eating, nutrients, or meal ideas!",
        sender: "bot",
        timestamp: new Date()
      },
      {
        text: "💡 Tip: Try asking things like 'What should I eat for breakfast?' or 'How much protein do I need?'",
        sender: "bot",
        timestamp: new Date()
      }
    ]);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Nutrition Assistant</h1>
            <p className="text-lg text-muted-foreground">
              Get instant answers to your nutrition questions from our AI nutrition assistant
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4 order-2 md:order-1">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-green-600" />
                    Quick Questions
                  </h3>
                  <div className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-8 order-1 md:order-2">
              <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden border border-border">
                <div className="bg-muted py-3 px-4 border-b border-border flex justify-between items-center">
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                    <h3 className="font-medium">Nutrition Assistant</h3>
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
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
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
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex space-x-2 items-center">
                            <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t border-border p-3">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your nutrition question..."
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
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
