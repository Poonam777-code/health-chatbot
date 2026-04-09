"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Shield, MessageCircle, AlertTriangle, Heart, Star, LogOut, BarChart3 } from "lucide-react"
import SymptomsChecker from "@/components/symptoms-checker"
import PreventionTips from "@/components/prevention-tips"
import HealthFAQs from "@/components/health-faqs"
import MythBusting from "@/components/myth-busting"
import LanguageSelector from "@/components/language-selector"

interface HealthDashboardProps {
  user: any
}

export default function HealthDashboard({ user }: HealthDashboardProps) {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("symptoms")
  const [healthScore, setHealthScore] = useState(85)
  const [realHealthData, setRealHealthData] = useState<any>(null)
  const [showHospitals, setShowHospitals] = useState(false)

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      })

      if (res.ok) {
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  useEffect(() => {
    // TODO: Replace with API call if needed
    // For now, using mock data
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">{t("health_assistant")}</h1>
          <p className="text-muted-foreground text-pretty">{t("ai_powered_health_info")}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Admin Dashboard Button */}
          <Link href="/admin">
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t("admin_dashboard", "Admin Dashboard")}</span>
            </Button>
          </Link>
          
          {/* Language Selector Component */}
          <LanguageSelector />
          
          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{t("sign_out", "Sign Out")}</span>
          </Button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            <span className="hidden sm:inline">{t("symptoms_checker")}</span>
          </TabsTrigger>
          <TabsTrigger value="prevention" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">{t("prevention_tips")}</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common_faqs")}</span>
          </TabsTrigger>
          <TabsTrigger value="myths" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">{t("myth_busting")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Symptoms Checker Tab */}
        <TabsContent value="symptoms" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-secondary" />
                  {t("ai_symptoms_checker", "AI Symptoms Checker")}
                </CardTitle>
                <CardDescription>{t("advanced_symptom_analysis", "Advanced AI-driven symptom analysis with visual body mapping")}</CardDescription>
              </CardHeader>
              <CardContent>
                <SymptomsChecker onHealthScoreUpdate={setHealthScore} />
              </CardContent>
            </Card>

            {/* Enhanced Health Score Card with real data */}
            <Card className="overflow-hidden relative border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-2xl shadow-slate-200/40 transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-red-300/20 via-transparent to-pink-300/10 blur-3xl" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="rounded-3xl bg-white/90 p-4 shadow-inner shadow-slate-200/30 dark:bg-slate-950/80 dark:shadow-black/20">
                  <div className="flex justify-between text-sm mb-2 text-slate-600 dark:text-slate-300">
                    <span>{t("overall_health", "Overall Health")}</span>
                    <span className="text-2xl font-bold text-secondary animate-pulse">{healthScore}%</span>
                  </div>
                  <Progress value={healthScore} className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400" />
                </div>

                {realHealthData && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-secondary/20 p-2 rounded shadow-sm shadow-secondary/10">
                        <div className="font-medium">Total Points</div>
                        <div className="text-lg font-bold">{realHealthData.total_points || 0}</div>
                      </div>
                      <div className="bg-secondary/20 p-2 rounded shadow-sm shadow-secondary/10">
                        <div className="font-medium">Streak</div>
                        <div className="text-lg font-bold">{realHealthData.current_streak || 0} days</div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Challenges completed: {realHealthData.challenges_completed || 0}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Quiz accuracy:{" "}
                      {realHealthData.quiz_accuracy ? `${(realHealthData.quiz_accuracy * 100).toFixed(1)}%` : "N/A"}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/20 animate-pulse">
                    <Star className="w-3 h-3 mr-1" />
                    {healthScore >= 80 ? t("excellent_health", "Excellent Health") : healthScore >= 60 ? t("good_health", "Good Health") : t("needs_attention", "Needs Attention")}
                  </Badge>
                  <div className="text-xs text-muted-foreground text-center">
                    {realHealthData ? t("based_on_health_profile", "Based on your health profile") : t("based_on_symptom_analysis", "Based on recent symptom analysis")}
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-xl shadow-blue-500/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 animate-pulse"
                    onClick={() => setShowHospitals(!showHospitals)}
                  >
                    <span role="img" aria-label="location">📍</span> {t("show_hospitals", "Show Hospitals")}
                  </button>
                  <a
                    href="tel:108"
                    className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold shadow-xl shadow-red-500/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 animate-bounce"
                  >
                    <span role="img" aria-label="ambulance">🚑</span> {t("call_ambulance", "Call Ambulance")}
                  </a>
                </div>

                {showHospitals && (
                  <div className="mt-4 p-4 rounded-3xl bg-blue-50 border border-blue-200 shadow-lg shadow-blue-200/20 animate-fade-in">
                    <h3 className="text-sm font-semibold mb-2">Nanded Hospitals</h3>
                    <iframe
                      title="Nanded Hospitals"
                      src="https://www.google.com/maps?q=hospital+Nanded&output=embed"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '16px' }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prevention Tips Tab */}
        <TabsContent value="prevention" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                {t("personalized_prevention_tips", "Personalized Prevention Tips")}
              </CardTitle>
              <CardDescription>{t("context_aware_recommendations", "Context-aware health recommendations and daily challenges")}</CardDescription>
            </CardHeader>
            <CardContent>
              <PreventionTips />
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                {t("health_faqs_ai_chat", "Health FAQs & AI Chat")}
              </CardTitle>
              <CardDescription>{t("evidence_based_answers", "Evidence-based answers with multilingual support")}</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthFAQs />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Myth Busting Tab */}
        <TabsContent value="myths" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                {t("health_myth_busting", "Health Myth Busting")}
              </CardTitle>
              <CardDescription>{t("interactive_quizzes", "Interactive quizzes and fact-checking with risk indicators")}</CardDescription>
            </CardHeader>
            <CardContent>
              <MythBusting />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
