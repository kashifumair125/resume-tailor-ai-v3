# ⚡ Quick Start Guide - ResumeTailor AI v3.0

Get your resume optimized in 5 minutes!

## 🚀 Setup (One Time)

### Step 1: Install Node.js
- Download from [nodejs.org](https://nodejs.org)
- Install LTS version
- Restart your computer

### Step 2: Get Bytez API Key (FREE)
1. Go to [bytez.com](https://bytez.com)
2. Sign up (free, no credit card)
3. Dashboard → API Keys → Create Key
4. Copy the key (starts with `bz_...`)

### Step 3: Install & Configure
```bash
# Navigate to project folder
cd resume-tailor-ai-v3

# Install everything
npm install

# Create config file
cp .env.example .env.local

# Edit .env.local and add your key:
# BYTEZ_API_KEY=bz_your_actual_key_here
```

### Step 4: Run
```bash
npm run dev
```

Visit: **http://localhost:3000**

## ✨ Usage (Every Time)

### 1. Prepare Your Materials
- Your current resume (any format)
- Job description you're applying to

### 2. Open the App
```bash
npm run dev
```
Then visit http://localhost:3000

### 3. Upload & Optimize
1. Click "Get Started Free"
2. Paste or upload your resume
3. Paste the job description
4. Click "Optimize Resume"
5. Wait 30-60 seconds

### 4. Review & Download
1. Check your ATS score
2. Review the 3 versions
3. Read the insights
4. Choose a template
5. Download PDF
6. Apply! 🎉

## 💡 Pro Tips

**Best Results:**
- Use complete job descriptions (not just requirements)
- Include all your experience in master resume
- Try all 3 versions for different companies
- Use Jake's Resume template for most jobs

**Template Guide:**
- **Jake's Resume** → Tech, startups, modern companies
- **Harvard** → Finance, law, traditional industries  
- **Venables** → Management, executive roles
- **ModernCV** → Engineering, technical positions

## 🐛 Common Issues

**"npm: command not found"**
→ Install Node.js from nodejs.org

**"Module not found"**
```bash
rm -rf node_modules .next
npm install
```

**"API key invalid"**
→ Check `.env.local` has correct key

**Optimization fails**
→ Make sure you have free tier credits on Bytez

## 📞 Need Help?

1. Check README.md for detailed docs
2. Check GitHub Issues
3. Make sure you're using Node.js 18+

## 🎯 That's It!

From install to optimized resume in 5 minutes.

**Next run:** Just `npm run dev` → Open browser → Optimize!

Happy job hunting! 🚀
