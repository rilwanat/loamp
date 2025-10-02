<?php
require __DIR__ . '/vendor/autoload.php'; // PHPMailer autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Generate a consistent email template
 */
function buildEmailTemplate($username, $subject, $message)
{
    return '
    <!DOCTYPE html>
    <html>
    <head>
        <title>African Ambassadors</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; width: 90%; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding: 20px 0; background-color: #fab641; color: #000000; border-radius: 8px 8px 0 0; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { padding: 20px; font-size: 16px; }
            .content p { margin: 15px 0; font-size: 16px; color: #333333; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #ffffff; border-radius: 8px 8px 0 0; background-color: #fab641; margin-top: 20px; }
            .footer a { color: #000000; margin: 0 5px; }
            .footer p { color: #000000;  }
            @media (max-width: 600px) {
                .container { width: 100%; margin: 10px; padding: 15px; }
                .header h2 { font-size: 20px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header"><h2>' . $subject . '</h2></div>
            <div class="content">
                <p>Dear ' . explode(" ", $username)[0] . ',</p>
                <p>' . $message . '</p>
            </div>
            <div class="footer">
                <a href="https://t.me/" target="_blank">Telegram</a>
                <a href="https://www.facebook.com/" target="_blank">Facebook</a>
                <a href="https://x.com/" target="_blank">Twitter</a>
                <a href="https://www.instagram.com/" target="_blank">Instagram</a>
                <a href="https://www.tiktok.com/" target="_blank">TikTok</a>
                <a href="https://www.youtube.com/" target="_blank">YouTube</a>
                <p>&copy; 2025 League of African Ambassadors. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>';
}

/**
 * Function 1: Send email using PHP's native mail()
 */
function sendMailToUser($username, $email, $subject, $message)
{
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "From: League of African Ambassadors <test.for.africanambassadors@efgold.net>\r\n";
    $headers .= "X-Auto-Response-Suppress: All\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";

    $emailBody = buildEmailTemplate($username, $subject, $message);

    $mailSent = mail($email, $subject, $emailBody, $headers);
    return $mailSent ? true : false;
}

/**
 * Function 2: Send email using PHPMailer via SMTP
 */
function sendMailSMTP($username, $toEmail, $subject, $message)
{
    $mail = new PHPMailer(true);

    try {
        
        $mail->isSMTP();
        $mail->Host       = 'mail.efgold.net';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'test.for.africanambassadors@efgold.net';
        $mail->Password   = 'W$lej?F.BVsj'; // ⚠️ move to ENV variable for security
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('test.for.africanambassadors@efgold.net', 'African Ambassadors');
        $mail->addAddress($toEmail);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = buildEmailTemplate($username, $subject, $message);

        // Plain-text fallback
    $mail->AltBody = "Dear " . explode(" ", $username)[0] . ",\n\n" . $message . "\n\n-- African Ambassadors";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        return false;
    }
}

/**
 * Wrapper: Try mail() first, fallback to SMTP
 */
// function sendMail($username, $email, $subject, $message)
// {
//     if (sendMailToUser($username, $email, $subject, $message)) {
//         return true;
//     } else {
//         return sendMailSMTP($username, $email, $subject, $message);
//     }
// }
