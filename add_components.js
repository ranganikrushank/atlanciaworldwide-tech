// Function to load and inject the footer
// async function loadFooter() {
//     try {
//         const response = await fetch('/footer.html');
//         const footerHtml = await response.text();
//         document.body.insertAdjacentHTML('beforeend', footerHtml);
//     } catch (error) {
//         console.error('Error loading footer:', error);
//     }
// }

// Create and append chatbot elements


// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load required CSS files
    if (!document.querySelector('link[href="/style.css"]')) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/style.css';
        document.head.appendChild(styleLink);
    }

    // Load Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // Load and initialize components
    loadFooter();
    createChatbot();
    Chatbot.init();

    // Load chatbot script if not already loaded
    if (!document.querySelector('script[src="/chatbot.js"]')) {
        const chatbotScript = document.createElement('script');
        chatbotScript.src = '/chatbot.js';
        document.body.appendChild(chatbotScript);
    }
});