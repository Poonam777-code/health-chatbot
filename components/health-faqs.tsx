"use client"
import React from "react"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageCircle,
  Search,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Globe,
  ExternalLink,
  Send,
  Bot,
  User,
} from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  votes: number
  sources: string[]
  trending: boolean
  language: string
}

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  sources?: string[]
}

interface Comment {
  id: string;
  text: string;
  likes: number;
}

export default function HealthFAQs() {
  const { t } = useTranslation()
  // Community Sharing Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentLikes, setCommentLikes] = useState({});

  // Dynamic weather fetch (mocked for demo, replace with real API)
  const [currentWeather, setCurrentWeather] = useState("Summer");
  useEffect(() => {
    // Example: Replace with real weather API fetch
    fetch("https://wttr.in/?format=%C")
      .then(res => res.text())
      .then(text => {
        if (text.toLowerCase().includes("sunny")) setCurrentWeather("Summer");
        else if (text.toLowerCase().includes("rain")) setCurrentWeather("Monsoon");
        else if (text.toLowerCase().includes("cold") || text.toLowerCase().includes("snow")) setCurrentWeather("Winter");
        else setCurrentWeather("Pleasant");
      });
  }, []);

  // Add a new comment
  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments(prev => [
      ...prev,
      { id: Date.now().toString(), text: commentInput, likes: 0 }
    ]);
    setCommentInput("");
  };

  // Like a comment
  const handleLikeComment = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const pushNotifications = [
    {
      type: "Push Notification",
      title: `${currentWeather} Health Tip ${currentWeather === "Summer" ? "☀️" : currentWeather === "Winter" ? "❄️" : currentWeather === "Monsoon" ? "🌧️" : "🌤️"}`,
      message:
        currentWeather === "Summer"
          ? "It's hot outside! Drink extra water, wear light clothes, and avoid direct sun during peak hours."
          : currentWeather === "Winter"
          ? "Stay warm! Eat hot meals, wear layers, and moisturize your skin to prevent dryness."
          : currentWeather === "Monsoon"
          ? "Rainy days ahead! Keep your surroundings dry, wash hands often, and eat fresh food."
          : "Enjoy the pleasant weather! Go for a walk and eat fresh fruits.",
      category: "Seasonal Alert"
    },
    {
      type: "Push Notification",
      title: "Daily Nutrition Tip 🥗",
      message: "Add seasonal fruits and veggies to your meals for better health.",
      category: "Diet & Nutrition"
    },
    {
      type: "Push Notification",
      title: "Mental Wellness Reminder 🧘",
      message: "Take a few minutes to relax and breathe deeply. Your mind matters!",
      category: "Mental Health"
    }
  ];

  // Actual healthy recipes for each season
  const communityPosts = [
    {
      type: "Community Post",
      title: "Healthy Eating Challenge 🥗",
      message: "Post a photo of your healthy meal and inspire others!",
      category: "Diet & Nutrition",
      whatsappShare: true
    }
  ];
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI health assistant. Ask me any health-related question and I'll provide evidence-based answers with trusted sources.",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "general", name: "General Health" },
    { id: "nutrition", name: "Nutrition" },
    { id: "exercise", name: "Exercise" },
    { id: "mental-health", name: "Mental Health" },
    { id: "chronic-conditions", name: "Chronic Conditions" },
    { id: "medications", name: "Medications" },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How much water should I drink daily?",
      answer:
        "The general recommendation is about 8 glasses (64 ounces) of water per day, but individual needs vary based on activity level, climate, and overall health. The Institute of Medicine suggests about 15.5 cups (3.7 liters) for men and 11.5 cups (2.7 liters) for women from all beverages and food.",
      category: "nutrition",
      votes: 245,
      sources: ["Mayo Clinic", "Institute of Medicine"],
      trending: true,
      language: "en",
    },
    {
      id: "2",
      question: "What are the symptoms of high blood pressure?",
      answer:
        "High blood pressure often has no symptoms, which is why it's called the 'silent killer.' However, some people may experience headaches, shortness of breath, or nosebleeds. Regular monitoring is essential for early detection.",
      category: "chronic-conditions",
      votes: 189,
      sources: ["American Heart Association", "CDC"],
      trending: true,
      language: "en",
    },
    {
      id: "3",
      question: "How often should I exercise?",
      answer:
        "The CDC recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities on 2 or more days per week.",
      category: "exercise",
      votes: 156,
      sources: ["CDC", "WHO"],
      trending: false,
      language: "en",
    },
    {
      id: "4",
      question: "What foods boost immune system?",
      answer:
        "Foods rich in vitamin C (citrus fruits, berries), vitamin D (fatty fish, fortified foods), zinc (nuts, seeds), and probiotics (yogurt, fermented foods) can help support immune function. A balanced diet with plenty of fruits and vegetables is key.",
      category: "nutrition",
      votes: 203,
      sources: ["Harvard Health", "National Institutes of Health"],
      trending: true,
      language: "en",
    },
    {
      id: "5",
      question: "How can I improve my sleep quality?",
      answer:
        "Maintain a consistent sleep schedule, create a relaxing bedtime routine, keep your bedroom cool and dark, avoid screens before bed, limit caffeine and alcohol, and get regular exercise (but not close to bedtime).",
      category: "general",
      votes: 178,
      sources: ["Sleep Foundation", "Mayo Clinic"],
      trending: false,
      language: "en",
    },
  ]

  const trendingQuestions = faqs.filter((faq) => faq.trending).slice(0, 3)

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesLanguage = faq.language === selectedLanguage
    return matchesSearch && matchesCategory && matchesLanguage
  })

  const handleVote = (faqId: string, isUpvote: boolean) => {
    // In a real app, this would update the database
    console.log(`Voted ${isUpvote ? "up" : "down"} on FAQ ${faqId}`)
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateAIResponse(chatInput),
        timestamp: new Date(),
        sources: ["WHO", "CDC", "Mayo Clinic"],
      }
      setChatMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (question: string): string => {
    // Simple response generation based on keywords
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("headache")) {
      return "Headaches can have various causes including tension, dehydration, lack of sleep, or underlying conditions. For frequent headaches, stay hydrated, maintain regular sleep, manage stress, and consult a healthcare provider if they persist or worsen."
    } else if (lowerQuestion.includes("fever")) {
      return "A fever is typically a sign that your body is fighting an infection. Rest, stay hydrated, and monitor your temperature. Seek medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms."
    } else if (lowerQuestion.includes("diet") || lowerQuestion.includes("nutrition")) {
      return "A balanced diet should include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and excessive sodium. Consider consulting a registered dietitian for personalized nutrition advice."
    } else {
      return "Thank you for your question. For specific medical concerns, I recommend consulting with a qualified healthcare professional who can provide personalized advice based on your individual health situation. In the meantime, maintain healthy lifestyle habits including regular exercise, balanced nutrition, adequate sleep, and stress management."
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  return (
    <div className="space-y-6">

      {/* Community Sharing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-orange-500" />
            {t("community_sharing_posts")}
          </CardTitle>
          <CardDescription>{t("share_real_healthy_recipes")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {communityPosts.map((item, idx) => (
              <div key={idx} className="relative bg-muted p-3 rounded text-xs mb-2">
                <strong>{item.title}</strong>
                <div>{item.message}</div>
                {item.whatsappShare && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(item.title + '\n' + item.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 flex items-center gap-1 text-green-600 hover:underline"
                  >
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.693 4.607 2.01 6.563L4 29l7.646-2.01A12.96 12.96 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.91-.52-5.59-1.51l-.4-.23-4.54 1.19 1.21-4.42-.26-.41A9.93 9.93 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.13-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.36-.26.29-1 1-.97 2.43.03 1.43 1.04 2.81 1.19 3 .15.19 2.05 3.14 5.01 4.28.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.09 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
                    </svg>
                    Share on WhatsApp
                  </a>
                )}
                {/* Comments Section */}
                <div className="mt-4">
                  <div className="font-semibold mb-2">{t("group_chat_and_comments")}</div>
                  <div className="space-y-2">
                    {comments.map((c) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <span className="bg-secondary rounded px-2 py-1 text-xs">{c.text}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleLikeComment(c.id)}>
                          ❤️ {c.likes}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      placeholder={t("write_a_comment")}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleAddComment}>{t("comment")}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Header with Language Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-balance">{t("health_faqs_ai_chat")}</h3>
          <p className="text-muted-foreground text-pretty">{t("evidence_based_answers")}</p>
        </div>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-40">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FAQ Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                {t("frequently_asked_questions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t("search_health_questions")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Trending Questions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  {t("trending_questions")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingQuestions.map((faq) => (
                    <Button
                      key={faq.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(faq.question)}
                      className="text-xs"
                    >
                      {faq.question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start gap-2 flex-1">
                        <span className="text-sm font-medium">{faq.question}</span>
                        {faq.trending && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>

                      {/* Sources */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium">{t("trusted_sources")}</div>
                        <div className="flex flex-wrap gap-2">
                          {faq.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Voting */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVote(faq.id, true)}
                            className="h-8 px-2"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {t("helpful")}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVote(faq.id, false)}
                            className="h-8 px-2"
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            {t("not_helpful")}
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">{t("people_found_this_helpful", { count: faq.votes })}</div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Section */}
        <div className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-500" />
                {t("ai_health_assistant")}
              </CardTitle>
              <CardDescription>{t("ask_health_question")}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user" ? "bg-secondary" : "bg-purple-100 dark:bg-purple-900"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user" ? "bg-secondary text-secondary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.sources && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <div className="text-xs text-muted-foreground mb-1">Sources:</div>
                            <div className="flex flex-wrap gap-1">
                              {message.sources.map((source, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t("ask_a_health_question_placeholder")}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!chatInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
