'use client'

import { useState } from 'react'
import { Download, RefreshCw, TrendingUp, AlertTriangle, Check, FileText } from 'lucide-react'

interface ResultsPageProps {
  data: any
  onStartOver: () => void
}

const TEMPLATES = [
  { id: 'jakes', name: "Jake's Resume", description: 'Popular one-column' },
  { id: 'harvard', name: 'Harvard', description: 'Classic elegant' },
  { id: 'venables', name: 'Venables', description: 'Executive style' },
  { id: 'moderncv', name: 'ModernCV', description: 'LaTeX sidebar' },
]

export default function ResultsPage({ data, onStartOver }: ResultsPageProps) {
  const [activeVersion, setActiveVersion] = useState<'atsSafe' | 'impact' | 'recruiterFriendly'>('atsSafe')
  const [selectedTemplate, setSelectedTemplate] = useState('jakes')
  const [showComparison, setShowComparison] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: data.versions[activeVersion],
          version: activeVersion,
          template: selectedTemplate,
        }),
      })

      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resume-${selectedTemplate}-${activeVersion}-${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">ResumeTailor AI</span>
            </div>
            <button
              onClick={onStartOver}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Start Over
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ATS Score Card */}
        <div className={`rounded-lg border p-6 mb-6 ${getScoreBg(data.atsScore)}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`text-5xl font-bold ${getScoreColor(data.atsScore)}`}>
                {data.atsScore}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className={`w-5 h-5 ${getScoreColor(data.atsScore)}`} />
                  <span className="font-semibold text-gray-900">ATS Match Score</span>
                </div>
                <p className="text-sm text-gray-600">
                  {data.atsScore >= 80 ? 'Excellent match! High chance of passing ATS.' : 
                   data.atsScore >= 60 ? 'Good match, but room for improvement.' : 
                   'Needs significant improvement to pass ATS.'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700 mb-1">Keywords Added</div>
              <div className="text-2xl font-bold text-brand-500">{data.keywordsAdded?.length || 0}</div>
            </div>
          </div>
          {data.keywordsAdded && data.keywordsAdded.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {data.keywordsAdded.slice(0, 8).map((keyword: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Insights Panel */}
        {data.insights && data.insights.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Improvement Opportunities</h3>
            </div>
            <div className="space-y-3">
              {data.insights.map((insight: any, idx: number) => (
                <div key={idx} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    insight.severity === 'high' ? 'bg-red-500' :
                    insight.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-900">{insight.message}</p>
                    {insight.fix && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Fix:</span> {insight.fix}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Version Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveVersion('atsSafe')}
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeVersion === 'atsSafe'
                    ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                ATS-Safe
              </button>
              <button
                onClick={() => setActiveVersion('impact')}
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeVersion === 'impact'
                    ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Impact
              </button>
              <button
                onClick={() => setActiveVersion('recruiterFriendly')}
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeVersion === 'recruiterFriendly'
                    ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Recruiter-Friendly
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 text-sm text-gray-600">
              {activeVersion === 'atsSafe' && '✓ Keyword-optimized for applicant tracking systems'}
              {activeVersion === 'impact' && '✓ Achievement-focused with strong action verbs'}
              {activeVersion === 'recruiterFriendly' && '✓ Balanced and easy for human reviewers'}
            </div>

            {/* Resume Preview */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                {typeof data.versions[activeVersion] === 'string' 
                  ? data.versions[activeVersion] 
                  : JSON.stringify(data.versions[activeVersion], null, 2)}
              </pre>
            </div>

            {/* Template Selector */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Choose Template</h4>
              <div className="grid grid-cols-4 gap-3">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedTemplate === template.id
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-200 bg-white hover:border-brand-300'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900 mb-1">
                      {template.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {showComparison ? 'Hide' : 'Show'} Before/After
              </button>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        {showComparison && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Before vs After</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Original</div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-xs text-gray-700">
                    {data.originalResume}
                  </pre>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Optimized</div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200 h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-xs text-gray-800">
                    {typeof data.versions[activeVersion] === 'string' 
                      ? data.versions[activeVersion] 
                      : JSON.stringify(data.versions[activeVersion], null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Changes Panel */}
        {data.changes && data.changes.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What Changed ({data.changes.length} improvements)
            </h3>
            <div className="space-y-4">
              {data.changes.slice(0, 10).map((change: any, idx: number) => (
                <div key={idx} className="border-l-4 border-brand-500 pl-4 py-2">
                  <div className="flex items-start gap-2 mb-2">
                    <Check className="w-4 h-4 text-brand-500 mt-0.5" />
                    <div className="flex-1">
                      {change.before && (
                        <div className="mb-1">
                          <span className="text-xs font-medium text-gray-500">Before:</span>
                          <p className="text-sm text-gray-600 line-through">{change.before}</p>
                        </div>
                      )}
                      {change.after && (
                        <div className="mb-1">
                          <span className="text-xs font-medium text-gray-500">After:</span>
                          <p className="text-sm text-gray-900 font-medium">{change.after}</p>
                        </div>
                      )}
                      {change.reason && (
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="font-medium">Why:</span> {change.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
