const fs = require('fs');
const path = require('path');

// List of HTML files to modify
const htmlFiles = [
    'index.html',
    'web-development.html',
    'resume.html',
    'ml.html',
    'in-progress.html',
    'dynamic-web-development.html',
    'certificates.html',
    'coming_soon.html',
    'ai.html'
];

// Content to add before </head>
const headContent = `
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Chatbot Script -->
    <script src="chatbot.js" defer></script>
`;

// Process each HTML file
htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add content before </head>
        content = content.replace('</head>', `${headContent}\n</head>`);
        
        // Write back to file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});