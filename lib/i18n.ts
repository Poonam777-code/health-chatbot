import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      health_assistant: "Health Assistant",
      ai_powered_health_info: "AI-Powered Health Info",
      online_ready_to_help: "Online • Ready to help",
      sign_out: "Sign Out",

      // Quick Actions
      quick_actions: "Quick Actions",
      symptoms_checker: "Symptoms Checker",
      prevention_tips: "Prevention Tips",
      common_faqs: "Common FAQs",
      myth_busting: "Myth Busting",

      // Chat Interface
      welcome_message:
        "Hello! I'm your AI health assistant. I can help you with health information, symptoms, prevention tips, and answer common health questions. How can I assist you today?",
      input_placeholder: "Ask me about health topics, symptoms, or prevention...",
      medical_disclaimer:
        "This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.",

      // Quick Replies
      symptoms_query: "I'd like to know about symptoms and when to seek medical care.",
      prevention_query: "Can you give me prevention tips for staying healthy?",
      faq_query: "I have some general health questions.",
      myths_query: "Can you help me fact-check some health information?",
      personalized_prevention_plan: "Personalized Prevention Plan",
      todays_plan: "Today's Plan",
      health_points: "Health Points",
      category_daily_challenges: "Daily Challenges",
      category_nutrition: "Nutrition",
      category_exercise: "Exercise",
      category_sleep: "Sleep",
      category_hydration: "Hydration",
      category_seasonal: "Seasonal",
      community_rating: "Community Rating:",
      completed: "Completed",
      start_challenge: "Start Challenge",
      ai_generated_daily_plan: "AI-Generated Daily Plan",
      ai_personalized_recommendations: "Personalized recommendations based on your health profile",
      morning_focus: "Morning Focus",
      afternoon_goal: "Afternoon Goal",
      evening_routine: "Evening Routine",
      daily_progress_complete: "Daily Progress: 65% Complete",
      community_sharing_posts: "Community Sharing Posts",
      share_real_healthy_recipes: "Share real healthy recipes, tips, and ideas. Easily share to WhatsApp! Chat and comment below.",
      group_chat_and_comments: "Group Chat & Comments",
      write_a_comment: "Write a comment...",
      comment: "Comment",
      health_faqs_ai_chat: "Health FAQs & AI Chat",
      evidence_based_answers: "Evidence-based answers from trusted medical sources",
      search_health_questions: "Search health questions...",
      trending_questions: "Trending Questions",
      frequently_asked_questions: "Frequently Asked Questions",
      helpful: "Helpful",
      not_helpful: "Not helpful",
      ai_health_assistant: "AI Health Assistant",
      ask_health_question: "Ask any health question for personalized guidance",
      ask_a_health_question_placeholder: "Ask a health question...",
      health_myth_busting: "Health Myth Busting",
      test_your_knowledge: "Test your knowledge and fight misinformation",
      fact_or_fiction: "Fact or Fiction?",
      risk_level: "Risk Level",
      correct: "Correct!",
      incorrect: "Incorrect",
      explanation: "Explanation",
      verified_by: "Verified by:",
      next_challenge: "Next Challenge",
      your_progress: "Your Progress",
      accuracy_rate: "Accuracy Rate",
      correct_count: "Correct",
      total_count: "Total",
      submit_a_myth: "Submit a Myth",
      help_verify_claims: "Help us verify health claims you've heard",
      enter_health_claim: "Enter a health claim you'd like us to fact-check...",
      submit_for_verification: "Submit for Verification",
      myth_busting_tips: "Myth Busting Tips",
      always_check_reliable_sources: "Always check multiple reliable sources",
      look_for_peer_reviewed_research: "Look for peer-reviewed research",
      be_wary_of_sensational_claims: "Be wary of sensational claims",
      consult_healthcare_professionals: "Consult healthcare professionals",
      symptoms_checker_greeting: "Hello! I'm your AI health assistant. How can I help you today?",
      self_care_recommended: "Self-care recommended",
      consider_doctor_visit: "Consider doctor visit",
      seek_immediate_care: "Seek immediate care",
      trending: "Trending",
      trusted_sources: "Trusted Sources:",
      people_found_this_helpful: "{{count}} people found this helpful",

      // Error Messages
      technical_difficulties:
        "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, or contact a healthcare provider if you have urgent health concerns.",

      // Language Selection
      select_language: "Select Language",
      language: "Language",

      // Authentication
      login: "Login",
      enter_email_to_login: "Enter your email below to login to your account",
      email: "Email",
      password: "Password",
      logging_in: "Logging in...",
      login_button: "Login",
      no_account: "Don't have an account?",
      sign_up: "Sign up",
      sign_up_title: "Sign up",
      create_account: "Create a new account",
      repeat_password: "Repeat Password",
      creating_account: "Creating an account...",
      sign_up_button: "Sign up",
      already_have_account: "Already have an account?",
      passwords_do_not_match: "Passwords do not match",
    },
  },
  es: {
    translation: {
      // Navigation
      health_assistant: "Asistente de Salud",
      ai_powered_health_info: "Información de Salud con IA",
      online_ready_to_help: "En línea • Listo para ayudar",
      sign_out: "Cerrar Sesión",

      // Quick Actions
      quick_actions: "Acciones Rápidas",
      symptoms_checker: "Verificador de Síntomas",
      prevention_tips: "Consejos de Prevención",
      common_faqs: "Preguntas Frecuentes",
      myth_busting: "Desmitificación",

      // Chat Interface
      welcome_message:
        "¡Hola! Soy tu asistente de salud con IA. Puedo ayudarte con información de salud, síntomas, consejos de prevención y responder preguntas comunes de salud. ¿Cómo puedo asistirte hoy?",
      input_placeholder: "Pregúntame sobre temas de salud, síntomas o prevención...",
      medical_disclaimer:
        "Este asistente de IA proporciona solo información general de salud. Siempre consulta a profesionales de la salud para obtener consejos médicos.",

      // Quick Replies
      symptoms_query: "Me gustaría saber sobre síntomas y cuándo buscar atención médica.",
      prevention_query: "¿Puedes darme consejos de prevención para mantenerme saludable?",
      faq_query: "Tengo algunas preguntas generales de salud.",
      myths_query: "¿Puedes ayudarme a verificar información de salud?",

      // Error Messages
      technical_difficulties:
        "Me disculpo, pero estoy experimentando dificultades técnicas en este momento. Por favor, inténtalo de nuevo en un momento, o contacta a un proveedor de atención médica si tienes preocupaciones urgentes de salud.",

      // Language Selection
      select_language: "Seleccionar Idioma",
      language: "Idioma",

      // Authentication
      login: "Iniciar sesión",
      enter_email_to_login: "Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta",
      email: "Correo electrónico",
      password: "Contraseña",
      logging_in: "Iniciando sesión...",
      login_button: "Iniciar sesión",
      no_account: "¿No tienes una cuenta?",
      sign_up: "Registrarse",
      sign_up_title: "Registrarse",
      create_account: "Crear una nueva cuenta",
      repeat_password: "Repetir Contraseña",
      creating_account: "Creando una cuenta...",
      sign_up_button: "Registrarse",
      already_have_account: "¿Ya tienes una cuenta?",
      passwords_do_not_match: "Las contraseñas no coinciden",
    },
  },
  fr: {
    translation: {
      // Navigation
      health_assistant: "Assistant Santé",
      ai_powered_health_info: "Info Santé Alimentée par IA",
      online_ready_to_help: "En ligne • Prêt à aider",
      sign_out: "Se Déconnecter",

      // Quick Actions
      quick_actions: "Actions Rapides",
      symptoms_checker: "Vérificateur de Symptômes",
      prevention_tips: "Conseils de Prévention",
      common_faqs: "FAQ Communes",
      myth_busting: "Démystification",

      // Chat Interface
      welcome_message:
        "Bonjour ! Je suis votre assistant santé IA. Je peux vous aider avec des informations de santé, des symptômes, des conseils de prévention et répondre aux questions de santé courantes. Comment puis-je vous aider aujourd'hui ?",
      input_placeholder: "Demandez-moi des sujets de santé, symptômes ou prévention...",
      medical_disclaimer:
        "Cet assistant IA fournit uniquement des informations générales de santé. Consultez toujours des professionnels de la santé pour des conseils médicaux.",

      // Quick Replies
      symptoms_query: "J'aimerais connaître les symptômes et quand chercher des soins médicaux.",
      prevention_query: "Pouvez-vous me donner des conseils de prévention pour rester en bonne santé ?",
      faq_query: "J'ai quelques questions générales de santé.",
      myths_query: "Pouvez-vous m'aider à vérifier des informations de santé ?",

      // Error Messages
      technical_difficulties:
        "Je m'excuse, mais je rencontre des difficultés techniques en ce moment. Veuillez réessayer dans un moment, ou contactez un professionnel de la santé si vous avez des préoccupations urgentes de santé.",

      // Language Selection
      select_language: "Sélectionner la Langue",
      language: "Langue",

      // Authentication
      login: "Connexion",
      enter_email_to_login: "Entrez votre email ci-dessous pour vous connecter à votre compte",
      email: "Email",
      password: "Mot de passe",
      logging_in: "Connexion en cours...",
      login_button: "Connexion",
      no_account: "Vous n'avez pas de compte?",
      sign_up: "S'inscrire",
      sign_up_title: "S'inscrire",
      create_account: "Créer un nouveau compte",
      repeat_password: "Répéter le Mot de passe",
      creating_account: "Création d'un compte...",
      sign_up_button: "S'inscrire",
      already_have_account: "Vous avez déjà un compte?",
      passwords_do_not_match: "Les mots de passe ne correspondent pas",
    },
  },
  zh: {
    translation: {
      // Navigation
      health_assistant: "健康助手",
      ai_powered_health_info: "AI驱动的健康信息",
      online_ready_to_help: "在线 • 随时为您服务",
      sign_out: "退出登录",

      // Quick Actions
      quick_actions: "快速操作",
      symptoms_checker: "症状检查器",
      prevention_tips: "预防建议",
      common_faqs: "常见问题",
      myth_busting: "辟谣专区",

      // Chat Interface
      welcome_message:
        "您好！我是您的AI健康助手。我可以帮助您了解健康信息、症状、预防建议，并回答常见的健康问题。今天我可以为您做些什么？",
      input_placeholder: "询问我关于健康话题、症状或预防的问题...",
      medical_disclaimer: "此AI助手仅提供一般健康信息。请始终咨询医疗专业人员获取医疗建议。",

      // Quick Replies
      symptoms_query: "我想了解症状以及何时寻求医疗护理。",
      prevention_query: "您能给我一些保持健康的预防建议吗？",
      faq_query: "我有一些一般的健康问题。",
      myths_query: "您能帮我核实一些健康信息吗？",

      // Error Messages
      technical_difficulties:
        "抱歉，我现在遇到了技术困难。请稍后再试，或者如果您有紧急健康问题，请联系医疗服务提供者。",

      // Language Selection
      select_language: "选择语言",
      language: "语言",

      // Authentication
      login: "登录",
      enter_email_to_login: "在下方输入您的电子邮件以登录到您的帐户",
      email: "电子邮件",
      password: "密码",
      logging_in: "登录中...",
      login_button: "登录",
      no_account: "没有帐户？",
      sign_up: "注册",
      sign_up_title: "注册",
      create_account: "创建新帐户",
      repeat_password: "重复密码",
      creating_account: "创建帐户中...",
      sign_up_button: "注册",
      already_have_account: "已经有帐户？",
      passwords_do_not_match: "密码不匹配",
    },
  },
  hi: {
    translation: {
      // Navigation
      health_assistant: "स्वास्थ्य सहायक",
      ai_powered_health_info: "AI संचालित स्वास्थ्य जानकारी",
      online_ready_to_help: "ऑनलाइन • मदद के लिए तैयार",
      sign_out: "साइन आउट",

      // Quick Actions
      quick_actions: "त्वरित कार्य",
      symptoms_checker: "लक्षण जांचकर्ता",
      prevention_tips: "रोकथाम के सुझाव",
      common_faqs: "सामान्य प्रश्न",
      myth_busting: "मिथक भंजन",

      // Chat Interface
      welcome_message:
        "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। मैं आपको स्वास्थ्य जानकारी, लक्षण, रोकथाम के सुझाव और सामान्य स्वास्थ्य प्रश्नों के उत्तर देने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      input_placeholder: "स्वास्थ्य विषयों, लक्षणों या रोकथाम के बारे में पूछें...",
      medical_disclaimer:
        "यह AI सहायक केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सा सलाह के लिए हमेशा स्वास्थ्य पेशेवरों से सलाह लें।",

      // Quick Replies
      symptoms_query: "मैं लक्षणों और कब चिकित्सा देखभाल लेनी चाहिए के बारे में जानना चाहता हूं।",
      prevention_query: "क्या आप मुझे स्वस्थ रहने के लिए रोकथाम के सुझाव दे सकते हैं?",
      faq_query: "मेरे कुछ सामान्य स्वास्थ्य प्रश्न हैं।",
      myths_query: "क्या आप कुछ स्वास्थ्य जानकारी की जांच करने में मेरी मदद कर सकते हैं?",
      personalized_prevention_plan: "व्यक्तिगत रोकथाम योजना",
      todays_plan: "आज की योजना",
      health_points: "स्वास्थ्य अंक",
      category_daily_challenges: "दैनिक चुनौतियाँ",
      category_nutrition: "पोषण",
      category_exercise: "व्यायाम",
      category_sleep: "नींद",
      category_hydration: "हाइड्रेशन",
      category_seasonal: "मौसमी",
      community_rating: "समुदाय रेटिंग:",
      completed: "पूर्ण",
      start_challenge: "चुनौती शुरू करें",
      ai_generated_daily_plan: "AI-जनित दैनिक योजना",
      ai_personalized_recommendations: "आपकी स्वास्थ्य प्रोफ़ाइल पर आधारित व्यक्तिगत सिफारिशें",
      morning_focus: "सुबह का ध्यान",
      afternoon_goal: "दोपहर का लक्ष्य",
      evening_routine: "शाम की दिनचर्या",
      daily_progress_complete: "दैनिक प्रगति: 65% पूर्ण",
      community_sharing_posts: "समुदाय साझा पोस्ट",
      share_real_healthy_recipes: "वास्तविक स्वस्थ व्यंजन, सुझाव और विचार साझा करें। WhatsApp पर आसानी से साझा करें! नीचे चैट और टिप्पणी करें.",
      group_chat_and_comments: "समूह चैट और टिप्पणियाँ",
      write_a_comment: "एक टिप्पणी लिखें...",
      comment: "टिप्पणी करें",
      health_faqs_ai_chat: "स्वास्थ्य FAQ और AI चैट",
      evidence_based_answers: "विश्वसनीय चिकित्सा स्रोतों से साक्ष्य-आधारित उत्तर",
      search_health_questions: "स्वास्थ्य प्रश्न खोजें...",
      trending_questions: "चलन में प्रश्न",
      frequently_asked_questions: "अक्सर पूछे जाने वाले प्रश्न",
      helpful: "सहायक",
      not_helpful: "सहायता नहीं",
      ai_health_assistant: "AI स्वास्थ्य सहायक",
      ask_health_question: "व्यक्तिगत मार्गदर्शन के लिए कोई भी स्वास्थ्य प्रश्न पूछें",
      ask_a_health_question_placeholder: "कोई स्वास्थ्य प्रश्न पूछें...",
      health_myth_busting: "स्वास्थ्य मिथक भंजन",
      test_your_knowledge: "अपने ज्ञान को परखें और गलत सूचना से लड़ें",
      fact_or_fiction: "तथ्य या कल्पना?",
      risk_level: "जोखिम स्तर",
      correct: "सही!",
      incorrect: "गलत",
      explanation: "व्याख्या",
      verified_by: "द्वारा सत्यापित:",
      next_challenge: "अगली चुनौती",
      your_progress: "आपकी प्रगति",
      accuracy_rate: "सटीकता दर",
      correct_count: "सही",
      total_count: "कुल",
      submit_a_myth: "एक मिथक सबमिट करें",
      help_verify_claims: "आपने सुनी स्वास्थ्य दावों की जांच करने में हमारी मदद करें",
      enter_health_claim: "ऐसा स्वास्थ्य दावा दर्ज करें जिसे आप चाहते हैं कि हम सत्यापित करें...",
      submit_for_verification: "सत्यापन के लिए सबमिट करें",
      myth_busting_tips: "मिथक भंजन सुझाव",
      always_check_reliable_sources: "हमेशा कई विश्वसनीय स्रोतों की जाँच करें",
      look_for_peer_reviewed_research: "पीयर-रिव्यू किए गए शोध देखें",
      be_wary_of_sensational_claims: "संवेदी दावों से सावधान रहें",
      consult_healthcare_professionals: "स्वास्थ्य पेशेवरों से परामर्श करें",
      symptoms_checker_greeting: "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
      self_care_recommended: "स्व-देखभाल की सलाह दी जाती है",
      consider_doctor_visit: "डॉक्टर से मिलने पर विचार करें",
      seek_immediate_care: "त्वरित चिकित्सा देखभाल लें",
      trending: "ट्रेंडिंग",
      trusted_sources: "विश्वसनीय स्रोत:",
      people_found_this_helpful: "{{count}} लोगों को यह सहायक लगा",

      // Error Messages
      technical_difficulties:
        "मुझे खुशी है, लेकिन मैं अभी तकनीकी कठिनाइयों का सामना कर रहा हूं। कृपया एक क्षण में फिर से कोशिश करें, या यदि आपकी तत्काल स्वास्थ्य चिंताएं हैं तो स्वास्थ्य प्रदाता से संपर्क करें।",

      // Language Selection
      select_language: "भाषा चुनें",
      language: "भाषा",

      // Authentication
      login: "लॉगिन",
      enter_email_to_login: "अपने खाते में लॉगिन करने के लिए नीचे अपना ईमेल दर्ज करें",
      email: "ईमेल",
      password: "पासवर्ड",
      logging_in: "लॉगिन हो रहा है...",
      login_button: "लॉगिन",
      no_account: "खाता नहीं है?",
      sign_up: "साइन अप करें",
      sign_up_title: "साइन अप करें",
      create_account: "नया खाता बनाएं",
      repeat_password: "पासवर्ड दोहराएं",
      creating_account: "खाता बनाया जा रहा है...",
      sign_up_button: "साइन अप करें",
      already_have_account: "पहले से खाता है?",
      passwords_do_not_match: "पासवर्ड मेल नहीं खाते",
    },
  },
  mr: {
    translation: {
      // Navigation
      health_assistant: "आरोग्य सहाय्यक",
      ai_powered_health_info: "AI चालित आरोग्य माहिती",
      online_ready_to_help: "ऑनलाइन • मदतीसाठी तयार",
      sign_out: "साइन आउट",

      // Quick Actions
      quick_actions: "त्वरित कृती",
      symptoms_checker: "लक्षण तपासणी",
      prevention_tips: "प्रतिबंधक सूचना",
      common_faqs: "सामान्य प्रश्न",
      myth_busting: "गैरसमज दूर करणे",

      // Chat Interface
      welcome_message:
        "नमस्कार! मी तुमचा AI आरोग्य सहाय्यक आहे. मी तुम्हाला आरोग्य माहिती, लक्षणे, प्रतिबंधक सूचना आणि सामान्य आरोग्य प्रश्नांची उत्तरे देण्यात मदत करू शकतो. आज मी तुमची कशी मदत करू शकतो?",
      input_placeholder: "आरोग्य विषय, लक्षणे किंवा प्रतिबंधाबद्दल विचारा...",
      medical_disclaimer:
        "हा AI सहाय्यक फक्त सामान्य आरोग्य माहिती प्रदान करतो. वैद्यकीय सल्ल्यासाठी नेहमी आरोग्य व्यावसायिकांचा सल्ला घ्या.",

      // Quick Replies
      symptoms_query: "मला लक्षणे आणि कधी वैद्यकीय काळजी घ्यावी याबद्दल जाणून घ्यायचे आहे.",
      prevention_query: "तुम्ही मला निरोगी राहण्यासाठी प्रतिबंधक सूचना देऊ शकता का?",
      faq_query: "माझे काही सामान्य आरोग्य प्रश्न आहेत.",
      myths_query: "तुम्ही काही आरोग्य माहितीची तपासणी करण्यात मदत करू शकता का?",
      personalized_prevention_plan: "वैयक्तिकृत प्रतिबंधात्मक योजना",
      todays_plan: "आजची योजना",
      health_points: "आरोग्य गुण",
      category_daily_challenges: "दररोजच्या आव्हाने",
      category_nutrition: "पोषण",
      category_exercise: "व्यायाम",
      category_sleep: "झोप",
      category_hydration: "हायड्रेशन",
      category_seasonal: "हंगामी",
      community_rating: "समुदाय रेटिंग:",
      completed: "पूर्ण",
      start_challenge: "आव्हान सुरू करा",
      ai_generated_daily_plan: "AI-निर्मित दैनिक आराखडा",
      ai_personalized_recommendations: "आपल्या आरोग्य प्रोफाइलवर आधारित वैयक्तिकृत शिफारसी",
      morning_focus: "सकाळचे लक्ष्य",
      afternoon_goal: "दुपारी लक्ष्य",
      evening_routine: "संध्याकाळची दिनचर्या",
      daily_progress_complete: "दैनिक प्रगती: 65% पूर्ण",
      community_sharing_posts: "समुदाय सामायिक प्रतिक्रिया",
      share_real_healthy_recipes: "वास्तविक आरोग्यदायी रेसिपीज, टिप्स आणि कल्पना सामायिक करा. WhatsApp वर सहज सामायिक करा! खाली चॅट आणि टिप्पणी करा.",
      group_chat_and_comments: "समूह चॅट आणि टिप्पण्या",
      write_a_comment: "एक टिप्पणी लिहा...",
      comment: "टिप्पणी करा",
      health_faqs_ai_chat: "आरोग्य FAQ आणि AI चॅट",
      evidence_based_answers: "विश्वसनीय वैद्यकीय स्रोतांमधून पुराव्यावर आधारित उत्तरे",
      search_health_questions: "आरोग्य प्रश्न शोधा...",
      trending_questions: "ट्रेंडिंग प्रश्न",
      frequently_asked_questions: "वारंवार विचारले जाणारे प्रश्न",
      helpful: "उपयुक्त",
      not_helpful: "उपयुक्त नाही",
      ai_health_assistant: "AI आरोग्य सहाय्यक",
      ask_health_question: "वैयक्तिकृत मार्गदर्शनासाठी कोणताही आरोग्य प्रश्न विचारा",
      ask_a_health_question_placeholder: "एक आरोग्य प्रश्न विचारा...",
      health_myth_busting: "आरोग्य मिथक भंजन",
      test_your_knowledge: "आपले ज्ञान तपासा आणि चुकीची माहिती सोडा",
      fact_or_fiction: "तथ्य किंवा कल्पना?",
      risk_level: "धोका पातळी",
      correct: "बरोबर!",
      incorrect: "चुकीचे",
      explanation: "स्पष्टीकरण",
      verified_by: "द्वारे सत्यापित:",
      next_challenge: "पुढील आव्हान",
      your_progress: "तुमची प्रगती",
      accuracy_rate: "अचूकता दर",
      correct_count: "बरोबर",
      total_count: "एकूण",
      submit_a_myth: "एक मिथक सादर करा",
      help_verify_claims: "तुम्ही ऐकलेल्या आरोग्य दाव्यांची आम्हाला तपासण्यास मदत करा",
      enter_health_claim: "एक आरोग्य दावा भरा ज्याची तुम्हाला आम्हाला तपासणी करायची आहे...",
      submit_for_verification: "सत्यापनासाठी सबमिट करा",
      myth_busting_tips: "मिथक भंजन टिप्स",
      always_check_reliable_sources: "नेहमी अनेक विश्वसनीय स्रोत तपासा",
      look_for_peer_reviewed_research: "पीअर-रिव्यू संशोधन पहा",
      be_wary_of_sensational_claims: "संवेदी दाव्यांपासून सावध रहा",
      consult_healthcare_professionals: "आरोग्य व्यावसायिकांचा सल्ला घ्या",
      symptoms_checker_greeting: "नमस्कार! मी तुमचा AI आरोग्य सहाय्यक आहे. मी तुम्हाला कशी मदत करू?",
      self_care_recommended: "स्व-केअर शिफारस केली जाते",
      consider_doctor_visit: "डॉक्टर भेटीचा विचार करा",
      seek_immediate_care: "तत्काळ वैद्यकीय काळजी घ्या",
      trending: "ट्रेंडिंग",
      trusted_sources: "विश्वसनीय स्रोत:",
      people_found_this_helpful: "{{count}} लोकांना हे उपयुक्त वाटले",
      // Error Messages
      technical_difficulties:
        "मला माफ करा, पण मी सध्या तांत्रिक अडचणींचा सामना करत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा, किंवा तुमच्या तातडीच्या आरोग्य चिंता असल्यास आरोग्य प्रदात्याशी संपर्क साधा.",

      // Language Selection
      select_language: "भाषा निवडा",
      language: "भाषा",

      // Authentication
      login: "लॉगिन करा",
      enter_email_to_login: "तुमच्या खाते्यात लॉगिन करण्यासाठी खाली तुमचा ईमेल प्रविष्ट करा",
      email: "ईमेल",
      password: "पासवर्ड",
      logging_in: "लॉगिन होत आहे...",
      login_button: "लॉगिन करा",
      no_account: "खाते नाही?",
      sign_up: "साइन अप करा",
      sign_up_title: "साइन अप करा",
      create_account: "नवीन खाते तयार करा",
      repeat_password: "पासवर्ड पुन्हा करा",
      creating_account: "खाते तयार होत आहे...",
      sign_up_button: "साइन अप करा",
      already_have_account: "आधीच खाते आहे?",
      passwords_do_not_match: "पासवर्ड जुळत नाही",
    },
  },
  ar: {
    translation: {
      // Navigation
      health_assistant: "مساعد الصحة",
      ai_powered_health_info: "معلومات صحية مدعومة بالذكاء الاصطناعي",
      online_ready_to_help: "متصل • جاهز للمساعدة",
      sign_out: "تسجيل الخروج",

      // Quick Actions
      quick_actions: "إجراءات سريعة",
      symptoms_checker: "فاحص الأعراض",
      prevention_tips: "نصائح الوقاية",
      common_faqs: "الأسئلة الشائعة",
      myth_busting: "كشف الخرافات",

      // Chat Interface
      welcome_message:
        "مرحباً! أنا مساعدك الصحي بالذكاء الاصطناعي. يمكنني مساعدتك في المعلومات الصحية والأعراض ونصائح الوقاية والإجابة على الأسئلة الصحية الشائعة. كيف يمكنني مساعدتك اليوم؟",
      input_placeholder: "اسألني عن المواضيع الصحية أو الأعراض أو الوقاية...",
      medical_disclaimer:
        "يقدم هذا المساعد بالذكاء الاصطناعي معلومات صحية عامة فقط. استشر دائماً المختصين في الرعاية الصحية للحصول على المشورة الطبية.",

      // Quick Replies
      symptoms_query: "أود معرفة الأعراض ومتى يجب طلب الرعاية الطبية.",
      prevention_query: "هل يمكنك إعطائي نصائح وقائية للبقاء بصحة جيدة؟",
      faq_query: "لدي بعض الأسئلة الصحية العامة.",
      myths_query: "هل يمكنك مساعدتي في التحقق من بعض المعلومات الصحية؟",

      // Error Messages
      technical_difficulties:
        "أعتذر، لكنني أواجه صعوبات تقنية في الوقت الحالي. يرجى المحاولة مرة أخرى بعد قليل، أو الاتصال بمقدم الرعاية الصحية إذا كانت لديك مخاوف صحية عاجلة.",

      // Language Selection
      select_language: "اختر اللغة",
      language: "اللغة",

      // Authentication
      login: "تسجيل الدخول",
      enter_email_to_login: "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      logging_in: "جاري تسجيل الدخول...",
      login_button: "تسجيل الدخول",
      no_account: "ليس لديك حساب؟",
      sign_up: "إنشاء حساب",
      sign_up_title: "إنشاء حساب",
      create_account: "إنشاء حساب جديد",
      repeat_password: "تكرار كلمة المرور",
      creating_account: "جاري إنشاء الحساب...",
      sign_up_button: "إنشاء حساب",
      already_have_account: "هل لديك حساب بالفعل؟",
      passwords_do_not_match: "كلمات المرور غير متطابقة",
    },
  },
  pt: {
    translation: {
      // Navigation
      health_assistant: "Assistente de Saúde",
      ai_powered_health_info: "Informações de Saúde com IA",
      online_ready_to_help: "Online • Pronto para ajudar",
      sign_out: "Sair",

      // Quick Actions
      quick_actions: "Ações Rápidas",
      symptoms_checker: "Verificador de Sintomas",
      prevention_tips: "Dicas de Prevenção",
      common_faqs: "Perguntas Frequentes",
      myth_busting: "Combate a Mitos",

      // Chat Interface
      welcome_message:
        "Olá! Sou seu assistente de saúde com IA. Posso ajudá-lo com informações de saúde, sintomas, dicas de prevenção e responder perguntas comuns sobre saúde. Como posso ajudá-lo hoje?",
      input_placeholder: "Pergunte-me sobre tópicos de saúde, sintomas ou prevenção...",
      medical_disclaimer:
        "Este assistente de IA fornece apenas informações gerais de saúde. Sempre consulte profissionais de saúde para aconselhamento médico.",

      // Quick Replies
      symptoms_query: "Gostaria de saber sobre sintomas e quando procurar cuidados médicos.",
      prevention_query: "Você pode me dar dicas de prevenção para me manter saudável?",
      faq_query: "Tenho algumas perguntas gerais sobre saúde.",
      myths_query: "Você pode me ajudar a verificar algumas informações de saúde?",

      // Error Messages
      technical_difficulties:
        "Peço desculpas, mas estou enfrentando dificuldades técnicas no momento. Tente novamente em alguns instantes, ou entre em contato com um profissional de saúde se tiver preocupações urgentes de saúde.",

      // Language Selection
      select_language: "Selecionar Idioma",
      language: "Idioma",

      // Authentication
      login: "Entrar",
      enter_email_to_login: "Digite seu email abaixo para fazer login em sua conta",
      email: "Email",
      password: "Senha",
      logging_in: "Entrando...",
      login_button: "Entrar",
      no_account: "Não tem uma conta?",
      sign_up: "Cadastre-se",
      sign_up_title: "Cadastre-se",
      create_account: "Criar uma nova conta",
      repeat_password: "Repetir Senha",
      creating_account: "Criando uma conta...",
      sign_up_button: "Cadastre-se",
      already_have_account: "Já tem uma conta?",
      passwords_do_not_match: "As senhas não correspondem",
    },
  },
  bn: {
    translation: {
      // Navigation
      health_assistant: "স্বাস্থ্য সহায়ক",
      ai_powered_health_info: "AI চালিত স্বাস্থ্য তথ্য",
      online_ready_to_help: "অনলাইন • সাহায্যের জন্য প্রস্তুত",
      sign_out: "সাইন আউট",

      // Quick Actions
      quick_actions: "দ্রুত কার্যক্রম",
      symptoms_checker: "উপসর্গ পরীক্ষক",
      prevention_tips: "প্রতিরোধের পরামর্শ",
      common_faqs: "সাধারণ প্রশ্ন",
      myth_busting: "ভ্রান্ত ধারণা দূরীকরণ",

      // Chat Interface
      welcome_message:
        "নমস্কার! আমি আপনার AI স্বাস্থ্য সহায়ক। আমি আপনাকে স্বাস্থ্য তথ্য, উপসর্গ, প্রতিরোধের পরামর্শ এবং সাধারণ স্বাস্থ্য প্রশ্নের উত্তর দিতে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      input_placeholder: "স্বাস্থ্য বিষয়, উপসর্গ বা প্রতিরোধ সম্পর্কে জিজ্ঞাসা করুন...",
      medical_disclaimer:
        "এই AI সহায়ক শুধুমাত্র সাধারণ স্বাস্থ্য তথ্য প্রদান করে। চিকিৎসা পরামর্শের জন্য সর্বদা স্বাস্থ্য পেশাদারদের সাথে পরামর্শ করুন।",

      // Quick Replies
      symptoms_query: "আমি উপসর্গ এবং কখন চিকিৎসা সেবা নিতে হবে সে সম্পর্কে জানতে চাই।",
      prevention_query: "আপনি কি আমাকে সুস্থ থাকার জন্য প্রতিরোধমূলক পরামর্শ দিতে পারেন?",
      faq_query: "আমার কিছু সাধারণ স্বাস্থ্য প্রশ্ন আছে।",
      myths_query: "আপনি কি কিছু স্বাস্থ্য তথ্য যাচাই করতে আমাকে সাহায্য করতে পারেন?",

      // Error Messages
      technical_difficulties:
        "আমি দুঃখিত, কিন্তু আমি এখন প্রযুক্তিগত সমস্যার সম্মুখীন হচ্ছি। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন, অথবা জরুরি স্বাস্থ্য সমস্যা থাকলে একজন স্বাস্থ্য সেবা প্রদানকারীর সাথে যোগাযোগ করুন।",

      // Language Selection
      select_language: "ভাষা নির্বাচন করুন",
      language: "ভাষা",

      // Authentication
      login: "লগইন",
      enter_email_to_login: "আপনার অ্যাকাউন্টে লগইন করতে নিচে আপনার ইমেল প্রবেশ করুন",
      email: "ইমেল",
      password: "পাসওয়ার্ড",
      logging_in: "লগইন হচ্ছে...",
      login_button: "লগইন",
      no_account: "অ্যাকাউন্ট নেই?",
      sign_up: "সাইন আপ",
      sign_up_title: "সাইন আপ",
      create_account: "নতুন অ্যাকাউন্ট তৈরি করুন",
      repeat_password: "পাসওয়ার্ড পুনরাবৃত্তি করুন",
      creating_account: "অ্যাকাউন্ট তৈরি করা হচ্ছে...",
      sign_up_button: "সাইন আপ",
      already_have_account: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      passwords_do_not_match: "পাসওয়ার্ড মেলে না",
    },
  },
  ru: {
    translation: {
      // Navigation
      health_assistant: "Помощник по здоровью",
      ai_powered_health_info: "Медицинская информация с ИИ",
      online_ready_to_help: "Онлайн • Готов помочь",
      sign_out: "Выйти",

      // Quick Actions
      quick_actions: "Быстрые действия",
      symptoms_checker: "Проверка симптомов",
      prevention_tips: "Советы по профилактике",
      common_faqs: "Частые вопросы",
      myth_busting: "Развенчание мифов",

      // Chat Interface
      welcome_message:
        "Привет! Я ваш ИИ-помощник по здоровью. Я могу помочь вам с медицинской информацией, симптомами, советами по профилактике и ответить на общие вопросы о здоровье. Как я могу помочь вам сегодня?",
      input_placeholder: "Спросите меня о здоровье, симптомах или профилактике...",
      medical_disclaimer:
        "Этот ИИ-помощник предоставляет только общую медицинскую информацию. Всегда консультируйтесь с медицинскими работниками для получения медицинских советов.",

      // Quick Replies
      symptoms_query: "Я хотел бы узнать о симптомах и когда обращаться за медицинской помощью.",
      prevention_query: "Можете ли вы дать мне советы по профилактике для поддержания здоровья?",
      faq_query: "У меня есть общие вопросы о здоровье.",
      myths_query: "Можете ли вы помочь мне проверить медицинскую информацию?",

      // Error Messages
      technical_difficulties:
        "Извините, но у меня сейчас технические проблемы. Пожалуйста, попробуйте еще раз через некоторое время или обратитесь к медицинскому работнику, если у вас срочные проблемы со здоровьем.",

      // Language Selection
      select_language: "Выбрать язык",
      language: "Язык",

      // Authentication
      login: "Вход",
      enter_email_to_login: "Введите адрес электронной почты ниже, чтобы войти в свой аккаунт",
      email: "Электронная почта",
      password: "Пароль",
      logging_in: "Вход...",
      login_button: "Вход",
      no_account: "Нет аккаунта?",
      sign_up: "Зарегистрироваться",
      sign_up_title: "Зарегистрироваться",
      create_account: "Создать новый аккаунт",
      repeat_password: "Повторить пароль",
      creating_account: "Создание аккаунта...",
      sign_up_button: "Зарегистрироваться",
      already_have_account: "У вас уже есть аккаунт?",
      passwords_do_not_match: "Пароли не совпадают",
    },
  },
  ja: {
    translation: {
      // Navigation
      health_assistant: "健康アシスタント",
      ai_powered_health_info: "AI搭載健康情報",
      online_ready_to_help: "オンライン • サポート準備完了",
      sign_out: "サインアウト",

      // Quick Actions
      quick_actions: "クイックアクション",
      symptoms_checker: "症状チェッカー",
      prevention_tips: "予防のヒント",
      common_faqs: "よくある質問",
      myth_busting: "誤解の解消",

      // Chat Interface
      welcome_message:
        "こんにちは！私はあなたのAI健康アシスタントです。健康情報、症状、予防のヒント、一般的な健康に関する質問にお答えできます。今日はどのようにお手伝いできますか？",
      input_placeholder: "健康トピック、症状、予防について質問してください...",
      medical_disclaimer:
        "このAIアシスタントは一般的な健康情報のみを提供します。医学的アドバイスについては、必ず医療従事者にご相談ください。",

      // Quick Replies
      symptoms_query: "症状といつ医療ケアを求めるべきかについて知りたいです。",
      prevention_query: "健康を維持するための予防のヒントを教えてもらえますか？",
      faq_query: "一般的な健康に関する質問があります。",
      myths_query: "健康情報の事実確認を手伝ってもらえますか？",

      // Error Messages
      technical_difficulties:
        "申し訳ございませんが、現在技術的な問題が発生しています。しばらくしてから再度お試しいただくか、緊急の健康上の懸念がある場合は医療提供者にご連絡ください。",

      // Language Selection
      select_language: "言語を選択",
      language: "言語",

      // Authentication
      login: "ログイン",
      enter_email_to_login: "アカウントにログインするには、以下にメールアドレスを入力してください",
      email: "メール",
      password: "パスワード",
      logging_in: "ログイン中...",
      login_button: "ログイン",
      no_account: "アカウントをお持ちですか？",
      sign_up: "サインアップ",
      sign_up_title: "サインアップ",
      create_account: "新しいアカウントを作成",
      repeat_password: "パスワードを繰り返す",
      creating_account: "アカウントを作成中...",
      sign_up_button: "サインアップ",
      already_have_account: "すでにアカウントをお持ちですか？",
      passwords_do_not_match: "パスワードが一致しません",
    },
  },
  de: {
    translation: {
      // Navigation
      health_assistant: "Gesundheitsassistent",
      ai_powered_health_info: "KI-gestützte Gesundheitsinformationen",
      online_ready_to_help: "Online • Bereit zu helfen",
      sign_out: "Abmelden",

      // Quick Actions
      quick_actions: "Schnellaktionen",
      symptoms_checker: "Symptom-Checker",
      prevention_tips: "Präventions-Tipps",
      common_faqs: "Häufige Fragen",
      myth_busting: "Mythen aufklären",

      // Chat Interface
      welcome_message:
        "Hallo! Ich bin Ihr KI-Gesundheitsassistent. Ich kann Ihnen bei Gesundheitsinformationen, Symptomen, Präventions-Tipps helfen und häufige Gesundheitsfragen beantworten. Wie kann ich Ihnen heute helfen?",
      input_placeholder: "Fragen Sie mich zu Gesundheitsthemen, Symptomen oder Prävention...",
      medical_disclaimer:
        "Dieser KI-Assistent bietet nur allgemeine Gesundheitsinformationen. Konsultieren Sie immer Gesundheitsfachkräfte für medizinische Beratung.",

      // Quick Replies
      symptoms_query: "Ich möchte über Symptome und wann medizinische Versorgung zu suchen ist erfahren.",
      prevention_query: "Können Sie mir Präventions-Tipps für die Gesunderhaltung geben?",
      faq_query: "Ich habe einige allgemeine Gesundheitsfragen.",
      myths_query: "Können Sie mir helfen, Gesundheitsinformationen zu überprüfen?",

      // Error Messages
      technical_difficulties:
        "Entschuldigung, aber ich habe gerade technische Schwierigkeiten. Bitte versuchen Sie es in einem Moment erneut oder kontaktieren Sie einen Gesundheitsdienstleister, wenn Sie dringende Gesundheitsprobleme haben.",

      // Language Selection
      select_language: "Sprache auswählen",
      language: "Sprache",

      // Authentication
      login: "Anmelden",
      enter_email_to_login: "Geben Sie Ihre E-Mail ein, um sich in Ihr Konto einzuloggen",
      email: "E-Mail",
      password: "Passwort",
      logging_in: "Anmelden...",
      login_button: "Anmelden",
      no_account: "Haben Sie noch kein Konto?",
      sign_up: "Registrieren",
      sign_up_title: "Registrieren",
      create_account: "Neues Konto erstellen",
      repeat_password: "Passwort wiederholen",
      creating_account: "Konto wird erstellt...",
      sign_up_button: "Registrieren",
      already_have_account: "Haben Sie bereits ein Konto?",
      passwords_do_not_match: "Passwörter stimmen nicht überein",
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      lookupNavigator: true,
    },

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
