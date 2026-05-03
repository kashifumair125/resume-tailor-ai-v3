'use client'

import { useState } from 'react'
import { FileText, Target, TrendingUp, Download, Check } from 'lucide-react'
import OptimizePage from '@/components/OptimizePage'
import ResultsPage from '@/components/ResultsPage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'optimize' | 'results'>('home')
  const [resultData, setResultData] = useState<any>(null)

  const handleStartOptimize = () => {
    setCurrentPage('optimize')
  }

  const handleOptimizationComplete = (data: any) => {
    setResultData(data)
    setCurrentPage('results')
  }

  const handleStartOver = () => {
    setCurrentPage('home')
    setResultData(null)
  }

  if (currentPage === 'optimize') {
    return <OptimizePage onComplete={handleOptimizationComplete} onBack={() => setCurrentPage('home')} />
  }

  if (currentPage === 'results' && resultData) {
    return <ResultsPage data={resultData} onStartOver={handleStartOver} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">ResumeTailor AI</span>
            </div>
            <div className="text-sm text-gray-600">
              100% Free • No Sign Up
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simple & Clean */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Optimize Your Resume for Any Job
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered resume optimization that matches job descriptions. 
            Get 3 tailored versions, ATS scores, and professional templates.
          </p>
          <button
            onClick={handleStartOptimize}
            className="inline-flex items-center px-8 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
          >
            Get Started Free
          </button>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-500" />
              <span>No account needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-500" />
              <span>Takes 2 minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-500" />
              <span>100% private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Simple Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div>
            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Job-Matched Optimization
            </h3>
            <p className="text-gray-600">
              Paste any job description and get a resume perfectly tailored with the right keywords and skills.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ATS Score & Insights
            </h3>
            <p className="text-gray-600">
              See your ATS compatibility score and get honest feedback on what might hold you back.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              3 Versions + Templates
            </h3>
            <p className="text-gray-600">
              Get ATS-Safe, Impact, and Recruiter-Friendly versions in 4 professional templates.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-brand-500 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Upload or Paste Your Resume</h3>
              <p className="text-gray-600">Supports PDF, DOCX, or plain text. We'll extract everything automatically.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-brand-500 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Paste the Job Description</h3>
              <p className="text-gray-600">Copy the job posting you're applying to. Our AI analyzes and optimizes.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-brand-500 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Get 3 Optimized Versions</h3>
              <p className="text-gray-600">Choose a template, download PDF, and apply with confidence.</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={handleStartOptimize}
            className="inline-flex items-center px-8 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
          >
            Start Optimizing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-500" />
              <span className="font-semibold text-gray-900">ResumeTailor AI</span>
            </div>
            <div className="text-sm text-gray-600">
              Made to help job seekers succeed • 100% Free • Open Source
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
