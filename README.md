# 📄 Document Summary Assistant  

**Live Demo:** 🌐 [document-summarizer-ten.vercel.app](https://document-summarizer-ten.vercel.app)  

A **lightweight yet powerful AI tool** that converts lengthy **PDFs and scanned images** into concise, readable summaries. Built with a **glass-style interface**, the app combines **modern UI design, OCR technology, and AI summarization** for a smooth end-to-end experience.  

---

## 🎯 Project Motivation  

We all deal with **long research papers, scanned notes, or reports** that take hours to read. The goal of this project was to build a **privacy-focused client-side application** that automatically:  
- Extracts text from digital and scanned files  
- Generates **short, medium, or detailed summaries**  
- Delivers results instantly in a structured, user-friendly format  

---

## 🔎 User Journey  

1. **Upload File** → Drop or select a document (PDF / Image).  
2. **Set Preferences** → Choose the summary size (Short • Medium • Long).  
3. **Process with AI** → The app parses text & generates a clean summary.  
4. **View & Export** → Copy or use the structured summary directly.  

---

## ✨ Key Features  

### 📂 Document Upload  
- Drag-and-drop with **hover effects & animations**  
- Supports **PDF, PNG, JPG, JPEG** formats  
- File validation + helpful error messages  

### 📖 Text Extraction  
- **PDF.js** for structured parsing of multi-page PDFs  
- **Tesseract.js OCR** for text recognition in scanned images  
- Handles **large, multi-page files** smoothly  

### 🤖 AI Summarization  
- **Cohere API** powers intelligent summarization  
- **Three modes** → Short • Medium • Long  
- Output in **bullet format** for readability  
- Instant **copy-to-clipboard** with visual feedback  

### 🎨 Modern UI/UX  
- **Glassmorphism design** with smooth blur & shadow effects  
- Responsive layout across **desktop, tablet, mobile**  
- **Loading spinners & progress states** during processing  
- Styled error messages for better user guidance  

---

## 🛠️ Built With  

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)  
- **Core Libraries:**  
  - 📘 **PDF.js** → PDF parsing  
  - 🔡 **Tesseract.js** → Optical Character Recognition  
  - 🧠 **Cohere API** → AI-powered summaries  
- **Deployment:** Hosted on **Vercel**  

---

## ⚙️ How It Works Internally  

- All text extraction & summarization runs **directly in the browser** (client-side) → ensuring **speed & privacy**.  
- Simple **Single Page Application** structure → Workflow: Upload → Options → Summary.  
- **Performance safeguards**:  
  - Progressive feedback during parsing & AI requests  
  - Graceful handling of large or unsupported files  
- **Security note**:  
  - Demo uses a client-side API key (⚠️ insecure for production).  
  - In production, API calls should be proxied through a backend/serverless layer.  

---

## 🌐 Supported Platforms  

- ✅ Google Chrome (recommended)  
- ✅ Mozilla Firefox  
- ✅ Safari  
- ✅ Microsoft Edge  
- 📱 Fully responsive for mobile devices  

---

## 📸 Screenshots  

_Add screenshots or demo GIFs showcasing file upload, OCR, and summary output._  

---

## 🚀 Roadmap / Upcoming Features  

- 🔍 In-document search & highlight support  
- 🌐 OCR & summarization for **multiple languages**  
- 📊 Export summaries to **PDF, Word, or plain text**  
- 🖼️ Dark/Light theme toggle  
- 🤝 Collaboration mode (share summaries with teammates)  

---

## 🖥️ Local Development  

Follow these steps to run the project locally:  

1. Clone this repo
   ```bash
   git clone <repo-url>
2. Open project in VS Code
3. Install Live Server extension
4. Right-click index.html → Open with Live Server
