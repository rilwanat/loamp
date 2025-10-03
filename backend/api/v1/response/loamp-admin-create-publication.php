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

$baseUploadDir = "../../../../upload-documents/publications/";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once 'loamp-auth-validate-token.php';
validateToken();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $publication_name = $_POST['publication_name'] ?? null;
    $publication_content = $_POST['publication_content'] ?? null;
    $created_by       = $_POST['created_by'] ?? null;
    $last_updated_by       = $_POST['last_updated_by'] ?? null;

    if (!$publication_name || !$publication_content) {
        http_response_code(400);
        echo json_encode([
            "status" => false,
            "message" => "Publication name and content are required."
        ]);
        exit();
    }

    // Expected document keys
    $requiredDocs = [
        "cover_image" => "Cover Image",
    ];

    $allowedTypes = ['image/jpeg', 'image/png'];
    $maxSize = 2 * 1024 * 1024; // 2MB

    $uploadedFiles = [];

    // Sanitize publication name → folder name
    $cleanName = preg_replace("/[^a-zA-Z0-9]/", "_", strtolower($publication_name));
    $pubDir = $baseUploadDir . $cleanName . "/";

    // Ensure publication folder exists
    if (!is_dir($pubDir)) {
        mkdir($pubDir, 0777, true);
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
                "message" => "$label must be JPG or PNG."
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
        $finalPath = $pubDir . $filename;

        // Delete old file if exists
        if (file_exists($finalPath)) {
            unlink($finalPath);
        }

        // Move new file
        if (move_uploaded_file($_FILES[$field]['tmp_name'], $finalPath)) {
            // Save URL (relative path for web access)
            $uploadedFiles[$field] = "/loamp/upload-documents/publications/$cleanName/$filename";
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
        $createResult = $response->CreatePublication(
            $uploadedFiles["cover_image"],
            $publication_name,
            $publication_content,
            $created_by,
            $last_updated_by
        );

        if ($createResult === true) {
            http_response_code(200);
            echo json_encode([
                "status" => true,
                "message" => "Publication created successfully."
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => false,
                "message" => "Unable to create publication in database."
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => false,
            "message" => "Publication data or documents missing."
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => false, "message" => "Only POST method is allowed."]);
}
