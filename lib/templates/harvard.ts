import { jsPDF } from 'jspdf'

export function generateHarvardTemplate(resumeData: any, doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let y = 25

  const checkPageBreak = (height: number) => {
    if (y + height > doc.internal.pageSize.height - 20) {
      doc.addPage()
      y = 25
    }
  }

  const addSpace = (space: number) => {
    y += space
    checkPageBreak(0)
  }

  // Parse resume
  const sections = parseResume(resumeData)

  // HEADER - Classic Harvard Style
  doc.setFontSize(22)
  doc.setFont('times', 'bold')
  doc.setTextColor(26, 26, 26)
  doc.text(sections.name || 'YOUR NAME', pageWidth / 2, y, { align: 'center' })
  y += 7

  if (sections.contact) {
    doc.setFontSize(10)
    doc.setFont('times', 'normal')
    doc.setTextColor(60, 60, 60)
    const contactLines = doc.splitTextToSize(sections.contact, contentWidth)
    contactLines.forEach((line: string) => {
      doc.text(line, pageWidth / 2, y, { align: 'center' })
      y += 4.5
    })
  }
  addSpace(6)

  // Elegant line separator
  doc.setDrawColor(139, 0, 0)
  doc.setLineWidth(0.8)
  doc.line(margin, y, pageWidth - margin, y)
  addSpace(10)

  // SUMMARY
  if (sections.summary && sections.summary.length > 0) {
    renderSection(doc, 'SUMMARY', sections.summary, margin, contentWidth, checkPageBreak)
  }

  // EDUCATION (Harvard puts education first)
  if (sections.education && sections.education.length > 0) {
    renderSection(doc, 'EDUCATION', sections.education, margin, contentWidth, checkPageBreak)
  }

  // EXPERIENCE
  if (sections.experience && sections.experience.length > 0) {
    renderSection(doc, 'EXPERIENCE', sections.experience, margin, contentWidth, checkPageBreak)
  }

  // PROJECTS
  if (sections.projects && sections.projects.length > 0) {
    renderSection(doc, 'PROJECTS', sections.projects, margin, contentWidth, checkPageBreak)
  }

  // SKILLS
  if (sections.skills && sections.skills.length > 0) {
    renderSection(doc, 'SKILLS', sections.skills, margin, contentWidth, checkPageBreak)
  }

  // CERTIFICATIONS
  if (sections.certifications && sections.certifications.length > 0) {
    renderSection(doc, 'CERTIFICATIONS', sections.certifications, margin, contentWidth, checkPageBreak)
  }

  function renderSection(doc: jsPDF, title: string, content: string[], margin: number, width: number, checkPage: Function) {
    checkPage(15)
    
    doc.setFontSize(12)
    doc.setFont('times', 'bold')
    doc.setTextColor(139, 0, 0)
    doc.text(title, margin, y)
    y += 7

    doc.setFontSize(10.5)
    doc.setFont('times', 'normal')
    doc.setTextColor(30, 30, 30)

    content.forEach((line) => {
      checkPage(6)
      
      if (isJobTitle(line)) {
        doc.setFont('times', 'bold')
        doc.setTextColor(26, 26, 26)
        const titleLines = doc.splitTextToSize(line, width)
        titleLines.forEach((tLine: string) => {
          checkPage(5)
          doc.text(tLine, margin, y)
          y += 5.5
        })
        doc.setFont('times', 'normal')
        doc.setTextColor(30, 30, 30)
      }
      else if (line.trim().startsWith('–') || line.trim().startsWith('-') || line.trim().startsWith('•')) {
        const bulletText = line.replace(/^[–\-•]\s*/, '').trim()
        if (bulletText) {
          const bulletLines = doc.splitTextToSize(bulletText, width - 8)
          bulletLines.forEach((bLine: string, idx: number) => {
            checkPage(5)
            if (idx === 0) {
              doc.text('•', margin + 2, y)
              doc.text(bLine, margin + 8, y)
            } else {
              doc.text(bLine, margin + 8, y)
            }
            y += 5
          })
        }
      }
      else if (line.trim()) {
        const textLines = doc.splitTextToSize(line, width)
        textLines.forEach((tLine: string) => {
          checkPage(5)
          doc.text(tLine, margin, y)
          y += 5
        })
      }
    })
    
    addSpace(6)
  }

  return doc
}

function parseResume(resumeText: string): any {
  const text = typeof resumeText === 'string' ? resumeText : JSON.stringify(resumeText, null, 2)
  const lines = text.split('\n').map(l => l.trim()).filter(l => l)

  const sections: any = {
    name: '',
    contact: '',
    summary: [],
    experience: [],
    projects: [],
    education: [],
    skills: [],
    certifications: []
  }

  let currentSection = 'header'

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!sections.name && line.length < 50 && !line.includes('@') && !line.includes('http')) {
      sections.name = line
      continue
    }

    if (!sections.contact && (line.includes('@') || line.includes('+') || line.match(/\d{10}/))) {
      sections.contact = line
      continue
    }

    if (line.match(/^(SUMMARY|PROFESSIONAL SUMMARY|EXECUTIVE SUMMARY)/i)) {
      currentSection = 'summary'
      continue
    }
    if (line.match(/^(WORK EXPERIENCE|EXPERIENCE|PROFESSIONAL EXPERIENCE)/i)) {
      currentSection = 'experience'
      continue
    }
    if (line.match(/^(PROJECTS|ANALYTICS.*PROJECTS|SELECTED PROJECTS)/i)) {
      currentSection = 'projects'
      continue
    }
    if (line.match(/^(EDUCATION)/i)) {
      currentSection = 'education'
      continue
    }
    if (line.match(/^(SKILLS|TECHNICAL SKILLS)/i)) {
      currentSection = 'skills'
      continue
    }
    if (line.match(/^(CERTIFICATIONS|CERTIFICATES)/i)) {
      currentSection = 'certifications'
      continue
    }

    if (currentSection !== 'header' && sections[currentSection]) {
      sections[currentSection].push(line)
    }
  }

  return sections
}

function isJobTitle(line: string): boolean {
  return (
    (line.includes('|') && !line.startsWith('–') && !line.startsWith('•')) ||
    (!!line.match(/\d{4}/) && !line.startsWith('–') && !line.startsWith('•') && line.length < 100) ||
    !!line.match(/^[A-Z][a-z]+.*\s+(Intern|Engineer|Developer|Analyst|Manager|Consultant)/i)
  )
}
