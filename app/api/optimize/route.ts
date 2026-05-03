import { NextRequest, NextResponse } from 'next/server'
import { optimizeResumeForJob } from '@/lib/bytez'

export async function POST(request: NextRequest) {
  try {
    const { masterResume, jobDescription } = await request.json()

    if (!masterResume || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Call Bytez AI to optimize resume
    const result = await optimizeResumeForJob(masterResume, jobDescription)

    // Add original resume to result
    const finalResult = {
      ...result,
      originalResume: masterResume,
    }

    return NextResponse.json(finalResult)
  } catch (error: any) {
    console.error('Optimization error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to optimize resume' },
      { status: 500 }
    )
  }
}
