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

$baseUploadDir = "../../../../upload-documents/events/";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once 'loamp-auth-validate-token.php';
validateToken();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $event_name        = $_POST['event_name'] ?? null;
    $event_description = $_POST['event_description'] ?? null;
    $event_time        = $_POST['event_time'] ?? null;
    $event_date        = $_POST['event_date'] ?? null;
    $event_location        = $_POST['event_location'] ?? null;
    $ticket_type       = $_POST['ticket_type'] ?? null;
    $created_by       = $_POST['created_by'] ?? null;
    $last_updated_by       = $_POST['last_updated_by'] ?? null;

    if (!$event_name || !$event_description || !$event_time || !$event_date || !$ticket_type) {
        http_response_code(400);
        echo json_encode([
            "status" => false,
            "message" => "All fields (Event Name, Description, Time, Date, Location and Ticket Type) are required."
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

    // Sanitize event name → folder name
    $cleanName = preg_replace("/[^a-zA-Z0-9]/", "_", strtolower($event_name));
    $eventDir = $baseUploadDir . $cleanName . "/";

    // Ensure event folder exists
    if (!is_dir($eventDir)) {
        mkdir($eventDir, 0777, true);
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
        $finalPath = $eventDir . $filename;

        // Delete old file if exists
        if (file_exists($finalPath)) {
            unlink($finalPath);
        }

        // Move new file
        if (move_uploaded_file($_FILES[$field]['tmp_name'], $finalPath)) {
            // Save URL (relative path for web access)
            $uploadedFiles[$field] = "/loamp/upload-documents/events/$cleanName/$filename";
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

        // Combine date and time into a single DATETIME string
        // Example: "2025-10-05" + "14:30" → "2025-10-05 14:30:00"
        $event_datetime = null;
        if ($event_date && $event_time) {
            $event_datetime = date("Y-m-d H:i:s", strtotime("$event_date $event_time"));
        } else {
            http_response_code(400);
            echo json_encode([
                "status" => false,
                "message" => "Invalid event date or time."
            ]);
            exit();
        }


        $createResult = $response->CreateEvent(
            $uploadedFiles["cover_image"],
            $event_name,
            $event_description,
            $event_datetime,
            $event_location,
            $ticket_type,
            $created_by,
            $last_updated_by
        );

        if ($createResult === true) {
            http_response_code(200);
            echo json_encode([
                "status" => true,
                "message" => "Event created successfully."
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => false,
                "message" => "Unable to create event in database."
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => false,
            "message" => "Event data or documents missing."
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => false, "message" => "Only POST method is allowed."]);
}
