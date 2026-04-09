"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Dumbbell,
  Apple,
  Moon,
  Droplets,
  Sun,
  Target,
  Trophy,
  Play,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Thermometer,
} from "lucide-react"

interface PreventionTip {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  duration: string
  points: number
  completed: boolean
  effectiveness: number
  mediaType?: "video" | "animation" | "infographic"
}

export default function PreventionTips() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState("daily")
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [userPoints, setUserPoints] = useState(150)
  const [currentSeason, setCurrentSeason] = useState("winter")
  const [userLocation, setUserLocation] = useState("New York")

  const categories = [
    { id: "daily", name: "category_daily_challenges", icon: Target },
    { id: "nutrition", name: "category_nutrition", icon: Apple },
    { id: "exercise", name: "category_exercise", icon: Dumbbell },
    { id: "sleep", name: "category_sleep", icon: Moon },
    { id: "hydration", name: "category_hydration", icon: Droplets },
    { id: "seasonal", name: "category_seasonal", icon: Sun },
  ]

  const preventionTips: Record<string, PreventionTip[]> = {
    daily: [
      {
        id: "wash-hands",
        title: "Wash Hands Properly",
        description: "Wash hands for 20 seconds with soap and warm water",
        category: "hygiene",
        difficulty: "easy",
        duration: "2 min",
        points: 10,
        completed: false,
        effectiveness: 95,
        mediaType: "video",
      },
      {
        id: "deep-breathing",
        title: "5-Minute Deep Breathing",
        description: "Practice mindful breathing to reduce stress and improve focus",
        category: "mental-health",
        difficulty: "easy",
        duration: "5 min",
        points: 15,
        completed: false,
        effectiveness: 88,
        mediaType: "animation",
      },
      {
        id: "posture-check",
        title: "Posture Check",
        description: "Adjust your sitting posture and take a 2-minute walk",
        category: "physical",
        difficulty: "easy",
        duration: "2 min",
        points: 5,
        completed: false,
        effectiveness: 75,
      },
    ],
    nutrition: [
      {
        id: "colorful-plate",
        title: "Eat the Rainbow",
        description: "Include 5 different colored fruits/vegetables in your meals today",
        category: "nutrition",
        difficulty: "medium",
        duration: "All day",
        points: 25,
        completed: false,
        effectiveness: 92,
        mediaType: "infographic",
      },
      {
        id: "reduce-sugar",
        title: "Sugar Reduction Challenge",
        description: "Replace one sugary drink with water or herbal tea",
        category: "nutrition",
        difficulty: "easy",
        duration: "1 day",
        points: 20,
        completed: false,
        effectiveness: 85,
      },
    ],
    exercise: [
      {
        id: "stairs-climb",
        title: "Take the Stairs",
        description: "Use stairs instead of elevators for at least 3 floors today",
        category: "cardio",
        difficulty: "easy",
        duration: "Throughout day",
        points: 15,
        completed: false,
        effectiveness: 80,
      },
      {
        id: "desk-exercises",
        title: "Desk Exercise Routine",
        description: "Complete 10 desk stretches and exercises",
        category: "strength",
        difficulty: "medium",
        duration: "10 min",
        points: 30,
        completed: false,
        effectiveness: 78,
        mediaType: "video",
      },
    ],
    sleep: [
      {
        id: "screen-curfew",
        title: "Digital Sunset",
        description: "No screens 1 hour before bedtime",
        category: "sleep-hygiene",
        difficulty: "medium",
        duration: "1 hour",
        points: 25,
        completed: false,
        effectiveness: 90,
      },
      {
        id: "bedtime-routine",
        title: "Consistent Bedtime",
        description: "Go to bed at the same time for 7 days straight",
        category: "sleep-schedule",
        difficulty: "hard",
        duration: "7 days",
        points: 50,
        completed: false,
        effectiveness: 95,
      },
    ],
    hydration: [
      {
        id: "morning-water",
        title: "Morning Hydration",
        description: "Drink a full glass of water immediately after waking up",
        category: "hydration",
        difficulty: "easy",
        duration: "2 min",
        points: 10,
        completed: false,
        effectiveness: 85,
      },
      {
        id: "water-tracking",
        title: "8-Glass Challenge",
        description: "Track and drink 8 glasses of water throughout the day",
        category: "hydration",
        difficulty: "medium",
        duration: "All day",
        points: 30,
        completed: false,
        effectiveness: 90,
      },
    ],
    seasonal: [
      {
        id: "winter-immunity",
        title: "Winter Immunity Boost",
        description: "Take Vitamin D supplement and eat citrus fruits",
        category: "immunity",
        difficulty: "easy",
        duration: "Daily",
        points: 20,
        completed: false,
        effectiveness: 88,
      },
      {
        id: "cold-prevention",
        title: "Cold Weather Protection",
        description: "Wear appropriate layers and protect extremities",
        category: "prevention",
        difficulty: "easy",
        duration: "When outdoors",
        points: 15,
        completed: false,
        effectiveness: 82,
      },
    ],
  }

  const handleCompleteChallenge = (tipId: string, points: number) => {
    if (!completedChallenges.includes(tipId)) {
      setCompletedChallenges([...completedChallenges, tipId])
      setUserPoints(userPoints + points)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEffectivenessStars = (effectiveness: number) => {
    const stars = Math.round(effectiveness / 20)
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < stars ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header with Points and Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg">
        <div>
          <h3 className="text-xl font-semibold text-balance">{t("personalized_prevention_plan")}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {userLocation}
            </div>
            <div className="flex items-center gap-1">
              <Thermometer className="w-4 h-4" />
              {currentSeason}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {t("todays_plan")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{userPoints}</div>
            <div className="text-sm text-muted-foreground">{t("health_points")}</div>
          </div>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t(category.name)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tips Content */}
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {preventionTips[category.id]?.map((tip) => {
                const isCompleted = completedChallenges.includes(tip.id)
                return (
                  <Card
                    key={tip.id}
                    className={`transition-all ${isCompleted ? "bg-green-50 dark:bg-green-950 border-green-200" : ""}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {tip.title}
                            {tip.mediaType && (
                              <Badge variant="outline" className="text-xs">
                                <Play className="w-3 h-3 mr-1" />
                                {tip.mediaType}
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1">{tip.description}</CardDescription>
                        </div>
                        {isCompleted && <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Tip Details */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getDifficultyColor(tip.difficulty)} text-white`}>{tip.difficulty}</Badge>
                          <span className="text-muted-foreground">{tip.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-secondary font-medium">+{tip.points} pts</span>
                        </div>
                      </div>

                      {/* Effectiveness Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{t("community_rating")}</span>
                          <div className="flex">{getEffectivenessStars(tip.effectiveness)}</div>
                          <span className="text-sm text-muted-foreground">({tip.effectiveness}%)</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => handleCompleteChallenge(tip.id, tip.points)}
                        disabled={isCompleted}
                        className="w-full"
                        variant={isCompleted ? "outline" : "default"}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {t("completed")}
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4 mr-2" />
                            {t("start_challenge")}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* AI-Generated Personalized Plan */}
            {activeCategory === "daily" && (
              <Card className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-500" />
                    {t("ai_generated_daily_plan")}
                  </CardTitle>
                  <CardDescription>{t("ai_personalized_recommendations")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-medium text-purple-600 dark:text-purple-400">{t("morning_focus")}</div>
                      <div className="text-sm text-muted-foreground mt-1">Hydration + Light Exercise</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{t("afternoon_goal")}</div>
                      <div className="text-sm text-muted-foreground mt-1">Posture Check + Healthy Snack</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">{t("evening_routine")}</div>
                      <div className="text-sm text-muted-foreground mt-1">Digital Sunset + Relaxation</div>
                    </div>
                  </div>
                  <Progress value={65} className="mt-4" />
                  <div className="text-sm text-muted-foreground text-center">{t("daily_progress_complete")}</div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
