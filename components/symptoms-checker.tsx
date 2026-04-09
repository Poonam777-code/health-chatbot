"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Brain,
  Eye,
  Ear,
  Zap,
  CheckCircle,
  Activity,
  MessageSquare,
  Send,
  Bot,
  User,
  Thermometer,
  Clock,
  AlertCircle,
} from "lucide-react"

interface SymptomsCheckerProps {
  onHealthScoreUpdate: (score: number) => void
}

const bodyParts = [
  { id: "head", name: "Head", style: "top-6 left-1/2 -translate-x-1/2" },
  { id: "eyes", name: "Eyes", style: "top-12 left-1/2 -translate-x-1/2" },
  { id: "ears", name: "Ears", style: "top-12 left-8" },
  { id: "throat", name: "Throat", style: "top-20 left-1/2 -translate-x-1/2" },
  { id: "chest", name: "Chest", style: "top-32 left-1/2 -translate-x-1/2" },
  { id: "abdomen", name: "Stomach", style: "top-44 left-1/2 -translate-x-1/2" },
  { id: "back", name: "Back", style: "top-32 right-8" },
  { id: "arms", name: "Arms", style: "top-36 left-4" },
  { id: "legs", name: "Legs", style: "top-60 left-1/2 -translate-x-1/2" },
]

