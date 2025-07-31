<?php
// Contact form handler
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        'success' => false, 
        'message' => 'Please fill in all required fields (Name, Email, and Message)'
    ]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false, 
        'message' => 'Please enter a valid email address'
    ]);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Set default subject if empty
if (empty($subject)) {
    $subject = 'New Contact Form Message from Sunrise Jeep Website';
}

// Email configuration
$to = 'agusrai25@gmail.com';
$email_subject = "Contact Form: $subject";

// Create email headers
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Sunrise Jeep Website <noreply@sunrisejeep.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Create email body
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #ff6b35; }
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #ff6b35; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🌅 New Contact Form Message</h2>
            <p>Sunrise Jeep Adventure Website</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>📝 Subject:</div>
                <div class='value'>$subject</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This message was sent from the Sunrise Jeep Adventure contact form.</p>
            <p>Sent on: " . date('F j, Y \a\t g:i A') . "</p>
        </div>
    </div>
</body>
</html>
";

// Send email
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Send confirmation email to user
    $user_subject = "Thank you for contacting Sunrise Jeep Adventure";
    $user_headers = array();
    $user_headers[] = 'MIME-Version: 1.0';
    $user_headers[] = 'Content-type: text/html; charset=UTF-8';
    $user_headers[] = 'From: Sunrise Jeep Adventure <noreply@sunrisejeep.com>';
    
    $user_email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🌅 Thank You!</h2>
                <p>Sunrise Jeep Adventure</p>
            </div>
            <div class='content'>
                <p>Dear <strong>$name</strong>,</p>
                <p>Thank you for contacting Sunrise Jeep Adventure! We have received your message and will get back to you as soon as possible.</p>
                <p><strong>Your message:</strong></p>
                <blockquote style='background: white; padding: 15px; border-left: 4px solid #ff6b35; margin: 15px 0;'>" . nl2br($message) . "</blockquote>
                <p>We typically respond within 24 hours. If you have any urgent inquiries, please don't hesitate to call us directly.</p>
                <p>Best regards,<br><strong>The Sunrise Jeep Adventure Team</strong></p>
            </div>
            <div class='footer'>
                <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    mail($email, $user_subject, $user_email_body, implode("\r\n", $user_headers));
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon!'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly.'
    ]);
}
?> 