<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();

$response = new Response($db);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// require_once 'ask-auth-validate-token.php';
// validateToken();

$stmt = $response->ReadAllMembersAlphabetic();

$membersByLetter = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $lastName = $row['last_name'] ?? '';
    $firstLetter = strtoupper(substr($lastName, 0, 1));

    // If last_name is empty, put under "#"
    if (!$firstLetter || !ctype_alpha($firstLetter)) {
        $firstLetter = "#";
    }

    if (!isset($membersByLetter[$firstLetter])) {
        $membersByLetter[$firstLetter] = [];
    }

    $membersByLetter[$firstLetter][] = $row;
}

if (!empty($membersByLetter)) {
    ksort($membersByLetter); // Sort A-Z
    $response_data = array("status" => true, "data" => $membersByLetter);
} else {
    $response_data = array("status" => false, "message" => "No members found.");
}

http_response_code(200);
echo json_encode($response_data);