export default function SymptomsChecker({ onHealthScoreUpdate }: SymptomsCheckerProps) {
  const [painLevel, setPainLevel] = useState<string>("")
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ type: "user" | "bot"; message: string }>>([
    { type: "bot", message: "Hello! I'm your AI health assistant. How can I help you today?" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [additionalSymptoms, setAdditionalSymptoms] = useState("")
  const [realHealthData, setRealHealthData] = useState<any>(null)
  const [bodyPartsFromDB, setBodyPartsFromDB] = useState<any[]>([])
  const [symptomsFromDB, setSymptomsFromDB] = useState<any[]>([])

  const commonSymptoms = {
    head: [
      { name: "Severe Headache", severity: "high" },
      { name: "Mild Headache", severity: "low" },
      { name: "Dizziness", severity: "medium" },
      { name: "Migraine", severity: "high" },
      { name: "Confusion", severity: "high" },
      { name: "Memory Issues", severity: "medium" },
    ],
    eyes: [
      { name: "Blurred Vision", severity: "medium" },
      { name: "Eye Pain", severity: "medium" },
      { name: "Dry Eyes", severity: "low" },
      { name: "Light Sensitivity", severity: "medium" },
      { name: "Double Vision", severity: "high" },
      { name: "Vision Loss", severity: "high" },
    ],
    ears: [
      { name: "Ear Pain", severity: "medium" },
      { name: "Hearing Loss", severity: "high" },
      { name: "Tinnitus", severity: "medium" },
      { name: "Discharge", severity: "medium" },
      { name: "Vertigo", severity: "high" },
      { name: "Itching", severity: "low" },
    ],
    throat: [
      { name: "Sore Throat", severity: "low" },
      { name: "Difficulty Swallowing", severity: "medium" },
      { name: "Hoarse Voice", severity: "low" },
      { name: "Throat Pain", severity: "medium" },
    ],
    chest: [
      { name: "Chest Pain", severity: "high" },
      { name: "Shortness of Breath", severity: "high" },
      { name: "Heart Palpitations", severity: "medium" },
      { name: "Persistent Cough", severity: "medium" },
      { name: "Wheezing", severity: "medium" },
      { name: "Chest Tightness", severity: "medium" },
    ],
    abdomen: [
      { name: "Severe Stomach Pain", severity: "high" },
      { name: "Mild Stomach Pain", severity: "low" },
      { name: "Nausea", severity: "low" },
      { name: "Vomiting", severity: "medium" },
      { name: "Bloating", severity: "low" },
      { name: "Diarrhea", severity: "medium" },
    ],
    back: [
      { name: "Lower Back Pain", severity: "medium" },
      { name: "Upper Back Pain", severity: "low" },
      { name: "Muscle Spasms", severity: "medium" },
      { name: "Stiffness", severity: "low" },
    ],
    arms: [
      { name: "Arm Pain", severity: "medium" },
      { name: "Numbness", severity: "medium" },
      { name: "Weakness", severity: "high" },
      { name: "Tingling", severity: "low" },
    ],
    legs: [
      { name: "Leg Pain", severity: "medium" },
      { name: "Swelling", severity: "medium" },
      { name: "Cramps", severity: "low" },
      { name: "Numbness", severity: "medium" },
    ],
  }

  const urgencyLevels = {
    low: { color: "bg-green-500", text: "Self-care recommended", icon: CheckCircle },
    medium: { color: "bg-yellow-500", text: "Consider doctor visit", icon: Clock },
    high: { color: "bg-red-500", text: "Seek immediate care", icon: AlertCircle },
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-300 bg-red-50 hover:bg-red-100"
      case "medium":
        return "border-yellow-300 bg-yellow-50 hover:bg-yellow-100"
      default:
        return "border-green-300 bg-green-50 hover:bg-green-100"
    }
  }

  const hospitalRecommendations: Record<string, Array<{ name: string; query: string; phone: string }>> = {
    head: [
      { name: "Nanded Neuro & Spine Hospital", query: "neurology hospital Nanded", phone: "+91 95820 12345" },
      { name: "City General Hospital - Head & Neck Clinic", query: "headache clinic Nanded", phone: "+91 95820 67890" },
    ],
    eyes: [
      { name: "Vision Care Centre Nanded", query: "eye hospital Nanded", phone: "+91 95820 23456" },
      { name: "Optical & Eye Clinic", query: "optician Nanded", phone: "+91 95820 34567" },
    ],
    ears: [
      { name: "Audiology & ENT Centre", query: "ear nose throat hospital Nanded", phone: "+91 95820 45678" },
      { name: "ENT Super Speciality Hospital", query: "ENT hospital Nanded", phone: "+91 95820 56789" },
    ],
    throat: [
      { name: "Throat & Voice Care Clinic", query: "throat specialist Nanded", phone: "+91 95820 67891" },
      { name: "ENT Super Speciality Hospital", query: "ENT hospital Nanded", phone: "+91 95820 56789" },
    ],
    chest: [
      { name: "Cardiac Care Hospital", query: "cardiology hospital Nanded", phone: "+91 95820 78912" },
      { name: "Heart & Lung Centre", query: "heart hospital Nanded", phone: "+91 95820 89123" },
    ],
    abdomen: [
      { name: "Gastro Care Hospital", query: "gastroenterology hospital Nanded", phone: "+91 95820 91234" },
      { name: "General Surgery Hospital", query: "abdominal hospital Nanded", phone: "+91 95820 12356" },
    ],
    back: [
      { name: "Spine & Rehab Centre", query: "spine hospital Nanded", phone: "+91 95820 34578" },
      { name: "Orthopedic Hospital", query: "back pain clinic Nanded", phone: "+91 95820 45679" },
    ],
    arms: [
      { name: "Orthopedic Hospital", query: "arm pain clinic Nanded", phone: "+91 95820 56780" },
      { name: "Physiotherapy & Rehab Centre", query: "physiotherapy Nanded", phone: "+91 95820 67892" },
    ],
    legs: [
      { name: "Vascular & Orthopedic Centre", query: "leg pain hospital Nanded", phone: "+91 95820 78923" },
      { name: "Sports Injury Clinic", query: "sports clinic Nanded", phone: "+91 95820 89134" },
    ],
    default: [
      { name: "Nanded General Hospital", query: "nearby hospital Nanded", phone: "+91 95820 11111" },
    ],
  }

  const getHospitalRecommendations = (bodyPart: string | null) => {
    if (!bodyPart) return hospitalRecommendations.default
    return hospitalRecommendations[bodyPart] || hospitalRecommendations.default
  }

  const handleBodyPartClick = (partId: string) => {
    setSelectedBodyPart(partId)
    setCurrentStep(2)
  }

  const handleSymptomSelect = (symptom: any) => {
    const symptomName = typeof symptom === "string" ? symptom : symptom.name
    if (symptoms.includes(symptomName)) {
      setSymptoms(symptoms.filter((s) => s !== symptomName))
    } else {
      setSymptoms([...symptoms, symptomName])
    }
  }

  const analyzeSymptoms = async () => {
    const highSeverityCount = symptoms.filter((s) => {
      const symptomObj = commonSymptoms[selectedBodyPart as keyof typeof commonSymptoms]?.find(
        (sym: any) => sym.name === s,
      )
      return symptomObj?.severity === "high"
    }).length

    const severity = highSeverityCount > 0 ? "high" : symptoms.length > 2 ? "medium" : "low"
    const healthScore = severity === "high" ? 45 : severity === "medium" ? 70 : 90

    const result = {
      possibleConditions:
        severity === "high"
          ? ["Acute condition requiring attention", "Potential emergency", "Serious symptoms detected"]
          : severity === "medium"
            ? ["Common condition", "Mild infection", "Stress-related symptoms"]
            : ["Minor issue", "Self-limiting condition", "Lifestyle-related"],
      urgencyLevel: severity,
      recommendations:
        severity === "high"
          ? ["Seek immediate medical attention", "Do not delay treatment", "Consider emergency services"]
          : severity === "medium"
            ? ["Schedule doctor appointment within 24-48 hours", "Monitor symptoms closely", "Rest and hydration"]
            : ["Self-care measures", "Monitor for 24-48 hours", "Over-the-counter remedies if needed"],
      healthScore,
      riskFactors: ["Age", "Medical history", "Symptom duration"],
      nextSteps: ["Follow up in 1-2 days", "Return if symptoms worsen", "Keep symptom diary"],
    }

    // Save analysis to database via API
    try {
      await fetch("/api/symptom-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body_part: selectedBodyPart,
          selected_symptoms: symptoms,
          urgency_level: severity,
          health_score: healthScore,
          ai_analysis: result,
          additional_notes: additionalSymptoms,
        }),
      })
    } catch (error) {
      console.error("Error saving symptom analysis:", error)
    }

    setAnalysisResult(result)
    onHealthScoreUpdate(healthScore)
    setCurrentStep(3)
  }

  const sendChatMessage = () => {
    if (!chatInput.trim()) return

    let botMessage = "I'm here to help!"
    const input = chatInput.trim().toLowerCase()

    if (selectedBodyPart) {
      if (input.includes("pain") || input.includes("ache")) {
        botMessage = `You mentioned pain in your ${selectedBodyPart}. Possible causes include muscle strain, posture issues, or minor injury. Prevention: maintain good posture, avoid heavy lifting, and take breaks. See a doctor if pain is severe, persistent, or associated with other symptoms like numbness or fever.`
      } else if (input.includes("dizziness")) {
        botMessage = `Dizziness in your ${selectedBodyPart} can be due to dehydration, low blood sugar, or ear problems. Prevention: stay hydrated, eat regularly, and avoid sudden movements. See a doctor if dizziness is severe or frequent.`
      } else {
        botMessage = `For your ${selectedBodyPart}, please describe your symptoms in detail. I can provide awareness tips, possible causes, and when to seek medical help.`
      }
    } else {
      if (input.includes("back pain")) {
        botMessage = `Back pain is often caused by muscle strain, poor posture, or injury. Prevention: maintain good posture, exercise regularly, and avoid heavy lifting. See a doctor if pain is severe, persistent, or associated with numbness or loss of bladder control.`
      } else if (input.includes("headache")) {
        botMessage = `Headaches can be caused by stress, dehydration, or eye strain. Prevention: rest, stay hydrated, and limit screen time. See a doctor if headache is severe, sudden, or associated with vision changes.`
      } else {
        botMessage = `Please specify the body part and symptoms for more tailored advice. I can provide awareness info, prevention tips, and when to see a doctor.`
      }
    }

    const newMessages = [
      ...chatMessages,
      { type: "user" as const, message: chatInput },
      { type: "bot" as const, message: botMessage },
    ]

    setChatMessages(newMessages)
    setChatInput("")
  }

  useEffect(() => {
    const loadHealthData = async () => {
      try {
        const response = await fetch("/api/health-data")
        if (response.ok) {
          const data = await response.json()
          if (data.bodyParts) setBodyPartsFromDB(data.bodyParts)
          if (data.symptoms) setSymptomsFromDB(data.symptoms)
          if (data.healthProfile) setRealHealthData(data.healthProfile)
        }
      } catch (error) {
        console.error("Error loading health data:", error)
      }
    }

    loadHealthData()
  }, [])

  const enhancedBodyParts = [
    {
      id: "head",
      name: "Head",
      icon: Brain,
      position: "top-4 left-1/2 transform -translate-x-1/2",
      color: "bg-purple-100 hover:bg-purple-200 border-purple-400 shadow-lg",
      size: "px-4 py-2 text-sm font-medium",
    },
    {
      id: "eyes",
      name: "Eyes",
      icon: Eye,
      position: "top-12 left-1/2 transform -translate-x-1/2",
      color: "bg-blue-100 hover:bg-blue-200 border-blue-400 shadow-lg",
      size: "px-3 py-2 text-sm font-medium",
    },
    {
      id: "ears",
      name: "Ears",
      icon: Ear,
      position: "top-12 left-8",
      color: "bg-green-100 hover:bg-green-200 border-green-400 shadow-lg",
      size: "px-3 py-2 text-sm font-medium",
    },
    {
      id: "throat",
      name: "Throat",
      icon: Activity,
      position: "top-20 left-1/2 transform -translate-x-1/2",
      color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-400 shadow-lg",
      size: "px-3 py-2 text-sm font-medium",
    },
    {
      id: "chest",
      name: "Chest",
      icon: Heart,
      position: "top-32 left-1/2 transform -translate-x-1/2",
      color: "bg-red-100 hover:bg-red-200 border-red-400 shadow-lg",
      size: "px-4 py-2 text-sm font-medium",
    },
    {
      id: "abdomen",
      name: "Abdomen",
      icon: Activity,
      position: "top-44 left-1/2 transform -translate-x-1/2",
      color: "bg-orange-100 hover:bg-orange-200 border-orange-400 shadow-lg",
      size: "px-3 py-2 text-sm font-medium",
    },
    {
      id: "back",
      name: "Back",
      icon: Activity,
      position: "top-32 right-8",
      color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-400 shadow-lg",
      size: "px-3 py-2 text-sm font-medium",
    },
    {
      id: "arms",
      name: "Arms",
      icon: Activity,
      position: "top-36 left-4",
      color: "bg-pink-100 hover:bg-pink-200 border-pink-400 shadow-lg",
      size: "px-3 py-2 text-sm font-medium",
    },
    {
      id: "legs",
      name: "Legs",
      icon: Activity,
      position: "top-60 left-1/2 transform -translate-x-1/2",
      color: "bg-teal-100 hover:bg-teal-200 border-teal-400 shadow-lg",
      size: "px-4 py-2 text-sm font-medium",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-slate-500 dark:text-slate-400"
                }`}
              >
                {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-1 mx-2 rounded ${
                    currentStep > step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowChatbot(!showChatbot)}
          className="flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          AI Chat
        </Button>
      </div>

      {/* Chatbot */}
      {showChatbot && (
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="w-5 h-5 text-primary" />
              AI Health Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      msg.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-300 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                      }`}
                    >
                      {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      }`}
                    >
                      <p className="text-sm leading-6">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask about your symptoms..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                className="flex-1"
              />
              <Button onClick={sendChatMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Body Map */}
      {currentStep === 1 && (
        <Card className="border-2 border-blue-400 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-700 flex items-center gap-2">
              <span role="img" aria-label="body">
                🦴
              </span>{" "}
              Select Affected Body Part
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Click on a body part to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mx-auto w-80 h-[400px] rounded-xl overflow-hidden border border-blue-200 bg-gradient-to-br from-blue-100 via-white to-purple-100 shadow-xl">
              {/* Skeleton image as background */}
              <img
                src="/diagram.png"
                alt="Human Skeleton"
                className="absolute inset-0 w-full h-full object-contain opacity-80 pointer-events-none drop-shadow-xl"
                style={{ filter: "contrast(1.2) brightness(1.1)" }}
              />
              {/* Overlay body part buttons */}
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  className={`absolute ${part.style} bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-3 py-1 shadow-xl hover:scale-110 hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-xs border-2 border-white animate-fade-in`}
                  onClick={() => {
                    setSelectedBodyPart(part.id)
                    setCurrentStep(1.5)
                  }}
                  style={{ zIndex: 2 }}
                >
                  {part.name}
                </button>
              ))}
              {/* Decorative animated pulse ring */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-blue-300 animate-pulse opacity-30 pointer-events-none"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1.5: Pain level */}
      {currentStep === 1.5 && selectedBodyPart && (
        <Card className="border-2 border-yellow-400 shadow-xl bg-gradient-to-br from-yellow-50 via-white to-red-50">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-yellow-700 flex items-center gap-2">
              <span role="img" aria-label="pain">
                🩺
              </span>{" "}
              How severe is your pain in {selectedBodyPart.charAt(0).toUpperCase() + selectedBodyPart.slice(1)}?
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Select your pain level to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center">
              {["Low", "Medium", "High"].map((level) => (
                <Button
                  key={level}
                  variant={painLevel === level ? "default" : "outline"}
                  className={`px-6 py-2 text-base font-semibold ${
                    level === "High" ? "bg-red-600 text-white" : level === "Medium" ? "bg-yellow-400 text-white" : "bg-green-500 text-white"
                  }`}
                  onClick={() => {
                    setPainLevel(level)
                    setCurrentStep(2)
                  }}
                >
                  {level}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Symptom selection */}
      {currentStep === 2 && selectedBodyPart && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary" />{" "}
              {`Select Symptoms for ${selectedBodyPart.charAt(0).toUpperCase() + selectedBodyPart.slice(1)}`}
            </CardTitle>
            <CardDescription>
              Choose symptoms you are experiencing. This tool is for awareness only: you'll get possible causes, prevention tips, and advice on when to see a doctor. Not a diagnosis tool.
              <Badge variant="outline" className="ml-2" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Search for custom symptoms */}
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Type your symptom if not listed..."
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    handleSymptomSelect(e.currentTarget.value.trim())
                    e.currentTarget.value = ""
                  }
                }}
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">Press Enter to add your symptom</span>
            </div>
            {/* Symptom buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonSymptoms[selectedBodyPart as keyof typeof commonSymptoms]?.map((symptom: any) => (
                <Button
                  key={symptom.name}
                  variant={symptoms.includes(symptom.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSymptomSelect(symptom)}
                  className={`justify-start h-auto p-3 ${getSeverityColor(symptom.severity)} ${
                    symptoms.includes(symptom.name) ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {symptoms.includes(symptom.name) && <CheckCircle className="w-4 h-4" />}
                      <span className="text-sm">{symptom.name}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        symptom.severity === "high"
                          ? "bg-red-100 text-red-800"
                          : symptom.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {symptom.severity}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
            {/* Awareness message */}
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 mt-2">
              <span role="img" aria-label="info">ℹ️</span> This tool does not diagnose. It helps you understand possible causes, prevention, and when to seek medical help.
            </div>
            {/* Emergency high pain alert */}
            {painLevel === "High" && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 mt-2 animate-pulse">
                <span role="img" aria-label="alert">🚨</span> You reported high pain. Please contact emergency services or visit the nearest hospital immediately.<br />
                <b>Emergency Number:</b> <a href="tel:108" className="text-red-700 underline">108</a><br />
                <b>Nearest Hospital:</b> <a href="https://www.google.com/maps?q=hospital+Nanded" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">View on Map</a>
              </div>
            )}
            {/* Prevention Tips */}
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Prevention Tips:
              </label>
              <ul className="list-disc ml-6 text-xs text-green-800">
                {selectedBodyPart === "head" && [
                  "Stay hydrated and rest for headaches.",
                  "Limit screen time for eye pain.",
                  "Avoid loud noises for earache.",
                  "Practice stress management for migraines.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "chest" && [
                  "Avoid strenuous activity if you have chest pain.",
                  "Practice deep breathing for shortness of breath.",
                  "Consult a doctor for persistent cough or wheezing.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "arms" && [
                  "Stretch regularly to prevent stiffness.",
                  "Elevate swollen arms.",
                  "Use ergonomic supports for joint pain.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "back" && [
                  "Maintain good posture.",
                  "Use proper lifting techniques.",
                  "Take breaks from sitting.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "legs" && [
                  "Stretch before exercise to prevent cramps.",
                  "Elevate legs to reduce swelling.",
                  "Consult a doctor for fractures or severe pain.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            {/* When to see a doctor */}
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600" />
                When to See a Doctor:
              </label>
              <ul className="list-disc ml-6 text-xs text-red-800">
                {selectedBodyPart === "head" && [
                  "Severe headache with confusion or vision loss.",
                  "Sudden hearing loss or persistent dizziness.",
                  "Migraine not relieved by rest or medication.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "chest" && [
                  "Chest pain with shortness of breath or sweating.",
                  "Persistent cough or wheezing not improving.",
                  "Heart palpitations with fainting.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "arms" && [
                  "Sudden weakness or numbness in arms.",
                  "Swelling with severe pain.",
                  "Joint stiffness with fever.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "back" && [
                  "Back pain with numbness or loss of bladder control.",
                  "Severe pain after injury.",
                  "Persistent posture issues affecting daily life.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
                {selectedBodyPart === "legs" && [
                  "Knee pain with inability to walk.",
                  "Leg swelling with redness or heat.",
                  "Suspected fracture or severe injury.",
                ].map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            {/* Additional Symptoms Input */}
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Additional symptoms or details:
              </label>
              <Textarea
                placeholder="Describe any other symptoms, when they started, severity level, or any other relevant details..."
                className="min-h-24 resize-none"
                value={additionalSymptoms}
                onChange={(e) => setAdditionalSymptoms(e.target.value)}
              />
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={() => setCurrentStep(1)} variant="outline" className="flex-1">
                ← Back to Body Map
              </Button>
              <Button
                onClick={analyzeSymptoms}
                disabled={symptoms.length === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Awareness Info
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: AI Analysis Results with Light Violet Background and Dark Text */}
      {currentStep === 3 && analysisResult && (
        <div className="space-y-6">
          {/* Card with light violet background gradient */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-violet-50 via-purple-50 to-white">
            <CardHeader className="bg-gradient-to-r from-violet-50 via-purple-50 to-white">
              {/* Title with dark/white text */}
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <Zap className="w-5 h-5 text-primary" />
                AI Analysis Results
                <Badge variant="secondary">Powered by AI</Badge>
              </CardTitle>
            </CardHeader>
            {/* Content with dark/white text */}
            <CardContent className="space-y-6 p-6 text-gray-800">
              {/* Urgency Indicator */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-violet-100 border border-violet-300">
                <div
                  className={`w-6 h-6 rounded-full ${urgencyLevels[analysisResult.urgencyLevel as keyof typeof urgencyLevels].color} flex items-center justify-center`}
                >
                  {React.createElement(urgencyLevels[analysisResult.urgencyLevel as keyof typeof urgencyLevels].icon, {
                    className: "w-4 h-4 text-white",
                  })}
                </div>
                <div>
                  {/* Dark text */}
                  <span className="font-semibold text-lg">{urgencyLevels[analysisResult.urgencyLevel as keyof typeof urgencyLevels].text}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Based on symptom analysis</p>
                </div>
              </div>

              {/* Results grid with light violet background and dark text */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Possible Conditions */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                    <Activity className="w-4 h-4" />
                    Possible Conditions:
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.possibleConditions.map((condition: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                        <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                        <span className="text-sm">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                    <CheckCircle className="w-4 h-4" />
                    Recommendations:
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-green-50 rounded-lg border border-green-200"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nearby Hospital Suggestions */}
              <div className="rounded-3xl bg-slate-950/95 p-4 border border-slate-700 shadow-lg shadow-slate-950/40 text-white">
                <div className="flex items-center justify-between mb-3 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Nearby Hospital Suggestions</h4>
                    <p className="text-xs text-slate-300">Recommended based on your {selectedBodyPart || "reported"} symptoms.</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">Map + Call</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {getHospitalRecommendations(selectedBodyPart).map((hospital, index) => (
                    <div key={index} className="rounded-2xl bg-slate-900/95 p-4 border border-slate-700 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">{hospital.name}</p>
                          <p className="text-xs text-slate-400">{selectedBodyPart ? `Best for ${selectedBodyPart} symptoms` : "General hospital"}</p>
                        </div>
                        <a
                          href={`tel:${hospital.phone}`}
                          className="inline-flex items-center rounded-full bg-cyan-600 px-3 py-1 text-xs text-white transition-colors duration-200 hover:bg-cyan-500"
                        >
                          Call
                        </a>
                      </div>
                      <p className="mt-3 text-xs text-slate-400">Map link:</p>
                      <a
                        className="text-sm font-medium text-cyan-300 underline"
                        href={`https://www.google.com/maps/search/${encodeURIComponent(hospital.query)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setCurrentStep(1)
                    setSelectedBodyPart(null)
                    setSymptoms([])
                    setAnalysisResult(null)
                    setAdditionalSymptoms("")
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  New Analysis
                </Button>
                <Button
                  onClick={() => setShowChatbot(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discuss with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}