// --- 0. STATE MANAGEMENT & INITIALIZATION ---
let selectedFile = null;
let selectedLength = 'medium';
let documentText = ''; // Stores the cleaned text for regeneration

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// --- 1. DOM ELEMENTS ---
const fileUploadBox = document.querySelector('.file-upload-box');
const resultsDisplay = document.querySelector('.results-display');
const dropZone = document.getElementById('dropZone');
const fileSelector = document.getElementById('fileSelector');
const documentDetails = document.getElementById('documentDetails');
const documentName = document.getElementById('documentName');
const documentSize = document.getElementById('documentSize');
const summarizeButton = document.getElementById('summarizeButton');
const statusMessage = document.getElementById('statusMessage');
const processingIndicator = document.getElementById('processingIndicator');
const summaryContainer = document.getElementById('summaryContainer');
const summaryText = document.getElementById('summaryText');
const lengthBadge = document.getElementById('lengthBadge');
const copyButton = document.getElementById('copyButton');
const newDocumentButton = document.getElementById('newDocumentButton');
const initialLengthSelector = document.getElementById('initialLengthSelector');
const regenerateLengthSelector = document.getElementById('regenerateLengthSelector');
const statusText = document.getElementById('statusText');
const summaryActions = document.querySelector('.summary-actions');

// --- 2. EVENT LISTENERS ---

dropZone.addEventListener('click', () => fileSelector.click());
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragleave'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]);
});
fileSelector.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
});

initialLengthSelector.querySelectorAll('.length-option').forEach(btn => {
    btn.addEventListener('click', () => {
        initialLengthSelector.querySelector('.active')?.classList.remove('active');
        btn.classList.add('active');
        selectedLength = btn.dataset.length;
    });
});

regenerateLengthSelector.querySelectorAll('.length-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const newLength = btn.dataset.length;
        if (newLength === selectedLength) return; 

        regenerateLengthSelector.querySelector('.active')?.classList.remove('active');
        btn.classList.add('active');
        
        selectedLength = newLength;
        regenerateSummary();
    });
});

summarizeButton.addEventListener('click', handleInitialGeneration);
newDocumentButton.addEventListener('click', resetToUpload);
copyButton.addEventListener('click', copySummaryText);


// --- 3. CORE LOGIC ---

function handleFileSelect(file) {
    selectedFile = file;
    documentName.textContent = file.name;
    documentSize.textContent = formatFileSize(file.size);
    documentDetails.style.display = 'block';
    summarizeButton.disabled = false;
    hideError();
}

async function handleInitialGeneration() {
    if (!selectedFile) {
        showError('Please upload a document first.');
        return;
    }

    fileUploadBox.style.display = 'none';
    resultsDisplay.style.display = 'block';
    processingIndicator.style.display = 'flex';
    summaryContainer.style.display = 'none';
    hideError();

    try {
        if (selectedFile.type.startsWith('image/')) {
            statusText.textContent = 'Extracting from image...';
        } else {
            statusText.textContent = 'Extracting from document...';
        }
        
        let extractedText = '';
        if (selectedFile.type === 'application/pdf') {
            // Run extraction and a minimum delay at the same time.
            const minDelayPromise = new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay

            // Wait for both the extraction and the minimum delay to finish.
            const [extractionResult] = await Promise.all([
                extractTextFromPDF(selectedFile),
                minDelayPromise
            ]);
            extractedText = extractionResult;

        } else if (selectedFile.type.startsWith('image/')) {
            // No delay needed for images as OCR is naturally slower.
            extractedText = await extractTextFromImage(selectedFile);
        } else {
            throw new Error('Unsupported file type.');
        }

        documentText = cleanExtractedText(extractedText);

        if (!documentText || documentText.trim().length < 50) {
            throw new Error('Could not extract enough readable text from the document.');
        }

        regenerateLengthSelector.querySelector('.active')?.classList.remove('active');
        regenerateLengthSelector.querySelector(`[data-length="${selectedLength}"]`).classList.add('active');
        
        statusText.textContent = 'Generating your summary...';

        const summary = await getIntelligentSummaryFromAPI(documentText, selectedLength);
        
        processingIndicator.style.display = 'none';
        displaySummary(summary);

    } catch (error) {
        resetToUpload();
        showError(error.message);
        console.error(error);
    }
}

async function regenerateSummary() {
    if (!documentText) {
        showError("No document text found to summarize.");
        return;
    }

    lengthBadge.style.display = 'none';
    summaryActions.style.display = 'none';
    summaryText.innerHTML = '<div class="spinner" style="margin: 40px auto;"></div>';

    try {
        const summary = await getIntelligentSummaryFromAPI(documentText, selectedLength);
        displaySummary(summary);
    } catch (error) {
        summaryText.innerHTML = ''; 
        showError(error.message);
        console.error(error);
        lengthBadge.style.display = 'block';
        summaryActions.style.display = 'flex';
    }
}

