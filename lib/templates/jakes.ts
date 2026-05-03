import { jsPDF } from 'jspdf'

export function generateJakesTemplate(resumeData: any, doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.width
  const margin = 15
  const contentWidth = pageWidth - (margin * 2)
  let y = 20

  // Helper to check page break
  const checkPageBreak = (height: number) => {
    if (y + height > doc.internal.pageSize.height - 20) {
      doc.addPage()
      y = 20
    }
  }

  // Helper to add spacing
  const addSpace = (space: number) => {
    y += space
    checkPageBreak(0)
  }

  // Parse resume into structured sections
  const sections = parseResume(resumeData)

  // HEADER - Name and Contact
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(sections.name || 'Your Name', margin, y)
  y += 7

  // Contact info
  if (sections.contact) {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)
    const contactLines = doc.splitTextToSize(sections.contact, contentWidth)
    contactLines.forEach((line: string) => {
      doc.text(line, margin, y)
      y += 4
    })
  }
  addSpace(3)

  // Horizontal line
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  addSpace(6)

  // SUMMARY
  if (sections.summary && sections.summary.length > 0) {
    renderSection(doc, 'SUMMARY', sections.summary, margin, contentWidth, checkPageBreak)
  }

  // WORK EXPERIENCE
  if (sections.experience && sections.experience.length > 0) {
    renderSection(doc, 'WORK EXPERIENCE', sections.experience, margin, contentWidth, checkPageBreak)
  }

  // PROJECTS
  if (sections.projects && sections.projects.length > 0) {
    renderSection(doc, 'PROJECTS', sections.projects, margin, contentWidth, checkPageBreak)
  }

  // EDUCATION
  if (sections.education && sections.education.length > 0) {
    renderSection(doc, 'EDUCATION', sections.education, margin, contentWidth, checkPageBreak)
  }

  // SKILLS
  if (sections.skills && sections.skills.length > 0) {
    renderSection(doc, 'TECHNICAL SKILLS', sections.skills, margin, contentWidth, checkPageBreak)
  }

  // CERTIFICATIONS
  if (sections.certifications && sections.certifications.length > 0) {
    renderSection(doc, 'CERTIFICATIONS', sections.certifications, margin, contentWidth, checkPageBreak)
  }

  function renderSection(doc: jsPDF, title: string, content: string[], margin: number, width: number, checkPage: Function) {
    checkPage(10)
    
    // Section header
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(title, margin, y)
    y += 6

    // Section content
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)

    content.forEach((line) => {
      checkPage(6)
      
      // Check if it's a job title/position (usually bold)
      if (isJobTitle(line)) {
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(0, 0, 0)
        const titleLines = doc.splitTextToSize(line, width)
        titleLines.forEach((tLine: string) => {
          checkPage(5)
          doc.text(tLine, margin, y)
          y += 5
        })
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(40, 40, 40)
      }
      // Check if it's a bullet point
      else if (line.trim().startsWith('–') || line.trim().startsWith('-') || line.trim().startsWith('•')) {
        const bulletText = line.replace(/^[–\-•]\s*/, '').trim()
        if (bulletText) {
          const bulletLines = doc.splitTextToSize(bulletText, width - 7)
          bulletLines.forEach((bLine: string, idx: number) => {
            checkPage(5)
            if (idx === 0) {
              doc.text('•', margin + 2, y)
              doc.text(bLine, margin + 7, y)
            } else {
              doc.text(bLine, margin + 7, y)
            }
            y += 4.5
          })
        }
      }
      // Regular text
      else if (line.trim()) {
        const textLines = doc.splitTextToSize(line, width)
        textLines.forEach((tLine: string) => {
          checkPage(5)
          doc.text(tLine, margin, y)
          y += 4.5
        })
      }
    })
    
    addSpace(4)
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
  let skipNext = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    if (skipNext) {
      skipNext = false
      continue
    }

    // First line is usually the name
    if (!sections.name && line.length < 50 && !line.includes('@') && !line.includes('http')) {
      sections.name = line
      continue
    }

    // Contact information
    if (!sections.contact && (line.includes('@') || line.includes('+') || line.match(/\d{10}/))) {
      sections.contact = line
      continue
    }

    // Section headers
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

    // Add line to current section
    if (currentSection !== 'header' && sections[currentSection]) {
      sections[currentSection].push(line)
    }
  }

  return sections
}

function isJobTitle(line: string): boolean {
  return (
    (line.includes('|') && !line.startsWith('–') && !line.startsWith('•')) ||
    (!!line.match(/\d{4}/) &&
      !line.startsWith('–') &&
      !line.startsWith('•') &&
      line.length < 100) ||
    !!line.match(
      /^[A-Z][a-z]+.*\s+(Intern|Engineer|Developer|Analyst|Manager|Consultant)/i
    )
  )
}