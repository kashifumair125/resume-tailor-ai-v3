# 🚀 ResumeTailor AI v3.0

AI-powered resume optimizer that tailors resumes to job descriptions. Get 3 optimized versions, ATS scores, and professional PDFs — **100% free, no sign-up required.**

## ✨ Features

- **🎯 Job-Matched Optimization** - Paste any job description, get a perfectly tailored resume
- **📊 ATS Scoring** - See your ATS compatibility score (0-100) with detailed insights
- **📝 3 Optimized Versions** - ATS-Safe, Impact-Focused, and Recruiter-Friendly
- **📄 4 Professional Templates** - Jake's Resume, Harvard, Venables, ModernCV
- **💡 Smart Insights** - Honest feedback on what might hold you back
- **🔄 Before/After Comparison** - See exactly what changed and why
- **📥 PDF Download** - Professional, ATS-friendly PDFs ready to submit
- **🆓 Completely Free** - Uses Bytez API (free tier) instead of paid services
- **🔒 Privacy First** - No data storage, no accounts, no tracking

## 🆚 What Makes This Different?

### vs Kickresume ($19-29/month):
✅ Job description optimization (they don't have this!)  
✅ 3 versions per resume (they only give 1)  
✅ **100% FREE** (they charge)  
✅ No sign-up required  

### vs Jobscan ($50-90/month):
✅ Full resume builder included (they're optimizer-only)  
✅ Professional templates (theirs are basic)  
✅ **100% FREE** (they charge a lot)  

### vs Resume Worded:
✅ Better templates  
✅ Job-matched optimization  
✅ No subscription  

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Bytez API Key (free - see below)

### Installation

```bash
# 1. Navigate to project
cd resume-tailor-ai-v3

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Add your Bytez API key to .env.local
# BYTEZ_API_KEY=your_actual_key_here

# 5. Run development server
npm run dev

# 6. Open http://localhost:3000
```

## 🔑 Getting Your Bytez API Key (FREE)

1. Go to [https://bytez.com](https://bytez.com)
2. Sign up (free account)
3. Go to Dashboard → API Keys
4. Create a new API key
5. Copy and paste it into `.env.local`

**Free Tier Includes:**
- 10,000 requests/month
- GPT-3.5, Llama, Mistral models
- No credit card required
- Perfect for personal use

## 📖 How to Use

### 1. Optimize Your Resume

1. Click "Get Started Free"
2. **Enter your resume:**
   - Paste text directly, OR
   - Upload PDF/DOCX/TXT file
3. **Paste the job description** from the job posting
4. Click "Optimize Resume"
5. Wait 30-60 seconds for AI processing

### 2. Review Results

You'll get:
- **ATS Score** (0-100) with explanation
- **Keywords added** from the job description
- **3 versions:**
  - **ATS-Safe:** Keyword-heavy, simple structure
  - **Impact:** Achievement-focused, strong metrics
  - **Recruiter-Friendly:** Balanced, human-readable
- **Insights:** What might hurt your chances + how to fix
- **Changes breakdown:** See exactly what changed and why

### 3. Download PDF

1. Switch between the 3 versions (tabs)
2. Choose a template:
   - **Jake's Resume** - Most popular, ATS-friendly
   - **Harvard** - Classic, elegant
   - **Venables** - Executive, modern
   - **ModernCV** - Technical, LaTeX-style
3. Click "Download PDF"
4. Apply with confidence! 🎉

## 🏗️ Project Structure

```
resume-tailor-ai-v3/
├── app/
│   ├── api/
│   │   ├── optimize/route.ts       # Main optimization logic
│   │   ├── parse-resume/route.ts   # File parsing
│   │   └── download-pdf/route.ts   # PDF generation
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Styles
│
├── components/
│   ├── OptimizePage.tsx            # Resume + JD input
│   └── ResultsPage.tsx             # Results display
│
├── lib/
│   ├── bytez.ts                    # Bytez API integration
│   └── templates/                  # PDF templates
│       ├── jakes.ts
│       ├── harvard.ts
│       ├── venables.ts
│       └── moderncv.ts
│
├── .env.example
├── .env.local (create this)
├── package.json
└── README.md
```

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Next.js API Routes
- Node.js

**AI:**
- Bytez API (GPT-3.5 Turbo)
- **100% FREE** tier

**File Processing:**
- Mammoth.js (DOCX)
- pdf-parse (PDF)
- jsPDF (PDF generation)

**Deployment:**
- Vercel (recommended)
- Railway, Render (also work)

## 💰 Cost Analysis

### This Project (Bytez):
- **Per resume:** $0
- **1,000 resumes:** $0
- **10,000 resumes/month:** $0 (free tier)
- **Monthly cost:** **$0** 🎉

### Competitors:
- Kickresume: $19-29/month
- Jobscan: $50-90/month
- Resume Worded: $30-40/month

**Your savings:** $240-1,080/year!

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variable:
   - `BYTEZ_API_KEY` = your Bytez API key
6. Click "Deploy"

Done! Your app will be live in ~2 minutes.

### Alternative: Railway/Render

Works the same way - just add the `BYTEZ_API_KEY` environment variable.

## 🎨 Design Philosophy

**Simple & Clean (Wellfound-inspired)**
- No gradients
- One light blue color (#0ea5e9)
- Lots of white space
- Clean borders
- Simple shadows
- Focus on content, not decoration

## 🔒 Privacy & Security

- **No user accounts** - No sign-up required
- **No data storage** - Everything is processed ephemerally
- **No tracking** - We don't track you
- **Open source** - Code is transparent
- **Privacy-first** - Your resume is never saved

## 📊 Performance

- **Page load:** <1s
- **Optimization:** 30-60s
- **PDF generation:** 2-3s
- **File upload:** Instant parsing

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### API key not working
1. Check `.env.local` exists (not `.env.example`)
2. Verify key is correct (no extra spaces)
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Optimization fails
1. Check Bytez API key is valid
2. Check you have credits (free tier = 10K/month)
3. Try shorter resume or job description

### PDF download doesn't work
1. Check browser console for errors
2. Try different browser
3. Verify jsPDF is installed: `npm list jspdf`

## 🎯 Roadmap

**Current (v3.0):**
✅ Job description optimization  
✅ 3 versions  
✅ ATS scoring  
✅ 4 templates  
✅ Bytez API (free)  

**Coming Soon:**
- [ ] AI Resume Builder (create from scratch)
- [ ] Section-by-section AI rewriting
- [ ] Cover letter generator
- [ ] LinkedIn profile optimizer
- [ ] Resume examples library
- [ ] Multi-language support

## 🤝 Contributing

This is an open-source project! Contributions welcome:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - Free to use for personal or commercial projects!

## 🙏 Acknowledgments

Built with:
- [Bytez.com](https://bytez.com) - Free AI API
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation

## 💬 Support

If you find this helpful:
- ⭐ Star the repository
- 🐛 Report bugs via Issues
- 💡 Suggest features
- 🔗 Share with friends looking for jobs

## 🎯 Success Stories

Help us collect success stories! If this tool helped you land a job, let us know!

---

**Made with ❤️ to help job seekers succeed**

**100% Free • No Sign Up • Open Source**

Ready to optimize your first resume? Run `npm run dev` and visit http://localhost:3000! 🚀
