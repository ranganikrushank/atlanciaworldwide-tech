<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validate form inputs (basic validation)
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "All fields are required!";
        exit;
    }

    // Sanitize the inputs to prevent XSS and other security risks
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $subject = htmlspecialchars($subject);
    $message = htmlspecialchars($message);

    // Email Settings
    $to = "accur8web@gmail.com";  // Replace with your email address
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Compose the email body
    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "<html><body>";
    $email_body .= "<h2>Contact Form Details</h2>";
    $email_body .= "<p><strong>Name:</strong> $name</p>";
    $email_body .= "<p><strong>Email:</strong> $email</p>";
    $email_body .= "<p><strong>Subject:</strong> $subject</p>";
    $email_body .= "<p><strong>Message:</strong><br>$message</p>";
    $email_body .= "</body></html>";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Thank you for your message! We will get back to you shortly.";
    } else {
        echo "There was an issue sending your message. Please try again later.";
    }
} else {
    echo "Invalid Request Method!";
}
?>