async function getIntelligentSummaryFromAPI(text, length) {
    // ⚠️ IMPORTANT: ADD YOUR VALID API KEY HERE
    const API_KEY = "9JTWU2GRMslvkLRBhQ0yc7Awy2qC3YsOj6T1An6n"; 
    const API_URL = "https://api.cohere.ai/v1/chat";

    let promptInstructions = '';
    switch(length) {
        case 'short':
            promptInstructions = `- Create a brief summary of 3-4 points. Each point must be a single, complete, and concise sentence. Output as a bulleted list.`;
            break;
        case 'long':
            promptInstructions = `- Create a detailed summary of 8-10 points. Each point should be a detailed but concise sentence, potentially spanning 1-2 lines. Output as a bulleted list.`;
            break;
        default: // Medium
            promptInstructions = `- Create a summary of 5-6 points. Each point must be a complete and concise sentence highlighting a key detail. Output as a bulleted list.`;
            break;
    }

    const finalPrompt = `You are an expert document analyst. Your task is to synthesize the provided text into a high-quality, readable summary.
        **CRITICAL RULES:**
        1. **COMPLETE SENTENCES:** Each bullet point MUST be a full, grammatically correct sentence.
        2. **NO HEADINGS:** Do not generate your own headings or labels (e.g., 'Skills:').
        3. **SYNTHESIZE:** Create a flowing summary, do not just copy phrases.
        **SUMMARY INSTRUCTIONS:**
        ${promptInstructions}
        **DOCUMENT TEXT TO SUMMARIZE:**
        """${text}"""`;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${API_KEY}`, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ message: finalPrompt, temperature: 0.3 }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.text.split('\n').filter(point => point.trim().length > 0);
}

function displaySummary(bulletPoints) {
    summaryText.innerHTML = '';
    const ul = document.createElement('ul');

    bulletPoints.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point.replace(/^[\-•\*\s]+/, '').trim();
        if (li.textContent) ul.appendChild(li);
    });

    summaryText.appendChild(ul);
    lengthBadge.textContent = selectedLength;
    
    lengthBadge.style.display = 'block';
    summaryActions.style.display = 'flex';
    
    summaryContainer.style.display = 'block';
}

function resetToUpload() {
    selectedFile = null;
    documentText = '';
    fileSelector.value = '';
    resultsDisplay.style.display = 'none';
    fileUploadBox.style.display = 'block';
    documentDetails.style.display = 'none';
    summarizeButton.disabled = true;
    hideError();
}

function copySummaryText() {
    const listItems = summaryText.querySelectorAll('li');
    const textToCopy = Array.from(listItems).map(li => `• ${li.textContent}`).join('\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyButton.textContent = '✓ Copied!';
        copyButton.classList.add('copied');

        setTimeout(() => { 
            copyButton.textContent = '📋 Copy Summary'; 
            copyButton.classList.remove('copied');
        }, 2000);
    }).catch(err => showError('Failed to copy text.'));
}

// --- 4. TEXT EXTRACTION & HELPER FUNCTIONS ---

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ') + '\n';
    }
    return fullText;
}

async function extractTextFromImage(file) {
    const worker = await Tesseract.createWorker('eng', 1, { logger: m => console.log(m) });
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();
    return text;
}

function cleanExtractedText(text) {
    let cleaned = text;
    cleaned = cleaned.replace(/(https?:\/\/[^\s]+)/g, '');
    cleaned = cleaned.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '');
    cleaned = cleaned.replace(/(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '');
    const headings = ['CAREER OBJECTIVE', 'EDUCATION', 'PROJECTS', 'SKILLS', 'ACHIEVEMENTS', 'LANGUAGES', 'FRAMEWORKS', 'DEVELOPER TOOLS AND PLATFORMS', 'LIBRARIES', 'SOFT SKILLS', 'COURSEWORK', 'CONTACT'];
    headings.forEach(heading => {
        const regex = new RegExp(`^\\s*${heading}\\s*$`, 'gim');
        cleaned = cleaned.replace(regex, '');
    });
    cleaned = cleaned.replace(/^[A-Z\s,;:-]+$/gm, '');
    cleaned = cleaned.replace(/(\r\n|\n|\r){2,}/gm, 'n');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' Bytes';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}

function showError(message) {
    statusMessage.textContent = message;
    statusMessage.style.display = 'block';
}

function hideError() {
    statusMessage.style.display = 'none';
}