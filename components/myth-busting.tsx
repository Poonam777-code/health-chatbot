"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, TrendingUp, Shield, Zap, Trophy, Target } from "lucide-react"

interface HealthMyth {
  id: string
  statement: string
  isMyth: boolean
  explanation: string
  riskLevel: "low" | "medium" | "high"
  category: string
  sources: string[]
  difficulty: "easy" | "medium" | "hard"
  submittedBy?: string
}

interface QuizResult {
  correct: number
  total: number
  score: number
}

export default function MythBusting() {
  const { t } = useTranslation()
  const [currentQuiz, setCurrentQuiz] = useState<HealthMyth | null>(null)
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult>({ correct: 0, total: 0, score: 0 })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userSubmission, setUserSubmission] = useState("")
  const [gamificationPoints, setGamificationPoints] = useState(250)

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "nutrition", name: "Nutrition" },
    { id: "exercise", name: "Exercise" },
    { id: "medicine", name: "Medicine" },
    { id: "mental-health", name: "Mental Health" },
    { id: "prevention", name: "Prevention" },
  ]

  const healthMyths: HealthMyth[] = [
    {
      id: "1",
      statement: "You need to drink 8 glasses of water every day to stay healthy",
      isMyth: true,
      explanation:
        "While staying hydrated is important, the '8 glasses a day' rule is not scientifically proven. Water needs vary based on activity level, climate, and individual factors. You can get hydration from food and other beverages too.",
      riskLevel: "low",
      category: "nutrition",
      sources: ["Mayo Clinic", "Institute of Medicine"],
      difficulty: "easy",
    },
    {
      id: "2",
      statement: "Cracking your knuckles causes arthritis",
      isMyth: true,
      explanation:
        "Multiple studies have shown no link between knuckle cracking and arthritis. The sound comes from gas bubbles in joint fluid, not bone damage. However, excessive cracking might cause joint swelling or reduced grip strength.",
      riskLevel: "low",
      category: "medicine",
      sources: ["Arthritis Foundation", "Harvard Health"],
      difficulty: "medium",
    },
    {
      id: "3",
      statement: "Vaccines can cause autism",
      isMyth: true,
      explanation:
        "This is a dangerous myth that has been thoroughly debunked by numerous large-scale studies. The original study claiming this link was fraudulent and retracted. Vaccines are safe and crucial for public health.",
      riskLevel: "high",
      category: "medicine",
      sources: ["CDC", "WHO", "AAP"],
      difficulty: "easy",
    },
    {
      id: "4",
      statement: "You should wait 24-48 hours before exercising after eating",
      isMyth: true,
      explanation:
        "You don't need to wait hours after eating to exercise. Light exercise can be done immediately, while intense exercise might be better after 1-2 hours to avoid discomfort. Listen to your body.",
      riskLevel: "low",
      category: "exercise",
      sources: ["American College of Sports Medicine"],
      difficulty: "medium",
    },
    {
      id: "5",
      statement: "Mental health conditions are a sign of personal weakness",
      isMyth: true,
      explanation:
        "Mental health conditions are medical conditions caused by complex factors including genetics, brain chemistry, and life experiences. They are not character flaws or signs of weakness, and treatment is effective.",
      riskLevel: "high",
      category: "mental-health",
      sources: ["NIMH", "WHO", "APA"],
      difficulty: "easy",
    },
    {
      id: "6",
      statement: "Regular hand washing can prevent most common infections",
      isMyth: false,
      explanation:
        "This is TRUE! Proper hand washing with soap for 20 seconds is one of the most effective ways to prevent the spread of infections, including colds, flu, and many other diseases.",
      riskLevel: "low",
      category: "prevention",
      sources: ["CDC", "WHO"],
      difficulty: "easy",
    },
  ]

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case "low":
        return "Low Risk - Minor misconception"
      case "medium":
        return "Medium Risk - Could affect health decisions"
      case "high":
        return "High Risk - Dangerous misinformation"
      default:
        return "Unknown Risk"
    }
  }

  const getDifficultyPoints = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return 10
      case "medium":
        return 20
      case "hard":
        return 30
      default:
        return 10
    }
  }

  const startNewQuiz = () => {
    const filteredMyths =
      selectedCategory === "all" ? healthMyths : healthMyths.filter((myth) => myth.category === selectedCategory)

    const randomMyth = filteredMyths[Math.floor(Math.random() * filteredMyths.length)]
    setCurrentQuiz(randomMyth)
    setUserAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (answer: boolean) => {
    setUserAnswer(answer)
    setShowResult(true)

    const isCorrect = (answer === false && currentQuiz?.isMyth) || (answer === true && !currentQuiz?.isMyth)
    const newTotal = quizResults.total + 1
    const newCorrect = quizResults.correct + (isCorrect ? 1 : 0)
    const newScore = Math.round((newCorrect / newTotal) * 100)

    setQuizResults({
      correct: newCorrect,
      total: newTotal,
      score: newScore,
    })

    if (isCorrect && currentQuiz) {
      const points = getDifficultyPoints(currentQuiz.difficulty)
      setGamificationPoints((prev) => prev + points)
    }
  }

  const submitUserMyth = () => {
    if (userSubmission.trim()) {
      // In a real app, this would be sent to the backend for verification
      console.log("User submitted myth for verification:", userSubmission)
      setUserSubmission("")
      // Show success message
    }
  }

  useEffect(() => {
    startNewQuiz()
  }, [selectedCategory])

  return (
    <div className="space-y-6">
      {/* Header with Gamification */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg">
        <div>
          <h3 className="text-xl font-semibold text-balance">{t("health_myth_busting")}</h3>
          <p className="text-muted-foreground text-pretty">{t("test_your_knowledge")}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{gamificationPoints}</div>
            <div className="text-sm text-muted-foreground">Myth Buster Points</div>
          </div>
          <Trophy className="w-8 h-8 text-orange-500" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quiz Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Selector */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Current Quiz */}
          {currentQuiz && (
            <Card className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${getRiskLevelColor(currentQuiz.riskLevel)}`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t("fact_or_fiction")}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {currentQuiz.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {currentQuiz.difficulty}
                      </Badge>
                      <span className="text-xs">+{getDifficultyPoints(currentQuiz.difficulty)} points</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${getRiskLevelColor(currentQuiz.riskLevel)}`} />
                    <span className="text-xs text-muted-foreground">Risk Level</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-medium text-balance">{currentQuiz.statement}</p>
                </div>

                {!showResult ? (
                  <div className="flex gap-3">
                    <Button onClick={() => handleAnswer(true)} className="flex-1 h-12" variant="outline">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      FACT
                    </Button>
                    <Button onClick={() => handleAnswer(false)} className="flex-1 h-12" variant="outline">
                      <XCircle className="w-5 h-5 mr-2 text-red-500" />
                      FICTION
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Result Indicator */}
                    <div
                      className={`p-4 rounded-lg border-2 ${
                        (userAnswer === false && currentQuiz.isMyth) || (userAnswer === true && !currentQuiz.isMyth)
                          ? "border-green-500 bg-green-50 dark:bg-green-950"
                          : "border-red-500 bg-red-50 dark:bg-red-950"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {(userAnswer === false && currentQuiz.isMyth) ||
                        (userAnswer === true && !currentQuiz.isMyth) ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-green-700 dark:text-green-300">{t("correct")}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-500" />
                            <span className="font-medium text-red-700 dark:text-red-300">{t("incorrect")}</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm">
                        This statement is <strong>{currentQuiz.isMyth ? "FICTION" : "FACT"}</strong>
                      </p>
                    </div>

                    {/* Explanation */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{t("explanation")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{currentQuiz.explanation}</p>
                    </div>

                    {/* Risk Level */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                      <AlertTriangle
                        className={`w-5 h-5 ${
                          currentQuiz.riskLevel === "high"
                            ? "text-red-500"
                            : currentQuiz.riskLevel === "medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{getRiskLevelText(currentQuiz.riskLevel)}</span>
                    </div>

                    {/* Sources */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{t("verified_by")}</div>
                      <div className="flex flex-wrap gap-2">
                        {currentQuiz.sources.map((source, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={startNewQuiz} className="w-full">
                      <Target className="w-4 h-4 mr-2" />
                      {t("next_challenge")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quiz Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{quizResults.score}%</div>
                <div className="text-sm text-muted-foreground">{t("accuracy_rate")}</div>
              </div>
              <Progress value={quizResults.score} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{t("correct_count")}: {quizResults.correct}</span>
                <span>{t("total_count")}: {quizResults.total}</span>
              </div>

              {/* Achievement Badges */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Achievements</div>
                <div className="flex flex-wrap gap-2">
                  {quizResults.total >= 5 && (
                    <Badge variant="secondary" className="text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      Quiz Master
                    </Badge>
                  )}
                  {quizResults.score >= 80 && quizResults.total >= 3 && (
                    <Badge variant="secondary" className="text-xs">
                      <Trophy className="w-3 h-3 mr-1" />
                      Myth Buster
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Myth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("submit_a_myth")}</CardTitle>
              <CardDescription>{t("help_verify_claims")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder={t("enter_health_claim")}
                value={userSubmission}
                onChange={(e) => setUserSubmission(e.target.value)}
                className="min-h-20"
              />
              <Button onClick={submitUserMyth} disabled={!userSubmission.trim()} className="w-full" size="sm">
                {t("submit_for_verification")}
              </Button>
              <p className="text-xs text-muted-foreground">
                Our medical experts will review and add verified claims to the database.
              </p>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("myth_busting_tips")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("always_check_reliable_sources")}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("look_for_peer_reviewed_research")}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("be_wary_of_sensational_claims")}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("consult_healthcare_professionals")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
