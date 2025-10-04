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

$stmt = $response->ReadAllExecutives();

$data["executives"] = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data["executives"][] = $row;
}

if ($data["executives"]) {
    $response_data = array("status" => true, "data" => $data["executives"]);
} else {
    $response_data = array("status" => false, "message" => "No executives found.");
}

http_response_code(200);
echo json_encode($response_data);
