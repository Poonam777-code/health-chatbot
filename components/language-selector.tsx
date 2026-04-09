"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]) // Default to English
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure i18n is initialized and set default to English if no language detected
    if (!i18n.language || i18n.language === 'dev') {
      i18n.changeLanguage('en')
    }

    // Update current language when i18n language changes
    const lang = languages.find((lang) => lang.code === i18n.language)
    if (lang) {
      setCurrentLanguage(lang)
    } else {
      // Fallback to English if current language not found
      setCurrentLanguage(languages[0])
    }
    setIsReady(true)
  }, [i18n.language, i18n])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode)
    const newLanguage = languages.find((lang) => lang.code === languageCode)
    if (newLanguage) {
      setCurrentLanguage(newLanguage)
    }
    setIsOpen(false)

    // Update user preference in database
    try {
      const response = await fetch("/api/user/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: languageCode }),
      })
    } catch (error) {
      console.error("Failed to update language preference:", error)
    }
  }

  if (!isReady) {
    return (
      <Button variant="ghost" size="sm" className="gap-2" disabled>
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">🇺🇸 English</span>
        <span className="sm:hidden">🇺🇸</span>
      </Button>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                  currentLanguage.code === language.code ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1">{language.name}</span>
                {language.code === 'en' && <span className="ml-auto text-xs text-gray-500">(Default)</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
