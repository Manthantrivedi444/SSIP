document.addEventListener('DOMContentLoaded', function() {
    // Initialize date field with current date
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10);
    document.getElementById('date').value = formattedDate;
    
    // Initialize rich text editor toolbar
    initEditor();
    
    // Initialize attachment button
    const attachBtn = document.getElementById('attachBtn');
    const fileInput = document.getElementById('attachments');
    const fileList = document.getElementById('fileList');
    
    attachBtn.addEventListener('click', function(e) {
        e.preventDefault();
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            let fileNames = [];
            for (let i = 0; i < fileInput.files.length; i++) {
                fileNames.push(fileInput.files[i].name);
            }
            fileList.textContent = fileNames.join(', ');
        } else {
            fileList.textContent = 'No files selected';
        }
    });
    
    // Letter type change handler
    document.getElementById('letterType').addEventListener('change', function() {
        const letterType = this.value;
        let template = '';
        
        if (letterType === 'official') {
            template = `<p>With reference to the subject cited above, I would like to inform you that...</p><p>Therefore, it is hereby requested to take necessary action as per the guidelines provided in the circular dated...</p><p>Your prompt attention to this matter would be highly appreciated.</p>`;
        } else if (letterType === 'notice') {
            template = `<p>NOTICE</p><p>This is to inform the general public/concerned departments that...</p><p>By order,</p>`;
        } else if (letterType === 'directive') {
            template = `<p>In exercise of the powers conferred under Section... of the... Act, the following directives are issued with immediate effect:</p><ol><li>All concerned departments shall...</li><li>This directive will remain in force until further orders.</li></ol>`;
        } else if (letterType === 'emergency') {
            template = `<p>EMERGENCY ORDER</p><p>In view of the developing situation regarding..., and in exercise of powers conferred under Section... of the Disaster Management Act, the following emergency measures are hereby ordered with immediate effect:</p><ol><li>...</li><li>...</li></ol><p>This order comes into immediate effect and shall remain valid until revoked.</p>`;
        }
        
        if (template) {
            document.getElementById('editor').innerHTML = template;
        }
    });
    
    // Preview letter
    const previewBtn = document.getElementById('previewLetter');
    const modal = document.getElementById('letterPreview');
    const closeButtons = document.querySelectorAll('.close, .close-btn');
    
    previewBtn.addEventListener('click', function() {
        generatePreview();
        modal.style.display = 'block';
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Print letter
    document.getElementById('printLetter').addEventListener('click', function() {
        window.print();
    });
    
    // Save as draft
    document.getElementById('saveAsDraft').addEventListener('click', function() {
        saveDraft();
    });
    
    // Send letter
    document.getElementById('sendLetter').addEventListener('click', function() {
        if (validateForm()) {
            sendLetter();
        }
    });
});

// Initialize rich text editor
function initEditor() {
    const buttons = document.querySelectorAll('.format-btn');
    const editor = document.getElementById('editor');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.dataset.command;
            document.execCommand(command, false, null);
            
            // Toggle active state for certain buttons
            if (['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight'].includes(command)) {
                this.classList.toggle('active');
            }
            
            editor.focus();
        });
    });
}

// Generate letter preview
function generatePreview() {
    const referenceNumber = document.getElementById('referenceNumber').value;
    const date = document.getElementById('date').value;
    const recipient = document.getElementById('recipient').value;
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('editor').innerHTML;
    const signature = document.getElementById('signature').value;
    
    let signatureHtml = '';
    if (signature === 'default') {
        signatureHtml = `
            <p style="margin-top: 40px;">Yours sincerely,</p>
            <p style="margin-top: 50px;"><strong>District Collector</strong></p>
            <p>District Administration</p>
        `;
    } else if (signature === 'formal') {
        signatureHtml = `
            <p style="margin-top: 40px;">Yours faithfully,</p>
            <p style="margin-top: 50px;"><strong>District Collector</strong></p>
            <p>By Order</p>
            <p>District Administration</p>
        `;
    } else if (signature === 'simple') {
        signatureHtml = `
            <p style="margin-top: 40px;">Regards,</p>
            <p style="margin-top: 30px;"><strong>District Collector</strong></p>
        `;
    }
    
    let formattedDate = '';
    if (date) {
        const dateObj = new Date(date);
        formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    
    const letterHtml = `
        <div style="padding: 20px; max-width: 800px; margin: 0 auto; font-family: 'Times New Roman', Times, serif; line-height: 1.5;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333;">OFFICE OF THE DISTRICT COLLECTOR</h2>
                <p style="margin: 5px 0;">District Administration</p>
                <hr style="border: 1px solid #333; margin: 10px 0;">
            </div>
            
            <div style="text-align: right; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Ref: ${referenceNumber || '[Reference Number]'}</strong></p>
                <p style="margin: 5px 0;"><strong>Date: ${formattedDate || '[Date]'}</strong></p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <p><strong>To,</strong></p>
                <p>${recipient || '[Recipient]'}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <p><strong>Subject:</strong> ${subject || '[Subject]'}</p>
            </div>
            
            <div style="margin-bottom: 40px;">
                ${content || '<p>[Letter Content]</p>'}
            </div>
            
            ${signatureHtml}
        </div>
    `;
    
    document.querySelector('.preview-letter').innerHTML = letterHtml;
}

// Validate form fields
function validateForm() {
    let isValid = true;
    const requiredFields = ['letterType', 'subject', 'recipient'];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.style.borderColor = 'red';
            isValid = false;
        } else {
            element.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields');
    }
    
    return isValid;
}

// Save letter as draft
function saveDraft() {
    const letterData = collectLetterData();
    
    // In a real application, this would send data to a server
    // For demonstration, we'll use localStorage
    const drafts = JSON.parse(localStorage.getItem('letterDrafts') || '[]');
    drafts.push({
        id: Date.now(),
        ...letterData,
        savedAt: new Date().toISOString()
    });
    
    localStorage.setItem('letterDrafts', JSON.stringify(drafts));
    alert('Letter saved as draft');
}

// Send letter
function sendLetter() {
    const letterData = collectLetterData();
    
    // In a real application, this would send data to a server via AJAX
    // For demonstration purposes, we'll simulate sending
    console.log('Sending letter:', letterData);
    
    // Simulate server request
    setTimeout(() => {
        alert('Letter sent successfully');
        resetForm();
    }, 1000);
}

// Collect all letter data
function collectLetterData() {
    return {
        letterType: document.getElementById('letterType').value,
        referenceNumber: document.getElementById('referenceNumber').value,
        date: document.getElementById('date').value,
        recipient: document.getElementById('recipient').value,
        subject: document.getElementById('subject').value,
        content: document.getElementById('editor').innerHTML,
        signature: document.getElementById('signature').value,
        attachments: Array.from(document.getElementById('attachments').files).map(file => file.name)
    };
}

// Reset form after sending
function resetForm() {
    document.getElementById('letterType').value = '';
    document.getElementById('referenceNumber').value = '';
    document.getElementById('recipient').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('editor').innerHTML = '';
    document.getElementById('signature').value = 'default';
    document.getElementById('attachments').value = '';
    document.getElementById('fileList').textContent = 'No files selected';
    
    // Reset date to current date
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10);
    document.getElementById('date').value = formattedDate;
}