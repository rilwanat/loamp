<?php

// Set CORS headers for preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}

// Set CORS headers for actual POST request
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/response.php';

require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

// Handle register endpoint -> ask-register-user.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receive registration data from the request
    // $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->first_name) &&
        !empty($data->last_name) &&
        !empty($data->country_of_residence) &&
        !empty($data->email) &&
        !empty($data->password)
        // && !empty($data->confirmPassword)

    ) {

        if ($response->checkIfMemberExists($data->email)) {
            // User creation failed
            http_response_code(400);
            echo json_encode(array("status" => false, "message" => "Registration failed. Email already exists."));
        } else {


            // Attempt to create user
            $authToken = $response->createMember($data->first_name, $data->last_name, $data->country_of_residence, $data->email, $data->password);
            if ($authToken) {


                //
                $randomToken = "";
                $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for ($i = 0; $i < 8; $i++) {
                    $randomToken .= $codeAlphabet[random_int(0, strlen($codeAlphabet) - 1)];
                }
                $response->InsertEmailTokenForMember($data->email, $randomToken);
                //


                //
                $subject = "Welcome Email";
                $message = "
<h4>Welcome to African Ambassadors!</h4>
We're thrilled to have you as part of our community! Your code for email verification is: 
<br>
<div 
style='padding: 10px; background: #f4f4f4; border: 1px dashed #ccc; 
display: inline-block; font-family: monospace; font-size: 16px; font-weight: bold'>" . $randomToken . "</div>
<br><br>

As a valued member, your contributions will go a long way in creating positive change in Africa! 
To activate your membership, we kindly ask you to verify your email and upload the necessary documents.
<br><br>
Simply log in to your account and navigate to the Profile section to continue.
<br><br>
Best regards,
<br>
<strong>African Ambassadors Team</strong>
<br><br>
";
                // sendMailToUser($data->first_name, $data->email, $subject, $message);
                sendMailSMTP($data->first_name, $data->email, $subject, $message);
                //



                $response->createSubscribe($data->email);
                // User created successfully, return authentication token
                http_response_code(200);
                echo json_encode(array(
                    "status" => true,
                    "message" => "Please check your mail for a verification code.",
                    "token" => $authToken,

                ));
            } else {
                // User creation failed
                http_response_code(400);
                echo json_encode(array("status" => false, "message" => "Registration failed."));
            }
        }
    } else {
        // Registration data is incomplete
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Registration data is incomplete."));
    }
}
