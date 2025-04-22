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
  HelpCircle
} from "lucide-react";

const quickQuestions = [
  "What are some healthy breakfast options?",
  "How much protein should I eat daily?",
  "What are the symptoms of vitamin D deficiency?",
  "Which foods are high in iron?",
  "How can I reduce sugar in my diet?"
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
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = inputValue.trim();
    if (!input) return;

    const userMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const userText = userMessage.text.toLowerCase();
      let botReply = "";

      if (["hi", "hello", "hey"].includes(userText)) {
        botReply = "Hey there! 👋 Need help with nutrition tips?";
      } else if (["bye", "goodbye", "see you"].includes(userText)) {
        botReply = "See you later! Stay healthy 🌱";
      } else if (["thanks", "thank you"].includes(userText)) {
        botReply = "You're welcome! 😊";
      } else if (["good morning", "morning"].includes(userText)) {
        botReply = "Good morning! Ready to fuel your day? ☀️";
      } else {
        botReply = `You asked: "${userMessage.text}"\nTip: Eat whole foods and hydrate! 💧`;
      }

      const botMessage: Message = {
        text: botReply,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      scrollToBottom();
    }, 600);
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
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSend();
  };

  const showQuickQuestions = () => {
    const helpMessage: Message = {
      text: "Here are some questions you can ask:\n\n" +
        quickQuestions.map(q => `• ${q}`).join("\n"),
      sender: "bot",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, helpMessage]);
    scrollToBottom();
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
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-green-600" />
                      Quick Questions
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={showQuickQuestions}
                      className="flex items-center gap-2"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Help!
                    </Button>
                  </div>
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
                  <form onSubmit={handleSend} className="flex space-x-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your nutrition question..."
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
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
