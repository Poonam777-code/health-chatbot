"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Mic,
  MicOff,
  ThumbsUp,
  ThumbsDown,
  Stethoscope,
  Shield,
  HelpCircle,
  AlertTriangle,
  Menu,
  LogOut,
} from "lucide-react"
import { useRouter } from "next/navigation"
import LanguageSelector from "./language-selector"

// User interface (using @/lib/db, no Supabase dependency)
interface User {
  id: string
  email?: string
  display_name?: string
}

interface Message {
  id: string
  content: string
  message_type: "user" | "bot"
  created_at: string
  intent_detected?: string
  confidence_score?: number
}

interface ChatInterfaceProps {
  user: User
}

const quickReplies = [
  { textKey: "symptoms_checker", icon: Stethoscope, category: "symptoms" },
  { textKey: "prevention_tips", icon: Shield, category: "prevention" },
  { textKey: "common_faqs", icon: HelpCircle, category: "faq" },
  { textKey: "myth_busting", icon: AlertTriangle, category: "myths" },
]

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const { t, i18n } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: t("welcome_message"),
      message_type: "bot",
      created_at: new Date().toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load user's preferred language on component mount
  useEffect(() => {
    const loadUserLanguage = async () => {
      try {
        const response = await fetch("/api/user/language", {
          method: "GET",
        })
        if (response.ok) {
          const data = await response.json()
          if (data.preferred_language) {
            i18n.changeLanguage(data.preferred_language)
          }
        }
      } catch (error) {
        console.error("Failed to load user language preference:", error)
      }
    }

    loadUserLanguage()
  }, [i18n])

  useEffect(() => {
    setMessages((prev) => prev.map((msg) => (msg.id === "welcome" ? { ...msg, content: t("welcome_message") } : msg)))
  }, [i18n.language, t])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      message_type: "user",
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          conversation_id: conversationId,
          language: i18n.language,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()

      if (!conversationId && data.conversation_id) {
        setConversationId(data.conversation_id)
      }

      const botResponse: Message = {
        id: data.message.id,
        content: data.message.content,
        message_type: "bot",
        created_at: data.message.created_at,
        intent_detected: data.message.intent_detected,
        confidence_score: data.message.confidence_score,
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t("technical_difficulties"),
        message_type: "bot",
        created_at: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (category: string) => {
    const responses = {
      symptoms: t("symptoms_query"),
      prevention: t("prevention_query"),
      faq: t("faq_query"),
      myths: t("myths_query"),
    }

    handleSendMessage(responses[category as keyof typeof responses])
  }

  const handleFeedback = async (messageId: string, feedbackType: "thumbs_up" | "thumbs_down") => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message_id: messageId,
          feedback_type: feedbackType,
        }),
      })

      if (response.ok) {
        console.log(`Feedback submitted: ${feedbackType} for message ${messageId}`)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
  }

  const handleLogout = () => {
    router.push("/auth/login")
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">{t("health_assistant")}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t("ai_powered_health_info")}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("quick_actions")}</p>
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-left"
                  onClick={() => handleQuickReply(reply.category)}
                >
                  <reply.icon className="w-4 h-4" />
                  {t(reply.textKey)}
                </Button>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("language")}</p>
              <LanguageSelector />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              {t("sign_out")}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowSidebar(!showSidebar)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{t("health_assistant")}</h2>
                <p className="text-sm text-green-600 dark:text-green-400">{t("online_ready_to_help")}</p>
              </div>
            </div>
            <div className="ml-auto lg:hidden">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.message_type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.message_type === "bot" && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <Stethoscope className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-xs lg:max-w-md ${message.message_type === "user" ? "order-1" : ""}`}>
                <Card
                  className={`${
                    message.message_type === "user"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    {message.intent_detected && (
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {message.intent_detected.replace("_", " ")}
                        </Badge>
                        {message.confidence_score && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.round(message.confidence_score * 100)}% confidence
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {message.message_type === "bot" && message.id !== "welcome" && (
                  <div className="flex gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleFeedback(message.id, "thumbs_up")}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleFeedback(message.id, "thumbs_down")}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>

              {message.message_type === "user" && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <Stethoscope className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Buttons */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex gap-2 mb-3 overflow-x-auto">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-shrink-0 gap-2 bg-transparent"
                onClick={() => handleQuickReply(reply.category)}
              >
                <reply.icon className="w-4 h-4" />
                {t(reply.textKey)}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("input_placeholder")}
                className="pr-12"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={handleVoiceToggle}
              >
                {isRecording ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">{t("medical_disclaimer")}</p>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setShowSidebar(false)} />
      )}
    </div>
  )
}
