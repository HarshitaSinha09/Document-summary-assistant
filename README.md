# 📄 Document Summary Assistant

**Live Demo:** [document-summarizer-ten.vercel.app](https://document-summarizer-ten.vercel.app)

A **modern, glass-style web app** that intelligently summarizes PDF and image documents using **AI**, with smooth animations and a fully responsive design.

---

## 🔄 Application Workflow

1. **Upload** – Drag and drop or select a PDF/image file  
2. **Choose Length** – Select your preferred summary length (Short, Medium, Long)  
3. **Process** – The app extracts text and generates an AI summary  
4. **Review** – Copy or use the generated bullet-point summary  

---

## ✨ Core Features

### 📤 Document Upload
- **Drag & Drop Upload Zone** with hover animations  
- Supports **PDF** and image files (**PNG, JPG, JPEG**)  
- **Validation** for unsupported formats with friendly error messages  

### 📑 Text Extraction
- **PDF.js** for multi-page PDF parsing  
- **Tesseract.js OCR** for scanned images  
- Handles **large, multi-page documents** smoothly  

### 🤖 AI Summarization
- **Powered by Cohere AI API**  
- **Three length options:** Short • Medium • Long  
- **Bullet-point summaries** for clarity  
- **Copy to clipboard** button with success animation  

### 🎨 User Experience
- **Glassmorphism UI** with blur, shadows, and smooth animations  
- **Loading Indicators** with spinners during processing  
- **Error States** with styled alert messages  
- **Responsive Design** across desktop, tablet, and mobile  

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6+)  

**Libraries:**  
- **PDF.js** → PDF parsing  
- **Tesseract.js** → OCR for images  
- **Cohere API** → AI-powered summarization  

**Deployment:** Hosted on **Vercel**  

---

## ⚙️ Technical Approach

- **Client-Side Processing:** Text extraction happens entirely in the browser → ensures **privacy** & **performance**  
- **Single Page App Architecture:** Progressive enhancement with modular panels (Upload → Options → Summary)  
- **UX Focus:**  
  - Drag-and-drop with instant visual feedback  
  - Animated loading states  
  - Mobile-first responsive layout  
- **Performance:**  
  - Progressive feedback during parsing & summarization  
  - Error boundaries for unsupported/large files  
- **Security:**  
  - Demo uses client-side API key (⚠️ not safe for production)  
  - In production → key should be secured in a backend or serverless proxy  

---

## 🌍 Browser Compatibility

✅ Chrome (recommended)  
✅ Firefox  
✅ Safari  
✅ Edge  
📱 Mobile browsers supported  

---

## 🚀 How to Run Locally

1. Clone this repository:  
   ```bash
   git clone <repo-url>
