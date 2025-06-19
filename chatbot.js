// Chatbot implementation using namespace pattern
const Chatbot = {
    init: function () {
        this.chatHistory = [];
        this.createChatbotElements();
        this.showWebsiteWelcome();
    },

    loadIntents: async function () {
        try {
            const response = await fetch('intents.json');
            return await response.json();
        } catch (error) {
            console.error('Error loading intents:', error);
            return [];
        }
    },

    createChatbotElements: function () {
        // Create chat button
        const chatButton = document.createElement('div');
        chatButton.className = 'chat-button';
        chatButton.innerHTML = '<i class="fas fa-comments"></i>';
        chatButton.onclick = () => this.toggleChatWindow();
        document.body.appendChild(chatButton);

        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';

        // Create chat header
        const chatHeader = document.createElement('div');
        chatHeader.className = 'chat-header';
        chatHeader.innerHTML = `
            <h3>Chat with Atlancia Worldwide</h3>
            <button class="close-button" onclick="Chatbot.toggleChatWindow()">×</button>
        `;

        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'chat-messages';

        // Create suggestions container
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'suggestions-container';

        // Create input container
        // const inputContainer = document.createElement('div');
        // inputContainer.className = 'chat-input-container';
        // inputContainer.innerHTML = `
        //     <input type="text" class="chat-input" placeholder="Type your message...">
        //     <button class="send-button">
        //         <i class="fas fa-paper-plane"></i>
        //     </button>
        // `;

        // Append all elements
        chatWindow.appendChild(chatHeader);
        chatWindow.appendChild(messagesContainer);
        chatWindow.appendChild(suggestionsContainer);
        // chatWindow.appendChild(inputContainer);
        document.body.appendChild(chatWindow);

        // Add event listener for send button
        const sendButton = inputContainer.querySelector('.send-button');
        const chatInput = inputContainer.querySelector('.chat-input');

        sendButton.onclick = () => this.handleUserInput(chatInput.value);
        chatInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.handleUserInput(chatInput.value);
            }
        };
    },

    typeText: function (element, text, speed = 50) {
        let index = 0;
        element.innerHTML = '';

        const type = () => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-text');
            }
        };

        type();
    },

    // showWebsiteWelcome: function() {
    //     const title = "Welcome! 👋";
    //     const welcomeMessage = "I'm excited to share my journey in Data Science, AI, and Machine Learning with you. Feel free to explore my portfolio and ask any questions!";

    //     const popup = document.createElement('div');
    //     popup.className = 'welcome-popup';
    //     popup.innerHTML = `
    //         <div class="welcome-content">
    //             <h3>${title}</h3>
    //             <p class="typing-text"></p>
    //             <button class="close-welcome">Let's Explore!</button>
    //         </div>
    //     `;

    //     document.body.appendChild(popup);

    //     const messageElement = popup.querySelector('.typing-text');
    //     this.typeText(messageElement, welcomeMessage);

    //     const closeButton = popup.querySelector('.close-welcome');
    //     closeButton.onclick = () => {
    //         popup.remove();
    //     };

    //     setTimeout(() => {
    //         if (document.body.contains(popup)) {
    //             popup.remove();
    //         }
    //     }, 15000);
    // },

    showChatbotWelcome: function () {
        const welcomeMessage = "Hi, I'm here to help you! 👋 We provide best high tech IT Solutions. How can I help you today?";
        this.addMessage('bot', welcomeMessage);

        const initialSuggestions = [
            "What is Atlancia Worldwide?",
            "What services does Atlancia Worldwide offer?",
            "What are the features of their Website Development service?",
            "What does AI Software Services include?",
            "What is the mission of Atlancia Worldwide?"
        ];
        this.addSuggestions(initialSuggestions);
    },

    toggleChatWindow: function () {
        const chatWindow = document.querySelector('.chat-window');
        const chatButton = document.querySelector('.chat-button');

        if (chatWindow.style.display === 'none' || !chatWindow.style.display) {
            chatWindow.style.display = 'flex';
            chatButton.style.display = 'none';
            this.showChatbotWelcome();
        } else {
            chatWindow.style.display = 'none';
            chatButton.style.display = 'flex';
        }
    },

    updateSuggestions: function (suggestions) {
        const suggestionsContainer = document.querySelector('.suggestions-container');
        suggestionsContainer.innerHTML = '';

        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-button';
            button.textContent = suggestion;
            button.onclick = () => this.handleUserInput(suggestion);
            suggestionsContainer.appendChild(button);
        });
    },

    handleUserInput: async function (input) {
        if (!input.trim()) return;

        this.addMessage('user', input);

        const intents = await this.loadIntents();
        const response = this.getResponse(input, intents);

        this.addMessage('bot', response.answer);

        const newSuggestions = this.getNewSuggestions(response.answer, intents);
        this.updateSuggestions(newSuggestions);
    },


    getResponse: function (input, intents) {
        const normalizedInput = input.toLowerCase();
        const matchingIntent = intents.find(intent =>
            intent.question.toLowerCase().includes(normalizedInput) ||
            normalizedInput.includes(intent.question.toLowerCase())
        );

        return matchingIntent || {
            answer: "I'm not sure about that. Could you please try asking something else?"
        };
    },

    getNewSuggestions: function (answer, intents) {
        const relevantIntents = intents.filter(intent =>
            intent.answer.toLowerCase().includes(answer.toLowerCase()) ||
            answer.toLowerCase().includes(intent.answer.toLowerCase())
        );

        if (relevantIntents.length >= 5) {
            return relevantIntents.slice(0, 5).map(intent => intent.question);
        }

        const randomIntents = intents
            .filter(intent => !relevantIntents.includes(intent))
            .sort(() => Math.random() - 0.5)
            .slice(0, 5 - relevantIntents.length);

        return [...relevantIntents, ...randomIntents]
            .slice(0, 5)
            .map(intent => intent.question);
    },

    addMessage: function (type, text) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const processedText = text.replace(
            /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g,
            match => `<a href="${match.startsWith('+') ? 'tel:' : match.startsWith('http') ? match : 'mailto:'}${match}" target="_blank">${match}</a>`
        );

        messageDiv.innerHTML = processedText;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    addSuggestions: function (suggestions) {
        const suggestionsContainer = document.querySelector('.suggestions-container');
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-button';
            button.textContent = suggestion;
            button.onclick = () => {
                this.addMessage('user', suggestion);
                this.handleUserInput(suggestion);
            };
            suggestionsContainer.appendChild(button);
        });
    }
};

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Chatbot.init();
});