# 🩺 AI Symptoms Checker

An interactive **AI-powered health awareness tool** that helps users identify possible conditions based on symptoms, provides prevention tips, and suggests when to seek medical help.

> ⚠️ This is **not a medical diagnosis tool**. It is designed for **awareness and guidance only**.

---

## 🚀 Features

* 🧍‍♂️ **Interactive Body Map**

  * Select body parts visually to begin diagnosis

* 🌡️ **Pain Level Detection**

  * Choose severity (Low / Medium / High)

* 🤒 **Smart Symptom Selection**

  * Predefined + custom symptom input

* 🤖 **AI Chat Assistant**

  * Ask questions and get contextual health guidance

* 📊 **AI Analysis Engine**

  * Generates:

    * Possible conditions
    * Urgency level
    * Recommendations
    * Health score

* 🏥 **Nearby Hospital Suggestions**

  * Based on selected symptoms
  * Includes call & map links

* 🛡️ **Safety Alerts**

  * Emergency warnings for severe symptoms

---

## 🧠 Tech Stack

* **Frontend:** React + Next.js
* **UI:** Tailwind CSS + shadcn/ui
* **Icons:** Lucide React
* **i18n:** react-i18next
* **Backend APIs:** Next.js API routes
* **Database:** (via `/api/health-data` & `/api/symptom-analysis`)

---

## 📁 Project Structure

```
/components
  SymptomsChecker.tsx

/pages/api
  health-data.ts
  symptom-analysis.ts

/public
  diagram.png
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/symptoms-checker.git
cd health-chatbot
npm install -g pnpm
pnpm add pg
pnpm add -D @types/pg
pnpm add bcryptjs
pnpm db:migrate
rm -rf .next         
>> npm run dev
pnpm exec next dev
or
npm install

 pnpm update
pnpm build
pnpm add next@latest   
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 📌 Usage

1. Select a **body part**
2. Choose **pain level**
3. Select or type **symptoms**
4. Click **Get Awareness Info**
5. View:

   * AI analysis
   * Recommendations
   * Nearby hospitals
6. Use **AI Chat** for more help

---

## ⚠️ Disclaimer

* This tool **does NOT provide medical diagnosis**
* Always consult a **qualified doctor** for serious conditions
* In emergencies, call:

  ```
  108 (India Emergency Service)
  ```

---

## 🌟 Future Improvements

* Real AI/ML model integration
* User health history tracking
* Doctor appointment booking
* Location-based hospital APIs
* Voice input support

---

## 🤝 Contributing

Contributions are welcome!

```bash
fork → create branch → commit → push → pull request
```

---

## 📄 License

This project is licensed under the **MIT License**

---

## 👨‍💻 Author

Developed by **Your Name**

---

## 💡 Inspiration

Built to make **basic health awareness accessible** using simple UI + AI assistance.
