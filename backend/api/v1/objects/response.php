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

    private $news_table = "news_table";
    private $events_table = "events_table";

    private $admins_table = "admins_table";
    private $super_admins_table = "super_admins_table";



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

    public function checkIfMemberExists($email)
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
    public function createMember($first_name, $last_name, $country_of_residence, $email, $password)
    {
        // $customer_id = strval(time());
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO " . $this->members_table . " SET             
            first_name=:first_name,
            last_name=:last_name,
            country_of_residence=:country_of_residence,
            email_address=:email,
            password=:password
            ";

        // prepare query
        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":country_of_residence", $country_of_residence);
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

    public function InsertEmailTokenForMember($email, $randomToken)
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

    public function checkIfMemberCredentialsIsValid($email, $rawPassword)
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
    
    public function checkIfAdminCredentialsIsValid($email, $rawPassword)
    {
        // Check if the user exists
        $query_check = "SELECT id, password FROM " . $this->admins_table . " WHERE email_address = :email";
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

    public function checkIfSuperAdminCredentialsIsValid($email, $rawPassword)
    {
        // Check if the user exists
        $query_check = "SELECT id, password FROM " . $this->super_admins_table . " WHERE email_address = :email";
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
                    m.id,
                    
                    -- Basic Info
                    m.first_name,
                    m.last_name,
                    m.email_address,
                    m.email_verified,
                    -- m.password, -- excluded for security
                    m.phone_number,
                    m.date_of_birth,
                    m.gender,
                    
                    -- Membership & Role
                    m.role,
                    m.membership_status,
                    m.document_upload_status,
                    m.profile_status,
                    m.subscription_status,
                    m.subscription_date,
                    m.enrolment_type,
                    
                    -- Location
                    m.country_of_residence,
                    m.nationality,
                    m.region,
                    m.diplomatic_area,
                    m.state_of_residence,
                    
                    -- Socials
                    m.instagram,
                    m.linkedin,
                    m.facebook,
                    m.twitter,
                    
                    -- Profile
                    m.profile_picture,
                    m.bio,
                    
                    -- Documents
                    m.letter_of_credence,
                    m.passport_data_page,
                    m.intl_passport,
                    m.id_card,
                    m.other_docs,
                    
                    -- Timestamps
                    m.registration_date,
                    m.last_updated_at
                    
                FROM " . $this->members_table . " m
                WHERE m.email_address = :email";

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            // Bind the email parameter
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);

            // Execute the query
            $stmt->execute();

            // Fetch single row
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            return $user ?: null;
        } catch (Exception $e) {
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }
    }

    public function ReadAdmin($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT
                    m.id,
                    
                    -- Basic Info
                    m.first_name,
                    m.last_name,
                    m.email_address,
                    m.email_verified,
                    -- m.password, -- excluded for security
                    m.phone_number,
                    m.date_of_birth,
                    m.gender,
                    
                    -- Membership & Role
                    m.role,
                    -- m.membership_status,
                    -- m.document_upload_status,
                    m.profile_status,
                    -- m.subscription_status,
                    -- m.subscription_date,
                    
                    -- -- Location
                    -- m.country_of_residence,
                    -- m.nationality,
                    -- m.region,
                    -- m.diplomatic_area,
                    -- m.state_of_residence,
                    
                    -- -- Socials
                    -- m.instagram,
                    -- m.linkedin,
                    -- m.facebook,
                    -- m.twitter,
                    
                    -- Profile
                    m.profile_picture,
                    m.bio,
                    
                    -- -- Documents
                    -- m.letter_of_credence,
                    -- m.passport_data_page,
                    -- m.intl_passport,
                    -- m.id_card,
                    -- m.other_docs,
                    
                    -- Timestamps
                    m.registration_date,
                    m.last_updated_at
                    
                FROM " . $this->admins_table . " m
                WHERE m.email_address = :email";

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            // Bind the email parameter
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);

            // Execute the query
            $stmt->execute();

            // Fetch single row
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            return $user ?: null;
        } catch (Exception $e) {
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }
    }

    public function ReadSuperAdmin($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT
                    m.id,
                    
                    -- Basic Info
                    m.first_name,
                    m.last_name,
                    m.email_address,
                    m.email_verified,
                    -- m.password, -- excluded for security
                    m.phone_number,
                    m.date_of_birth,
                    m.gender,
                    
                    -- Membership & Role
                    m.role,
                    -- m.membership_status,
                    -- m.document_upload_status,
                    m.profile_status,
                    -- m.subscription_status,
                    -- m.subscription_date,
                    
                    -- -- Location
                    -- m.country_of_residence,
                    -- m.nationality,
                    -- m.region,
                    -- m.diplomatic_area,
                    -- m.state_of_residence,
                    
                    -- -- Socials
                    -- m.instagram,
                    -- m.linkedin,
                    -- m.facebook,
                    -- m.twitter,
                    
                    -- Profile
                    m.profile_picture,
                    m.bio,
                    
                    -- -- Documents
                    -- m.letter_of_credence,
                    -- m.passport_data_page,
                    -- m.intl_passport,
                    -- m.id_card,
                    -- m.other_docs,
                    
                    -- Timestamps
                    m.registration_date,
                    m.last_updated_at
                    
                FROM " . $this->super_admins_table . " m
                WHERE m.email_address = :email";

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            // Bind the email parameter
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);

            // Execute the query
            $stmt->execute();

            // Fetch single row
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            return $user ?: null;
        } catch (Exception $e) {
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }
    }

    public function UpdateMemberDocs($email, $letter_of_credence, $passport_data_page, $intl_passport, $id_card, $other_docs)
    {
        $document_upload_status = "Ok";
        $query = ""; {
            $query = "UPDATE " . $this->members_table . " SET 
            
            letter_of_credence=:letter_of_credence,
            passport_data_page=:passport_data_page,
            intl_passport=:intl_passport,
            id_card=:id_card,
            other_docs=:other_docs,
document_upload_status=:document_upload_status 



            WHERE email_address = :email
            ";
        }


        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":email", $email);

        $stmt->bindParam(":letter_of_credence", $letter_of_credence);
        $stmt->bindParam(":passport_data_page", $passport_data_page);
        $stmt->bindParam(":intl_passport", $intl_passport);
        $stmt->bindParam(":id_card", $id_card);
        $stmt->bindParam(":other_docs", $other_docs);

        $stmt->bindParam(":document_upload_status", $document_upload_status);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
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

    public function CreatePublication($cover_image, $publication_name, $publication_content, $created_by, $last_updated_by)
{
    try {
        $query = "INSERT INTO " . $this->news_table . " 
            SET 
                cover_image = :cover_image,
                publication_name = :publication_name,
                publication_content = :publication_content,
                date = CURDATE(),
                status = 'Active',
                created_by = :created_by,
                last_updated_by = :last_updated_by";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":cover_image", $cover_image);
        $stmt->bindParam(":publication_name", $publication_name);
        $stmt->bindParam(":publication_content", $publication_content);
        $stmt->bindParam(":created_by", $created_by);
        $stmt->bindParam(":last_updated_by", $last_updated_by);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    } catch (Exception $e) {
        return false;
    }
}

public function CreateEvent($cover_image, $name, $description, $event_datetime, $location, $ticket_type, $created_by, $last_updated_by)
{
    try {
        $query = "INSERT INTO " . $this->events_table . " 
            SET 
                cover_image = :cover_image,
                name = :name,
                description = :description,
                event_datetime = :event_datetime,
                location = :location,
                ticket_type = :ticket_type,
                status = 'Active',
                created_by = :created_by,
                last_updated_by = :last_updated_by";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":cover_image", $cover_image);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":event_datetime", $event_datetime); // expects full DATETIME string
        $stmt->bindParam(":location", $location);
        $stmt->bindParam(":ticket_type", $ticket_type);
        $stmt->bindParam(":created_by", $created_by, PDO::PARAM_INT);
        $stmt->bindParam(":last_updated_by", $last_updated_by, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    } catch (Exception $e) {
        return false;
    }
}

}
