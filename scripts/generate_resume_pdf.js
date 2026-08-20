import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

function generateResumePDF() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const marginX = 40;
  const pageWidth = 612;
  const contentWidth = pageWidth - marginX * 2; // 532 pt
  let y = 38;

  // Header - Name
  doc.setFont('times', 'normal');
  doc.setFontSize(16);
  doc.text('Haniel Reena D R', pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Contact Info
  doc.setFontSize(9.5);
  const contactLine = 'Chennai, India | +91 8072656391| hanielreenadr20@gmail.com | https://www.linkedin.com/in/haniel-reena/';
  doc.text(contactLine, pageWidth / 2, y, { align: 'center' });
  y += 12;
  doc.text('https://github.com/hanielreena20', pageWidth / 2, y, { align: 'center' });
  y += 16;

  function renderSectionHeader(title) {
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.text(title, marginX, y);
    y += 3;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 11;
  }

  // 1. EDUCATION
  renderSectionHeader('EDUCATION');
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.text('Institute of Science & Technology, NMV University — Chennai, India', marginX, y);
  y += 11;

  doc.setFont('times', 'italic');
  doc.text('Bachelor of Technology in Computer Science Engineering', marginX, y);
  doc.text('Expected May - 2027', pageWidth - marginX, y, { align: 'right' });
  y += 11;

  doc.setFont('times', 'normal');
  const coursework = 'Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Computer Networks, Operating Systems, Machine Learning, Artificial Intelligence, Computer Vision, Natural Language Processing.';
  const cwLines = doc.splitTextToSize(coursework, contentWidth);
  doc.text(cwLines, marginX, y);
  y += cwLines.length * 10.5;

  doc.setFont('times', 'bold');
  doc.text('CGPA: 9.1/10', marginX, y);
  y += 15;

  // 2. TECHNICAL SKILLS
  renderSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Deep Learning & AI: ', text: 'Deep Learning, ResNet-18, Multimodal AI, Anomaly Detection, 3-NN, Memory-Bank Methods' },
    { label: 'NLP & Language Models: ', text: 'BART, T5, Tesseract OCR, Abstractive Summarization, Clinical Text Processing, ROUGE Evaluation' },
    { label: 'Computer Vision & Medical Imaging: ', text: 'OpenCV, Image Processing, Face Detection, Medical Imaging, 3D Volumetric Segmentation, Morphological Processing, Otsu Thresholding, Gaussian Filtering' },
    { label: 'Data Science & Machine Learning: ', text: 'Python, NumPy, scikit-learn, Random Forest, Logistic Regression, Data Preprocessing, Model Training, Multi-Class Classification' },
    { label: 'Programming & Development: ', text: 'HTML, SQL, API Integration, Database Connectivity, Git, GitHub, Visual Studio Code, Jupyter Notebook' }
  ];

  skills.forEach((s) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    const fullText = s.label + s.text;
    const splitLines = doc.splitTextToSize(fullText, contentWidth);
    
    // Print first line with bold prefix
    doc.text(s.label, marginX, y);
    const labelWidth = doc.getTextWidth(s.label);
    doc.setFont('times', 'normal');
    
    // Using formatted rendering for first line and continuation lines
    const remainingTextLines = doc.splitTextToSize(s.text, contentWidth - labelWidth);
    doc.text(remainingTextLines[0] || '', marginX + labelWidth, y);
    
    if (splitLines.length > 1) {
      for (let i = 1; i < splitLines.length; i++) {
        y += 10.5;
        doc.text(splitLines[i], marginX, y);
      }
    }
    y += 11;
  });
  y += 4;

  // 3. PROJECT EXPERIENCE
  renderSectionHeader('PROJECT EXPERIENCE');

  const projects = [
    {
      title: 'Adaptive Multimodal Open-World AI / Anomaly Detection',
      tech: ' | Python, Deep Learning, Multimodal AI',
      bullets: [
        'Designed an RGB–XYZ multimodal anomaly-detection framework using multiscale ResNet-18 features, normal memory banks, and 3-NN patch-level anomaly scoring.',
        'Implemented pseudo-anomaly validation and modality-aware fusion, achieving 85.77% AUROC, 75.86% F1-score, 94.83% precision, and 63.22% recall on MVTec 3D-AD.'
      ]
    },
    {
      title: '3D Kidney Medical Imaging & Visualization',
      tech: ' | Python, NumPy, OrganMNIST3D, Plotly',
      bullets: [
        'Developed a 3D kidney imaging pipeline for volumetric preprocessing, segmentation, localization, and interactive visualization.',
        'Applied Gaussian filtering, Otsu thresholding, morphological processing, and volumetric segmentation, achieving 85.7% Dice score, 78.4% IoU, and 90.6% sensitivity.'
      ]
    },
    {
      title: 'Intelligent Clinical Companion / Medical Report Summarizer',
      tech: ' | Python, OCR, NLP, BART, T5',
      bullets: [
        'Developed an AI medical-report system for OCR-based extraction, summarization, and patient-friendly text generation.',
        'Integrated Tesseract OCR, BART, and T5, achieving 46.2% ROUGE-1, 28.5% ROUGE-2, and 41.3% ROUGE-L.'
      ]
    },
    {
      title: 'Network Intrusion Detection & Explainable AI',
      tech: ' | Python, Scikit-learn, Random Forest, UNSW-NB15',
      bullets: [
        'Developed a multi-class intrusion detection system using the UNSW-NB15 dataset across 10 normal/attack traffic categories.',
        'Compared Logistic Regression and Random Forest with preprocessing and multi-class evaluation; Random Forest achieved 86.23% accuracy and 57.52% Macro-F1 on the official 82,332-record test set.'
      ]
    },
    {
      title: 'Real-Time Age & Gender Detection System',
      tech: ' | Python, OpenCV, Deep Learning',
      bullets: [
        'Developed a real-time computer-vision pipeline for face detection, age estimation, and gender classification from webcam streams.',
        'Implemented image preprocessing, face-region extraction, deep-learning inference, and bounding-box visualization, achieving 92.3% Gender-Classification Accuracy, 5.1-Year Age MAE, and 24 FPS during real-time inference.'
      ]
    }
  ];

  projects.forEach((proj) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.text(proj.title, marginX, y);
    const tw = doc.getTextWidth(proj.title);
    doc.setFont('times', 'italic');
    doc.text(proj.tech, marginX + tw, y);
    y += 10.5;

    proj.bullets.forEach((bullet) => {
      doc.setFont('times', 'normal');
      const bulletText = '• ' + bullet;
      const bLines = doc.splitTextToSize(bulletText, contentWidth - 8);
      
      // Render bullet with hanging indent
      doc.text('•', marginX + 4, y);
      const textLines = doc.splitTextToSize(bullet, contentWidth - 18);
      doc.text(textLines, marginX + 14, y);
      y += textLines.length * 10.5;
    });
    y += 2.5;
  });
  y += 2;

  // 4. PUBLICATIONS
  renderSectionHeader('PUBLICATIONS');
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.text('High-Volume Electronics Manufacturing with Automated X-Ray Inspections', marginX, y);
  doc.setFont('times', 'italic');
  doc.text('Accepted for Publication, 2026', pageWidth - marginX, y, { align: 'right' });
  y += 10.5;

  const pubBullets = [
    'Developed an imbalance-aware deep learning pipeline for automated X-ray inspection using ResNet-18, transfer learning, decision-threshold optimization, and false-call reduction analysis.',
    'Addressed a 91:1 class imbalance using Youden Index-based threshold optimization to preserve defect sensitivity while reducing false positives.',
    'Achieved 89.1% Weighted F1-Score, 86.7% Balanced Accuracy, 91.6% Sensitivity, 0.9221 AUROC, and 81.8% False-Call Reduction in the reported evaluation.'
  ];

  pubBullets.forEach((bullet) => {
    doc.setFont('times', 'normal');
    doc.text('•', marginX + 4, y);
    const textLines = doc.splitTextToSize(bullet, contentWidth - 18);
    doc.text(textLines, marginX + 14, y);
    y += textLines.length * 10.5;
  });
  y += 4;

  // 5. PROFESSIONAL EXPERIENCE
  renderSectionHeader('PROFESSIONAL EXPERIENCE');
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.text('Inertz Technologies | Full Stack Intern | Chennai, India', marginX, y);
  doc.setFont('times', 'italic');
  doc.text('January 2025 — June 2025', pageWidth - marginX, y, { align: 'right' });
  y += 10.5;

  const expBullets = [
    'Developed frontend and backend modules using HTML, Node.js, and SQL, integrating web application components with database connectivity and API functionality.',
    'Implemented database connectivity and API integration to support application features, while collaborating with developers to test, debug, and optimize application modules.',
    'Assisted in end-to-end web application development, performing functional testing, bug fixing, and backend integration to improve application reliability and performance.'
  ];

  expBullets.forEach((bullet) => {
    doc.setFont('times', 'normal');
    doc.text('•', marginX + 4, y);
    const textLines = doc.splitTextToSize(bullet, contentWidth - 18);
    doc.text(textLines, marginX + 14, y);
    y += textLines.length * 10.5;
  });

  const pdfOutput = doc.output('arraybuffer');
  
  // Ensure /public exists
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'Haniel_Reena_DR_Resume.pdf'), Buffer.from(pdfOutput));
  fs.writeFileSync(path.join(publicDir, 'Haniel_Reena_Resume.pdf'), Buffer.from(pdfOutput));
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), Buffer.from(pdfOutput));
  console.log('Resume PDF generated successfully at public/Haniel_Reena_DR_Resume.pdf');
}

generateResumePDF();
