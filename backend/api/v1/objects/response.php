<?php

require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;

require_once __DIR__ . '/../vendor/autoload.php'; // Adjust path based on your structure
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


class Response
{
    private $conn;


    private $members_table = "members_table";
    private $tokens_table = "tokens_table";
    private $subscriptions_table = "subscribe_table";



    // public $username;
    public $password;



    // //used for creation of new entry
    // public $id;
    public $last_modified_by;
    public $username;
    public $firstname;
    public $lastname;
    public $email;
    public $phone_number;
    public $delivery_address; //JSON
    public $orders;
    public $price;
    public $tax_id;
    public $payment_method;


    // Your secret key used for signing the tokens
    private $secretKey;


    public function __construct($db)
    {
        $this->conn = $db;
        $this->secretKey = $_ENV['LOAMP_SECRET_ENCRYPTION_KEY'];
    }


    // Function to generate authentication token
    function generateAuthToken()
    {
        // Token expiration time (e.g., 1 hour from now)
        $expirationTime = time() + 2592000; //3600; 60*60*24*30 = 1 month

        // JWT payload
        $payload = array(
            "iat" => time(), // Issued at: time when the token was generated
            "exp" => $expirationTime, // Expiration time
            // Add any additional claims here
        );

        // Generate the JWT
        $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

        return $jwt;
    }

    function validateToken($token)
    {
        try {
            // Decode the token
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));

            // Check if the token is expired
            $currentTime = time();
            if ($decoded->exp < $currentTime) {
                // Token has expired
                // echo json_encode(array("status" => false, "message" => "Token expired"));
                return false;
            } else {
                // Token is valid
                // echo json_encode(array("status" => true, "message" => "Token is valid"));
                return true;
            }
        } catch (Exception $e) {
            // Token is invalid or malformed
            // echo json_encode(array("status" => false, "message" => "Invalid token: " . $e->getMessage()));
            return false;
        }
    }


    public function checkIfUserExists($email)
    {
        // Check if the user already exists
        $query_check = "SELECT id FROM " . $this->members_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // User already exists
            return true;
        } else {
            // User does not exist
            return false;
        }
    }
    public function createUser($email, $password)
    {
        // $customer_id = strval(time());
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO " . $this->members_table . " SET             
            email_address=:email,
            password=:password
            ";

        // prepare query
        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $hashed_password);


        // execute query
        if ($stmt->execute()) {
            // User inserted successfully, generate authentication token
            $authToken = $this->generateAuthToken();

            // Return the generated authentication token
            return $authToken;
        }

        return false; // User creation failed
    }
    public function createUserWithoutPassword($email)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->members_table . " SET             
            email_address=:email
            ";

        // prepare query
        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":email", $email);


        // execute query
        if ($stmt->execute()) {
            // User inserted successfully, generate authentication token
            $authToken = $this->generateAuthToken();

            // Return the generated authentication token
            return $authToken;
        }

        return false; // User creation failed
    }
    public function InsertEmailTokenForUser($email, $randomToken)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->tokens_table . " SET             
            
            token_for=:token_for,
            email_token=:email_token
            ";

        // prepare query
        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":token_for", $email);
        $stmt->bindParam(":email_token", $randomToken);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false; // User creation failed
    }


    public function checkIfEmailCodeIsValid($email, $verificationCode)
    {
        // Get the most recent token for this email
        $query = "SELECT email_token 
              FROM " . $this->tokens_table . " 
              WHERE token_for = :email 
              ORDER BY date DESC 
              LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

            // Compare the tokens directly (case-sensitive exact match)
            if ($tokenData['email_token'] === $verificationCode) {
                // Token is valid - you may want to delete it here to prevent reuse
                // $this->deleteToken($email, $verificationCode);


                $yes = "Yes";
                // Token is valid - update verification status
                $query = "UPDATE " . $this->members_table . " 
                      SET email_verified = :email_verified
                      WHERE email_address = :email";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":email", $email);
                $stmt->bindParam(":email_verified", $yes);

                if ($stmt->execute()) {
                    return true;
                }
            }
        }

        return false;
    }

    public function checkIfUserCredentialsIsValid($email, $rawPassword)
    {
        // Check if the user exists
        $query_check = "SELECT id, password FROM " . $this->members_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // Fetch the user's record
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
            $hashedPassword = $user['password'];

            // Verify the password
            if (password_verify($rawPassword, $hashedPassword)) {
                // Password is correct, generate authentication token
                $authToken = $this->generateAuthToken();
                return $authToken;
            } else {
                // Password is incorrect
                return false;
            }
        } else {
            // User does not exist
            return false;
        }
    }


    public function CreateSubscribe($email)
    {
        // First check if email already exists
        $check_query = "SELECT COUNT(*) as email_count 
                   FROM " . $this->subscriptions_table . " 
                   WHERE email_address = :email";

        $check_stmt = $this->conn->prepare($check_query);
        $check_stmt->bindParam(":email", $email);
        $check_stmt->execute();

        $result = $check_stmt->fetch(PDO::FETCH_ASSOC);

        // If email exists, return false
        if ($result && $result['email_count'] > 0) {
            return false;
        }

        // If email doesn't exist, proceed with insertion
        $insert_query = "INSERT INTO " . $this->subscriptions_table . " 
                    SET email_address = :email";

        $insert_stmt = $this->conn->prepare($insert_query);
        $insert_stmt->bindParam(":email", $email);

        return $insert_stmt->execute();
    }

    public function ReadMember($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT
                    p.id,
                    p.fullname,
                    p.email_address,
                    p.voter_consistency,
                    -- p.password,
                    p.phone_number,
                    p.kyc_status,
                    p.account_number,
                    p.account_name,
                    p.bank_name,
                    p.gender,
                    p.state_of_residence,
                    p.profile_picture,
                    p.email_verified,
                    p.registration_date,
                    p.user_type,
                    p.eligibility,
                    p.is_cheat,
                    p.opened_welcome_msg,
                    p.vote_weight 
                FROM " . $this->members_table . " p  WHERE p.email_address = :email";

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);

            // Execute the statement
            $stmt->execute();

            // Fetch the result
            $user = $stmt->fetch(PDO::FETCH_ASSOC);


            return $user; // User not found

        } catch (Exception $e) {
            // Log the error message and return null for security
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }
    }


    // Function to generate a random password
    function generateRandomPassword($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $password = '';
        $charactersLength = strlen($characters);
        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[rand(0, $charactersLength - 1)];
        }
        return $password;
    }

    function validatePassword($password)
    {
        $errors = [];

        // Check password length (minimum 10 characters)
        if (strlen($password) < 10) {
            $errors[] = "Password must be at least 10 characters long.";
        }

        // Check for at least one uppercase letter
        if (!preg_match('/[A-Z]/', $password)) {
            $errors[] = "Password must contain at least one uppercase letter.";
        }

        // Check for at least one lowercase letter
        if (!preg_match('/[a-z]/', $password)) {
            $errors[] = "Password must contain at least one lowercase letter.";
        }

        // Check for at least one number
        if (!preg_match('/[0-9]/', $password)) {
            $errors[] = "Password must contain at least one number.";
        }

        // // Check for at least one special character
        // if (!preg_match('/[\W]/', $password)) {
        //     $errors[] = "Password must contain at least one special character.";
        // }

        return empty($errors) ? true : $errors;
    }
}
