# 📄 Document Summary Assistant  

**Live Demo:** [document-summarizer-ten.vercel.app](https://document-summarizer-ten.vercel.app)  

A **next-generation web app** that extracts and summarizes content from **PDFs and images** with the help of **AI**, designed with an elegant **glassmorphic UI** and seamless cross-device compatibility.  

---

## 🚀 Why This Project?  

Managing long reports, scanned notes, and documents can be overwhelming. This application was built to **reduce reading time** by generating **clear, structured summaries** instantly. The focus was to combine **intelligent text processing** with a **delightful user experience**.  

---

## 🔄 Workflow Overview  

1. **Upload Document** – Drag & drop or select a PDF/image file  
2. **Customize Summary** – Choose length preference (Short / Medium / Long)  
3. **AI Processing** – Text extraction and AI summarization happen in the browser  
4. **Get Results** – Clean, bullet-point summaries ready to copy or reuse  

---

## ✨ Highlighted Features  

### 📤 Smart File Upload  
- Drag-and-drop zone with **interactive hover effects**  
- Supports **PDF** and image formats (**PNG, JPG, JPEG**)  
- Real-time **file validation & error alerts**  

### 📑 Text Processing  
- **PDF.js** for efficient parsing of multi-page PDFs  
- **Tesseract.js OCR** for extracting text from images & scanned files  
- Smooth handling of **large or multi-page documents**  

### 🤖 AI-Powered Summaries  
- **Cohere Summarization API** for context-aware results  
- Output in **short, medium, or long formats**  
- **Bullet-style summaries** for quick readability  
- One-click **copy to clipboard** with instant feedback  

### 🎨 User-Centric Interface  
- **Glassmorphism design** with soft shadows & blur effects  
- Responsive layout optimized for **desktop, tablet, and mobile**  
- **Loading animations** during processing  
- Clear **error states & recovery prompts**  

---

## 🛠️ Technology Stack  

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)  
- **Libraries & Tools:**  
  - 📘 **PDF.js** → Parse and extract text from PDFs  
  - 🔡 **Tesseract.js** → OCR for scanned files  
  - 🧠 **Cohere AI API** → Intelligent summarization  
- **Hosting/Deployment:** Vercel  

---

## ⚙️ Design & Technical Approach  

- **All Client-Side Processing** → Protects privacy & reduces backend complexity  
- **Single-Page Architecture** → Modular workflow: Upload → Options → Summary  
- **Performance Optimizations:**  
  - Progressive feedback for parsing & AI calls  
  - Handles large files without freezing the UI  
- **UX First:**  
  - Minimal learning curve with guided steps  
  - Mobile-first layout with adaptive grid design  
- **Security Note:**  
  - For demo: API key is in client-side (⚠️ not secure)  
  - For production: key should be secured via serverless functions  

---

## 🌍 Browser & Device Compatibility  

- ✅ Chrome (best performance)  
- ✅ Firefox  
- ✅ Safari  
- ✅ Microsoft Edge  
- 📱 Fully functional on mobile browsers  

---

## 📸 Screenshots  

_Add screenshots or GIFs of the app showing file upload, summary generation, and UI design._  

---

## 🧩 Future Enhancements  

- 🔍 Add **search inside document** feature  
- 🌐 Multi-language OCR & summarization support  
- 📊 Export summaries as **PDF, DOCX, or TXT**  
- 🖼️ UI themes (dark/light mode toggle)  
- 🤝 Collaboration features (share summaries with others)  

---

## 👩‍💻 How to Run Locally  

1. Clone the repository  
   ```bash
   git clone <repo-url>
2. Open project in VS Code
3. Install Live Server extension
4. Right-click index.html → Open with Live Server
