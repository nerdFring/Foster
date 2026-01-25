import puppeteer from 'puppeteer'
import Resume from '../../models/resume.js';

// PDF Generation Route
 export const pdf= 
 async (req, res) => {
  try {
    const resumeId = req.params.id;
    
    // Fetch resume data from database
    const resumeData = await Resume.findById(resumeId);
    
    if (!resumeData) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Generate HTML template
    const html = generateResumeHTML(resumeData);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set content and wait for all resources to load
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: true
    });
    
    await browser.close();
    
    // Send PDF as response
    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resumeData.firstName}_${resumeData.lastName}_Resume.pdf"`);
    res.send(pdf);
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate PDF',
      error: error.message 
    });
  }
};

// HTML Template Generator
function generateResumeHTML(data) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0 && remainingMonths === 0) return '1 mo';
    if (years === 0) return `${remainingMonths} mo`;
    if (remainingMonths === 0) return `${years} yr`;
    return `${years} yr ${remainingMonths} mo`;
  };

  const experienceHTML = data.experience?.map(exp => `
    <div class="experience-item">
      <div class="flex-between">
        <div>
          <h3 class="job-title">${exp.jobTitle}</h3>
          <p class="employer">${exp.employer}</p>
        </div>
        <div class="date-info">
          <div class="date-row">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#555" style="margin-right: 4px;">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
            </svg>
            <span>${formatDate(exp.jobStartDate)} - ${exp.currentlyWorking ? 'Present' : formatDate(exp.jobEndDate)}</span>
          </div>
          <p class="duration">${calculateDuration(exp.jobStartDate, exp.currentlyWorking ? null : exp.jobEndDate)}</p>
        </div>
      </div>
      ${exp.jobLocation ? `
        <p class="location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#555" style="margin-right: 4px;">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${exp.jobLocation}
        </p>
      ` : ''}
      ${exp.jobDescription ? `<p class="description">${exp.jobDescription.replace(/\n/g, '<br>')}</p>` : ''}
    </div>
  `).join('') || '';

  const educationHTML = data.education?.map(edu => `
    <div class="education-item">
      <div class="flex-between">
        <div>
          <h3 class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</h3>
          <p class="institution">${edu.instituteName}</p>
        </div>
        <div class="date-info-small">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#555" style="margin-right: 4px;">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
          </svg>
          <span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
        </div>
      </div>
      <div class="edu-details">
        ${edu.location ? `
          <span class="location-inline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#555" style="margin-right: 3px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            ${edu.location}
          </span>
        ` : ''}
        ${edu.score && edu.scoreType ? `<span class="score">${edu.scoreType}: ${edu.score}</span>` : ''}
      </div>
    </div>
  `).join('') || '';

  const projectsHTML = data.projects?.map(project => `
    <div class="project-item">
      <div class="flex-between">
        <h3 class="project-name">${project.projectName}</h3>
        ${project.link ? `
          <a href="${project.link}" class="project-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0066cc" style="margin-right: 3px;">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
            </svg>
            View
          </a>
        ` : ''}
      </div>
      ${project.technologies?.length > 0 ? `
        <p class="technologies"><strong>Technologies:</strong> ${project.technologies.join(' • ')}</p>
      ` : ''}
      ${project.description ? `<p class="description">${project.description}</p>` : ''}
    </div>
  `).join('') || '';

  const skillsArray = data.skills?.map(skill => {
    if (typeof skill === 'string') return skill;
    if (typeof skill === 'object' && skill.name) return skill.name;
    return '';
  }).filter(Boolean) || [];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.firstName} ${data.lastName} - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #333;
      background: white;
    }
    
    .container {
      max-width: 210mm;
      margin: 0 auto;
      padding: 15mm;
    }
    
    .header {
      border-bottom: 4px solid #000;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    
    .name {
      font-size: 28pt;
      font-weight: bold;
      margin-bottom: 8px;
      color: #1a1a1a;
    }
    
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 9pt;
      color: #333;
      margin-top: 10px;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
    }
    
    .languages {
      margin-top: 8px;
      font-size: 9pt;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 2px solid #666;
      padding-bottom: 6px;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }
    
    .experience-item,
    .education-item,
    .project-item {
      margin-bottom: 15px;
      margin-left: 5px;
    }
    
    .job-title,
    .degree,
    .project-name {
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 3px;
      color: #1a1a1a;
    }
    
    .employer,
    .institution {
      font-size: 10pt;
      font-weight: 600;
      color: #333;
      margin-bottom: 3px;
    }
    
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 5px;
    }
    
    .date-info,
    .date-info-small {
      text-align: right;
      font-size: 9pt;
      color: #555;
    }
    
    .date-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    
    .duration {
      font-size: 8pt;
      color: #666;
      margin-top: 2px;
    }
    
    .location,
    .location-inline {
      font-size: 9pt;
      color: #555;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
    
    .edu-details {
      display: flex;
      gap: 15px;
      font-size: 9pt;
      color: #555;
      margin-top: 3px;
    }
    
    .score {
      font-weight: 600;
    }
    
    .description {
      font-size: 9pt;
      color: #333;
      line-height: 1.4;
      white-space: pre-line;
    }
    
    .technologies {
      font-size: 9pt;
      margin-bottom: 5px;
    }
    
    .project-link {
      font-size: 9pt;
      color: #0066cc;
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    
    .skills-list {
      font-size: 9pt;
      line-height: 1.6;
      margin-left: 5px;
    }
    
    svg {
      display: inline-block;
      vertical-align: middle;
    }
    
    @page {
      margin: 0;
      size: A4;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="name">${data.firstName} ${data.lastName}</h1>
      <div class="contact-info">
        ${data.email ? `
          <div class="contact-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#333" style="margin-right: 4px;">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>${data.email}</span>
          </div>
        ` : ''}
        ${data.phone ? `
          <div class="contact-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#333" style="margin-right: 4px;">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>${data.phone}</span>
          </div>
        ` : ''}
        ${data.address ? `
          <div class="contact-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#333" style="margin-right: 4px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>${data.address}</span>
          </div>
        ` : ''}
      </div>
      ${data.languages?.length > 0 ? `
        <div class="languages">
          <strong>Languages:</strong> ${Array.isArray(data.languages) ? data.languages.join(', ') : data.languages}
        </div>
      ` : ''}
    </div>

    <!-- Professional Experience -->
    ${data.experience?.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Professional Experience</h2>
        ${experienceHTML}
      </div>
    ` : ''}

    <!-- Education -->
    ${data.education?.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Education</h2>
        ${educationHTML}
      </div>
    ` : ''}

    <!-- Projects -->
    ${data.projects?.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Projects</h2>
        ${projectsHTML}
      </div>
    ` : ''}

    <!-- Technical Skills -->
    ${skillsArray.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Technical Skills</h2>
        <p class="skills-list">${skillsArray.join(' • ')}</p>
      </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}

