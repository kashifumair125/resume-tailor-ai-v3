'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react'

interface OptimizePageProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function OptimizePage({ onComplete, onBack }: OptimizePageProps) {
  const [masterResume, setMasterResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'paste' | 'upload'>('paste')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setResumeFile(file)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { text } = await response.json()
        setMasterResume(text)
      }
    } catch (error) {
      console.error('Parse error:', error)
      alert('Failed to parse resume. Please try pasting the text instead.')
    }
  }

  const handleOptimize = async () => {
    if (!masterResume.trim() || !jobDescription.trim()) {
      alert('Please provide both your resume and job description')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masterResume,
          jobDescription,
        }),
      })

      if (!response.ok) {
        throw new Error('Optimization failed')
      }

      const result = await response.json()
      onComplete(result)
    } catch (error) {
      console.error('Optimization error:', error)
      alert('Failed to optimize resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">ResumeTailor AI</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Step 1 of 2
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Optimize Your Resume
          </h1>
          <p className="text-gray-600">
            Provide your resume and target job description
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Input */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-semibold text-gray-900">Your Resume</h2>
            </div>

            {/* Upload Method Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUploadMethod('paste')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  uploadMethod === 'paste'
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Paste Text
              </button>
              <button
                onClick={() => setUploadMethod('upload')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  uploadMethod === 'upload'
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Upload File
              </button>
            </div>

            {uploadMethod === 'paste' ? (
              <textarea
                value={masterResume}
                onChange={(e) => setMasterResume(e.target.value)}
                placeholder="Paste your resume text here...

John Doe
Software Engineer

EXPERIENCE
- Led development of web applications..."
                className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:border-brand-500 focus:outline-none resize-none font-mono text-sm"
              />
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">PDF, DOCX, or TXT (Max 5MB)</p>
              </div>
            )}
          </div>

          {/* Job Description Input */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-semibold text-gray-900">Target Job Description</h2>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here...

We're looking for a Senior Software Engineer with:
- 5+ years experience in Python
- Strong knowledge of SQL
- Experience with AWS..."
              className="w-full h-[26rem] p-4 border border-gray-200 rounded-lg focus:border-brand-500 focus:outline-none resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleOptimize}
            disabled={isLoading || !masterResume.trim() || !jobDescription.trim()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                Optimize Resume
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
