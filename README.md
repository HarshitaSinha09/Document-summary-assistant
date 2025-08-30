# 📄 Document Summary Assistant  

🔗 **Live Demo:** [document-summarizer-ten.vercel.app](https://document-summarizer-ten.vercel.app)  

A **smart document companion** that helps you turn bulky **PDFs and images** into **crisp AI summaries**. Built with a **modern glass-style interface**, it focuses on **speed, simplicity, and accessibility** across devices.  

---

## 🌟 Overview  

Reading through long research papers, scanned notes, or reports is time-consuming. This project was created to provide a **fast, private, and reliable summarization tool** that:  
- Reads **PDFs and scanned images**  
- Applies **OCR + AI** to understand content  
- Delivers **custom-length summaries** in seconds  

---

## 🧭 How Users Interact  

1. **Choose File** → Upload a PDF or image (drag & drop supported)  
2. **Set Summary Length** → Short • Medium • Long  
3. **Process Instantly** → OCR + AI generate results in browser  
4. **Use Output** → Copy structured points for quick reference  

---

## 🔑 Main Capabilities  

### 📂 File Handling  
- Drag-and-drop zone with visual cues  
- Works with **PDF, PNG, JPG, JPEG**  
- Immediate validation for unsupported files  

### 🔍 Content Extraction  
- **PDF.js** → Handles multi-page PDFs  
- **Tesseract.js** → Recognizes text in images/scanned files  
- Smooth experience even with **large documents**  

### 🧠 AI Summarizer  
- Powered by **Cohere API**  
- Generates summaries in **3 sizes** (short/medium/detailed)  
- Structured in **bullet form** for clarity  
- **Copy button** with instant feedback  

### 🎨 Interface Highlights  
- Glassmorphism design with blur + glow effects  
- Optimized for **desktop, tablet, mobile**  
- Loading spinners + progress states during processing  
- Clear error prompts for invalid actions  

---

## 🏗️ Tech Behind the App  

- **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)  
- **Libraries & APIs:**  
  - 📘 PDF.js → PDF parsing  
  - 🔡 Tesseract.js → OCR for images  
  - 🧠 Cohere API → AI summarization  
- **Deployment:** Hosted on Vercel  

---

## 🔬 Architecture & Design Choices  

- Runs **100% client-side** → No server uploads = user privacy  
- Organized as a **Single Page Application**  
- **Resilient UI:** Progress indicators + error handling for heavy files  
- **Performance tweaks:** Incremental parsing & feedback loops  
- **Security note:** Demo key is public (⚠️ not safe for production). For real deployment, use a **secure serverless proxy**.  

---

## 🌐 Compatibility Matrix  

- ✅ Chrome (best performance)  
- ✅ Firefox  
- ✅ Safari  
- ✅ Edge  
- 📱 Mobile browsers fully supported  

---

## 🖼️ Demo Screens (Optional)  

_Add screenshots or demo GIFs showcasing file upload, OCR, and AI summaries._  

---

## 🛣️ Future Roadmap  

- Multi-language OCR + AI summaries  
- Export summaries in **PDF, DOCX, TXT** formats  
- In-app search + keyword highlighting  
- Dark / Light themes  
- Real-time sharing & collaboration  

---

## ⚡ Quickstart for Local Setup  

1. Clone this repo
   ```bash
   git clone <repo-url>
2. Open project in VS Code
3. Install Live Server extension
4. Right-click index.html → Open with Live Server
