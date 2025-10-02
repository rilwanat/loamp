<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$baseUploadDir = "../../../../upload-documents/members/";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once 'loamp-auth-validate-token.php';
validateToken();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? null;

    // Expected document keys
    $requiredDocs = [
        "letter_of_credence" => "Letter of Credence",
        "passport_data_page" => "Passport Data Page",
        "intl_passport"      => "International Passport",
        "id_card"            => "ID Card",
        "other_docs"         => "Other Documents"
    ];

    $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    $maxSize = 2 * 1024 * 1024; // 2MB

    $uploadedFiles = [];

    if (!$email) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Email is required."]);
        exit();
    }

    // Sanitize email → folder name
    $cleanEmail = preg_replace("/[^a-zA-Z0-9]/", "_", $email);
    $userDir = $baseUploadDir . $cleanEmail . "/";

    // Ensure user folder exists
    if (!is_dir($userDir)) {
        mkdir($userDir, 0777, true);
    }

    foreach ($requiredDocs as $field => $label) {
        if (!isset($_FILES[$field]) || $_FILES[$field]['error'] !== 0) {
            http_response_code(400);
            echo json_encode([
                "status" => false,
                "message" => "Missing or invalid file: $label"
            ]);
            exit();
        }

        // Type check
        if (!in_array($_FILES[$field]['type'], $allowedTypes)) {
            http_response_code(400);
            echo json_encode([
                "status" => false,
                "message" => "$label must be PDF, JPG, or PNG."
            ]);
            exit();
        }

        // Size check
        if ($_FILES[$field]['size'] > $maxSize) {
            http_response_code(400);
            echo json_encode([
                "status" => false,
                "message" => "$label exceeds maximum size of 2MB."
            ]);
            exit();
        }

        // Extract file extension
        $ext = pathinfo($_FILES[$field]['name'], PATHINFO_EXTENSION);

        // Fixed filename: fieldname.ext
        $filename = $field . "." . $ext;
        $finalPath = $userDir . $filename;

        // Delete old file if exists
        if (file_exists($finalPath)) {
            unlink($finalPath);
        }

        // Move new file
        if (move_uploaded_file($_FILES[$field]['tmp_name'], $finalPath)) {
            // Change this line (store filesystem path)
            //$uploadedFiles[$field] = $finalPath;

            // To this (store web-accessible URL path instead)
            $uploadedFiles[$field] = "/loamp/upload-documents/members/$cleanEmail/$filename";
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => false,
                "message" => "Failed to upload $label"
            ]);
            exit();
        }
    }

    // Save to database
    if (count($uploadedFiles) === count($requiredDocs)) {
        $createResult = $response->UpdateMemberDocs(
            $email,
            $uploadedFiles["letter_of_credence"],
            $uploadedFiles["passport_data_page"],
            $uploadedFiles["intl_passport"],
            $uploadedFiles["id_card"],
            $uploadedFiles["other_docs"]
        );

        if ($createResult === true) {
            $userData = $response->ReadMember($data->email);

            http_response_code(200);
            echo json_encode([
                "status" => true,
                "message" => "All documents uploaded successfully.",
                "userData" => $userData
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => false,
                "message" => "Unable to save documents in database."
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Email or documents missing."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => false, "message" => "Only POST method is allowed."]);
}
