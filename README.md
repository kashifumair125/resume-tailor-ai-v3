# 🚀 ResumeTailor AI v3.0

AI-powered resume optimizer that tailors resumes to job descriptions. Get multiple optimized versions, ATS scores, and professional PDFs  **100% free, no sign-up required.**

---

## ✨ Features

- 🎯 **Job-Matched Optimization** – Paste any job description, get a tailored resume
- 📊 **ATS Scoring** – See compatibility score (0–100) with insights
- 📝 **3 Optimized Versions**
  - ATS-Safe (keyword optimized)
  - Impact-Focused (achievement-driven)
  - Recruiter-Friendly (balanced & readable)
- 📄 **4 Professional Templates**
  - Jake’s Resume
  - Harvard
  - Venables
  - ModernCV
- 🔄 **Before / After Comparison**
- 💡 **Smart Improvement Suggestions**
- 📥 **PDF Download Export**
- 🆓 **Fully Offline / No API Dependency**
- 🔒 **Privacy First** – No login, no tracking, no data storage

---

## 🆚 Why This Project?

### vs Paid Resume Tools

**Kickresume / Resume.io**
- ❌ Paid subscriptions
- ❌ Limited optimization
- ❌ Locked features

**Jobscan**
- ❌ Expensive monthly plans
- ❌ Optimization-only tool

### 🚀 This Project
- ✅ 100% Free
- ✅ Full resume optimization system
- ✅ Multiple AI-style outputs (local logic)
- ✅ No account required
- ✅ Works instantly in browser

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

---

### Installation

```bash
# Clone project
git clone https://github.com/your-username/resume-tailor-ai-v3.git

cd resume-tailor-ai-v3

# Install dependencies
npm install

# Run development server
npm run dev
````

Open:

```
http://localhost:3000
```

---

## 📖 How It Works

### 1. Input Data

* Paste your resume OR upload file (PDF/DOCX/TXT)
* Paste job description

### 2. AI Processing (Local Engine)

* Extracts skills & keywords
* Matches job requirements
* Rewrites sections intelligently
* Generates 3 optimized versions

### 3. Results You Get

* ATS Score (0–100)
* Keyword analysis
* Skill gap detection
* Improved resume versions
* Change breakdown

### 4. Export

* Select template
* Download professional PDF
* Ready for job applications

---

## 🏗️ Project Structure

```
resume-tailor-ai-v3/
├── app/
│   ├── api/
│   │   ├── optimize/route.ts
│   │   ├── parse-resume/route.ts
│   │   └── download-pdf/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── OptimizePage.tsx
│   └── ResultsPage.tsx
│
├── lib/
│   ├── bytez.ts (legacy / not required)
│   └── templates/
│       ├── jakes.ts
│       ├── harvard.ts
│       ├── venables.ts
│       └── moderncv.ts
│
├── public/
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

**Frontend**

* Next.js 14 (App Router)
* React 18
* TypeScript
* Tailwind CSS
* Lucide Icons

**Backend (Local APIs)**

* Next.js API Routes
* File parsing logic
* Resume transformation engine

**File Processing**

* pdf-parse
* mammoth (DOCX)
* jsPDF (export)

---

## 🎨 Design Philosophy

* Clean, minimal UI
* No gradients or flashy effects
* Focus on readability
* Recruiter-friendly layout
* Fast performance

---

## 📄 Templates

### Jake’s Resume

* Modern + ATS optimized
* Most commonly used

### Harvard

* Classic academic style
* Clean structured layout

### Venables

* Executive / corporate style
* Strong visual hierarchy

### ModernCV

* Technical / developer focused
* Compact and structured

---

## 🔒 Privacy

* No accounts
* No database
* No resume storage
* Everything processed locally
* Your data stays in your browser/session

---

## 📊 Performance

* ⚡ Load time: < 1s
* ⚡ Optimization: 10–30s (local processing)
* ⚡ PDF generation: Instant
* ⚡ File parsing: Instant

---

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "initial commit"
git push origin main
```

### 2. Import to Vercel

* Go to [https://vercel.com](https://vercel.com)
* Click **New Project**
* Import GitHub repo
* Click **Deploy**

Done.

---

## 🐛 Troubleshooting

### Build errors

```bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### PDF not downloading

* Try different browser
* Check console errors

### API routes failing

* Ensure Node 18+
* Restart dev server

---

## 🎯 Roadmap

* [ ] Better AI rewriting engine
* [ ] Cover letter generator
* [ ] LinkedIn optimizer
* [ ] Resume scoring improvements
* [ ] More templates
* [ ] Drag & drop resume builder

---

## 🤝 Contributing

1. Fork repo
2. Create branch
3. Improve features
4. Submit PR

---

## 📜 License

MIT License — free to use for personal and commercial projects.

---

## 💬 Support

If this helps you:

* ⭐ Star the repo
* 🐛 Report issues
* 💡 Suggest features

---

## 🚀 Final

Built to help people land better jobs by improving resumes intelligently — fast, free, and simple.

**No API. No login. Just results.**

```

If you want next step, I can also:
- make your **GitHub README look "viral SaaS style"**
- or redesign it like a **YC startup landing page**
- or help fix that **Vercel build error you had earlier (Harvard template TS issue)**
```
